import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  FileText,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Link } from "react-router";
export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido a tu sistema de contabilidad
        </p>
      </div>

      <Tabs defaultValue="resumen" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="actividad">Actividad Reciente</TabsTrigger>
        </TabsList>
        <TabsContent value="resumen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Cuentas
                </CardTitle>
                <CreditCard className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde el último mes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monedas Activas
                </CardTitle>
                <DollarSign className="h-4 w-4 text-pink-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">USD, EUR, ARS</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Asientos Contables
                </CardTitle>
                <FileText className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">+22 este mes</p>
              </CardContent>
            </Card>
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
                  Finaliza en 29 días
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen Financiero</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Gráfico de resumen financiero
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimos 5 asientos contables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                    <div className="ml-2 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Pago de factura #1234
                      </p>
                      <p className="text-sm text-muted-foreground">
                        02/05/2025
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                  </div>
                  <div className="flex items-center">
                    <ArrowDownRight className="mr-2 h-4 w-4 text-red-500" />
                    <div className="ml-2 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Compra de suministros
                      </p>
                      <p className="text-sm text-muted-foreground">
                        01/05/2025
                      </p>
                    </div>
                    <div className="ml-auto font-medium">-$320.50</div>
                  </div>
                  <div className="flex items-center">
                    <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                    <div className="ml-2 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Pago de cliente #456
                      </p>
                      <p className="text-sm text-muted-foreground">
                        30/04/2025
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$2,500.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="actividad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Historial de actividades en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900">
                  <Users className="h-5 w-5 text-violet-600 dark:text-violet-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Nueva cuenta creada
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Se creó la cuenta "Gastos Operativos"
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Hace 2 horas
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900">
                  <DollarSign className="h-5 w-5 text-pink-600 dark:text-pink-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Actualización de tasa de cambio
                  </p>
                  <p className="text-sm text-muted-foreground">
                    USD/EUR actualizado a 0.92
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Hace 5 horas
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Nuevo asiento contable
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Asiento #142 creado por Usuario1
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 1 día</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/cuentas">
          <Card className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">Cuentas</CardTitle>
              <CreditCard className="h-5 w-5 text-violet-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestiona tus cuentas contables
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/monedas">
          <Card className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">Monedas</CardTitle>
              <DollarSign className="h-5 w-5 text-pink-700" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configura las monedas y tasas de cambio
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/asientos">
          <Card className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">
                Asientos Contables
              </CardTitle>
              <FileText className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Registra y consulta asientos contables
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/periodos">
          <Card className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-medium">Periodos</CardTitle>
              <Calendar className="h-5 w-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Administra los periodos contables
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
