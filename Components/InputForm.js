import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { WIDTH, FONT, RADIUS, SPACING } from "../Global/layout";

const InputForm = ({
  label,
  icon,
  onChange,
  error = "",
  isSecure = false,
  keyboardType = "default",
}) => {
  const [input, setInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.container}>
        {icon && (
          <Ionicons
            name={icon}
            size={WIDTH * 0.052}
            color={colors.primary}
            style={styles.icon}
          />
        )}

        <TextInput
          value={input}
          onChangeText={onChangeText}
          secureTextEntry={isSecure && !showPassword}
          style={styles.input}
          keyboardType={keyboardType}
        />
        {isSecure && (
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={WIDTH * 0.052}
            color={colors.text}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          />
        )}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.primary,
    marginBottom: SPACING.xs,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.md,
    borderColor: colors.disable,
    borderWidth: 1,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    height: WIDTH * 0.12,
  },
  containerError: {
    borderColor: colors.primary,
  },
  icon: {
    marginLeft: SPACING.xs,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.md,
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.sm,
    color: colors.text,
  },
  eyeIcon: {
    paddingHorizontal: SPACING.xs,
  },
  error: {
    marginTop: SPACING.xs,
    color: colors.text,
    fontSize: FONT.xs,
    fontFamily: "QuickSand-Medium",
  },
});
