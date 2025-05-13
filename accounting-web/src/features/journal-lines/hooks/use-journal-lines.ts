import { useUserSession } from "@/shared/hooks/use-session";
import { Envs } from "@/shared/lib/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API = `${Envs.API_URL}/api/journal-lines`;

// DELETE
export const useDeleteJournalLine = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserSession.getState();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const res = await fetch(`${API}/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!res.ok) throw new Error("Error al eliminar cuenta");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
    },
  });
};
