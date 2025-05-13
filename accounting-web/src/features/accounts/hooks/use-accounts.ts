import { Envs } from "@/shared/lib/env";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Account } from "@/features/accounts/types/account";
import { useUserSession } from "@/shared/hooks/use-session";

const API = `${Envs.API_URL}/api/accounts`;

// GET
export const useAccounts = () => {
  const { jwt } = useUserSession.getState();
  return useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await fetch(`${API}?populate=*`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener cuentas");
      const json = await res.json();
      return json.data; // Strapi v4 API
    },
  });
};

// GET by ID
export const useAccountById = (documentId: string) => {
  const { jwt } = useUserSession.getState();
  return useQuery<Account>({
    queryKey: ["account", documentId],
    queryFn: async () => {
      const res = await fetch(`${API}/${documentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener cuenta");
      const json = await res.json();
      console.log("json", json);
      return json.data; // Strapi v4 API
    },
  });
};

// POST
export const useNewAccount = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserSession.getState();

  return useMutation({
    mutationFn: async (account: Account) => {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: account }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error.message);

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

// PUT
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserSession.getState();

  return useMutation({
    mutationFn: async ({
      documentId,
      account,
    }: {
      documentId: string;
      account: Account;
    }) => {
      const res = await fetch(`${API}/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: account }),
      });
      if (!res.ok) throw new Error("Error al actualizar cuenta");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

// DELETE
export const useDeleteAccount = () => {
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
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
