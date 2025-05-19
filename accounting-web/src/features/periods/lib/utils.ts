import {
  type Period,
  type PeriodStatus,
} from "@/features/periods/types/period";
import { z } from "zod";

export const NEW_PERIOD_MESSAGES = {
  SUCCESS: "Periodo creado con éxito",
  ERROR: "Error al crear el periodo contable",
};

export const UPDATE_PERIOD_MESSAGES = {
  SUCCESS: "Periodo actualizado con éxito",
  ERROR: "Error al actualizar el periodo contable",
};

export const DELETE_PERIOD_MESSAGES = {
  SUCCESS: "Perioodo eliminado con éxito",
  ERROR: "Error al eliminar el periodo contable",
};

export const PERIODS_ROUTES = {
  NEW: "/home/periods/new",
  EDIT: "/home/periods/edit",
};

export const periodSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  status_period: z.enum(["open", "closed"], {
    errorMap: () => ({ message: "El estado es requerido" }),
  }),
  start_date: z.string().min(1, "La fecha es obligatoria"),
  end_date: z.string().min(1, "La fecha es obligatoria"),
});

export type PeriodFormData = z.infer<typeof periodSchema>;

export const extractPeriodData = (formData: FormData): Period => ({
  name: formData.get("name")?.toString() || "",
  start_date: formData.get("start_date") as string,
  end_date: formData.get("end_date") as string,
  status_period: formData.get("status")?.toString() as PeriodStatus,
});

export const validatePeriodData = (data: Period) => {
  return periodSchema.safeParse(data);
};
