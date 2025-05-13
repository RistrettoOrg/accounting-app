// export default function RootPage() {
//   return (
//     <p>
//       <a href={`http://localhost:1337/api/connect/auth0`}>
//         <button style={{ width: "150px" }}>Connect to Auth0</button>
//       </a>
//     </p>
//   );
// }

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, NavLink, useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { useUserSession } from "@/shared/hooks/use-session";
import { useEffect } from "react";

export default function LoginPage() {
  const { user } = useUserSession();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [user]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="absolute top-8 flex items-center gap-2 text-lg font-bold">
        <FileText className="h-6 w-6" />
        <span>Sistema de Contabilidad</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="nombre@empresa.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <NavLink
                to="/recuperar-contrasena"
                className="text-sm text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </NavLink>
            </div>
            <Input id="password" type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Recordar mi sesión
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full">Iniciar Sesión</Button>
          <Separator className="my-4" />
          <Button className="w-full" variant="outline" asChild>
            <Link to="http://localhost:1337/api/connect/auth0">
              Ingresar con Auth0
            </Link>
          </Button>
        </CardFooter>
        <CardFooter className="flex flex-col gap-4"></CardFooter>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 Sistema de Contabilidad. Todos los derechos reservados.</p>
      </div>
    </div>
  );
}
