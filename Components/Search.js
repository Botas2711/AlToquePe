import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { MARGIN, FONT, RADIUS, SPACING, WIDTH } from "../Global/layout";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const removeInput = () => {
    setInput("");
    onSearch("");
  };

  const handlerInputChange = (text) => {
    setInput(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.searchIcon}
        name="search-outline"
        size={WIDTH * 0.052}
        color={colors.text}
      />

      <TextInput
        style={styles.input}
        placeholder="Buscar producto"
        placeholderTextColor={colors.gray}
        value={input}
        onChangeText={handlerInputChange}
        returnKeyType="search"
      />

      {input.length > 0 && (
        <Pressable onPress={removeInput} style={styles.clearButton}>
          <Ionicons
            name="close-circle"
            size={WIDTH * 0.056}
            color={colors.text}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    marginHorizontal: MARGIN,
    marginTop: MARGIN,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
    height: WIDTH * 0.12,
    borderRadius: RADIUS.lg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT.sm,
    fontFamily: "QuickSand-Medium",
    color: colors.text,
  },
  clearButton: {
    marginLeft: SPACING.sm,
  },
});
