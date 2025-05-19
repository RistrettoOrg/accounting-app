export type Period = {
  documentId?: string;
  name: string;
  start_date: string;
  end_date: string;
  status_period: PeriodStatus;
};

export type PeriodStatus = "open" | "closed";
