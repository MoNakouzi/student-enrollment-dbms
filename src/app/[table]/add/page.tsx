import AddRowForm from "../_components/AddRowForm";

interface AddRowPageProps {
    params: { table: string };
    searchParams: { columns: string };
}

export default function AddRowPage({ params, searchParams }: AddRowPageProps) {
    const { table } = params;
    const columnNames = searchParams.columns.split(",");

    return <AddRowForm table={table} columnNames={columnNames} />;
}
