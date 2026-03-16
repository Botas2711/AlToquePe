import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/features/Cart/cartSlice";
import { colors } from "../Global/colors";
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
} from "../Global/layout";

const STEPS = [
  { key: "received", label: "Pedido recibido", icon: "receipt-outline" },
  { key: "preparing", label: "Empacando", icon: "cube-outline" },
  { key: "onWay", label: "En camino", icon: "bicycle-outline" },
  { key: "delivered", label: "Entregado", icon: "home-outline" },
];

const STEP_DURATION = 2500;

const OrderSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [finished, setFinished] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    STEPS.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);

        Animated.timing(progressAnim, {
          toValue: (index + 1) / STEPS.length,
          duration: STEP_DURATION - 200,
          useNativeDriver: false,
        }).start();

        if (index === STEPS.length - 1) {
          setTimeout(() => setFinished(true), STEP_DURATION);
        }
      }, index * STEP_DURATION);
    });
  }, []);

  const handleFinish = () => {
    dispatch(clearCart());
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dy82mv8wb/image/upload/v1773615343/delivery_jtjv29.gif",
          }}
          style={styles.gif}
          contentFit="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>
          {finished ? "¡Pedido entregado!" : "Estamos procesando tu pedido"}
        </Text>
        <Text style={styles.subtitle}>
          {finished
            ? "Gracias por comprar en AlToquePe"
            : STEPS[currentStep].label}
        </Text>
      </Animated.View>

      <Animated.View style={[styles.progressSection, { opacity: fadeAnim }]}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        <View style={styles.stepsContainer}>
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <View key={step.key} style={styles.step}>
                <View
                  style={[
                    styles.stepIcon,
                    isCompleted && styles.stepIconCompleted,
                    isActive && styles.stepIconActive,
                  ]}
                >
                  <Ionicons
                    name={isCompleted ? "checkmark" : step.icon}
                    size={WIDTH * 0.045}
                    color={
                      isCompleted || isActive
                        ? colors.background
                        : colors.disable
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    isCompleted && styles.stepLabelCompleted,
                    isActive && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {finished && (
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <Pressable style={styles.button} onPress={handleFinish}>
            <Ionicons
              name="home-outline"
              size={WIDTH * 0.05}
              color={colors.background}
            />
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: MARGIN,
    gap: SPACING.xl,
  },
  gif: {
    width: WIDTH * 0.75,
    height: WIDTH * 0.55,
    resizeMode: "contain",
  },
  titleContainer: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.xl,
    color: colors.black,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.md,
    color: colors.text,
    textAlign: "center",
  },
  progressSection: {
    width: "100%",
    gap: SPACING.md,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: colors.disable,
    borderRadius: RADIUS.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: RADIUS.full,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  step: {
    alignItems: "center",
    gap: SPACING.xs,
    flex: 1,
  },
  stepIcon: {
    width: WIDTH * 0.1,
    height: WIDTH * 0.1,
    borderRadius: RADIUS.full,
    backgroundColor: colors.disable + "40",
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconActive: {
    backgroundColor: colors.primary,
    borderRadius: RADIUS.full,
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  stepIconCompleted: {
    backgroundColor: colors.primary + "80",
    borderRadius: RADIUS.full,
  },
  stepLabel: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs * 0.9,
    color: colors.disable,
    textAlign: "center",
  },
  stepLabelActive: {
    fontFamily: "QuickSand-Bold",
    color: colors.primary,
  },
  stepLabelCompleted: {
    color: colors.text,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  buttonText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.background,
  },
});
