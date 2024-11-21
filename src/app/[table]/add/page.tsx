// Authors: CPS 510 Group 13
// Member 1: Mo Nakouzi
// Member 2: Prachi Patel
// Member 3: Mark Paul

"use client";
import AddRowForm from "../_components/AddRowForm";
import { useParams } from "next/navigation";

export default function AddRowPage() {
    const params = useParams();
    const table = params.table as string;

    return <AddRowForm table={table} />;
}
