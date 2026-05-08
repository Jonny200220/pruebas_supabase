import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { GalleryVerticalEnd } from "lucide-react"
import { supabase } from "@/utils/supabase"
import { Button } from "@/components/ui/button"

type Status = "loading" | "success" | "error"

export default function ConfirmSignup() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>("loading")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setStatus("success")
      } else if (event === "USER_UPDATED") {
        setStatus("success")
      }
    })

    // Supabase procesa el token del hash automáticamente al detectar la URL
    // Si hay un error en el hash lo capturamos aquí
    const hash = window.location.hash
    if (hash.includes("error=")) {
      const params = new URLSearchParams(hash.replace("#", ""))
      setErrorMsg(params.get("error_description") ?? "El enlace no es válido o ha expirado.")
      setStatus("error")
    }
  }, [])

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Mi App
        </a>

        {status === "loading" && (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Confirmando tu cuenta...</h1>
              <p className="text-sm text-muted-foreground">
                Espera un momento, estamos verificando tu correo.
              </p>
            </div>
            <div className="size-8 animate-spin rounded-full border-4 border-border border-t-primary" />
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-7" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7"/></svg>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">¡Cuenta confirmada!</h1>
              <p className="text-sm text-muted-foreground">
                Tu correo fue verificado correctamente. Ya puedes iniciar sesión.
              </p>
            </div>
            <Button className="w-full" onClick={() => navigate("/", { replace: true })}>
              Ir a iniciar sesión
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="size-7" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Enlace inválido</h1>
              <p className="text-sm text-muted-foreground">
                {errorMsg || "El enlace de confirmación no es válido o ya expiró."}
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => navigate("/registro", { replace: true })}>
              Volver al registro
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
