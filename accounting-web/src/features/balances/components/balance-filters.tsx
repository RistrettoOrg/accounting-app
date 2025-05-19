"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

export function BalanceFilters() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="grid gap-2 flex-1">
            <label htmlFor="period" className="text-sm font-medium">
              Período
            </label>
            <Select defaultValue="mayo2025">
              <SelectTrigger id="period">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mayo2025">Mayo 2025</SelectItem>
                <SelectItem value="abril2025">Abril 2025</SelectItem>
                <SelectItem value="marzo2025">Marzo 2025</SelectItem>
                <SelectItem value="febrero2025">Febrero 2025</SelectItem>
                <SelectItem value="enero2025">Enero 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 flex-1">
            <label htmlFor="date" className="text-sm font-medium">
              Fecha de Corte
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? format(date, "PPP", { locale: es })
                    : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2 flex-1">
            <label htmlFor="comparison" className="text-sm font-medium">
              Comparar Con
            </label>
            <Select defaultValue="none">
              <SelectTrigger id="comparison">
                <SelectValue placeholder="Seleccionar comparación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin comparación</SelectItem>
                <SelectItem value="previousMonth">Mes anterior</SelectItem>
                <SelectItem value="previousYear">Año anterior</SelectItem>
                <SelectItem value="budget">Presupuesto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
