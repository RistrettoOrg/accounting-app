import AccountsTable from "@/features/accounts/components/accounts-table";
export default function CuentasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Cuentas</h1>
        <p className="text-muted-foreground">Gestiona tus cuentas contables</p>
      </div>

      <AccountsTable />
    </div>
  );
}
