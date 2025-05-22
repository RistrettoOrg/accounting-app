import { useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/shared/lib/utils";
import InputGroup from "@/shared/components/input-group";
import type { Period } from "@/features/periods/types/period";
import { DatePickerWithRange } from "@/components/ui/data-picker-range";
import { Switch } from "@/components/ui/switch";

export function PeriodForm({
  handleSubmit,
  formErrors,
  period,
}: {
  handleSubmit: (event: React.FormEvent) => void;
  formErrors: Partial<Record<keyof Period, string[]>>;
  period?: Period;
}) {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    period?.status_period || "open"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input hidden name="documentId" value={period?.documentId} />
      <Card>
        <CardHeader>
          <CardTitle>Información del Periodo contable</CardTitle>
          <CardDescription>
            Ingresa los detalles del nuevo periodo contable
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Nombre de Cuenta"
              name="name"
              placeholder="Ej: Periodo 2023"
              helper="Nombre descriptivo para el periodo contable"
              error={formErrors.name}
              defaultValue={period?.name}
            />
            <div className="flex-col items-center space-y-2 ">
              <Label htmlFor="status" className="text-base">
                Estado del periodo contable
                <span className="text-destructive">*</span>
              </Label>
              <div className="flex  space-x-2 py-2 items-center">
                <input
                  hidden
                  name="status"
                  value={selectedStatus}
                  type="text"
                />
                <Switch
                  id="status"
                  onClick={() => {
                    setSelectedStatus((prev) =>
                      prev === "open" ? "closed" : "open"
                    );
                  }}
                  checked={selectedStatus === "open"}
                />
                <p className="text-sm">
                  {selectedStatus === "open" ? "Abierto" : "Cerrado"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-col items-center space-y-2">
            <Label htmlFor="status" className="text-base">
              Fecha de inicio y fin del periodo contable
              <span className="text-destructive">*</span>
            </Label>
            <DatePickerWithRange
              nameStartDate="start_date"
              nameEndDate="end_date"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate(ROUTES.PERIODS)}>
            Cancelar
          </Button>
          <Button type="submit">Guardar periodo</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
