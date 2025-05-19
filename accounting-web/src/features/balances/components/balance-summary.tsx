import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  Wallet,
  Building,
  CreditCard,
} from "lucide-react";

type SummaryProps = {
  summary: {
    totalActivos: number;
    totalPasivos: number;
    totalPatrimonio: number;
    totalIngresos: number;
    totalGastos: number;
    resultado: number;
  };
};

export function BalanceSummary({ summary }: SummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Activos Totales
              </p>
              <p className="text-2xl font-bold">
                ${summary.totalActivos.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Wallet className="h-6 w-6 text-blue-700" />
            </div>
          </div>
          <div className="flex items-center pt-4">
            <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500 font-medium">
              +5.2% desde el mes anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Pasivos Totales
              </p>
              <p className="text-2xl font-bold">
                ${summary.totalPasivos.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <CreditCard className="h-6 w-6 text-red-700" />
            </div>
          </div>
          <div className="flex items-center pt-4">
            <ArrowUpRight className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-xs text-red-500 font-medium">
              +2.8% desde el mes anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Patrimonio
              </p>
              <p className="text-2xl font-bold">
                ${summary.totalPatrimonio.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Building className="h-6 w-6 text-green-700" />
            </div>
          </div>
          <div className="flex items-center pt-4">
            <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500 font-medium">
              +6.7% desde el mes anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Ingresos
              </p>
              <p className="text-2xl font-bold">
                ${summary.totalIngresos.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <DollarSign className="h-6 w-6 text-amber-700" />
            </div>
          </div>
          <div className="flex items-center pt-4">
            <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500 font-medium">
              +12.3% desde el mes anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Gastos
              </p>
              <p className="text-2xl font-bold">
                ${summary.totalGastos.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <ArrowDownRight className="h-6 w-6 text-purple-700" />
            </div>
          </div>
          <div className="flex items-center pt-4">
            <ArrowUpRight className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-xs text-red-500 font-medium">
              +8.1% desde el mes anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Resultado
              </p>
              <p className="text-2xl font-bold">
                ${summary.resultado.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <TrendingUp className="h-6 w-6 text-emerald-700" />
            </div>
          </div>
          <div className="flex items-center pt-4">
            <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-xs text-green-500 font-medium">
              +18.5% desde el mes anterior
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
