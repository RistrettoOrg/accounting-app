import { Button } from "@/components/ui/button";
import { JournalEntryForm } from "@/features/journal-entries/components/journal-entry-form";
import { useNewJournalEntry } from "@/features/journal-entries/hooks/use-journal-entries";
import {
  extractJournalEntryData,
  NEW_JOURNAL_ENTRY_MESSAGES,
  validateJournalEntryData,
  type JournalEntryFormData,
} from "@/features/journal-entries/lib/utils";
import { ROUTES } from "@/shared/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

export default function NewJournalEntryPage() {
  const navigate = useNavigate();
  const newJournalEntry = useNewJournalEntry();
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof JournalEntryFormData, string[]>>
  >({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const journalEntryData = extractJournalEntryData(formData);
    const validation = validateJournalEntryData(journalEntryData);

    if (!validation.success) {
      setFormErrors(validation.error.flatten().fieldErrors);
      return;
    } else {
      setFormErrors({});
    }

    newJournalEntry.mutate(journalEntryData, {
      onSuccess: () => {
        toast.success(NEW_JOURNAL_ENTRY_MESSAGES.SUCCESS);
        navigate(ROUTES.JOURNAL_ENTRIES);
      },
      onError: (error) => {
        console.log(error);
        toast.error(NEW_JOURNAL_ENTRY_MESSAGES.ERROR, {
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <NavLink to={ROUTES.JOURNAL_ENTRIES}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </NavLink>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Nuevo asiento contable
          </h1>
          <p className="text-muted-foreground">
            Crea un nuevo asiento contable
          </p>
        </div>
      </div>
      <JournalEntryForm formErrors={formErrors} handleSubmit={handleSubmit} />
    </div>
  );
}
