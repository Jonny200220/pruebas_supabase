import {
  LayoutDashboardIcon,
  HardHatIcon,
  ClipboardListIcon,
  UsersIcon,
  PackageIcon,
  TruckIcon,
  BarChart3Icon,
  SettingsIcon,
  BuildingIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  { title: "Proyectos", url: "#", icon: BuildingIcon },
  { title: "Tareas", url: "#", icon: ClipboardListIcon },
  { title: "Personal", url: "#", icon: UsersIcon },
  { title: "Materiales", url: "#", icon: PackageIcon },
  { title: "Proveedores", url: "#", icon: TruckIcon },
  { title: "Reportes", url: "#", icon: BarChart3Icon },
  { title: "Configuración", url: "#", icon: SettingsIcon },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <HardHatIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">ObraControl</span>
            <span className="text-xs text-muted-foreground">v1.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === "/dashboard"}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Juan Díaz</span>
            <span className="text-xs text-muted-foreground">Supervisor de Obra</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
