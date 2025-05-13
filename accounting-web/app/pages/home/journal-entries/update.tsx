import { Button } from "@/components/ui/button";
import { JournalEntryForm } from "@/features/journal-entries/components/journal-entry-form";
import { ROUTES } from "@/shared/lib/utils";
import { ArrowLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import type { Route } from "../+types";
import {
  useJournalEntryById,
  useUpdateJournalEntry,
} from "@/features/journal-entries/hooks/use-journal-entries";
import JournalEntryFormSkeleton from "@/features/journal-entries/components/journal-entry-form-skeleton";
import JournalEntryNotFound from "@/features/journal-entries/components/journal-entry-not-found";
import { toast } from "sonner";
import { useState } from "react";
import {
  extractJournalEntryData,
  journalEntrySchema,
  UPDATE_JOURNAL_ENTRY_MESSAGES,
  validateJournalEntryData,
  type JournalEntryFormData,
} from "@/features/journal-entries/lib/utils";
import type { JournalLine } from "@/features/journal-lines/types/journal-line";

export async function loader({ params }: Route.LoaderArgs) {
  let documentId = params.documentId ? params.documentId : null;
  return { documentId };
}

export default function UpdateJournalEntryPage({
  loaderData,
}: {
  loaderData: { documentId: string };
}) {
  const { documentId } = loaderData;
  const { data: journalEntry, isLoading: isLoadingJournalEntry } =
    useJournalEntryById(documentId);

  const navigate = useNavigate();
  const updateJournalEntry = useUpdateJournalEntry();
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

    console.log("documentId", journalEntryData.documentId);
    updateJournalEntry.mutate(
      {
        documentId: journalEntryData.documentId ?? "",
        journalEntry: journalEntryData,
      },
      {
        onSuccess: () => {
          toast.success(UPDATE_JOURNAL_ENTRY_MESSAGES.SUCCESS);
          navigate(ROUTES.JOURNAL_ENTRIES);
        },
        onError: (error) => {
          console.log(error);
          toast.error(UPDATE_JOURNAL_ENTRY_MESSAGES.ERROR, {
            description: error.message,
          });
        },
      }
    );
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
          <h1 className="text-3xl font-bold tracking-tight">Editar Cuenta</h1>
          <p className="text-muted-foreground">Editar la cuenta contable</p>
        </div>
      </div>

      {isLoadingJournalEntry ? (
        <JournalEntryFormSkeleton />
      ) : !journalEntry ? (
        <JournalEntryNotFound />
      ) : (
        <JournalEntryForm
          journalEntry={journalEntry}
          formErrors={formErrors}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
