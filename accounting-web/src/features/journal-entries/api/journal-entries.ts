import { Envs } from "@/shared/lib/env";
import { useUserSession } from "@/shared/hooks/use-session";
import type { JournalEntry } from "@/features/journal-entries/types/journal-entry";
import {
  createJournalLine,
  deleteJournalLine,
  updateJournalLine,
} from "@/features/journal-lines/api/journal-lines";

const API = `${Envs.API_URL}/api/journal-entries`;

const getHeaders = () => {
  const { jwt } = useUserSession.getState();
  return {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
};

export const fetchJournalEntries = async (): Promise<JournalEntry[]> => {
  const res = await fetch(`${API}?populate[journal_lines][populate]=account`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener asientos contables");
  const json = await res.json();

  json.data.forEach((entry: JournalEntry) => {
    entry.amount = entry.journal_lines.reduce(
      (acc, line) => (line.type === "debit" ? acc + line.amount : acc),
      0
    );
  });

  return json.data;
};

export const fetchJournalEntryById = async (
  documentId: string
): Promise<JournalEntry> => {
  const res = await fetch(
    `${API}/${documentId}?populate[journal_lines][populate]=account`,
    {
      headers: getHeaders(),
    }
  );
  if (!res.ok) throw new Error("Error al obtener asiento contable");
  const json = await res.json();
  return json.data;
};

export const createJournalEntry = async (journalEntry: JournalEntry) => {
  const { journal_lines, ...entryData } = journalEntry;

  const res = await fetch(API, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ data: entryData }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Error al crear asiento");

  const journalEntryId = json.data.documentId;

  for (const line of journal_lines) {
    const { account, ...lineAtributtes } = line;
    const lineRes = await fetch(`${Envs.API_URL}/api/journal-lines`, {
      method: "POST",
      headers: getHeaders(),
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
};

export const updateJournalEntry = async ({
  documentId,
  journalEntry,
}: {
  documentId: string;
  journalEntry: JournalEntry;
}) => {
  const { journal_lines, documentId: id, ...entryData } = journalEntry;

  const resEntry = await fetch(`${API}/${documentId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ data: entryData }),
  });

  if (!resEntry.ok) throw new Error("Error al actualizar el asiento contable");
  await resEntry.json();

  const journalEntryOld = await fetchJournalEntryById(documentId);
  const linesToDelete = journalEntryOld.journal_lines.filter(
    (line) =>
      !journalEntry.journal_lines.some(
        (newLine) => newLine.documentId === line.documentId
      )
  );
  const deletePromises = linesToDelete.map(async (line) => {
    return deleteJournalLine(line.documentId || "");
  });
  await Promise.all(deletePromises);
  const linePromises = journal_lines.map(async (line) => {
    const { account, ...lineAtributtes } = line;

    if (lineAtributtes.documentId) {
      return updateJournalLine(line, documentId);
    } else {
      return createJournalLine(line, documentId);
    }
  });

  await Promise.all(linePromises);

  return journalEntry;
};

export const deleteJournalEntry = async (documentId: string) => {
  const res = await fetch(`${API}/${documentId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Error al eliminar cuenta");
};
