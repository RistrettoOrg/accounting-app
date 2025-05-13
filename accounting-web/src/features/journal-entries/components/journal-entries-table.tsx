import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useJournalEntries } from "../hooks/use-journal-entries";
import JournalEntryCell from "./journal-entry-cell";
import JournalEntriesTableHeader from "./journal-entries-table-header";

export default function JournalEntriesTable() {
  const { data: journalEntries, isLoading } = useJournalEntries();

  return (
    <Card>
      <JournalEntriesTableHeader />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {journalEntries?.map((journalEntry) => (
              <JournalEntryCell
                journalEntry={journalEntry}
                key={journalEntry.documentId}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
