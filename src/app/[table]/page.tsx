import { notFound } from 'next/navigation';
import TableView from './_components/TableView';

// List of valid table names
const validTables = [
    'advisor',
    'antireq',
    'completed',
    'course',
    'department',
    'dropped',
    'enrolled',
    'faculty',
    'instructor',
    'lab',
    'labta',
    'lecture',
    'major',
    'prereq',
    'section',
    'semesters',
    'shoppingcart',
    'student',
    'ta',
    'teaches',
    'waitlist',
    'waitlisted',
];

interface PageProps {
    params: Promise<{ table: string }>;
}

export default async function TablePage(props: PageProps) {
    const params = await props.params;
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
