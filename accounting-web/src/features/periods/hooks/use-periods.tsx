import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPeriod,
  deletePeriod,
  fetchPeriodById,
  fetchPeriods,
  updatePeriod,
} from "@/features/periods/api/periods";

export const usePeriods = () =>
  useQuery({
    queryKey: ["periods"],
    queryFn: fetchPeriods,
  });

export const usePeriodById = (documentId: string) =>
  useQuery({
    queryKey: ["period", documentId],
    queryFn: () => fetchPeriodById(documentId),
  });

export const useNewPeriod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPeriod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["periods"] });
    },
  });
};

export const useUpdatePeriod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePeriod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["periods"] });
      queryClient.invalidateQueries({ queryKey: ["period"] });
    },
  });
};

export const useDeletePeriod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePeriod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["periods"] });
    },
  });
};
