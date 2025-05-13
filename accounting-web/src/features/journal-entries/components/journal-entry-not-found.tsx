export default function JournalEntryNotFound() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Asiento contable no encontrado
        </h1>
        <p className="text-muted-foreground">
          El asiento contable que estás buscando no existe o ha sido eliminado.
        </p>
      </div>
    </div>
  );
}
