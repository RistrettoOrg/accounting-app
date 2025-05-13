import JournalEntriesTable from "@/features/journal-entries/components/journal-entries-table";

export default function JournalEntriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Asientos Contables
        </h1>
        <p className="text-muted-foreground">
          Gestiona los asientos contables de tu empresa
        </p>
      </div>

      <JournalEntriesTable />
    </div>
  );
}
