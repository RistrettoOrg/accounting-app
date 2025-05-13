import type { Account } from "@/features/accounts/types/account";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteAccount } from "@/features/accounts/hooks/use-accounts";
import { DELETE_ACCOUNT_MESSAGES } from "@/features/accounts/lib/utils";
import { useNavigate } from "react-router";

export default function AccountCell({ account }: { account: Account }) {
  const deleteAccount = useDeleteAccount();
  const navigate = useNavigate();

  const handleDelete = (accountId: string) => {
    deleteAccount.mutate(accountId, {
      onSuccess: () => {
        toast.success(DELETE_ACCOUNT_MESSAGES.SUCCESS);
      },
      onError: (error) => {
        toast.error(DELETE_ACCOUNT_MESSAGES.ERROR);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{account.code}</TableCell>
        <TableCell>{account.name}</TableCell>
        <TableCell>{account.type}</TableCell>

        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/home/accounts/${account.documentId}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (account.documentId) {
                  handleDelete(account.documentId);
                } else {
                  toast.error("El ID del documento no está definido");
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
