export default function AccountNotFound() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Cuenta no encontrada
        </h1>
        <p className="text-muted-foreground">
          La cuenta que estás buscando no existe o ha sido eliminada.
        </p>
      </div>
    </div>
  );
}
