// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

interface Student {
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

interface Props {
    students: Student[];
}

export default function StudentTable({ students }: Props) {
    if (students.length === 0) {
        return <p>No students found.</p>;
    }

    return (
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead>
                <tr className="bg-gray-200 text-gray-700">
                    <th className="border-r border-b border-gray-400 px-4 py-2">Student ID</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">First Name</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">Last Name</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">Email</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">Outstanding Fees</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">Academic Standing</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">Current Year</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">CGPA</th>
                    <th className="border-r border-b border-gray-400 px-4 py-2">Credits Earned</th>
                    <th className="border-b border-gray-400 px-4 py-2">Major ID</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.STUDENT_ID} className="odd:bg-gray-50 even:bg-white">
                        <td className="border px-4 py-2 text-gray-800">{student.STUDENT_ID}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.FIRST_NAME}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.LAST_NAME}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.EMAIL}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.OUTSTANDING_FEES ? 'Yes' : 'No'}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.ACADEMIC_STANDING.toUpperCase()}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.CURRENT_YEAR}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.CGPA.toFixed(2)}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.CREDITS_EARNED.toFixed(2)}</td>
                        <td className="border px-4 py-2 text-gray-800">{student.MAJOR_ID}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
