import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePeriods } from "@/features/periods/hooks/use-periods";
import { PERIODS_ROUTES } from "@/features/periods/lib/utils";
import { Plus, Lock, Unlock, Calendar, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function PeriodosPage() {
  const { data: periods } = usePeriods();
  const navigate = useNavigate();

  const handleClickAddPeriod = () => {
    navigate(PERIODS_ROUTES.NEW);
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Periodos Contables
        </h1>
        <p className="text-muted-foreground">
          Gestiona los periodos contables de tu empresa
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Periodo Actual
            </CardTitle>
            <Calendar className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mayo 2025</div>
            <p className="text-xs text-muted-foreground">
              Activo - Finaliza en 29 días
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Asientos en Periodo Actual
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Desde el 01/05/2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Periodos Abiertos
            </CardTitle>
            <Unlock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Mayo 2025, Abril 2025
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Periodos Cerrados
            </CardTitle>
            <Lock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Marzo 2025 y anteriores
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Lista de Periodos</CardTitle>
            <CardDescription>
              Administra los periodos contables de tu empresa
            </CardDescription>
          </div>
          <Button className="ml-auto gap-1" onClick={handleClickAddPeriod}>
            <Plus className="h-4 w-4" />
            Nuevo Periodo
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Asientos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods?.map((period) => (
                <TableRow key={period.documentId}>
                  <TableCell className="font-medium">{period.name}</TableCell>
                  <TableCell>{period.startDate}</TableCell>
                  <TableCell>{period.endDate}</TableCell>
                  <TableCell>2000</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        period.statusPeriod === "open"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {period.statusPeriod.charAt(0).toUpperCase() +
                        period.statusPeriod.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        {period.statusPeriod === "closed"
                          ? "Reabrir"
                          : "Cerrar"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
