import type React from "react";
import type { Route } from "./+types";
import { Outlet, useNavigate } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useUserSession } from "@/shared/hooks/use-session";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/shared/components/sidebar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sistema de Contabilidad" },
    {
      name: "description",
      content:
        "Aplicación de contabilidad con gestión de cuentas, monedas, asientos contables y periodos",
    },
  ];
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserSession();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [user]);

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="text-lg font-semibold">Sistema de Contabilidad</div>
        </header>
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
