import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteJournalLine,
  fetchJournalLines,
} from "@/features/journal-lines/api/journal-lines";

export const useJournalLines = () =>
  useQuery({
    queryKey: ["journal-lines"],
    queryFn: fetchJournalLines,
  });

// DELETE

export const useDeleteJournalLine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJournalLine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-lines"] });
    },
  });
};
