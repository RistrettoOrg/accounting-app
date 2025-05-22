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
import {
  useDeletePeriod,
  usePeriods,
} from "@/features/periods/hooks/use-periods";
import {
  DELETE_PERIOD_MESSAGES,
  PERIODS_ROUTES,
} from "@/features/periods/lib/utils";
import { useUserSession } from "@/shared/hooks/use-session";
import { ROUTES } from "@/shared/lib/utils";
import {
  Plus,
  Lock,
  Unlock,
  Calendar,
  CheckCircle2,
  Edit,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function PeriodosPage() {
  const { data: periods } = usePeriods();
  const { period: periodSelected } = useUserSession();
  const navigate = useNavigate();
  const deletePeriod = useDeletePeriod();
  const handleClickAddPeriod = () => {
    navigate(PERIODS_ROUTES.NEW);
  };

  const handleDelete = (periodId: string) => {
    deletePeriod.mutate(periodId, {
      onSuccess: () => {
        toast.success(DELETE_PERIOD_MESSAGES.SUCCESS);
      },
      onError: (error) => {
        toast.error(DELETE_PERIOD_MESSAGES.ERROR);
      },
    });
  };

  const handleClickEditPeriod = (periodId: string) => {
    navigate(`${PERIODS_ROUTES.EDIT}/${periodId}`);
  };
  const statusPeriod = periodSelected?.status_period ?? "";
  const periodSelectedStatus = `${
    statusPeriod.charAt(0).toUpperCase() + statusPeriod.slice(1)
  } `;
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
            <div className="text-2xl font-bold">{periodSelected?.name}</div>
            <p className="text-xs text-muted-foreground">
              {periodSelectedStatus} {periodSelected?.start_date} -{" "}
              {periodSelected?.end_date}
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
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {periods?.map((period) => (
                <TableRow
                  key={period.documentId}
                  onDoubleClick={() =>
                    handleClickEditPeriod(period.documentId || "")
                  }
                >
                  <TableCell className="font-medium">{period.name}</TableCell>
                  <TableCell>{period.start_date}</TableCell>
                  <TableCell>{period.end_date}</TableCell>

                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        period.status_period === "open"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {period.status_period.charAt(0).toUpperCase() +
                        period.status_period.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleClickEditPeriod(period.documentId || "")
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (period.documentId) {
                            handleDelete(period.documentId);
                          } else {
                            toast.error("El ID del documento no está definido");
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
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
