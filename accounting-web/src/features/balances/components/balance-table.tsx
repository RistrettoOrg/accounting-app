"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

type Account = {
  id: string;
  code: string;
  name: string;
  type: string;
  balance: number;
};

type BalanceTableProps = {
  accounts: Account[];
};

export function BalanceTable({ accounts }: BalanceTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");

  // Filtrar cuentas por búsqueda y tipo
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "todos" || account.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Calcular totales por tipo
  const totals = {
    activo: filteredAccounts
      .filter((a) => a.type === "activo")
      .reduce((sum, a) => sum + a.balance, 0),
    pasivo: filteredAccounts
      .filter((a) => a.type === "pasivo")
      .reduce((sum, a) => sum + a.balance, 0),
    patrimonio: filteredAccounts
      .filter((a) => a.type === "patrimonio")
      .reduce((sum, a) => sum + a.balance, 0),
    ingreso: filteredAccounts
      .filter((a) => a.type === "ingreso")
      .reduce((sum, a) => sum + a.balance, 0),
    gasto: filteredAccounts
      .filter((a) => a.type === "gasto")
      .reduce((sum, a) => sum + a.balance, 0),
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre o código..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Tipo de cuenta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="activo">Activos</SelectItem>
            <SelectItem value="pasivo">Pasivos</SelectItem>
            <SelectItem value="patrimonio">Patrimonio</SelectItem>
            <SelectItem value="ingreso">Ingresos</SelectItem>
            <SelectItem value="gasto">Gastos</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.code}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      account.type === "activo"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : account.type === "pasivo"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : account.type === "patrimonio"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : account.type === "ingreso"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    {account.type.charAt(0).toUpperCase() +
                      account.type.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  ${account.balance.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
          <p className="text-sm font-medium text-blue-700">Total Activos</p>
          <p className="text-xl font-bold text-blue-900">
            ${totals.activo.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm font-medium text-red-700">Total Pasivos</p>
          <p className="text-xl font-bold text-red-900">
            ${totals.pasivo.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-md bg-green-50 border border-green-200">
          <p className="text-sm font-medium text-green-700">Total Patrimonio</p>
          <p className="text-xl font-bold text-green-900">
            ${totals.patrimonio.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-md bg-amber-50 border border-amber-200">
          <p className="text-sm font-medium text-amber-700">Total Ingresos</p>
          <p className="text-xl font-bold text-amber-900">
            ${totals.ingreso.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-md bg-purple-50 border border-purple-200">
          <p className="text-sm font-medium text-purple-700">Total Gastos</p>
          <p className="text-xl font-bold text-purple-900">
            ${totals.gasto.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
