# Student Enrollment DBMS - CPS 510 Group 13

This is a **Student Enrollment Database Management System** project built using **Next.js 14** with the **App Router** and **TypeScript**, connected to an **Oracle 12c** database. The application allows users to view, edit, add, and delete records in our 22 tables, while ensuring seamless integration with a previously created database.

## Running the Application Locally
To run the application on your local machine, please follow the following steps:
1. Download the source code submitted under `assignment9-programs` or `assignment9`. This `.zip` file includes the `.env` file that provides credentials to connect to the database.
2. Extract the `.zip` file, and open the folder in your code editor (e.g., Visual Studio Code).
3. Ensure that you have [Node JS](https://nodejs.org/en/download/package-manager) installed on your system.
4. Ensure that your CS VPN is connected (OpenVPN for Windows, Tunnelblick for MacOS) – no Oracle queries can be executed without it
5. In your terminal, run `npm install` in order to install all the node dependencies for the application.
6. After the packages install, run `npm run dev` in your terminal in order to run the application.
7. Visit http://localhost:3000 in order to view the database.