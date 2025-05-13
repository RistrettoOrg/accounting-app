import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import { AccountForm } from "@/features/accounts/components/account-form";
import {
  useAccountById,
  useUpdateAccount,
} from "@/features/accounts/hooks/use-accounts";
import { useEffect, useState } from "react";
import {
  extractAccountData,
  UPDATE_ACCOUNT_MESSAGES,
  validateAccountData,
  type AccountFormData,
} from "@/features/accounts/lib/utils";
import { toast } from "sonner";
import type { Route } from "../+types";
import AccountFormSkeleton from "@/features/accounts/components/account-form-skeleton";
import AccountNotFound from "@/features/accounts/components/account-not-found";
import { ROUTES } from "@/shared/lib/utils";

export async function loader({ params }: Route.LoaderArgs) {
  let documentId = params.documentId ? params.documentId : null;
  return { documentId };
}

export default function UpdateAccountPage({
  loaderData,
}: {
  loaderData: { documentId: string };
}) {
  const { documentId } = loaderData;
  const { data: account, isLoading: isLoadingAccount } =
    useAccountById(documentId);
  const updateAccount = useUpdateAccount();

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof AccountFormData, string[]>>
  >({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const accountData = extractAccountData(formData);
    const validation = validateAccountData(accountData);

    if (!validation.success) {
      setFormErrors(validation.error.flatten().fieldErrors);
      return;
    }
    updateAccount.mutate(
      { documentId, account: accountData },
      {
        onSuccess: () => {
          toast.success(UPDATE_ACCOUNT_MESSAGES.SUCCESS);
          navigate(ROUTES.ACCOUNTS);
        },
        onError: (error) => {
          console.log(error);
          toast.error(UPDATE_ACCOUNT_MESSAGES.ERROR, {
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <NavLink to={ROUTES.ACCOUNTS}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </NavLink>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Cuenta</h1>
          <p className="text-muted-foreground">Editar la cuenta contable</p>
        </div>
      </div>
      {isLoadingAccount ? (
        <AccountFormSkeleton />
      ) : !account ? (
        <AccountNotFound />
      ) : (
        <AccountForm
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          account={account}
        />
      )}
    </div>
  );
}
