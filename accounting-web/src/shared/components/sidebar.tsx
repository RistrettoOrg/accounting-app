"use client";

import { ROUTES } from "@/shared/lib/utils";
import {
  BarChart3,
  CalendarRange,
  CreditCard,
  DollarSign,
  FileText,
  LogOut,
  Settings,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useUserSession } from "@/shared/hooks/use-session";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: ROUTES.HOME,
    color: "text-sky-500",
  },
  {
    label: "Asientos Contables",
    icon: FileText,
    href: ROUTES.JOURNAL_ENTRIES,
    color: "text-orange-500",
  },
  {
    label: "Cuentas",
    icon: CreditCard,
    href: ROUTES.ACCOUNTS,
    color: "text-violet-500",
  },
  // {
  //   label: "Monedas",
  //   icon: DollarSign,
  //   href: ROUTES.CURRENCIES,
  //   color: "text-pink-700",
  // },
  {
    label: "Periodos",
    icon: CalendarRange,
    href: ROUTES.PERIODS,
    color: "text-emerald-500",
  },
  {
    label: "Balances",
    icon: FileText,
    href: ROUTES.BALANCES,
    color: "text-pink-700",
  },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { logout } = useUserSession();
  const navigate = useNavigate();
  return (
    <ShadcnSidebar>
      <SidebarHeader className="py-4 border-b ">
        <NavLink
          to={ROUTES.HOME}
          className="flex items-center gap-2 font-bold text-xl"
        >
          <FileText className="h-6 w-6" />
          <span>Contabilidad</span>
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href}>
                <NavLink
                  to={route.href}
                  className="flex items-center gap-3 text-lg font-medium"
                >
                  <route.icon className={cn("h-4 w-4", route.color)} />
                  <span>{route.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
      <Button
        variant="outline"
        className="flex items-center gap-2 mb-4 mx-4"
        onClick={() => navigate(ROUTES.SETTINGS)}
      >
        <Settings className="h-4 w-4" />
        <span className="ml-2">Configuración</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 mb-4 mx-4"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        {/* <Settings className="h-4 w-4" /> */}
        <LogOut />
        <span className="ml-2">Cerrar sesión</span>
      </Button>
    </ShadcnSidebar>
  );
}
