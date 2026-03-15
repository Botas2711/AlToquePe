import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/features/Auth/authSlice";
import InputForm from "../Components/InputForm";
import { colors } from "../Global/colors";
import { useLoginMutation } from "../Services/authService";
import { userApi } from "../Services/userService";
import Toast from "react-native-toast-message";
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
} from "../Global/layout";

const LOGO_SIZE = WIDTH * 0.2;

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

      const profileImageData = await dispatch(
        userApi.endpoints.getProfileImage.initiate(result.localId),
      ).unwrap();

      const addressesData = await dispatch(
        userApi.endpoints.getAddresses.initiate(result.localId),
      ).unwrap();

      const addresses = addressesData ? Object.values(addressesData) : [];
      const activeAddress = addresses.find((addr) => addr.active === true) || null;

      dispatch(
        setUser({
          idToken: result.idToken,
          localId: result.localId,
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          profileImage: profileImageData?.image || null,
          activeAddress: activeAddress,
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
    padding: MARGIN,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: RADIUS.xl,
    padding: MARGIN * 1.2,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: SPACING.md,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.xl,
    color: colors.black,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT.sm,
    fontFamily: "QuickSand-Medium",
    color: colors.text,
    marginTop: SPACING.xs,
  },
  form: {
    marginTop: SPACING.sm,
  },
  button: {
    backgroundColor: colors.primary,
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xs,
  },
  buttonText: {
    color: "white",
    fontSize: FONT.md,
    fontFamily: "QuickSand-SemiBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.lg,
    gap: SPACING.xs,
  },
  footerText: {
    fontFamily: "QuickSand-Medium",
    color: colors.text,
  },
  register: {
    color: colors.primary,
    fontFamily: "QuickSand-SemiBold",
  },
});
