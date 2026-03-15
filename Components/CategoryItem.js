import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../Global/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { WIDTH, MARGIN, FONT, CATEGORY_SIZE, SPACING } from "../Global/layout";

const CategoryItem = ({ category, active, onPress, scrollable = false }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(category.id)}
      style={[styles.container, scrollable && styles.containerScrollable]}
    >
      <View style={[styles.circle, active && styles.activeCircle]}>
        <FontAwesome6
          name={category.icon}
          size={CATEGORY_SIZE * 0.4}
          color={active ? colors.black : colors.disable}
        />
      </View>
      <Text style={[styles.text, active && styles.activeText]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: SPACING.sm,
  },
  containerScrollable: {
    flex: 0,
    width: CATEGORY_SIZE * 1.1, 
    marginHorizontal: SPACING.sm,
  },
  circle: {
    width: CATEGORY_SIZE,
    height: CATEGORY_SIZE,
    borderRadius: CATEGORY_SIZE / 2,
    backgroundColor: colors.background,
    borderColor: colors.background,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCircle: {
    borderColor: colors.text,
    borderWidth: 1,
  },
  text: {
    fontFamily: "QuickSand-Regular",
    marginTop: SPACING.xs,
    fontSize: FONT.xs,
    color: colors.text,
    textAlign: "center",
  },
  activeText: {
    fontFamily: "QuickSand-Bold",
    marginTop: SPACING.xs,
    fontSize: FONT.xs,
    color: colors.text,
    textAlign: "center",
  },
});
