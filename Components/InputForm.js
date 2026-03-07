import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";

const InputForm = ({ label, icon, onChange, error = "", isSecure = false }) => {
  const [input, setInput] = useState("");
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
          secureTextEntry={isSecure}
          style={styles.input}
        />
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
    padding: 10,
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
  error: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
