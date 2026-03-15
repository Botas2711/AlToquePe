import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { colors } from "../Global/colors";
import { ITEM_WIDTH, ITEM_IMAGE_SIZE, FONT, RADIUS, SPACING } from "../Global/layout";

const ProductItem = ({ product, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.imageContainer} onPress={onPress}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </Pressable>

      <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

      <View style={styles.prices}>
        {product.newPrice ? (
          <>
            <Text style={styles.newPrice}>S/{product.newPrice.toFixed(2)}</Text>
            <Text style={styles.oldPrice}>S/{product.oldPrice.toFixed(2)}</Text>
          </>
        ) : (
          <Text style={styles.newPrice}>S/{product.oldPrice.toFixed(2)}</Text>
        )}
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  imageContainer: {
    backgroundColor: colors.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: ITEM_WIDTH - SPACING.md * 2,
    height: ITEM_IMAGE_SIZE,
    resizeMode: "contain",
  },
  name: {
    fontSize: FONT.sm,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
    textAlign: "left",
    marginBottom: SPACING.xs,
    width: "90%",
  },
  prices: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  newPrice: {
    fontSize: FONT.sm,
    fontFamily: "QuickSand-SemiBold",
    color: colors.black,
  },
  oldPrice: {
    fontSize: FONT.xs,
    fontFamily: "QuickSand-Light",
    color: colors.text,
    textDecorationLine: "line-through",
  },
});
