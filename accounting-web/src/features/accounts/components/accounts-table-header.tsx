import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function AccountsTableHeader() {
  const navigate = useNavigate();

  const handleClickAddAccount = () => {
    navigate("/home/accounts/new");
  };
  return (
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>Lista de Cuentas</CardTitle>
        <CardDescription>
          Administra todas tus cuentas contables desde aquí
        </CardDescription>
      </div>
      <Button className="ml-auto gap-1" onClick={handleClickAddAccount}>
        <Plus className="h-4 w-4" />
        Nueva Cuenta
      </Button>
    </CardHeader>
  );
}
