import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";

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
            size={21}
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
            size={21}
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
    marginBottom: 18,
  },
  label: {
    fontFamily: "QuickSand-Medium",
    fontSize: 14,
    color: colors.primary,
    marginBottom: 6,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.disable,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginLeft: 6,
  },
  input: {
    flex: 1,
    marginLeft: 14,
    fontFamily: "QuickSand-SemiBold",
    fontSize: 15,
    color: colors.text,
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
  error: {
    marginTop: 4,
    color: colors.black,
    fontSize: 12,
  },
});
