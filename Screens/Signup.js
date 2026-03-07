import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import InputForm from "../Components/InputForm";
import { colors } from "../Global/colors";

const Signup = ({ navigation }) => {
  const onSubmit = () => {};

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
            onChange={() => {}}
          />

          <InputForm label="Correo" icon="mail" onChange={() => {}} />

          <InputForm label="Número" icon="call" onChange={() => {}} />

          <InputForm
            label="Contraseña"
            icon="lock-closed"
            isSecure
            onChange={() => {}}
          />

          <InputForm
            label="Repetir contraseña"
            icon="lock-closed"
            isSecure
            onChange={() => {}}
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
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
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
