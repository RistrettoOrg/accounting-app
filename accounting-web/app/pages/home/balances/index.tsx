import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BalanceCharts } from "@/features/balances/components/balance-chart";
import { BalanceFilters } from "@/features/balances/components/balance-filters";
import { BalanceSummary } from "@/features/balances/components/balance-summary";
import { BalanceTable } from "@/features/balances/components/balance-table";

// Esta función simula la obtención de datos de balances
// En una aplicación real, esto se conectaría a tu base de datos
function getBalanceData() {
  // Simulamos datos para los balances
  return {
    summary: {
      totalActivos: 125000,
      totalPasivos: 45000,
      totalPatrimonio: 80000,
      totalIngresos: 35000,
      totalGastos: 18000,
      resultado: 17000,
    },
    accounts: [
      { id: "1", code: "1000", name: "Caja", type: "activo", balance: 15000 },
      { id: "2", code: "1100", name: "Banco", type: "activo", balance: 45000 },
      {
        id: "3",
        code: "1200",
        name: "Cuentas por Cobrar",
        type: "activo",
        balance: 28000,
      },
      {
        id: "4",
        code: "1300",
        name: "Inventario",
        type: "activo",
        balance: 37000,
      },
      {
        id: "5",
        code: "2000",
        name: "Proveedores",
        type: "pasivo",
        balance: 22000,
      },
      {
        id: "6",
        code: "2100",
        name: "Préstamos Bancarios",
        type: "pasivo",
        balance: 18000,
      },
      {
        id: "7",
        code: "2200",
        name: "Impuestos por Pagar",
        type: "pasivo",
        balance: 5000,
      },
      {
        id: "8",
        code: "3000",
        name: "Capital Social",
        type: "patrimonio",
        balance: 60000,
      },
      {
        id: "9",
        code: "3100",
        name: "Resultados Acumulados",
        type: "patrimonio",
        balance: 20000,
      },
      {
        id: "10",
        code: "4000",
        name: "Ventas",
        type: "ingreso",
        balance: 35000,
      },
      {
        id: "11",
        code: "5000",
        name: "Costo de Ventas",
        type: "gasto",
        balance: 12000,
      },
      {
        id: "12",
        code: "5100",
        name: "Gastos Administrativos",
        type: "gasto",
        balance: 6000,
      },
    ],
    monthlyData: [
      { month: "Ene", activos: 110000, pasivos: 40000, patrimonio: 70000 },
      { month: "Feb", activos: 112000, pasivos: 41000, patrimonio: 71000 },
      { month: "Mar", activos: 115000, pasivos: 42000, patrimonio: 73000 },
      { month: "Abr", activos: 118000, pasivos: 43000, patrimonio: 75000 },
      { month: "May", activos: 125000, pasivos: 45000, patrimonio: 80000 },
    ],
    accountTypeDistribution: [
      { name: "Activos", value: 125000, color: "#4f46e5" },
      { name: "Pasivos", value: 45000, color: "#ef4444" },
      { name: "Patrimonio", value: 80000, color: "#10b981" },
      { name: "Ingresos", value: 35000, color: "#f59e0b" },
      { name: "Gastos", value: 18000, color: "#6366f1" },
    ],
    topAccounts: [
      { name: "Banco", value: 45000 },
      { name: "Inventario", value: 37000 },
      { name: "Cuentas por Cobrar", value: 28000 },
      { name: "Proveedores", value: 22000 },
      { name: "Capital Social", value: 60000 },
    ],
  };
}

export default function BalancesPage() {
  const balanceData = getBalanceData();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Balances</h1>
        <p className="text-muted-foreground">
          Visualiza y analiza los balances de todas las cuentas
        </p>
      </div>

      <BalanceFilters />

      <BalanceSummary summary={balanceData.summary} />

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="table">Tabla de Balances</TabsTrigger>
          <TabsTrigger value="analysis">Análisis Financiero</TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          <BalanceCharts
            monthlyData={balanceData.monthlyData}
            accountTypeDistribution={balanceData.accountTypeDistribution}
            topAccounts={balanceData.topAccounts}
          />
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Balance de Cuentas</CardTitle>
              <CardDescription>
                Detalle de todas las cuentas y sus saldos actuales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BalanceTable accounts={balanceData.accounts} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Financiero</CardTitle>
              <CardDescription>
                Indicadores y ratios financieros clave
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Liquidez</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Ratio Corriente
                      </p>
                      <p className="text-2xl font-bold">2.78</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Prueba Ácida
                      </p>
                      <p className="text-2xl font-bold">1.96</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Endeudamiento</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Ratio de Deuda
                      </p>
                      <p className="text-2xl font-bold">36%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Cobertura de Intereses
                      </p>
                      <p className="text-2xl font-bold">4.2x</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Rentabilidad</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        ROA
                      </p>
                      <p className="text-2xl font-bold">13.6%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        ROE
                      </p>
                      <p className="text-2xl font-bold">21.3%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recomendaciones</h3>
                <div className="space-y-2">
                  <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
                    <p className="text-blue-800">
                      La empresa muestra una buena posición de liquidez con un
                      ratio corriente de 2.78, lo que indica capacidad para
                      cubrir obligaciones a corto plazo.
                    </p>
                  </div>
                  <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
                    <p className="text-amber-800">
                      El nivel de endeudamiento es moderado (36%), pero se
                      recomienda monitorear para evitar incrementos
                      significativos en el futuro.
                    </p>
                  </div>
                  <div className="p-4 rounded-md bg-green-50 border border-green-200">
                    <p className="text-green-800">
                      La rentabilidad sobre el patrimonio (ROE) de 21.3% es
                      positiva, indicando un buen retorno para los accionistas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
