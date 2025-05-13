import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAccounts } from "@/features/accounts/hooks/use-accounts";
import AccountCell from "@/features/accounts/components/account-cell";
import AccountsTableHeader from "@/features/accounts/components/accounts-table-header";

export default function AccountsTable({}) {
  const { data: accounts, isLoading } = useAccounts();

  return (
    <Card>
      <AccountsTableHeader />
      <CardContent>
        {/* <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cuentas..."
              className="pl-8"
            />
          </div>
          <Button variant="outline">Filtrar</Button>
        </div> */}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts?.map((account) => (
              <AccountCell account={account} key={account.documentId} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
