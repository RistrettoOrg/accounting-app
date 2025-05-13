import { z } from "zod";
import type { Account } from "../types/account";

export const NEW_ACCOUNT_MESSAGES = {
  SUCCESS: "Cuenta creada con éxito",
  ERROR: "Error al crear la cuenta",
};

export const UPDATE_ACCOUNT_MESSAGES = {
  SUCCESS: "Cuenta actualizada con éxito",
  ERROR: "Error al actualizar la cuenta",
};

export const DELETE_ACCOUNT_MESSAGES = {
  SUCCESS: "Cuenta eliminada con éxito",
  ERROR: "Error al eliminar la cuenta",
};

export const ACCOUNT_TYPES = [
  { value: "asset", label: "Activo" },
  { value: "liability", label: "Pasivo" },
  { value: "equity", label: "Patrimonio" },
  { value: "income", label: "Ingresos" },
  { value: "expense", label: "Gastos" },
];

export const accountSchema = z.object({
  code: z.string().min(1, "El código es obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  type: z.string().min(1, "El tipo de cuenta es obligatorio"),
});

export type AccountFormData = z.infer<typeof accountSchema>;

export const extractAccountData = (formData: FormData): Account => ({
  code: formData.get("code")?.toString() || "",
  name: formData.get("name")?.toString() || "",
  type: formData.get("type")?.toString() || "",
});

export const validateAccountData = (data: Account) => {
  return accountSchema.safeParse(data);
};
