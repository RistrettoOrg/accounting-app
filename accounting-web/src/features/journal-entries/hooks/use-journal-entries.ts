import { Envs } from "@/shared/lib/env";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserSession } from "@/shared/hooks/use-session";
import type { JournalEntry } from "../types/journal-entry";

const API = `${Envs.API_URL}/api/journal-entries`;

// GET
export const useJournalEntries = () => {
  const { jwt } = useUserSession.getState();
  return useQuery<JournalEntry[]>({
    queryKey: ["journal-entries"],
    queryFn: async () => {
      const res = await fetch(
        `${API}?populate[journal_lines][populate]=account`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!res.ok) throw new Error("Error al obtener asientos contables");
      const json = await res.json();

      //Calcular el total del asiento contable
      json.data.forEach((entry: JournalEntry) => {
        entry.amount = entry.journal_lines.reduce((acc, line) => {
          if (line.type === "debit") {
            return acc + line.amount;
          } else {
            return acc;
          }
        }, 0);
      });

      return json.data;
    },
  });
};

// GET by ID
export const useJournalEntryById = (documentId: string) => {
  const { jwt } = useUserSession.getState();
  return useQuery<JournalEntry>({
    queryKey: ["journal-entry"],
    queryFn: async () => {
      const res = await fetch(
        `${API}/${documentId}?populate[journal_lines][populate]=account`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!res.ok) throw new Error("Error al obtener asiento contable");
      const json = await res.json();
      return json.data;
    },
  });
};

// POST
export const useNewJournalEntry = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserSession.getState();

  return useMutation({
    mutationFn: async (journalEntry: JournalEntry) => {
      const { journal_lines, ...entryData } = journalEntry;

      // Crear el JournalEntry sin líneas
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: entryData }),
      });

      const json = await res.json();
      if (!res.ok)
        throw new Error(json.error?.message || "Error al crear asiento");

      const journalEntryId = json.data.documentId;

      for (const line of journal_lines) {
        const { account, ...lineAtributtes } = line;
        const lineRes = await fetch(`${Envs.API_URL}/api/journal-lines`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              ...lineAtributtes,
              account: account.documentId,
              journal_entry: journalEntryId,
            },
          }),
        });

        const lineJson = await lineRes.json();
        if (!lineRes.ok)
          throw new Error(lineJson.error?.message || "Error al crear línea");
      }

      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
    },
  });
};

// PUT
export const useUpdateJournalEntry = () => {
  const queryClient = useQueryClient();
  const { jwt } = useUserSession.getState();

  return useMutation({
    mutationFn: async ({
      documentId,
      journalEntry,
    }: {
      documentId: string;
      journalEntry: JournalEntry;
    }) => {
      const { journal_lines, documentId: id, ...entryData } = journalEntry;

      // Actualiza el Journal Entry
      const resEntry = await fetch(`${API}/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: entryData }),
      });
      if (!resEntry.ok) {
        throw new Error("Error al actualizar el asiento contable");
      }
      await resEntry.json();

      // Procesa cada Journal Line
      const linePromises = journal_lines.map(async (line) => {
        const { account, ...lineAtributtes } = line;
        if (lineAtributtes.documentId) {
          // Actualizar una journal line existente
          const resLine = await fetch(
            `${Envs.API_URL}/api/journal-lines/${line.documentId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
              body: JSON.stringify({
                data: {
                  amount: lineAtributtes.amount,
                  type: lineAtributtes.type,
                  description: lineAtributtes.description,
                  account: account.documentId,
                  journal_entry: documentId,
                },
              }),
            }
          );
          const resLineJson = await resLine.json();
          if (!resLine.ok) {
            throw new Error("Error al actualizar una línea del asiento");
          }
          return resLineJson;
        } else {
          const resNewLine = await fetch(`${Envs.API_URL}/api/journal-lines`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
              data: {
                ...lineAtributtes,
                account: account.documentId,
                journal_entry: documentId,
              },
            }),
          });
          if (!resNewLine.ok) {
            throw new Error("Error al crear una nueva línea del asiento");
          }
          return resNewLine.json();
        }
      });

      await Promise.all(linePromises);

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal-entries"] });
      queryClient.invalidateQueries({
        queryKey: ["journal-entry"],
      });
    },
  });
};

// DELETE
export const useDeleteJournalEntry = () => {
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
