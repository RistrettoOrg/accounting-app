import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { JOURNAL_ENTRIES_ROUTES } from "@/features/journal-entries/lib/utils";

export default function JournalEntriesTableHeader() {
  const navigate = useNavigate();

  const handleClickAddJournalEntry = () => {
    navigate(JOURNAL_ENTRIES_ROUTES.NEW);
  };
  return (
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>Asientos Contables</CardTitle>
        <CardDescription>
          Registro de todos los asientos contables
        </CardDescription>
      </div>
      <Button className="ml-auto gap-1" onClick={handleClickAddJournalEntry}>
        <Plus className="h-4 w-4" />
        Nuevo Asiento
      </Button>
    </CardHeader>
  );
}
