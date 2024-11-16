# Student Enrollment DBMS

This is a **Student Enrollment Database Management System** project built using **Next.js 14** with the **App Router** and **TypeScript**, connected to an **Oracle 12c** database. The application allows users to view, edit, add, and delete records in our 22 tables, while ensuring seamless integration with a previously created database.

## Table of Contents
1. [File Structure](#file-structure)
2. [How It Works](#how-it-works)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)
6. [License](#license)

---

## File Structure

```plaintext
student-enrollment-dbms/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── get-students/
│   │   │   │   └── route.ts       # API for fetching students
│   │   │   ├── add-student/
│   │   │   │   └── route.ts       # API for adding a student
│   │   │   ├── update-student/
│   │   │   │   └── route.ts       # API for updating a student
│   │   │   ├── delete-student/
│   │   │   │   └── route.ts       # API for deleting a student
|   |   |   ├── ADD THE REST/
│   │   │   │   └── route.ts       # REMAINING API CALLS
│   │   ├── students/
│   │   │   └── page.tsx           # Main page for displaying and interacting with the student table
│   ├── components/
│   │   └── StudentTable.tsx       # Component for rendering the student table
│   ├── lib/
│   │   └── db.ts                  # Database connection logic
├── .env                           # Environment variables for database configuration
├── README.md                      # Documentation for the project
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── next.config.js                 # Next.js configuration
```

## How it Works
This application connects to an **Oracle 12c** database and provides a user-friendly interface for managing the `Student` table. The database and schema were created in previous assignments. 

### Core Features:
- **View Tables**: Displays all records in a selected table.
- **Add Entries**: Allows adding a new entry to any table in the database.
- **Edit Entries**: Enables editing individual records in a table.
- **Delete Entries**: Provides the ability to delete records.

### Integration with Oracle 12c:
- The application uses the `node-oracledb` library to connect to the database.
- Connection credentials and settings are stored in the `.env` file.
- The database operations are performed via API endpoints.

### Networking:
- The application requires `OpenVPN GUI` to be active to connect to the remote Oracle database server.
- Ensure `OpenVPN GUI` is configured and running to execute database queries.

## Prerequisites
1. **Oracle 12c Database**:
   - Database must be set up as per previous assignments with the required schema and tables.
   
2. **OpenVPN**:
   - Must be activated to connect to the remote Oracle server.

3. **Node.js and npm**:
   - Install Node.js (version 18 or above).

4. **Oracle Instant Client** (if using Thick Mode):
   - Install the Oracle Instant Client libraries and configure the `libDir` path in `db.ts`.
   - We are using Thin Mode in this application

## Setup Instructions

To set up and run this project, follow these steps:

1. **Clone the repository:**

```
git clone https://github.com/your-username/student-enrollment-dbms.git 
cd student-enrollment-dbms
```


2. **Install dependencies:**

```
npm install
```

3. **Set up your `.env` file:**

Create a `.env` file in the root directory with the following values:

```
ORACLE_USER=your_username
ORACLE_PASSWORD=your_password 
ORACLE_CONNECTION_STRING=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=<HOSTNAME>)(Port=<PORT>))(CONNECT_DATA=(SID=<SID>)))

NODE_ORACLEDB_DISABLE_OCI_ENCRYPTION=true
```

Replace `your_username`, `your_password`, `HOSTNAME`, `PORT`, and `SID` with your database credentials.

4. **Install the Oracle Instant Client (if required, skipped in our case):**

- Download and install the [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html) for your system.
- Set the `libDir` path in your `db.ts` file to the location of the Instant Client.

5. **Ensure OpenVPN is running:**

- OpenVPN must be active and connected to access the Oracle database. Verify your connection before running the application.

6. **Start the development server:**

```
npm run dev
```

7. **Access the application:**

Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. **View Students:**
- On the main page, view the complete list of students fetched from the database.

2. **Add Students:**
- Use the provided form to add new students to the `Student` table.

3. **Edit Students:**
- Click the "Edit" button on a student row to modify their information.

4. **Delete Students:**
- Click the "Delete" button on a student row to remove them from the table.

~***ADD REMAINING UTILITIES HERE AS THEY ARE IMPLEMENTED...***~

5. **Database Connection:**
- The application uses the Oracle 12c database created in previous assignments and supports all CRUD operations on the `Student` table.
- Ensure your OpenVPN is active for the application to execute database queries properly.

---

## License

This project is licensed under the [GNU V3 License](LICENSE).
