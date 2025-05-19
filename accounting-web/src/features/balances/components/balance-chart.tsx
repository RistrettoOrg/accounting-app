"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

type MonthlyData = {
  month: string;
  activos: number;
  pasivos: number;
  patrimonio: number;
};

type AccountTypeDistribution = {
  name: string;
  value: number;
  color: string;
};

type TopAccount = {
  name: string;
  value: number;
};

type BalanceChartsProps = {
  monthlyData: MonthlyData[];
  accountTypeDistribution: AccountTypeDistribution[];
  topAccounts: TopAccount[];
};

export function BalanceCharts({
  monthlyData,
  accountTypeDistribution,
  topAccounts,
}: BalanceChartsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Evolución de Balances</CardTitle>
          <CardDescription>
            Tendencia de activos, pasivos y patrimonio en los últimos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    undefined,
                  ]}
                  labelFormatter={(label) => `Mes: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activos"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  name="Activos"
                />
                <Line
                  type="monotone"
                  dataKey="pasivos"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Pasivos"
                />
                <Line
                  type="monotone"
                  dataKey="patrimonio"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Patrimonio"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución por Tipo de Cuenta</CardTitle>
          <CardDescription>
            Proporción de cada tipo de cuenta en el balance general
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accountTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {accountTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    undefined,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Principales Cuentas por Saldo</CardTitle>
          <CardDescription>
            Las cuentas con los saldos más significativos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topAccounts}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    undefined,
                  ]}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
