import { useState } from "react"
import { useNavigate } from "react-router"
import { LoginPage, type LoginServerMessage } from "@/components/login-form"
import { supabase } from "@/utils/supabase"
import type { LoginValues } from "@/lib/schemas"

export default function Login() {
  const navigate = useNavigate()
  const [serverMessage, setServerMessage] = useState<LoginServerMessage>(null)

  const handleLogin = async ({ email, password }: LoginValues) => {
    setServerMessage(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      const code = error.code ?? ""
      const msg = error.message?.toLowerCase() ?? ""

      if (code === "email_not_confirmed" || msg.includes("not confirmed")) {
        setServerMessage({
          type: "error",
          text: "Necesitas autenticarte. Por favor revisa tu correo para confirmar tu cuenta.",
        })
        return
      }

      if (code === "invalid_credentials" || msg.includes("invalid login")) {
        setServerMessage({
          type: "error",
          text: "Correo o contraseña incorrectos.",
        })
        return
      }

      setServerMessage({ type: "error", text: error.message })
      return
    }

    if (data.session) {
      navigate("/dashboard", { replace: true })
    }
  }

  return <LoginPage onSubmit={handleLogin} serverMessage={serverMessage} />
}
