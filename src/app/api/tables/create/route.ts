import { NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';

// SQL Queries for Creating Tables
const createTableQueries: Record<string, string> = {
    Faculty: `
        CREATE TABLE Faculty (
            faculty_id INT PRIMARY KEY,
            email VARCHAR2(255) NOT NULL UNIQUE,
            name VARCHAR2(255) NOT NULL UNIQUE
        )
    `,
    Advisor: `
        CREATE TABLE Advisor (
            advisor_id INT PRIMARY KEY,
            first_name VARCHAR2(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            room VARCHAR2(15) NOT NULL,
            email VARCHAR2(255) NOT NULL UNIQUE,
            faculty_id INT REFERENCES Faculty(faculty_id) ON DELETE CASCADE
        )
    `,
    Department: `
        CREATE TABLE Department (
            department_id VARCHAR(10) PRIMARY KEY,
            name VARCHAR2(255) NOT NULL UNIQUE,
            email VARCHAR2(255) NOT NULL UNIQUE,
            faculty_id INT REFERENCES Faculty(faculty_id) ON DELETE CASCADE
        )
    `,
    Major: `
        CREATE TABLE Major (
            major_id INT PRIMARY KEY,
            name VARCHAR2(255) NOT NULL UNIQUE,
            department_id VARCHAR(10) REFERENCES Department(department_id) ON DELETE CASCADE
        )
    `,
    Instructor: `
        CREATE TABLE Instructor (
            instructor_id INT PRIMARY KEY,
            first_name VARCHAR2(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR2(255) NOT NULL UNIQUE,
            specialization VARCHAR2(255) DEFAULT 'None' NOT NULL,
            yearly_course_quota INT NOT NULL,
            department_id VARCHAR(10) REFERENCES Department(department_id)
        )
    `,
    TA: `
        CREATE TABLE TA (
            ta_id INT PRIMARY KEY,
            first_name VARCHAR2(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR2(255) NOT NULL UNIQUE,
            instructor_id INT REFERENCES Instructor(instructor_id) ON DELETE CASCADE
        )
    `,
    Student: `
        CREATE TABLE Student (
            student_id NUMBER CHECK (student_id BETWEEN 1 AND 999999999) PRIMARY KEY,
            first_name VARCHAR2(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR2(255) NOT NULL UNIQUE,
            outstanding_fees SMALLINT DEFAULT 0 NOT NULL CHECK (outstanding_fees BETWEEN 0 AND 1),
            academic_standing VARCHAR2(30) DEFAULT 'Clear' NOT NULL,
            current_year SMALLINT NOT NULL,
            cgpa NUMBER(3,2) DEFAULT 0.00 NOT NULL,
            credits_earned NUMBER(5,2) DEFAULT 0.00 NOT NULL,
            major_id INT REFERENCES Major(major_id)
        )
    `,
    Course: `
        CREATE TABLE Course (
            course_id INT PRIMARY KEY,
            title VARCHAR2(255) NOT NULL UNIQUE,
            description VARCHAR2(625) NOT NULL,
            course_code VARCHAR2(5) NOT NULL,
            course_no VARCHAR2(5) NOT NULL,
            weight NUMBER(3,2) DEFAULT 1.00 NOT NULL,
            weekly_contact VARCHAR2(50) NOT NULL,
            department_id VARCHAR2(10) REFERENCES Department(department_id) ON DELETE CASCADE
        )
    `,
    Semesters: `
        CREATE TABLE Semesters (
            course_id INT REFERENCES Course(course_id),
            semester_offered VARCHAR2(10) DEFAULT 'None' NOT NULL,
            PRIMARY KEY (course_id, semester_offered)
        )
    `,
    ShoppingCart: `
        CREATE TABLE ShoppingCart (
            student_id NUMBER REFERENCES Student(student_id),
            course_id INT REFERENCES Course(course_id),
            PRIMARY KEY (student_id, course_id)
        )
    `,
    Teaches: `
        CREATE TABLE Teaches (
            course_id INT REFERENCES Course(course_id),
            instructor_id INT REFERENCES Instructor(instructor_id),
            PRIMARY KEY (course_id, instructor_id)
        )
    `,
    Prereq: `
        CREATE TABLE Prereq (
            course_id INT REFERENCES Course(course_id),
            prereq_id INT REFERENCES Course(course_id),
            PRIMARY KEY (course_id, prereq_id)
        )
    `,
    Antireq: `
        CREATE TABLE Antireq (
            course_id INT REFERENCES Course(course_id),
            antireq_id INT REFERENCES Course(course_id),
            PRIMARY KEY (course_id, antireq_id)
        )
    `,
    Section: `
        CREATE TABLE Section (
            section_no INT NOT NULL,
            capacity SMALLINT NOT NULL,
            section_status VARCHAR2(20) DEFAULT 'Open' NOT NULL,
            waitlistable SMALLINT DEFAULT 1 NOT NULL CHECK (waitlistable BETWEEN 0 AND 1),
            current_size SMALLINT DEFAULT 0 NOT NULL,
            course_id INT REFERENCES Course(course_id),
            instructor_id INT REFERENCES Instructor(instructor_id),
            PRIMARY KEY (course_id, section_no)
        )
    `,
    Enrolled: `
        CREATE TABLE Enrolled (
            student_id NUMBER REFERENCES Student(student_id),
            course_id INT NOT NULL,
            section_no INT NOT NULL,
            PRIMARY KEY (student_id, course_id, section_no),
            FOREIGN KEY (course_id, section_no) REFERENCES Section(course_id, section_no)
        )
    `,
    Waitlisted: `
        CREATE TABLE Waitlisted (
            student_id NUMBER REFERENCES Student(student_id),
            course_id INT NOT NULL,
            section_no INT NOT NULL,
            PRIMARY KEY (student_id, course_id, section_no),
            FOREIGN KEY (course_id, section_no) REFERENCES Section(course_id, section_no)
        )
    `,
    Completed: `
        CREATE TABLE Completed (
            student_id NUMBER REFERENCES Student(student_id),
            course_id INT REFERENCES Course(course_id),
            gpa NUMBER(3,2) DEFAULT 0.00 NOT NULL,
            PRIMARY KEY (student_id, course_id)
        )
    `,
    Dropped: `
        CREATE TABLE Dropped (
            student_id NUMBER REFERENCES Student(student_id),
            course_id INT REFERENCES Course(course_id),
            PRIMARY KEY (student_id, course_id)
        )
    `,
    Lecture: `
        CREATE TABLE Lecture (
            weekday VARCHAR2(10) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            room VARCHAR2(15) NOT NULL,
            course_id INT NOT NULL,
            section_no INT NOT NULL,
            PRIMARY KEY (course_id, section_no, weekday, start_time),
            FOREIGN KEY (course_id, section_no) REFERENCES Section(course_id, section_no)
        )
    `,
    Lab: `
        CREATE TABLE Lab (
            weekday VARCHAR2(10) NOT NULL,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            room VARCHAR2(15) NOT NULL,
            course_id INT NOT NULL,
            section_no INT NOT NULL,
            PRIMARY KEY (course_id, section_no, weekday, start_time),
            FOREIGN KEY (course_id, section_no) REFERENCES Section(course_id, section_no)
        )
    `,
    LabTA: `
        CREATE TABLE LabTA (
            course_id INT NOT NULL,
            section_no INT NOT NULL,
            ta_id INT REFERENCES TA(ta_id),
            PRIMARY KEY (course_id, section_no, ta_id),
            FOREIGN KEY (course_id, section_no) REFERENCES Section(course_id, section_no)
        )
    `,
    Waitlist: `
        CREATE TABLE Waitlist (
            capacity SMALLINT DEFAULT 20 NOT NULL,
            current_size SMALLINT DEFAULT 0 NOT NULL,
            course_id INT NOT NULL,
            section_no INT NOT NULL,
            PRIMARY KEY (course_id, section_no),
            FOREIGN KEY (course_id, section_no) REFERENCES Section(course_id, section_no)
        )
    `,
};

export async function POST() {
    const connection = await getOracleConnection();
    const createdTables: string[] = [];
    const errors: { table: string; error: any }[] = [];

    try {
        for (const [tableName, createQuery] of Object.entries(createTableQueries)) {
            try {
                await connection.execute(createQuery);
                createdTables.push(tableName);
            } catch (error) {
                console.error(`Error creating table ${tableName}:`, error);
                errors.push({ table: tableName, error });
            }
        }
    } finally {
        await connection.close();
    }

    return NextResponse.json({
        success: true,
        message: 'Table creation process completed.',
        createdTables,
        errors,
    });
}
