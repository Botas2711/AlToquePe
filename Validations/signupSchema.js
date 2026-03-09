import { object, string, ref } from "yup";

export const signupSchema = object().shape({
  name: string().required("El nombre es obligatorio"),
  email: string()
    .required("El correo es obligatorio")
    .email("Correo no válido"),
  phone: string()
    .required("El número es obligatorio")
    .matches(/^\d{9}$/, "El número debe tener 9 dígitos"),
  password: string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña"),
});
