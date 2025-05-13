import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useState } from "react";
import { useNewAccount } from "@/features/accounts/hooks/use-accounts";
import { toast } from "sonner";
import {
  extractAccountData,
  NEW_ACCOUNT_MESSAGES,
  validateAccountData,
  type AccountFormData,
} from "@/features/accounts/lib/utils";
import { ROUTES } from "@/shared/lib/utils";

export default function NewCuentaPage() {
  const newAccount = useNewAccount();
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

    newAccount.mutate(accountData, {
      onSuccess: () => {
        toast.success(NEW_ACCOUNT_MESSAGES.SUCCESS);
        navigate(ROUTES.ACCOUNTS);
      },
      onError: (error) => {
        console.log(error);
        toast.error(NEW_ACCOUNT_MESSAGES.ERROR, {
          description: error.message,
        });
      },
    });
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
          <h1 className="text-3xl font-bold tracking-tight">Nueva Cuenta</h1>
          <p className="text-muted-foreground">
            Crea una nueva cuenta contable
          </p>
        </div>
      </div>
      <AccountForm handleSubmit={handleSubmit} formErrors={formErrors} />
    </div>
  );
}
