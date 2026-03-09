import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useRef, useState } from "react";
import InputForm from "../Components/InputForm";
import { colors } from "../Global/colors";
import { useSignUpMutation } from "../Services/authService";
import { useSaveUserMutation } from "../Services/userService";
import { signupSchema } from "../Validations/signupSchema";
import Toast from "react-native-toast-message";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const [triggerSignup] = useSignUpMutation();
  const [triggerSaveUser] = useSaveUserMutation();

  const onSubmit = async () => {
    setErrorName("");
    setErrorEmail("");
    setErrorPhone("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    try {
      await signupSchema.validate(
        { name, email, phone, password, confirmPassword },
        { abortEarly: false },
      );
    } catch (error) {
      error.inner.forEach((err) => {
        switch (err.path) {
          case "name":
            setErrorName(err.message);
            break;
          case "email":
            setErrorEmail(err.message);
            break;
          case "phone":
            setErrorPhone(err.message);
            break;
          case "password":
            setErrorPassword(err.message);
            break;
          case "confirmPassword":
            setErrorConfirmPassword(err.message);
            break;
        }
      });
      return;
    }

    try {
      const result = await triggerSignup({ email, password }).unwrap();

      await triggerSaveUser({
        localId: result.localId,
        name,
        phone,
        email,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "¡Cuenta creada!",
        text2: "Bienvenido a AlToquePe",
        visibilityTime: 3000,
      });
      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al crear la cuenta",
        text2: "Por favor, intenta de nuevo",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para empezar a comprar</Text>
        </View>

        <View style={styles.form}>
          <InputForm
            label="Nombre completo"
            icon="person"
            value={name}
            onChange={(value) => {
              setName(value);
              if (value.trim()) setErrorName("");
            }}
            error={errorName}
            keyboardType="default"
          />

          <InputForm
            label="Correo"
            icon="mail"
            value={email}
            onChange={(value) => {
              setEmail(value);
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(value)) setErrorEmail("");
            }}
            error={errorEmail}
            keyboardType="email-address"
          />

          <InputForm
            label="Telefono"
            icon="call"
            value={phone}
            onChange={(value) => {
              setPhone(value);
              if (/^\d{9}$/.test(value)) setErrorPhone("");
            }}
            error={errorPhone}
            keyboardType="phone-pad"
          />

          <InputForm
            label="Contraseña"
            icon="lock-closed"
            isSecure
            value={password}
            onChange={(value) => {
              setPassword(value);
              if (value.length >= 6) setErrorPassword("");
            }}
            error={errorPassword}
            keyboardType="default"
          />

          <InputForm
            label="Repetir contraseña"
            icon="lock-closed"
            isSecure
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              if (value === password) setErrorConfirmPassword("");
            }}
            error={errorConfirmPassword}
            keyboardType="default"
          />
        </View>

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.login}>Inicia sesión</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 24,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "QuickSand-Medium",
    color: colors.text,
    marginTop: 4,
  },
  form: {
    marginTop: 3,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "QuickSand-SemiBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontFamily: "QuickSand-Medium",
    color: colors.text,
    marginRight: 5,
  },
  login: {
    color: colors.primary,
    fontFamily: "QuickSand-SemiBold",
  },
});
