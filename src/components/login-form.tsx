import { GalleryVerticalEnd } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema, type LoginValues } from "@/lib/schemas"

export type LoginServerMessage = { type: "success" | "error"; text: string } | null

type LoginFormProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  onSubmit?: (values: LoginValues) => void | Promise<void>
  serverMessage?: LoginServerMessage
}

export function LoginForm({ className, onSubmit, serverMessage, ...props }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  })

  const submit = handleSubmit(async (values) => {
    if (onSubmit) await onSubmit(values)
    else console.log("login", values)
  })

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={submit}
      noValidate
      {...props}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Ingresa tu correo para acceder a tu cuenta
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {serverMessage && (
          <div
            role={serverMessage.type === "error" ? "alert" : "status"}
            className={cn(
              "rounded-md border px-3 py-2 text-sm",
              serverMessage.type === "error"
                ? "border-destructive/50 bg-destructive/10 text-destructive"
                : "border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
            )}
          >
            {serverMessage.text}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>

        <div className="relative text-center text-sm">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            O continúa con
          </span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="underline underline-offset-4 hover:text-foreground">
            Regístrate
          </a>
        </p>
      </div>
    </form>
  )
}

type LoginPageProps = {
  onSubmit?: (values: LoginValues) => void | Promise<void>
  serverMessage?: LoginServerMessage
}

export function LoginPage({ onSubmit, serverMessage }: LoginPageProps = {}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Mi App
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={onSubmit} serverMessage={serverMessage} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Portada"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
