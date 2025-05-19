import { Button } from "@/components/ui/button";
import { PeriodForm } from "@/features/periods/components/period-form";
import { useNewPeriod } from "@/features/periods/hooks/use-periods";
import {
  extractPeriodData,
  NEW_PERIOD_MESSAGES,
  validatePeriodData,
} from "@/features/periods/lib/utils";
import { ROUTES } from "@/shared/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export default function NewPeriodPage() {
  const navigate = useNavigate();
  const newPeriod = useNewPeriod();

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof PeriodFormData, string[]>>
  >({});

  const handleSubmit = (event: React.FormEvent<Element>) => {
    console.log("handleSubmit");
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const periodData = extractPeriodData(formData);
    console.log("periodData", periodData);
    const validation = validatePeriodData(periodData);

    if (!validation.success) {
      console.log("validation.error", validation.error.flatten().fieldErrors);
      setFormErrors(validation.error.flatten().fieldErrors);
      return;
    }
    console.log("periodData", periodData);

    newPeriod.mutate(periodData, {
      onSuccess: () => {
        toast.success(NEW_PERIOD_MESSAGES.SUCCESS);
        navigate(ROUTES.PERIODS);
      },
      onError: (error) => {
        console.log(error);
        toast.error(NEW_PERIOD_MESSAGES.ERROR, {
          description: error.message,
        });
      },
    });
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <NavLink to={ROUTES.PERIODS}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </NavLink>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo periodo</h1>
          <p className="text-muted-foreground">
            Crea un nuevo periodo contable
          </p>
        </div>
      </div>
      <PeriodForm handleSubmit={handleSubmit} formErrors={formErrors} />
    </div>
  );
}
