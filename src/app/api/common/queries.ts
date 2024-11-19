/**
 * SQL queries for all 22 tables.
 */

// Advisor queries
export const advisorQueries = {
    selectAll: 'SELECT * FROM Advisor',
    selectById: 'SELECT * FROM Advisor WHERE advisor_id = :advisor_id',
    insert: 'INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (:advisor_id, :first_name, :last_name, :room, :email, :faculty_id)',
    update: 'UPDATE Advisor SET first_name = :first_name, last_name = :last_name, room = :room, email = :email, faculty_id = :faculty_id WHERE advisor_id = :advisor_id',
    delete: 'DELETE FROM Advisor WHERE advisor_id = :advisor_id',
};

// Antireq queries
export const antireqQueries = {
    selectAll: 'SELECT * FROM Antireq',
    insert: 'INSERT INTO Antireq (course_id, antireq_id) VALUES (:course_id, :antireq_id)',
    update: 'UPDATE Antireq SET antireq_id = :antireq_id WHERE course_id = :course_id',
    delete: 'DELETE FROM Antireq WHERE course_id = :course_id AND antireq_id = :antireq_id',
};

// Completed queries
export const completedQueries = {
    selectAll: 'SELECT * FROM Completed',
    insert: 'INSERT INTO Completed (student_id, course_id, gpa) VALUES (:student_id, :course_id, :gpa)',
    update: 'UPDATE Completed SET gpa = :gpa WHERE student_id = :student_id AND course_id = :course_id',
    delete: 'DELETE FROM Completed WHERE student_id = :student_id AND course_id = :course_id',
};

// Course queries
export const courseQueries = {
    selectAll: 'SELECT * FROM Course',
    selectById: 'SELECT * FROM Course WHERE course_id = :course_id',
    insert: 'INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (:course_id, :title, :description, :course_code, :course_no, :weight, :weekly_contact, :department_id)',
    update: 'UPDATE Course SET title = :title, description = :description, course_code = :course_code, course_no = :course_no, weight = :weight, weekly_contact = :weekly_contact, department_id = :department_id WHERE course_id = :course_id',
    delete: 'DELETE FROM Course WHERE course_id = :course_id',
};

// Department queries
export const departmentQueries = {
    selectAll: 'SELECT * FROM Department',
    selectById: 'SELECT * FROM Department WHERE department_id = :department_id',
    insert: 'INSERT INTO Department (department_id, name, email, faculty_id) VALUES (:department_id, :name, :email, :faculty_id)',
    update: 'UPDATE Department SET name = :name, email = :email, faculty_id = :faculty_id WHERE department_id = :department_id',
    delete: 'DELETE FROM Department WHERE department_id = :department_id',
};

// Dropped queries
export const droppedQueries = {
    selectAll: 'SELECT * FROM Dropped',
    insert: 'INSERT INTO Dropped (student_id, course_id) VALUES (:student_id, :course_id)',
    update: 'UPDATE Dropped SET course_id = :course_id WHERE student_id = :student_id',
    delete: 'DELETE FROM Dropped WHERE student_id = :student_id AND course_id = :course_id',
};

// Enrolled queries
export const enrolledQueries = {
    selectAll: 'SELECT * FROM Enrolled',
    insert: 'INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (:student_id, :course_id, :section_no)',
    update: 'UPDATE Enrolled SET section_no = :section_no WHERE student_id = :student_id AND course_id = :course_id',
    delete: 'DELETE FROM Enrolled WHERE student_id = :student_id AND course_id = :course_id AND section_no = :section_no',
};

// Faculty queries
export const facultyQueries = {
    selectAll: 'SELECT * FROM Faculty',
    insert: 'INSERT INTO Faculty (faculty_id, email, name) VALUES (:faculty_id, :email, :name)',
    update: 'UPDATE Faculty SET email = :email, name = :name WHERE faculty_id = :faculty_id',
    delete: 'DELETE FROM Faculty WHERE faculty_id = :faculty_id',
};

