import { Envs } from "@/shared/lib/env";
import { useUserSession } from "@/shared/hooks/use-session";
import type { JournalLine } from "@/features/journal-lines/types/journal-line";

const API = `${Envs.API_URL}/api/journal-lines`;

const getHeaders = () => {
  const { jwt } = useUserSession.getState();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };
};

export const fetchJournalLines = async (): Promise<JournalLine[]> => {
  const res = await fetch(`${API}?populate=*`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener líneas de asientos contables");
  const json = await res.json();

  return json.data;
};

export const createJournalLine = async (
  line: JournalLine,
  journalEntryId: string
) => {
  const { account, ...lineAttributes } = line;
  const res = await fetch(API, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        ...lineAttributes,
        account: account.documentId,
        journal_entry: journalEntryId,
      },
    }),
  });

  const json = await res.json();
  if (!res.ok)
    throw new Error(json.error?.message || "Error al crear línea del asiento");

  return json.data;
};

export const updateJournalLine = async (
  line: JournalLine,
  journalEntryId: string
) => {
  const { account, ...lineAttributes } = line;

  const res = await fetch(`${API}/${line.documentId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        amount: lineAttributes.amount,
        type: lineAttributes.type,
        description: lineAttributes.description,
        account: account.documentId,
        journal_entry: journalEntryId,
      },
    }),
  });

  const json = await res.json();
  if (!res.ok)
    throw new Error(json.error?.message || "Error al actualizar línea");

  return json.data;
};

export const deleteJournalLine = async (documentId: string) => {
  const res = await fetch(`${API}/${documentId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Error al eliminar línea del asiento");
};
