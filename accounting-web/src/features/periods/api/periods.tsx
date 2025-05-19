import { Envs } from "@/shared/lib/env";
import { useUserSession } from "@/shared/hooks/use-session";

import type { Period } from "@/features/periods/types/period";
import { convertKeysToCamelCase } from "@/shared/lib/functions";

const API = `${Envs.API_URL}/api/periods`;

const getHeaders = () => {
  const { jwt } = useUserSession.getState();
  return {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
};

export const fetchPeriods = async (): Promise<Period[]> => {
  const res = await fetch(`${API}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener los periodos contables");
  const json = await res.json();

  const camelData = convertKeysToCamelCase(json.data);

  return camelData;
};

export const fetchPeriodById = async (documentId: string): Promise<Period> => {
  const res = await fetch(`${API}/${documentId}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Error al obtener el periodo contable");
  const json = await res.json();
  return json.data;
};

export const createPeriod = async (period: Period) => {
  const res = await fetch(API, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ data: period }),
  });

  const json = await res.json();
  if (!res.ok)
    throw new Error(
      json.error?.message || "Error al crear el periodo contable"
    );

  return json.data;
};

export const updatePeriod = async ({
  documentId,
  period,
}: {
  documentId: string;
  period: Period;
}) => {
  const resEntry = await fetch(`${API}/${documentId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ data: period }),
  });

  if (!resEntry.ok) throw new Error("Error al actualizar el periodo contable");
  const result = await resEntry.json();

  return result.data;
};

export const deletePeriod = async (documentId: string) => {
  const res = await fetch(`${API}/${documentId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Error al eliminar el periodo contable");
};