// Instructor queries
export const instructorQueries = {
    selectAll: 'SELECT * FROM Instructor',
    selectById: 'SELECT * FROM Instructor WHERE instructor_id = :instructor_id',
    insert: 'INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (:instructor_id, :first_name, :last_name, :email, :specialization, :yearly_course_quota, :department_id)',
    update: 'UPDATE Instructor SET first_name = :first_name, last_name = :last_name, email = :email, specialization = :specialization, yearly_course_quota = :yearly_course_quota, department_id = :department_id WHERE instructor_id = :instructor_id',
    delete: 'DELETE FROM Instructor WHERE instructor_id = :instructor_id',
};

// Lab queries
export const labQueries = {
    selectAll: 'SELECT * FROM Lab',
    insert: 'INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES (:weekday, :start_time, :end_time, :room, :course_id, :section_no)',
    update: 'UPDATE Lab SET end_time = :end_time, room = :room WHERE course_id = :course_id AND section_no = :section_no AND weekday = :weekday AND start_time = :start_time',
    delete: 'DELETE FROM Lab WHERE course_id = :course_id AND section_no = :section_no AND weekday = :weekday AND start_time = :start_time',
};

// LabTA queries
export const labTAQueries = {
    selectAll: 'SELECT * FROM LabTA',
    insert: 'INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (:course_id, :section_no, :ta_id)',
    update: 'UPDATE LabTA SET ta_id = :ta_id WHERE course_id = :course_id AND section_no = :section_no',
    delete: 'DELETE FROM LabTA WHERE course_id = :course_id AND section_no = :section_no AND ta_id = :ta_id',
};

// Lecture queries
export const lectureQueries = {
    selectAll: 'SELECT * FROM Lecture',
    insert: 'INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES (:weekday, :start_time, :end_time, :room, :course_id, :section_no)',
    update: 'UPDATE Lecture SET end_time = :end_time, room = :room WHERE course_id = :course_id AND section_no = :section_no AND weekday = :weekday AND start_time = :start_time',
    delete: 'DELETE FROM Lecture WHERE course_id = :course_id AND section_no = :section_no AND weekday = :weekday AND start_time = :start_time',
};

// Major queries
export const majorQueries = {
    selectAll: 'SELECT * FROM Major',
    insert: 'INSERT INTO Major (major_id, name, department_id) VALUES (:major_id, :name, :department_id)',
    update: 'UPDATE Major SET name = :name, department_id = :department_id WHERE major_id = :major_id',
    delete: 'DELETE FROM Major WHERE major_id = :major_id',
};

// Prereq queries
export const prereqQueries = {
    selectAll: 'SELECT * FROM Prereq',
    insert: 'INSERT INTO Prereq (course_id, prereq_id) VALUES (:course_id, :prereq_id)',
    update: 'UPDATE Prereq SET prereq_id = :prereq_id WHERE course_id = :course_id',
    delete: 'DELETE FROM Prereq WHERE course_id = :course_id AND prereq_id = :prereq_id',
};

// Section queries
export const sectionQueries = {
    selectAll: 'SELECT * FROM Section',
    selectById: 'SELECT * FROM Section WHERE course_id = :course_id AND section_no = :section_no',
    insert: 'INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (:section_no, :capacity, :section_status, :waitlistable, :current_size, :course_id, :instructor_id)',
    update: 'UPDATE Section SET capacity = :capacity, section_status = :section_status, waitlistable = :waitlistable, current_size = :current_size, instructor_id = :instructor_id WHERE course_id = :course_id AND section_no = :section_no',
    delete: 'DELETE FROM Section WHERE course_id = :course_id AND section_no = :section_no',
};

// Semesters queries
export const semestersQueries = {
    selectAll: 'SELECT * FROM Semesters',
    insert: 'INSERT INTO Semesters (course_id, semester_offered) VALUES (:course_id, :semester_offered)',
    update: 'UPDATE Semesters SET semester_offered = :semester_offered WHERE course_id = :course_id',
    delete: 'DELETE FROM Semesters WHERE course_id = :course_id AND semester_offered = :semester_offered',
};

