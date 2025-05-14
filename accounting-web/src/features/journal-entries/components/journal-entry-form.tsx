"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, FileCheck, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import type { JournalEntry } from "../types/journal-entry";
import { useAccounts } from "@/features/accounts/hooks/use-accounts";
import { ROUTES } from "@/shared/lib/utils";
import { type JournalEntryFormData } from "../lib/utils";
import type { JournalLine } from "@/features/journal-lines/types/journal-line";
import { useDeleteJournalLine } from "@/features/journal-lines/hooks/use-journal-lines";

// Cuentas de ejemplo para el selector

const sortedJournalLines = (journalLines: JournalLine[]) =>
  journalLines.sort((a, b) => {
    if (a.type === b.type) {
      return 0;
    }
    return a.type === "debit" ? -1 : 1;
  });

export function JournalEntryForm({
  handleSubmit,
  formErrors,
  journalEntry,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formErrors: Partial<Record<keyof JournalEntryFormData, string[]>>;
  journalEntry?: JournalEntry;
}) {
  const deleteJournalEntry = useDeleteJournalLine();
  const { data: accounts } = useAccounts();
  const navigate = useNavigate();
  const [controlledNumber, setControlledNumber] = useState<string | undefined>(
    journalEntry?.number
  );
  const [journalLines, setJournalLines] = useState<JournalLine[]>(
    sortedJournalLines(journalEntry?.journal_lines || [])
  );

  const [isBalanced, setIsBalanced] = useState(true);
  const [totalDebito, setTotalDebito] = useState(0);
  const [totalCredito, setTotalCredito] = useState(0);

  // Actualizar totales cuando cambian las líneas
  useEffect(() => {
    const debitos = journalLines
      .filter((line) => line.type === "debit")
      .reduce((sum, line) => sum + line.amount, 0);
    const creditos = journalLines
      .filter((line) => line.type === "credit")
      .reduce((sum, line) => sum + line.amount, 0);
    setTotalDebito(debitos);
    setTotalCredito(creditos);
    setIsBalanced(Math.abs(debitos - creditos) < 0.01); // Permitimos una pequeña diferencia por redondeo
  }, [journalLines]);

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/; // Expresión regular para solo números
    if (value === "" || regex.test(value)) {
      setControlledNumber(value);
    }
  };

  // Manejar cambios en las líneas del asiento
  const handleLineChange = (
    index: number,
    field: keyof JournalLine,
    value: any
  ) => {
    const nuevasLineas = [...journalLines];
    nuevasLineas[index] = {
      ...nuevasLineas[index],
      [field]: value,
    };
    setJournalLines(nuevasLineas);
  };
  // Agregar una nueva línea
  const agregarLinea = (tipo: "debit" | "credit") => {
    const nuevaLinea: JournalLine = {
      account: { documentId: "", name: "", type: "", code: "" },
      amount: 0,
      type: tipo,
    };
    setJournalLines((prev) => sortedJournalLines([...prev, nuevaLinea]));
  };

  // Eliminar una línea
  const eliminarLinea = (index: number) => {
    const nuevasLineas = journalLines.filter((_, i) => i !== index);
    setJournalLines(nuevasLineas);
  };

  // Actualizar la cuenta de una línea
  const actualizarCuenta = (index: number, documentId: string) => {
    const cuenta = accounts?.find((c) => c.documentId === documentId);
    if (cuenta) {
      handleLineChange(index, "account", cuenta);
    }
  };

  return (
    <div className="space-y-6">
      {formErrors && Object.keys(formErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {Object.entries(formErrors).map(([key, value]) => (
                <li key={key}>
                  {key}: {value.join(", ")}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <input
          hidden
          name="journal-lines"
          value={JSON.stringify(journalLines)}
        />
        <input hidden name="documentId" value={journalEntry?.documentId} />
        <Card>
          <CardHeader>
            <CardTitle>Información del Asiento</CardTitle>
            <CardDescription>
              Ingresa los detalles del asiento contable
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  name="number"
                  value={controlledNumber}
                  onChange={handleChangeNumber}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={
                    journalEntry?.date || new Date().toISOString().split("T")[0]
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <div className="h-10 flex items-center">
                  <Badge
                    className={`${
                      journalEntry?.entry_status === "cancelled"
                        ? " bg-red-100 text-red-800 border-red-200"
                        : journalEntry?.entry_status === "posted"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}
                  >
                    {journalEntry?.entry_status === "cancelled"
                      ? "Cancelado"
                      : journalEntry?.entry_status === "posted"
                      ? "Publicado"
                      : "Borrador"}
                  </Badge>
                </div>
              </div>
              <input
                hidden
                name="entry_status"
                value={journalEntry?.entry_status}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Descripción del asiento contable"
                defaultValue={journalEntry?.description || ""}
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Líneas del Asiento</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  agregarLinea("debit");
                }}
                className="gap-1"
              >
                <Plus className="h-4 w-4" /> Débito
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  agregarLinea("credit");
                }}
                className="gap-1"
              >
                <Plus className="h-4 w-4" /> Crédito
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cuenta</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Débito</TableHead>
                  <TableHead className="text-right">Crédito</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalLines.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No hay líneas en este asiento. Agrega una línea de débito
                      o crédito.
                    </TableCell>
                  </TableRow>
                ) : (
                  journalLines.map((linea, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          value={linea.account?.documentId}
                          onValueChange={(value) =>
                            actualizarCuenta(index, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar cuenta" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts?.map((account) => (
                              <SelectItem
                                key={account.documentId}
                                value={account.documentId || ""}
                              >
                                {account.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Descripción (opcional)"
                          value={linea.description || ""}
                          onChange={(e) =>
                            handleLineChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {linea.type === "debit" ? (
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={linea.amount || ""}
                            onChange={(e) =>
                              handleLineChange(
                                index,
                                "amount",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="text-right"
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {linea.type === "credit" ? (
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={linea.amount || ""}
                            onChange={(e) =>
                              handleLineChange(
                                index,
                                "amount",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="text-right"
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            eliminarLinea(index);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <TableRow className="border-t-2">
                  <TableCell colSpan={2} className="font-medium text-right">
                    Totales
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${totalDebito.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${totalCredito.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div
              className={`mt-4 flex items-center justify-between p-2 rounded-md ${
                isBalanced ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="font-medium">
                {isBalanced ? (
                  <span className="text-green-700">
                    El asiento está balanceado
                  </span>
                ) : (
                  <span className="text-red-700">
                    El asiento no está balanceado
                  </span>
                )}
              </div>
              <div
                className={`font-medium ${
                  isBalanced ? "text-green-700" : "text-red-700"
                }`}
              >
                Diferencia: ${Math.abs(totalDebito - totalCredito).toFixed(2)}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.JOURNAL_ENTRIES)}
            >
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <div className="flex gap-2">
              {/* {journalEntry?.entry_status !== "posted" && (
                <Button
                  variant="outline"
                  onClick={() => guardarAsiento("draft")}
                >
                  <Save className="mr-2 h-4 w-4" /> Guardar Borrador
                </Button>
              )} */}
              {journalEntry?.entry_status !== "cancelled" && (
                <Button type="submit">
                  <FileCheck className="mr-2 h-4 w-4" />{" "}
                  {journalEntry ? "Publicar" : "Actualizar"}
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
