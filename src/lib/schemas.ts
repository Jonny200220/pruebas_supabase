import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo electrónico no válido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export type LoginValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z
      .string()
      .min(1, "El correo es obligatorio")
      .email("Correo electrónico no válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export type RegisterValues = z.infer<typeof registerSchema>
