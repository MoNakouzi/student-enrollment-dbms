import { NextResponse } from 'next/server';
import { getOracleConnection } from '@/lib/db';

const populateTableQueries: string[] = [
    // Populate Faculty Table
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (1, 'arts@torontomu.ca', 'Faculty of Arts')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (2, 'fcs@torontomu.ca', 'Faculty of Community Services')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (3, 'eng@torontomu.ca', 'Faculty of Engineering and Architecture')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (4, 'law@torontomu.ca', 'Faculty of Lincoln Alexander School of Law')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (5, 'sci@torontomu.ca', 'Faculty of Science')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (6, 'trsm@torontomu.ca', 'Faculty of Ted Rogers School of Management')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (7, 'creative@torontomu.ca', 'Faculty of the Creative School')`,
    `INSERT INTO Faculty (faculty_id, email, name) VALUES (8, 'grad@torontomu.ca', 'Faculty of Yeates School of Graduate and Postdoctoral Studies')`,
    
    // Populate Advisor Table
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (1, 'Glorpus', 'Hardrock', 'RCC314', 'ghardrock@torontomu.ca', 1)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (2, 'Tim', 'Black', 'ENG402', 'tblack@torontomu.ca', 4)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (3, 'Caleb', 'Green', 'RCC208', 'cgreen@torontomu.ca', 2)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (4, 'Jacob', 'Malf', 'ENG316', 'jmalf@torontomu.ca', 5)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (5, 'Mark', 'Potter', 'VIC723', 'mpotter@torontomu.ca', 7)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (6, 'Nathan', 'Square', 'KHE104', 'nsquare@torontomu.ca', 5)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (7, 'Paul', 'Chan', 'KHW064', 'pchan@torontomu.ca', 3)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (8, 'Qinshi', 'White', 'TRS134', 'qwhite@torontomu.ca', 6)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (9, 'Huang', 'Pers', 'TRS304', 'hpers@torontomu.ca', 6)`,
    `INSERT INTO Advisor (advisor_id, first_name, last_name, room, email, faculty_id) VALUES (10, 'Kim', 'Kardashian', 'VIC345', 'kk123@torontomu.ca', 8)`,
    
    // Populate Department Table
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (1, 'Department of Chemistry and Biology', 'chembio@torontomu.ca', 5)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (2, 'Department of Computer Science', 'cs@torontomu.ca', 5)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (3, 'Department of Mathematics', 'math@torontomu.ca', 5)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (4, 'Department of Physics', 'physics@torontomu.ca', 5)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (5, 'Department of Criminology', 'criminology@torontomu.ca', 1)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (6, 'Department of Economics', 'economics@torontomu.ca', 6)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (7, 'Department of Language, Literatures and Cultures', 'english@torontomu.ca', 3)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (8, 'Department of Geography and Environmental Studies', 'geography@torontomu.ca', 1)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (9, 'Department of History', 'history@torontomu.ca', 1)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (10, 'Department of Information Technology Management', 'itm@torontomu.ca', 6)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (11, 'Department of Business Management', 'business@torontomu.ca', 6)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (12, 'Department of Accounting and Finance', 'finance@torontomu.ca', 6)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (13, 'Department of Psychology', 'psychology@torontomu.ca', 1)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (14, 'Department of Philosophy', 'philosophy@torontomu.ca', 1)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (15, 'Department of Nursing', 'nursing@torontomu.ca', 2)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (16, 'Department of Theatre and Film', 'theatre@torontomu.ca', 7)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (17, 'Department of Fashion', 'fashion@torontomu.ca', 7)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (18, 'Department of Creative School', 'creativedep@torontomu.ca', 7)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (19, 'Department of Law', 'lawdep@torontomu.ca', 4)`,
    `INSERT INTO Department (department_id, name, email, faculty_id) VALUES (20, 'Department of Masters of Science', 'msc@torontomu.ca', 8)`,
    
   // Populate Major Table
    `INSERT INTO Major (major_id, name, department_id) VALUES (1, 'Biology', 1)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (2, 'Biomedical Sciences', 1)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (3, 'Chemistry', 1)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (4, 'Computer Science', 2)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (5, 'Financial Mathematics', 3)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (6, 'Mathematics and its Applications', 3)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (7, 'Medical Physics', 4)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (8, 'Accounting and Finance', 12)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (9, 'Business Technology Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (10, 'Economics and Management Science', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (11, 'Entrepreneurship', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (12, 'Global Management Studies', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (13, 'Health Services Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (14, 'Hospitality and Tourism Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (15, 'Human Resources Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (16, 'Law and Business', 19)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (17, 'Marketing Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (18, 'Real Estate Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (19, 'Retail Management', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (20, 'Arts and Contemporary Studies', 18)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (21, 'Criminology', 18)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (22, 'English', 7)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (23, 'Environment and Urban Sustainability', 14)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (24, 'Geographic Analysis', 8)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (25, 'History', 9)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (26, 'International Economics and Finance', 11)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (27, 'Language and Intercultural Relations', 7)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (28, 'Philosophy', 14)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (29, 'Politics and Governance', 14)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (30, 'Psychology', 13)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (31, 'Sociology', 13)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (32, 'Undeclared Arts', 18)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (33, 'Fashion', 17)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (34, 'Child and Youth Care', 15)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (35, 'Early Childhood Studies', 15)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (36, 'Midwifery', 15)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (37, 'Nursing', 15)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (38, 'Nutrition and Food', 18)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (39, 'Social Work', 15)`,
    `INSERT INTO Major (major_id, name, department_id) VALUES (40, 'Urban and Regional Planning', 8)`,

    
    // Populate Instructor Table
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (100, 'Tobias', 'Harris', 'tobias.harris@torontomu.ca', 'Kinesiology', 20, 1)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (101, 'Mo', 'Jaan', 'mo.jaan@torontomu.ca', 'Chemistry', 15, 1)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (102, 'Mark', 'Diaz', 'mark.diaz@torontomu.ca', 'Math', 15, 3)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (103, 'Chang', 'Ping', 'changping@torontomu.ca', 'Communications', 15, 13)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (104, 'Tim', 'Jim', 'tim.jim@torontomu.ca', 'Aerospace Engineering', 20, 4)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (105, 'Slim', 'Shady', 'slim.shady@torontomu.ca', 'Media Production', 10, 16)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (106, 'Huh', 'Yunjin', 'huhyunjin@torontomu.ca', 'Music', 10, 18)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (107, 'Minatozaki', 'Sana', 'minatosana@torontomu.ca', 'Music', 10, 18)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (108, 'DeeJay', 'Atomika', 'djatomika@torontomu.ca', 'Game Development', 30, 18)`,
    `INSERT INTO Instructor (instructor_id, first_name, last_name, email, specialization, yearly_course_quota, department_id) VALUES (109, 'Gabby', 'Jabby', 'gabbyjabby@torontomu.ca', 'Nutrition', 30, 1)`,
    
    // Populate TA Table
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (1, 'Kosh', 'Gupta', 'koshgupta@torontomu.ca', 100)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (2, 'Hamoodi', 'Resta', 'hamoodir@torontomu.ca', 100)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (3, 'Prachi', 'Patel', 'ppatel@torontomu.ca', 102)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (4, 'Fly', 'King', 'flyking@@torontomu.ca', 101)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (5, 'Paul', 'Paul', 'pp@torontomu.ca', 106)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (6, 'Billie', 'Jean', 'billiejean@torontomu.ca', 108)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (7, 'Sheel', 'Singh', 'ss@torontomu.ca', 103)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (8, 'Ava', 'Tyson', 'avatyson@torontomu.ca', 104)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (9, 'Vivian', 'Lu', 'vlu@torontomu.ca', 107)`,
    `INSERT INTO TA (ta_id, first_name, last_name, email, instructor_id) VALUES (10, 'Tracy', 'Zhang', 'tzhang@torontomu.ca', 107)`,

    // Populate Student Table
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501176210, 'Betty', 'White', 'bwhite@torontomu.ca', 0, 'clear', 4, 4.33, 40, 22)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501175381, 'Sam', 'Sham', 'ssham@torontomu.ca', 0, 'clear', 3, 3.50, 34, 11)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501174294, 'Robert', 'Bryson', 'rbryson@torontomu.ca', 1, 'clear', 2, 3.10, 25, 4)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501157223, 'Chin', 'Chin', 'cchin@torontomu.ca', 1, 'probation', 1, 1.76, 7, 4)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501175820, 'Adam', 'Ant', 'aant@torontomu.ca', 0, 'clear', 5, 4.30, 45, 12)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501176610, 'Dua', 'Lipa', 'dlipa@torontomu.ca', 0, 'clear', 1, 3.50, 12, 33)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501172910, 'Tim', 'Cook', 'tcook@torontomu.ca', 1, 'probation', 3, 2.10, 30, 38)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501174829, 'James', 'Spaget', 'jspaget@torontomu.ca', 0, 'clear', 2, 3.21, 25, 37)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501194251, 'Chin', 'Chin', 'bbobby@torontomu.ca', 0, 'probation', 4, 1.32, 30, 1)`,
    `INSERT INTO Student (student_id, first_name, last_name, email, outstanding_fees, academic_standing, current_year, cgpa, credits_earned, major_id) VALUES (501192310, 'Spigot', 'Spiney', 'sspiney@torontomu.ca', 0, 'clear', 1, 3.44, 10, 3)`,

    // Populate Course Table
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2000, 'Computer Science I', 'You do Python and Java and stuff', 'CPS', '109', 1.0, 'Lecture: 3 hour(s), Lab: 2 hour(s)', 2)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2001, 'Computer Science II', 'You do mostly Java and stuff', 'CPS', '209', 1.0, 'Lecture: 3 hour(s), Lab: 1 hour(s)', 2)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2002, 'Linear Algebra', 'Learn about algebra that’s not linear', 'MTH', '153', 1.0, 'Lecture: 3 hour(s), Lab: 1 hour(s)', 3)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2004, 'Intro to Arabic', 'Learn to talk to your middle eastern friends', 'ARB', '312', 1.0, 'Lecture: 2 hour(s), Lab: 0 hour(s)', 7)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2005, 'Intro to Chinese', 'Learn to talk to Nicole', 'CHN', '534', 1.0, 'Lecture: 3 hour(s), Lab: 0 hour(s)', 7)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2006, 'Film and Media', 'Learn about film and media', 'RTA', '132', 1.0, 'Lecture: 4 hour(s), Lab: 0 hour(s)', 16)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2007, 'Intro to Computer Vision', 'Learn to see with computers', 'CPS', '351', 1.0, 'Lecture: 2 hour(s), Lab: 0 hour(s)', 2)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2008, 'Intro to Rizzology', 'Learn to Rizz', 'RIZ', '234', 1.0, 'Lecture: 3 hour(s), Lab: 1 hour(s)', 20)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2009, 'Brain Rot Studies I', 'Learn about brain rot', 'BRS', '583', 1.0, 'Lecture: 3 hour(s), Lab: 2 hour(s)', 14)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2010, 'Chinese Cuisine I', 'Learn to make Chinese food', 'CHN', '342', 1.0, 'Lecture: 5 hour(s)', 18)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2011, 'Artificial Intelligence I', 'Introduction to Artificial Intelligence', 'CPS', '721', 1.0, 'Lecture: 3 hour(s), Lab: 1 hour(s)', 2)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2012, 'Database Systems I', 'Introduction to database systems', 'CPS', '510', 1.0, 'Lecture: 3 hour(s), Lab: 1 hour(s)', 2)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2013, 'Computer Security', 'Introduction to Computer Security', 'CPS', '633', 1.0, 'Lecture: 3 hour(s), Lab: 1 hour(s)', 2)`,
    `INSERT INTO Course (course_id, title, description, course_code, course_no, weight, weekly_contact, department_id) VALUES (2014, 'Alternative Energies', 'Research fuels', 'CCHY', '583', 1.0, 'Lecture: 3 hour(s), Lab: 0 hour(s)', 1)`,

    // Populate Semesters Table
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2000, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2001, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2002, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2004, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2005, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2006, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2007, 'fall')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2007, 'spring')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2008, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2009, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2010, 'None')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2011, 'fall')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2011, 'winter')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2012, 'fall')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2013, 'fall')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2013, 'winter')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2014, 'fall')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2014, 'winter')`,
    `INSERT INTO Semesters (course_id, semester_offered) VALUES (2014, 'summer')`,

    // Populate ShoppingCart Table
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501157223, 2008)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501157223, 2009)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501157223, 2010)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501157223, 2011)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501176610, 2008)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501194251, 2008)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501194251, 2013)`,
    `INSERT INTO ShoppingCart (student_id, course_id) VALUES (501194251, 2012)`,

    // Populate Teaches Table
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2005, 105)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2011, 100)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2012, 102)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2013, 101)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2007, 106)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2001, 108)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2000, 103)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2014, 104)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2009, 107)`,
    `INSERT INTO Teaches (course_id, instructor_id) VALUES (2011, 105)`,

    // Populate Prereq Table
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2011, 2000)`,
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2011, 2001)`,
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2012, 2000)`,
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2012, 2001)`,
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2013, 2000)`,
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2013, 2001)`,
    `INSERT INTO Prereq (course_id, prereq_id) VALUES (2013, 2002)`,

    // Populate Antireq Table
    `INSERT INTO Antireq (course_id, antireq_id) VALUES (2011, 2009)`,
    `INSERT INTO Antireq (course_id, antireq_id) VALUES (2009, 2011)`,
    `INSERT INTO Antireq (course_id, antireq_id) VALUES (2013, 2004)`,
    `INSERT INTO Antireq (course_id, antireq_id) VALUES (2013, 2005)`,
    `INSERT INTO Antireq (course_id, antireq_id) VALUES (2004, 2013)`,
    `INSERT INTO Antireq (course_id, antireq_id) VALUES (2005, 2013)`,

    // Populate Section Table
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (1, 250, 'closed', 0, 250, 2011, 100)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (2, 250, 'open', 1, 200, 2011, 100)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (3, 250, 'open', 1, 214, 2011, 100)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (1, 100, 'closed', 0, 100, 2012, 102)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (2, 100, 'open', 1, 75, 2012, 102)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (1, 50, 'open', 1, 43, 2013, 101)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (1, 55, 'waitlistable', 1, 55, 2014, 104)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (2, 55, 'waitlistable', 1, 55, 2014, 104)`,
    `INSERT INTO Section (section_no, capacity, section_status, waitlistable, current_size, course_id, instructor_id) VALUES (1, 150, 'closed', 0, 150, 2007, 106)`,

    // Populate Enrolled Table
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501172910, 2011, 1)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501172910, 2013, 1)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501176610, 2011, 2)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501176610, 2012, 1)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501176610, 2013, 1)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501157223, 2011, 3)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501157223, 2012, 2)`,
    `INSERT INTO Enrolled (student_id, course_id, section_no) VALUES (501157223, 2013, 1)`,

    // Populate Waitlisted Table
    `INSERT INTO Waitlisted (student_id, course_id, section_no) VALUES (501176210, 2014, 2)`,
    `INSERT INTO Waitlisted (student_id, course_id, section_no) VALUES (501175381, 2014, 1)`,
    `INSERT INTO Waitlisted (student_id, course_id, section_no) VALUES (501176610, 2014, 2)`,

    // Populate Completed Table
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501172910, 2000, 3.75)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501172910, 2001, 4.00)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501172910, 2002, 1.00)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501176610, 2000, 3.00)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501176610, 2001, 4.33)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501176610, 2002, 4.00)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501157223, 2000, 3.67)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501157223, 2001, 2.33)`,
    `INSERT INTO Completed (student_id, course_id, gpa) VALUES (501157223, 2002, 3.67)`,

    // Populate Dropped Table
    `INSERT INTO Dropped (student_id, course_id) VALUES (501157223, 2014)`,
    `INSERT INTO Dropped (student_id, course_id) VALUES (501172910, 2010)`,
    `INSERT INTO Dropped (student_id, course_id) VALUES (501172910, 2007)`,
    `INSERT INTO Dropped (student_id, course_id) VALUES (501172910, 2004)`,

    // Populate Lecture Table
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Tuesday', TIMESTAMP '2024-09-03 15:00:00', TIMESTAMP '2024-09-03 17:00:00', 'ENG103', 2013, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Wednesday', TIMESTAMP '2024-09-04 16:00:00', TIMESTAMP '2024-09-04 17:00:00', 'DSQ12', 2013, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Monday', TIMESTAMP '2024-09-09 15:00:00', TIMESTAMP '2024-09-09 17:00:00', 'DSQ05', 2011, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Thursday', TIMESTAMP '2024-09-05 15:00:00', TIMESTAMP '2024-09-05 16:00:00', 'DSQ07', 2011, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Monday', TIMESTAMP '2024-09-09 11:00:00', TIMESTAMP '2024-09-09 13:00:00', 'EPH301', 2011, 2)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Wednesday', TIMESTAMP '2024-09-04 12:00:00', TIMESTAMP '2024-09-04 13:00:00', 'LIB073', 2011, 2)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Friday', TIMESTAMP '2024-09-06 12:00:00', TIMESTAMP '2024-09-06 14:00:00', 'DCC204', 2011, 3)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Thursday', TIMESTAMP '2024-09-05 10:00:00', TIMESTAMP '2024-09-05 11:00:00', 'DCC208', 2011, 3)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Wednesday', TIMESTAMP '2024-09-04 10:00:00', TIMESTAMP '2024-09-04 12:00:00', 'ENG201', 2012, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Friday', TIMESTAMP '2024-09-06 11:00:00', TIMESTAMP '2024-09-06 12:00:00', 'KHE224', 2012, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Wednesday', TIMESTAMP '2024-09-04 13:00:00', TIMESTAMP '2024-09-04 15:00:00', 'DSQ03', 2012, 2)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Friday', TIMESTAMP '2024-09-06 09:00:00', TIMESTAMP '2024-09-06 10:00:00', 'DSQ06', 2012, 2)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Tuesday', TIMESTAMP '2024-09-03 18:00:00', TIMESTAMP '2024-09-03 21:00:00', 'DSQ12', 2014, 1)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Monday', TIMESTAMP '2024-09-09 18:00:00', TIMESTAMP '2024-09-09 19:00:00', 'TRSM1071', 2014, 2)`,
    `INSERT INTO Lecture (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Monday', TIMESTAMP '2024-09-09 15:00:00', TIMESTAMP '2024-09-09 18:00:00', 'DSQ14', 2007, 1)`,

    // Populate Lab Table
    `INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Thursday', TIMESTAMP '2024-09-12 11:00:00', TIMESTAMP '2024-09-12 12:00:00', 'ENG201', 2011, 1)`,
    `INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Wednesday', TIMESTAMP '2024-09-11 15:00:00', TIMESTAMP '2024-09-11 16:00:00', 'ENG202', 2011, 2)`,
    `INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Thursday', TIMESTAMP '2024-09-12 15:00:00', TIMESTAMP '2024-09-12 16:00:00', 'ENG201', 2011, 3)`,
    `INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Thursday', TIMESTAMP '2024-09-12 17:00:00', TIMESTAMP '2024-09-12 18:00:00', 'ENG202', 2012, 1)`,
    `INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Monday', TIMESTAMP '2024-09-09 15:00:00', TIMESTAMP '2024-09-09 16:00:00', 'ENG202', 2012, 2)`,
    `INSERT INTO Lab (weekday, start_time, end_time, room, course_id, section_no) VALUES ('Tuesday', TIMESTAMP '2024-09-10 10:00:00', TIMESTAMP '2024-09-10 11:00:00', 'ENG203', 2013, 1)`,

    // Populate LabTA Table
    `INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (2011, 1, 3)`,
    `INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (2011, 2, 6)`,
    `INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (2011, 3, 7)`,
    `INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (2012, 1, 1)`,
    `INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (2012, 2, 9)`,
    `INSERT INTO LabTA (course_id, section_no, ta_id) VALUES (2013, 1, 4)`,

    // Populate Waitlist Table
    `INSERT INTO Waitlist (capacity, current_size, course_id, section_no) VALUES (20, 5, 2014, 1)`,
    `INSERT INTO Waitlist (capacity, current_size, course_id, section_no) VALUES (20, 8, 2014, 2)`
];

export async function POST() {
    const connection = await getOracleConnection();
    const insertedData: string[] = [];
    const errors: { query: string; error: any }[] = [];

    try {
        for (const query of populateTableQueries) {
            try {
                await connection.execute(query, {}, { autoCommit: true });
                insertedData.push(query);
            } catch (error) {
                console.error(`Error executing query: ${query}`, error);
                errors.push({ query, error });
            }
        }
    } finally {
        await connection.close();
    }

    return NextResponse.json({
        success: true,
        message: 'Table population process completed.',
        insertedData,
        errors,
    });
}
