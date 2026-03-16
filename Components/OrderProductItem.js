import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../Global/colors";
import { WIDTH, FONT, RADIUS, SPACING } from "../Global/layout";

const OrderProductItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.qty}>x{item.quantity}</Text>
      </View>
      <Text style={styles.price}>
        S/{(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
};

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.disable,
  },
  image: {
    width: WIDTH * 0.14,
    height: WIDTH * 0.14,
    resizeMode: "contain",
    borderRadius: RADIUS.sm,
    backgroundColor: colors.background,
  },
  info: { flex: 1 },
  name: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  qty: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs,
    color: colors.text,
  },
  price: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.black,
  },
});
