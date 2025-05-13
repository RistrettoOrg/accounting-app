import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DELETE_JOURNAL_ENTRY_MESSAGES } from "@/features/journal-entries/lib/utils";
import { useDeleteJournalEntry } from "@/features/journal-entries/hooks/use-journal-entries";
import { type JournalEntry } from "@/features/journal-entries/types/journal-entry";

export default function JournalEntryCell({
  journalEntry,
}: {
  journalEntry: JournalEntry;
}) {
  const navigate = useNavigate();
  const deleteJournalEntry = useDeleteJournalEntry();

  const handleDelete = (accountId: string) => {
    deleteJournalEntry.mutate(accountId, {
      onSuccess: () => {
        toast.success(DELETE_JOURNAL_ENTRY_MESSAGES.SUCCESS);
      },
      onError: (error) => {
        toast.error(DELETE_JOURNAL_ENTRY_MESSAGES.ERROR);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{journalEntry.number}</TableCell>
        <TableCell>{journalEntry.date}</TableCell>
        <TableCell>{journalEntry.description}</TableCell>
        <TableCell>${journalEntry.amount}</TableCell>
        <TableCell>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
            {journalEntry.entry_status}
          </span>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                navigate(`/home/journal-entries/${journalEntry.documentId}`)
              }
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (journalEntry.documentId) {
                  handleDelete(journalEntry.documentId);
                } else {
                  toast.error("El ID del documento no está definido");
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
