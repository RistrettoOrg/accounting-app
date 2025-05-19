import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccounts } from "@/features/accounts/hooks/use-accounts";
import { useJournalEntries } from "@/features/journal-entries/hooks/use-journal-entries";
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

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { useJournalLines } from "@/features/journal-lines/hooks/use-journal-lines";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

// const chartConfig = {
//   Resultadosnegativos: {
//     label: "Resultado Positivo",
//     color: "var(--chart-1)",
//   },
//   Gastosdehogar: {
//     label: "Gastos Hogar",
//     color: "var(--chart-2)",
//   },
// } satisfies ChartConfig;

export default function Home() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  const { data: accounts } = useAccounts();
  const totalAccounts = accounts?.length || 0;
  const accountsInLastMonth = accounts?.filter(
    (account) =>
      new Date(account.createdAt || 0) >=
      new Date(new Date().setMonth(new Date().getMonth() - 1))
  ).length;
  const { data: journalEntries } = useJournalEntries();

  const totalJournalEntries = journalEntries?.length || 0;
  const journalEntriesInLastMonth = journalEntries?.filter(
    (entry) =>
      new Date(entry.date) >=
      new Date(new Date().setMonth(new Date().getMonth() - 1))
  ).length;

  const lastJournalEntries = journalEntries?.slice(0, 5) || [];
  const { data: journalLines } = useJournalLines();
  const expenseJournalLines = journalLines?.filter(
    (journalLine) => journalLine?.account.type == "expense"
  );
  const expensesByAccount = expenseJournalLines?.reduce((acc, line) => {
    const accountName = line.account.name;
    const amount = line.amount || 0;
    const existingAccount = acc.find((item) => item.account === accountName);
    if (line.type === "credit") {
      if (existingAccount) {
        existingAccount.amount -= amount;
      } else {
        acc.push({
          account: accountName.replace(/ /g, ""),
          originalAccount: accountName,
          amount: -amount,
          fill: `var(--color-${accountName.replace(/ /g, "")})`,
        });
      }
    } else {
      if (existingAccount) {
        existingAccount.amount += amount;
      } else {
        acc.push({
          account: accountName.replace(/ /g, ""),
          originalAccount: accountName,
          amount,
          fill: `var(--color-${accountName.replace(/ /g, "")})`,
        });
      }
    }

    return acc;
  }, [] as { account: string; originalAccount: string; amount: number; fill: string }[]);
  const totalExpenses = expensesByAccount?.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];
  const chartConfig2 = (
    expensesByAccount
      ? expensesByAccount.reduce((acc, { account, originalAccount }, index) => {
          // Elegimos el color según el índice, rotando cada 5
          const color = chartColors[index % chartColors.length];
          acc[account] = {
            color,
            label: originalAccount,
          };
          return acc;
        }, {} as Record<string, { label: string; color: string }>)
      : {}
  ) satisfies ChartConfig;

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
                <div className="text-2xl font-bold">{totalAccounts}</div>
                <p className="text-xs text-muted-foreground">
                  {totalAccounts > 0
                    ? `+${accountsInLastMonth} desde el último mes`
                    : "Sin cuentas registradas"}
                </p>
              </CardContent>
            </Card>
            {/* <Card>
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
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Asientos Contables
                </CardTitle>
                <FileText className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalJournalEntries}</div>
                <p className="text-xs text-muted-foreground">
                  {totalJournalEntries > 0
                    ? `+${journalEntriesInLastMonth} desde el último mes`
                    : "Sin asientos contables registrados"}
                </p>
              </CardContent>
            </Card>
            {/* <Card>
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
            </Card> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="justify-center text-muted-foreground col-span-4">
              <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Gráfico de Gastos</CardTitle>
                  <CardDescription>Gastos del último mes</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  {Object.keys(chartConfig2).length > 0 && (
                    <>
                      {/* {console.log("chartConfig", chartConfig)} */}
                      {console.log("chartConfig2", chartConfig2)}
                      <ChartContainer
                        config={chartConfig2}
                        className="mx-auto aspect-square max-h-[350px]"
                      >
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                          />
                          <Pie
                            data={expensesByAccount}
                            dataKey="amount"
                            nameKey="account"
                            innerRadius={100}
                            strokeWidth={10}
                          >
                            <Label
                              content={({ viewBox }) => {
                                if (
                                  viewBox &&
                                  "cx" in viewBox &&
                                  "cy" in viewBox
                                ) {
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                    >
                                      <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-foreground text-2xl font-bold"
                                      >
                                        {totalExpenses?.toLocaleString(
                                          "es-ES",
                                          {
                                            style: "currency",
                                            currency: "ARS",
                                          }
                                        )}
                                      </tspan>
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 24}
                                        className="fill-muted-foreground"
                                      >
                                        Gastos
                                      </tspan>
                                    </text>
                                  );
                                }
                              }}
                            />
                          </Pie>
                        </PieChart>
                      </ChartContainer>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimos 5 asientos contables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lastJournalEntries.map((entry) => (
                    <div key={entry.documentId} className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-orange-500" />
                      <div className="ml-2 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {entry.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {entry.amount?.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </div>
                    </div>
                  ))}
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

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/accounts">
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
      </div> */}
    </div>
  );
}
