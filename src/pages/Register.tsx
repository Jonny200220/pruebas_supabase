import { useState } from "react"
import { RegisterForm, type RegisterServerMessage } from "@/components/register-form"
import { supabase } from "@/utils/supabase"
import type { RegisterValues } from "@/lib/schemas"

export default function Register() {
  const [serverMessage, setServerMessage] = useState<RegisterServerMessage>(null)

  const handleRegister = async ({ name, email, password }: RegisterValues) => {
    setServerMessage(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) {
      setServerMessage({ type: "error", text: error.message })
      return
    }

    // Supabase devuelve un user "fantasma" con identities = [] cuando el correo ya existe
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setServerMessage({
        type: "error",
        text: "Ya existe una cuenta con este correo. Inicia sesión o revisa tu bandeja de entrada para confirmarla.",
      })
      return
    }

    setServerMessage({
      type: "success",
      text: "Registro exitoso. Te enviamos un correo de confirmación, revísalo para activar tu cuenta.",
    })
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onSubmit={handleRegister} serverMessage={serverMessage} />
      </div>
    </div>
  )
}
