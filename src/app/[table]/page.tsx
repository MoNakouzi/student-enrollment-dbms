import { notFound } from 'next/navigation';
import TableView from './_components/TableView';

// List of valid table names
const validTables = [
    'Advisor',
    'Antireq',
    'Completed',
    'Course',
    'Department',
    'Dropped',
    'Enrolled',
    'Faculty',
    'Instructor',
    'Lab',
    'LabTA',
    'Lecture',
    'Major',
    'Prereq',
    'Section',
    'Semesters',
    'ShoppingCart',
    'Student',
    'TA',
    'Teaches',
    'Waitlist',
    'Waitlisted',
];

interface PageProps {
    params: { table: string };
}

export default async function TablePage({ params }: PageProps) {
    const { table } = params;

    // Validate the table name
    if (!validTables.includes(table)) {
        notFound(); // Trigger a 404 if the table is invalid
    }

    // Pass the table name to the TableView component
    return (
        <div className="p-4">
            <TableView table={table} />
        </div>
    );
}
