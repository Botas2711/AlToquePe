import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/features/Auth/authSlice";
import InputForm from "../Components/InputForm";
import { colors } from "../Global/colors";
import { useLoginMutation } from "../Services/authService";
import { useGetUserByIdQuery } from "../Services/userService";
import { userApi } from "../Services/userService";
import Toast from "react-native-toast-message";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();
  const [triggerLogin] = useLoginMutation();

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const onSubmit = async () => {
    setErrorEmail("");
    setErrorPassword("");

    if (!email.trim()) return setErrorEmail("El correo es obligatorio");
    if (!password.trim())
      return setErrorPassword("La contraseña es obligatoria");

    try {
      const result = await triggerLogin({ email, password }).unwrap();

      const userData = await dispatch(
        userApi.endpoints.getUserById.initiate(result.localId),
      ).unwrap();

      dispatch(
        setUser({
          idToken: result.idToken,
          localId: result.localId,
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
        }),
      );

      Toast.show({
        type: "success",
        text1: `¡Bienvenido, ${userData.name}!`,
        text2: "Nos alegra tenerte de vuelta",
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al iniciar sesión",
        text2: "Correo o contraseña incorrectos",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Animated.Image
            source={require("../assets/images/logo.png")}
            style={[styles.logo, { transform: [{ translateY: bounceAnim }] }]}
          />
          <Text style={styles.title}>Bienvenido a AlToquePe</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.form}>
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
          />

          <InputForm
            label="Contaseña"
            icon="lock-closed"
            value={password}
            onChange={(value) => {
              setPassword(value);
              if (value.length >= 6) setErrorPassword("");
            }}
            isSecure={true}
            error={errorPassword}
          />
        </View>

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>

          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.register}>Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
    marginBottom: 25,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: 22,
    color: colors.black,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "QuickSand-Medium",
    color: colors.text,
    marginTop: 4,
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
  register: {
    color: colors.primary,
    fontFamily: "QuickSand-SemiBold",
  },
});
