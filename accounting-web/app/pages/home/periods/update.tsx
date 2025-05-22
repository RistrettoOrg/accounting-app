import { Button } from "@/components/ui/button";
import { PeriodForm } from "@/features/periods/components/period-form";
import {
  usePeriodById,
  useUpdatePeriod,
} from "@/features/periods/hooks/use-periods";
import {
  extractPeriodData,
  UPDATE_PERIOD_MESSAGES,
  validatePeriodData,
  type PeriodFormData,
} from "@/features/periods/lib/utils";
import { ROUTES } from "@/shared/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import type { Route } from "../+types";

export async function loader({ params }: Route.LoaderArgs) {
  let documentId = params.documentId ? params.documentId : null;
  return { documentId };
}

export default function UpdatePeriodoPage({
  loaderData,
}: {
  loaderData: { documentId: string };
}) {
  const { documentId } = loaderData;
  const { data: period, isLoading: isLoadingJournalEntry } =
    usePeriodById(documentId);
  const navigate = useNavigate();
  const updatePeriod = useUpdatePeriod();

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof PeriodFormData, string[]>>
  >({});

  const handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const periodData = extractPeriodData(formData);
    const validation = validatePeriodData(periodData);

    if (!validation.success) {
      setFormErrors(validation.error.flatten().fieldErrors);
      return;
    }

    updatePeriod.mutate(
      { documentId: periodData.documentId ?? "", period: periodData },
      {
        onSuccess: () => {
          toast.success(UPDATE_PERIOD_MESSAGES.SUCCESS);
          navigate(ROUTES.PERIODS);
        },
        onError: (error) => {
          console.log(error);
          toast.error(UPDATE_PERIOD_MESSAGES.ERROR, {
            description: error.message,
          });
        },
      }
    );
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
          <h1 className="text-3xl font-bold tracking-tight">Editar periodo</h1>
          <p className="text-muted-foreground">Edita el periodo contable</p>
        </div>
      </div>
      <PeriodForm
        handleSubmit={handleSubmit}
        formErrors={formErrors}
        period={period}
      />
    </div>
  );
}
