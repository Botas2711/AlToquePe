import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { WIDTH, FONT, SPACING } from "../Global/layout";

const AddressSuggestionItem = ({ suggestion, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={() => onPress(suggestion)}>
      <Ionicons
        name="location-outline"
        size={WIDTH * 0.045}
        color={colors.primary}
      />
      <View style={styles.text}>
        <Text style={styles.main} numberOfLines={1}>
          {suggestion.placePrediction.structuredFormat.mainText.text}
        </Text>
        <Text style={styles.secondary} numberOfLines={1}>
          {suggestion.placePrediction.structuredFormat.secondaryText?.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default AddressSuggestionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.disable,
  },
  text: { flex: 1 },
  main: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  secondary: {
    fontFamily: "QuickSand-Regular",
    fontSize: FONT.xs,
    color: colors.text,
  },
});
