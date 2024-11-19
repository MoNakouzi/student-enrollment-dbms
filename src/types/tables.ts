// Generic interface to represent any table schema
export interface TableSchema {
    [key: string]: string | number | boolean | null;
}

// Specific interfaces for each table
export interface Advisor {
    ADVISOR_ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    ROOM: string;
    EMAIL: string;
    FACULTY_ID: number;
}

export interface Antireq {
    COURSE_ID: number;
    ANTIREQ_ID: number;
}

export interface Completed {
    STUDENT_ID: number;
    COURSE_ID: number;
    GPA: number;
}

export interface Course {
    COURSE_ID: number;
    TITLE: string;
    DESCRIPTION: string;
    COURSE_CODE: string;
    COURSE_NO: string;
    WEIGHT: number;
    WEEKLY_CONTACT: string;
    DEPARTMENT_ID: string;
}

export interface Department {
    DEPARTMENT_ID: string;
    NAME: string;
    EMAIL: string;
    FACULTY_ID: number;
}

export interface Dropped {
    STUDENT_ID: number;
    COURSE_ID: number;
}

export interface Enrolled {
    STUDENT_ID: number;
    COURSE_ID: number;
    SECTION_NO: number;
}

export interface Faculty {
    FACULTY_ID: number;
    EMAIL: string;
    NAME: string;
}

export interface Instructor {
    INSTRUCTOR_ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    SPECIALIZATION: string;
    YEARLY_COURSE_QUOTA: number;
    DEPARTMENT_ID: string;
}

export interface Lab {
    COURSE_ID: number;
    SECTION_NO: number;
    WEEKDAY: string;
    START_TIME: string; // ISO 8601 format (e.g., "2024-11-01T10:00:00Z")
    END_TIME: string;
    ROOM: string;
}

export interface LabTA {
    COURSE_ID: number;
    SECTION_NO: number;
    TA_ID: number;
}

export interface Lecture {
    COURSE_ID: number;
    SECTION_NO: number;
    WEEKDAY: string;
    START_TIME: string;
    END_TIME: string;
    ROOM: string;
}

export interface Major {
    MAJOR_ID: number;
    NAME: string;
    DEPARTMENT_ID: string;
}

export interface Prereq {
    COURSE_ID: number;
    PREREQ_ID: number;
}

export interface Section {
    COURSE_ID: number;
    SECTION_NO: number;
    CAPACITY: number;
    SECTION_STATUS: string;
    WAITLISTABLE: boolean;
    CURRENT_SIZE: number;
    INSTRUCTOR_ID: number;
}

export interface Semesters {
    COURSE_ID: number;
    SEMESTER_OFFERED: string;
}

export interface ShoppingCart {
    STUDENT_ID: number;
    COURSE_ID: number;
}

export interface Student {
    STUDENT_ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    OUTSTANDING_FEES: boolean;
    ACADEMIC_STANDING: string;
    CURRENT_YEAR: number;
    CGPA: number;
    CREDITS_EARNED: number;
    MAJOR_ID: number;
}

export interface TA {
    TA_ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    INSTRUCTOR_ID: number;
}

export interface Teaches {
    COURSE_ID: number;
    INSTRUCTOR_ID: number;
}

export interface Waitlist {
    COURSE_ID: number;
    SECTION_NO: number;
    CAPACITY: number;
    CURRENT_SIZE: number;
}

export interface Waitlisted {
    STUDENT_ID: number;
    COURSE_ID: number;
    SECTION_NO: number;
}

// Union type to represent all possible table schemas
export type TableTypes =
    | Advisor
    | Antireq
    | Completed
    | Course
    | Department
    | Dropped
    | Enrolled
    | Faculty
    | Instructor
    | Lab
    | LabTA
    | Lecture
    | Major
    | Prereq
    | Section
    | Semesters
    | ShoppingCart
    | Student
    | TA
    | Teaches
    | Waitlist
    | Waitlisted;
