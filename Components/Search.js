import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");


  const removeInput = () => {
    setInput("");
    onSearch("");
  };

  const handlerInputChange = (text) => {
    setInput(text);
    onSearch(text);
  }

  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.searchIcon}
        name="search-outline"
        size={20}
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
          <Ionicons name="close-circle" size={22} color={colors.text} />
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
    marginHorizontal: 22,
    marginTop: 22,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 45,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 9,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  clearButton: {
    marginLeft: 8,
  },
});
