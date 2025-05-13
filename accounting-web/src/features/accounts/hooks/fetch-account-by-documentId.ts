import { Envs } from "@/shared/lib/env";

const fetchAccountByDocumentId = async (documentId: string) => {
  const response = await fetch(`${Envs.API_URL}/accounts/${documentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching account");
  }
  const account = await response.json();
  return account;
};
export default fetchAccountByDocumentId;