// ShoppingCart queries
export const shoppingCartQueries = {
    selectAll: 'SELECT * FROM ShoppingCart',
    insert: 'INSERT INTO ShoppingCart (student_id, course_id) VALUES (:student_id, :course_id)',
    update: 'UPDATE ShoppingCart SET course_id = :course_id WHERE student_id = :student_id',
    delete: 'DELETE FROM ShoppingCart WHERE student_id = :student_id AND course_id = :course_id',
};

// Student queries
export const studentQueries = {
    selectAll: 'SELECT * FROM Student',
    selectById: 'SELECT * FROM Student WHERE student_id = :student_id',
    insert: 'INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (:student_id, :first_name, :last_name, :email, :outstanding_fees, :academic_standing, :current_year, :cgpa, :credits_earned, :major_id)',
    update: 'UPDATE Student SET first_name = :first_name, last_name = :last_name, email = :email, outstanding_fees = :outstanding_fees, academic_standing = :academic_standing, current_year = :current_year, cgpa = :cgpa, credits_earned = :credits_earned, major_id = :major_id WHERE student_id = :student_id',
    delete: 'DELETE FROM Student WHERE student_id = :student_id',
};

// TA queries
export const taQueries = {
    selectAll: 'SELECT * FROM TA',
    insert: 'INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (:ta_id, :first_name, :last_name, :email, :instructor_id)',
    update: 'UPDATE TA SET first_name = :first_name, last_name = :last_name, email = :email, instructor_id = :instructor_id WHERE ta_id = :ta_id',
    delete: 'DELETE FROM TA WHERE ta_id = :ta_id',
};

// Teaches queries
export const teachesQueries = {
    selectAll: 'SELECT * FROM Teaches',
    insert: 'INSERT INTO Teaches (course_id, instructor_id) VALUES (:course_id, :instructor_id)',
    update: 'UPDATE Teaches SET instructor_id = :instructor_id WHERE course_id = :course_id',
    delete: 'DELETE FROM Teaches WHERE course_id = :course_id AND instructor_id = :instructor_id',
};

// Waitlist queries
export const waitlistQueries = {
    selectAll: 'SELECT * FROM Waitlist',
    insert: 'INSERT INTO Waitlist (course_id, section_no, capacity, current_size) VALUES (:course_id, :section_no, :capacity, :current_size)',
    update: 'UPDATE Waitlist SET capacity = :capacity, current_size = :current_size WHERE course_id = :course_id AND section_no = :section_no',
    delete: 'DELETE FROM Waitlist WHERE course_id = :course_id AND section_no = :section_no',
};

// Waitlisted queries
export const waitlistedQueries = {
    selectAll: 'SELECT * FROM Waitlisted',
    insert: 'INSERT INTO Waitlisted (student_id, course_id, section_no) VALUES (:student_id, :course_id, :section_no)',
    update : 'UPDATE Waitlisted SET course_id = :course_id, section_no = :section_no WHERE student_id = :student_id',
    delete: 'DELETE FROM Waitlisted WHERE student_id = :student_id AND course_id = :course_id AND section_no = :section_no',
};

// Export all queries grouped by table
export const queries = {
    Advisor: advisorQueries,
    Antireq: antireqQueries,
    Completed: completedQueries,
    Course: courseQueries,
    Department: departmentQueries,
    Dropped: droppedQueries,
    Enrolled: enrolledQueries,
    Faculty: facultyQueries,
    Instructor: instructorQueries,
    Lab: labQueries,
    LabTA: labTAQueries,
    Lecture: lectureQueries,
    Major: majorQueries,
    Prereq: prereqQueries,
    Section: sectionQueries,
    Semesters: semestersQueries,
    ShoppingCart: shoppingCartQueries,
    Student: studentQueries,
    TA: taQueries,
    Teaches: teachesQueries,
    Waitlist: waitlistQueries,
    Waitlisted: waitlistedQueries,
};
