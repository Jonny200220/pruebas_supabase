import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  BuildingIcon,
  TrendingUpIcon,
  UsersIcon,
  PackageIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  BellIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

// --- Mock data ---

const kpis = [
  {
    label: "Proyectos Activos",
    value: "8",
    sub: "+2 este mes",
    icon: BuildingIcon,
    color: "text-blue-500",
  },
  {
    label: "Avance General",
    value: "63%",
    sub: "Promedio de obras",
    icon: TrendingUpIcon,
    color: "text-green-500",
  },
  {
    label: "Personal en Obra",
    value: "142",
    sub: "12 ausentes hoy",
    icon: UsersIcon,
    color: "text-yellow-500",
  },
  {
    label: "Materiales Pedidos",
    value: "34",
    sub: "6 pendientes de entrega",
    icon: PackageIcon,
    color: "text-purple-500",
  },
];

const avanceData = [
  { mes: "Ene", ejecutado: 40, planificado: 50 },
  { mes: "Feb", ejecutado: 55, planificado: 60 },
  { mes: "Mar", ejecutado: 60, planificado: 65 },
  { mes: "Abr", ejecutado: 58, planificado: 70 },
  { mes: "May", ejecutado: 72, planificado: 75 },
  { mes: "Jun", ejecutado: 80, planificado: 80 },
];

const avanceConfig = {
  ejecutado: { label: "Ejecutado (%)", color: "#3b82f6" },
  planificado: { label: "Planificado (%)", color: "#d1d5db" },
} satisfies ChartConfig;

const gastoData = [
  { semana: "S1", mano_obra: 45000, materiales: 32000, equipos: 12000 },
  { semana: "S2", mano_obra: 48000, materiales: 28000, equipos: 15000 },
  { semana: "S3", mano_obra: 52000, materiales: 41000, equipos: 10000 },
  { semana: "S4", mano_obra: 47000, materiales: 36000, equipos: 13000 },
];

const gastoConfig = {
  mano_obra: { label: "Mano de Obra", color: "#3b82f6" },
  materiales: { label: "Materiales", color: "#10b981" },
  equipos: { label: "Equipos", color: "#f59e0b" },
} satisfies ChartConfig;

const distribucionData = [
  { name: "Cimentación", value: 20, color: "#3b82f6" },
  { name: "Estructura", value: 35, color: "#10b981" },
  { name: "Acabados", value: 25, color: "#f59e0b" },
  { name: "Instalaciones", value: 20, color: "#8b5cf6" },
];

const proyectos = [
  { nombre: "Torre Residencial Norte", avance: 78, estado: "En tiempo", vence: "15/08/2025" },
  { nombre: "Centro Comercial Oriente", avance: 45, estado: "Retrasado", vence: "01/06/2025" },
  { nombre: "Puente Av. Principal", avance: 92, estado: "Adelantado", vence: "30/05/2025" },
  { nombre: "Urbanización Los Pinos", avance: 30, estado: "En tiempo", vence: "20/11/2025" },
  { nombre: "Bodega Industrial Sur", avance: 61, estado: "Retrasado", vence: "10/07/2025" },
];

const actividades = [
  { tipo: "alerta", descripcion: "Retraso en entrega de concreto - Torre Norte", hora: "Hace 20 min" },
  { tipo: "ok", descripcion: "Colada de losa nivel 8 completada - Torre Norte", hora: "Hace 1 h" },
  { tipo: "info", descripcion: "Nuevo contrato firmado - Bodega Industrial", hora: "Hace 2 h" },
  { tipo: "alerta", descripcion: "Incidencia de seguridad reportada - Puente Av.", hora: "Hace 3 h" },
  { tipo: "ok", descripcion: "Inspección aprobada - Centro Comercial Oriente", hora: "Hace 5 h" },
  { tipo: "info", descripcion: "Pedido de materiales #387 enviado", hora: "Hace 6 h" },
];

// --- Helpers ---

function estadoBadge(estado: string) {
  if (estado === "Retrasado") return <Badge variant="destructive">{estado}</Badge>;
  if (estado === "Adelantado") return <Badge className="bg-green-500 text-white hover:bg-green-600">{estado}</Badge>;
  return <Badge variant="secondary">{estado}</Badge>;
}

function actividadIcon(tipo: string) {
  if (tipo === "alerta") return <AlertTriangleIcon className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />;
  if (tipo === "ok") return <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />;
  return <ClockIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />;
}

// --- Dashboard ---

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between border-b px-6 py-3 bg-background sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <div>
              <h1 className="text-base font-semibold leading-none">Dashboard</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Resumen general de obras</p>
            </div>
          </div>
          <button className="relative rounded-full p-2 hover:bg-muted transition-colors">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </header>

        <main className="flex-1 p-6 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <Card key={kpi.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </CardTitle>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Avance vs Planificado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Avance vs Planificado</CardTitle>
                <CardDescription>Porcentaje acumulado mensual</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={avanceConfig} className="h-[220px] w-full">
                  <LineChart data={avanceData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs" unit="%" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line dataKey="ejecutado" stroke="var(--color-ejecutado)" strokeWidth={2} dot={{ r: 3 }} />
                    <Line dataKey="planificado" stroke="var(--color-planificado)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Gasto semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Gasto Semanal</CardTitle>
                <CardDescription>Desglose por categoría (MXN)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={gastoConfig} className="h-[220px] w-full">
                  <BarChart data={gastoData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="semana" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="mano_obra" fill="var(--color-mano_obra)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="materiales" fill="var(--color-materiales)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="equipos" fill="var(--color-equipos)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Projects + Pie + Activity */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Projects table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Estado de Proyectos</CardTitle>
                <CardDescription>Avance y fechas de entrega</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proyecto</TableHead>
                      <TableHead className="w-[100px]">Avance</TableHead>
                      <TableHead className="w-[110px]">Estado</TableHead>
                      <TableHead className="w-[110px]">Vence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proyectos.map((p) => (
                      <TableRow key={p.nombre}>
                        <TableCell className="font-medium text-sm">{p.nombre}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={p.avance} className="h-2 w-16" />
                            <span className="text-xs text-muted-foreground">{p.avance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{estadoBadge(p.estado)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{p.vence}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pie chart + Activity */}
            <div className="flex flex-col gap-4">
              {/* Distribución de trabajo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Distribución de Trabajo</CardTitle>
                  <CardDescription>Por tipo de actividad</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <div className="relative">
                    <PieChart width={160} height={160}>
                      <Pie data={distribucionData} dataKey="value" cx={75} cy={75} innerRadius={45} outerRadius={70}>
                        {distribucionData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className="ml-2 flex flex-col gap-1.5">
                    {distribucionData.map((d) => (
                      <div key={d.name} className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-xs text-muted-foreground">{d.name}</span>
                        <span className="text-xs font-medium ml-auto">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity feed */}
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {actividades.map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {actividadIcon(a.tipo)}
                      <div className="flex flex-col min-w-0">
                        <p className="text-xs leading-tight">{a.descripcion}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{a.hora}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
