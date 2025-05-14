import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchJournalEntries,
  fetchJournalEntryById,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from "@/features/journal-entries/api/journal-entries";

export const useJournalEntries = () =>
  useQuery({
    queryKey: ["journal-entries"],
    queryFn: fetchJournalEntries,
  });

export const useJournalEntryById = (documentId: string) =>
  useQuery({
    queryKey: ["journal-entry", documentId],
    queryFn: () => fetchJournalEntryById(documentId),
  });

export const useNewJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
    },
  });
};

export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      queryClient.invalidateQueries({ queryKey: ["journal-entry"] });
    },
  });
};

export const useDeleteJournalEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
    },
  });
};
