import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputGroup({
  label,
  name,
  placeholder,
  helper,
  error,
  defaultValue = "",
}: {
  label: string;
  name: string;
  placeholder: string;
  helper: string;
  error?: string[];
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-base">
        {label} <span className="text-destructive">*</span>
      </Label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && <p className="text-sm text-destructive">{error[0]}</p>}
      <p className="text-sm text-muted-foreground">{helper}</p>
    </div>
  );
}
