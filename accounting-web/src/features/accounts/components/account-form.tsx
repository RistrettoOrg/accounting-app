import { useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Account } from "@/features/accounts/types/account";
import { ACCOUNT_TYPES } from "@/features/accounts/lib/utils";
import { ROUTES } from "@/shared/lib/utils";
import InputGroup from "@/shared/components/input-group";

export function AccountForm({
  handleSubmit,
  formErrors,
  account,
}: {
  handleSubmit: (event: React.FormEvent) => void;
  formErrors: Partial<Record<keyof Account, string[]>>;
  account?: Account;
}) {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | undefined>(
    account?.type
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información de la Cuenta</CardTitle>
          <CardDescription>
            Ingresa los detalles de la nueva cuenta contable
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup
              label="Código de Cuenta"
              name="code"
              placeholder="Ej: 1000"
              helper="Código único que identifica la cuenta"
              error={formErrors.code}
              defaultValue={account?.code}
            />
            <InputGroup
              label="Nombre de Cuenta"
              name="name"
              placeholder="Ej: Caja General"
              helper="Nombre descriptivo para la cuenta"
              error={formErrors.name}
              defaultValue={account?.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-base">
              Tipo de Cuenta <span className="text-destructive">*</span>
            </Label>
            <input hidden name="type" value={selectedType || ""} />
            <Select
              onValueChange={setSelectedType}
              defaultValue={selectedType || ""}
              value={selectedType || ""}
            >
              <SelectTrigger id="type" name="type">
                <SelectValue placeholder="Selecciona un tipo de cuenta" />
              </SelectTrigger>
              <SelectContent>
                {ACCOUNT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.type && (
              <p className="text-sm text-destructive">{formErrors.type[0]}</p>
            )}
            <p className="text-sm text-muted-foreground">
              El tipo determina su comportamiento en los estados financieros
            </p>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="cuenta-padre" className="text-base">
              Cuenta Padre
            </Label>
            <Select>
              <SelectTrigger id="cuenta-padre">
                <SelectValue placeholder="Selecciona una cuenta padre (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {accounts?.map((account) => (
                  <SelectItem key={account.documentId} value={account.code}>
                    {`${account.code} - ${account.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Si esta es una subcuenta, selecciona la cuenta padre
            </p>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTS)}>
            Cancelar
          </Button>
          <Button type="submit">Guardar Cuenta</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
