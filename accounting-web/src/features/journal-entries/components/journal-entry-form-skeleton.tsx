import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalEntryFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Asiento</CardTitle>
        <CardDescription>
          Ingresa los detalles del asiento contable
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className=" h-[100px] rounded-xl" />
          <Skeleton className=" h-[100px] rounded-xl" />
        </div>

        <div className="space-y-2">
          <Skeleton className=" h-[100px] rounded-xl" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Skeleton className="w-[100px] h-[40px] rounded-lg" />
        <Skeleton className="w-[100px] h-[40px] rounded-lg" />
      </CardFooter>
    </Card>
  );
}
