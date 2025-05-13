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
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react";

export default function MonedasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Monedas</h1>
        <p className="text-muted-foreground">
          Gestiona las monedas y tasas de cambio
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Lista de Monedas</CardTitle>
            <CardDescription>
              Administra las monedas y sus tasas de cambio
            </CardDescription>
          </div>
          <Button className="ml-auto gap-1">
            <Plus className="h-4 w-4" />
            Nueva Moneda
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Símbolo</TableHead>
                <TableHead>Tasa de Cambio (USD)</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">USD</TableCell>
                <TableCell>Dólar Estadounidense</TableCell>
                <TableCell>$</TableCell>
                <TableCell>1.00</TableCell>
                <TableCell>02/05/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                    Principal
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EUR</TableCell>
                <TableCell>Euro</TableCell>
                <TableCell>€</TableCell>
                <TableCell>0.92</TableCell>
                <TableCell>02/05/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200">
                    Activa
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ARS</TableCell>
                <TableCell>Peso Argentino</TableCell>
                <TableCell>$</TableCell>
                <TableCell>0.0011</TableCell>
                <TableCell>02/05/2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200">
                    Activa
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Tasas de Cambio</CardTitle>
          <CardDescription>
            Historial de cambios en las tasas de conversión
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Moneda</TableHead>
                <TableHead>Tasa Anterior</TableHead>
                <TableHead>Tasa Nueva</TableHead>
                <TableHead>Fecha de Cambio</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>EUR</TableCell>
                <TableCell>0.91</TableCell>
                <TableCell>0.92</TableCell>
                <TableCell>02/05/2025</TableCell>
                <TableCell>admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ARS</TableCell>
                <TableCell>0.0010</TableCell>
                <TableCell>0.0011</TableCell>
                <TableCell>01/05/2025</TableCell>
                <TableCell>admin</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>EUR</TableCell>
                <TableCell>0.90</TableCell>
                <TableCell>0.91</TableCell>
                <TableCell>28/04/2025</TableCell>
                <TableCell>admin</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
