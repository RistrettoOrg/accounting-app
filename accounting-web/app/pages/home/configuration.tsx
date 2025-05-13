import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Percent,
  Bell,
  Palette,
  Database,
  Link2,
  Shield,
  DollarSign,
} from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administra la configuración de tu sistema contable
        </p>
      </div>

      <Tabs defaultValue="empresa" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 h-auto">
          <TabsTrigger
            value="empresa"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Building2 className="h-4 w-4" />
            <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger
            value="usuarios"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Users className="h-4 w-4" />
            <span>Usuarios</span>
          </TabsTrigger>
          <TabsTrigger
            value="impuestos"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Percent className="h-4 w-4" />
            <span>Impuestos</span>
          </TabsTrigger>
          <TabsTrigger
            value="notificaciones"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Bell className="h-4 w-4" />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger
            value="apariencia"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Palette className="h-4 w-4" />
            <span>Apariencia</span>
          </TabsTrigger>
          <TabsTrigger
            value="respaldo"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Database className="h-4 w-4" />
            <span>Respaldo</span>
          </TabsTrigger>
          <TabsTrigger
            value="integraciones"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Link2 className="h-4 w-4" />
            <span>Integraciones</span>
          </TabsTrigger>
          <TabsTrigger
            value="seguridad"
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Shield className="h-4 w-4" />
            <span>Seguridad</span>
          </TabsTrigger>
        </TabsList>

        {/* Configuración de Empresa */}
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Configura la información básica de tu empresa para documentos y
                reportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-empresa">Nombre de la Empresa</Label>
                  <Input id="nombre-empresa" defaultValue="Mi Empresa S.A." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identificacion-fiscal">
                    Identificación Fiscal
                  </Label>
                  <Input id="identificacion-fiscal" defaultValue="A12345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contacto@miempresa.com"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    defaultValue="Calle Principal 123, Ciudad"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input id="ciudad" defaultValue="Ciudad Principal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais">País</Label>
                  <Select defaultValue="argentina">
                    <SelectTrigger id="pais">
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="argentina">Argentina</SelectItem>
                      <SelectItem value="chile">Chile</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="mexico">México</SelectItem>
                      <SelectItem value="peru">Perú</SelectItem>
                      <SelectItem value="espana">España</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuración Fiscal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="moneda-principal">Moneda Principal</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="moneda-principal">
                        <SelectValue placeholder="Selecciona una moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">
                          USD - Dólar Estadounidense
                        </SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="ars">
                          ARS - Peso Argentino
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ano-fiscal">Año Fiscal</Label>
                    <Select defaultValue="enero-diciembre">
                      <SelectTrigger id="ano-fiscal">
                        <SelectValue placeholder="Selecciona el período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enero-diciembre">
                          Enero - Diciembre
                        </SelectItem>
                        <SelectItem value="abril-marzo">
                          Abril - Marzo
                        </SelectItem>
                        <SelectItem value="julio-junio">
                          Julio - Junio
                        </SelectItem>
                        <SelectItem value="octubre-septiembre">
                          Octubre - Septiembre
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Logo de la Empresa</h3>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-md border flex items-center justify-center bg-muted">
                    Logo
                  </div>
                  <Button variant="outline">Cambiar Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Usuarios */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios que tienen acceso al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Usuarios Activos</h3>
                  <p className="text-sm text-muted-foreground">
                    Gestiona los usuarios que tienen acceso al sistema
                  </p>
                </div>
                <Button>Añadir Usuario</Button>
              </div>

              <div className="border rounded-md">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">Juan Pérez</p>
                      <p className="text-sm text-muted-foreground">
                        juan@miempresa.com
                      </p>
                    </div>
                  </div>
                  <Badge>Administrador</Badge>
                </div>
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">MG</span>
                    </div>
                    <div>
                      <p className="font-medium">María González</p>
                      <p className="text-sm text-muted-foreground">
                        maria@miempresa.com
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Contador</Badge>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">RL</span>
                    </div>
                    <div>
                      <p className="font-medium">Roberto López</p>
                      <p className="text-sm text-muted-foreground">
                        roberto@miempresa.com
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Asistente</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Roles y Permisos</h3>
                <div className="border rounded-md">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div>
                      <p className="font-medium">Administrador</p>
                      <p className="text-sm text-muted-foreground">
                        Acceso completo al sistema
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div>
                      <p className="font-medium">Contador</p>
                      <p className="text-sm text-muted-foreground">
                        Acceso a módulos contables
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Asistente</p>
                      <p className="text-sm text-muted-foreground">
                        Acceso limitado de solo lectura
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button>Crear Nuevo Rol</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Impuestos */}
        <TabsContent value="impuestos">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Impuestos</CardTitle>
              <CardDescription>
                Configura los impuestos que se aplicarán en tus transacciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">
                    Impuestos Configurados
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Lista de impuestos disponibles en el sistema
                  </p>
                </div>
                <Button>Añadir Impuesto</Button>
              </div>

              <div className="border rounded-md">
                <div className="p-4 border-b flex items-center justify-between">
                  <div>
                    <p className="font-medium">IVA General</p>
                    <p className="text-sm text-muted-foreground">21%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="iva-general" defaultChecked />
                    <Button variant="ghost" size="icon">
                      <Percent className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 border-b flex items-center justify-between">
                  <div>
                    <p className="font-medium">IVA Reducido</p>
                    <p className="text-sm text-muted-foreground">10.5%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="iva-reducido" defaultChecked />
                    <Button variant="ghost" size="icon">
                      <Percent className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Retención de Ganancias</p>
                    <p className="text-sm text-muted-foreground">3%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="retencion-ganancias" />
                    <Button variant="ghost" size="icon">
                      <Percent className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Configuración General de Impuestos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="redondeo">Método de Redondeo</Label>
                    <Select defaultValue="dos-decimales">
                      <SelectTrigger id="redondeo">
                        <SelectValue placeholder="Selecciona un método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dos-decimales">
                          Dos decimales
                        </SelectItem>
                        <SelectItem value="entero-cercano">
                          Entero más cercano
                        </SelectItem>
                        <SelectItem value="sin-decimales">
                          Sin decimales
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 h-full">
                    <Switch id="mostrar-impuestos" defaultChecked />
                    <Label htmlFor="mostrar-impuestos">
                      Mostrar impuestos en facturas
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Notificaciones */}
        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>
                Personaliza las notificaciones que recibirás del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Notificaciones por Email
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-asientos">
                        Nuevos asientos contables
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando se creen nuevos asientos
                      </p>
                    </div>
                    <Switch id="email-asientos" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-periodos">Cierre de periodos</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando se cierre un periodo
                        contable
                      </p>
                    </div>
                    <Switch id="email-periodos" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-usuarios">
                        Cambios de usuarios
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones cuando se modifiquen usuarios
                      </p>
                    </div>
                    <Switch id="email-usuarios" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Notificaciones en el Sistema
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sistema-asientos">
                        Nuevos asientos contables
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Muestra notificaciones en el sistema para nuevos
                        asientos
                      </p>
                    </div>
                    <Switch id="sistema-asientos" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sistema-periodos">
                        Cierre de periodos
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Muestra notificaciones en el sistema para cierres de
                        periodo
                      </p>
                    </div>
                    <Switch id="sistema-periodos" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sistema-usuarios">
                        Cambios de usuarios
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Muestra notificaciones en el sistema para cambios de
                        usuarios
                      </p>
                    </div>
                    <Switch id="sistema-usuarios" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Frecuencia de Resúmenes</h3>
                <div className="space-y-2">
                  <Label htmlFor="frecuencia-resumen">
                    Enviar resumen de actividad
                  </Label>
                  <Select defaultValue="semanal">
                    <SelectTrigger id="frecuencia-resumen">
                      <SelectValue placeholder="Selecciona la frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="nunca">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Apariencia */}
        <TabsContent value="apariencia">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Apariencia</CardTitle>
              <CardDescription>
                Personaliza la apariencia de tu sistema contable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent">
                    <div className="h-20 w-full rounded bg-background border"></div>
                    <p className="font-medium">Claro</p>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent">
                    <div className="h-20 w-full rounded bg-slate-900 border border-slate-800"></div>
                    <p className="font-medium">Oscuro</p>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent">
                    <div className="h-20 w-full rounded bg-background border relative overflow-hidden">
                      <div className="absolute inset-0 w-1/2 bg-slate-900"></div>
                    </div>
                    <p className="font-medium">Sistema</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Densidad de Información</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent">
                    <div className="h-20 w-full rounded border flex flex-col justify-around p-2">
                      <div className="h-2 w-full rounded bg-muted"></div>
                      <div className="h-2 w-full rounded bg-muted"></div>
                      <div className="h-2 w-full rounded bg-muted"></div>
                    </div>
                    <p className="font-medium">Compacta</p>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent">
                    <div className="h-20 w-full rounded border flex flex-col justify-around p-2">
                      <div className="h-3 w-full rounded bg-muted"></div>
                      <div className="h-3 w-full rounded bg-muted"></div>
                    </div>
                    <p className="font-medium">Normal</p>
                  </div>
                  <div className="border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-accent">
                    <div className="h-20 w-full rounded border flex flex-col justify-around p-2">
                      <div className="h-5 w-full rounded bg-muted"></div>
                    </div>
                    <p className="font-medium">Espaciada</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personalización</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color-primario">Color Primario</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer border"></div>
                      <div className="h-10 w-10 rounded-full bg-green-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-purple-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-orange-500 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-red-500 cursor-pointer"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuente">Fuente</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger id="fuente">
                        <SelectValue placeholder="Selecciona una fuente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                        <SelectItem value="lato">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Restablecer Valores</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Respaldo */}
        <TabsContent value="respaldo">
          <Card>
            <CardHeader>
              <CardTitle>Respaldo y Restauración</CardTitle>
              <CardDescription>
                Gestiona las copias de seguridad de tus datos contables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Respaldo Manual</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button className="w-full md:w-auto">
                    Crear Respaldo Ahora
                  </Button>
                  <Button variant="outline" className="w-full md:w-auto">
                    Restaurar desde Archivo
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Respaldo Automático</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="respaldo-automatico">
                        Activar respaldo automático
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Crea copias de seguridad automáticamente según la
                        frecuencia seleccionada
                      </p>
                    </div>
                    <Switch id="respaldo-automatico" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frecuencia-respaldo">
                    Frecuencia de respaldo
                  </Label>
                  <Select defaultValue="diario">
                    <SelectTrigger id="frecuencia-respaldo">
                      <SelectValue placeholder="Selecciona la frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diario</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensual">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copias-mantener">Copias a mantener</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="copias-mantener">
                      <SelectValue placeholder="Selecciona la cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 copias</SelectItem>
                      <SelectItem value="5">5 copias</SelectItem>
                      <SelectItem value="10">10 copias</SelectItem>
                      <SelectItem value="20">20 copias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Historial de Respaldos</h3>
                <div className="border rounded-md">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div>
                      <p className="font-medium">Respaldo Automático</p>
                      <p className="text-sm text-muted-foreground">
                        02/05/2025 - 08:00
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        Restaurar
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div>
                      <p className="font-medium">Respaldo Manual</p>
                      <p className="text-sm text-muted-foreground">
                        01/05/2025 - 14:30
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        Restaurar
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Respaldo Automático</p>
                      <p className="text-sm text-muted-foreground">
                        01/05/2025 - 08:00
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        Restaurar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Integraciones */}
        <TabsContent value="integraciones">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
              <CardDescription>
                Conecta tu sistema contable con otras aplicaciones y servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Integraciones Disponibles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sistema de Facturación</p>
                        <p className="text-sm text-muted-foreground">
                          Conecta con tu sistema de facturación
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Conectar</Button>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Pasarela de Pagos</p>
                        <p className="text-sm text-muted-foreground">
                          Integra con tu pasarela de pagos
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Conectar</Button>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sistema de RRHH</p>
                        <p className="text-sm text-muted-foreground">
                          Conecta con tu sistema de recursos humanos
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Conectar</Button>
                  </div>
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-orange-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Banco</p>
                        <p className="text-sm text-muted-foreground">
                          Conecta con tu cuenta bancaria
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Conectar</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API y Desarrolladores</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-acceso">Habilitar acceso API</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite que aplicaciones externas accedan a tus datos
                        contables
                      </p>
                    </div>
                    <Switch id="api-acceso" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      value="••••••••••••••••••••••••••••••"
                      readOnly
                    />
                    <Button variant="outline">Generar Nueva</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Esta clave es necesaria para autenticar solicitudes a la API
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Seguridad */}
        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>
                Gestiona la seguridad de tu sistema contable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Política de Contraseñas</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="contrasena-complejidad">
                        Requerir contraseñas complejas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Exigir mayúsculas, minúsculas, números y símbolos
                      </p>
                    </div>
                    <Switch id="contrasena-complejidad" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="contrasena-expiracion">
                        Expiración de contraseñas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Solicitar cambio de contraseña cada 90 días
                      </p>
                    </div>
                    <Switch id="contrasena-expiracion" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrasena-longitud">
                    Longitud mínima de contraseña
                  </Label>
                  <Select defaultValue="8">
                    <SelectTrigger id="contrasena-longitud">
                      <SelectValue placeholder="Selecciona la longitud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 caracteres</SelectItem>
                      <SelectItem value="8">8 caracteres</SelectItem>
                      <SelectItem value="10">10 caracteres</SelectItem>
                      <SelectItem value="12">12 caracteres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Autenticación de Dos Factores
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa-requerido">
                        Requerir 2FA para todos los usuarios
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Todos los usuarios deberán configurar la autenticación
                        de dos factores
                      </p>
                    </div>
                    <Switch id="2fa-requerido" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="2fa-metodo">Método de 2FA preferido</Label>
                  <Select defaultValue="app">
                    <SelectTrigger id="2fa-metodo">
                      <SelectValue placeholder="Selecciona el método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">
                        Aplicación de autenticación
                      </SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Registro de Actividad</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="registro-actividad">
                        Mantener registro de actividad
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Registrar todas las acciones realizadas en el sistema
                      </p>
                    </div>
                    <Switch id="registro-actividad" defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registro-retencion">
                    Periodo de retención de registros
                  </Label>
                  <Select defaultValue="365">
                    <SelectTrigger id="registro-retencion">
                      <SelectValue placeholder="Selecciona el periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90 días</SelectItem>
                      <SelectItem value="180">180 días</SelectItem>
                      <SelectItem value="365">1 año</SelectItem>
                      <SelectItem value="730">2 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">Ver Registro de Actividad</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
