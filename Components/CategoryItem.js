import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from "react-native";
import { colors } from "../Global/colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const { width } = Dimensions.get("window");

const CategoryItem = ({ category, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(category.id)}
      style={styles.container}
    >
      <View style={[styles.circle, active && styles.activeCircle]}>
        <FontAwesome6
          name={category.icon}
          size={20}
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
    width: width * 0.14,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    marginTop: 5,
    fontSize: 10,
    color: colors.text,
  },
  activeText: {
    fontFamily: "QuickSand-Bold",
    marginTop: 6,
    fontSize: 10,
    color: colors.text,
  },
});
