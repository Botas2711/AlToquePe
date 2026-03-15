import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../Global/colors";
import {
  WIDTH,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  SLIDER_HEIGHT,
} from "../Global/layout";

const SLIDER_WIDTH = WIDTH - MARGIN * 2;
const IMAGE_SIZE = SLIDER_HEIGHT * 0.85;

const ProductOffer = ({ product, onPress }) => {
  return (
    <LinearGradient
      colors={[product.color, colors.background]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.boxContainer}
    >
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title}>{product.name}</Text>

        <View style={styles.prices}>
          <Text style={styles.oldPrice}>S/{product.oldPrice.toFixed(2)}</Text>
          <Text style={styles.newPrice}>S/{product.newPrice.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Ver detalle</Text>
        </Pressable>
      </View>

      <Image source={{ uri: product.image }} style={styles.image} />
    </LinearGradient>
  );
};

export default ProductOffer;

const styles = StyleSheet.create({
  boxContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    flexDirection: "row",
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: MARGIN,
    marginVertical: SPACING.sm,
  },
  info: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  brand: {
    fontSize: FONT.xs,
    fontFamily: "QuickSand-Medium",
    color: colors.black,
  },
  title: {
    fontSize: FONT.sm,
    marginVertical: SPACING.xs,
    fontFamily: "QuickSand-SemiBold",
    color: colors.black,
  },
  prices: {
    flexDirection: "column",
    marginVertical: SPACING.xs,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: colors.text,
    fontFamily: "QuickSand-Regular",
    fontSize: FONT.xs,
  },
  newPrice: {
    fontSize: FONT.md,
    fontFamily: "QuickSand-SemiBold",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    alignSelf: "flex-start",
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: colors.background,
    fontFamily: "QuickSand-Regular",
    fontSize: FONT.xs,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 0.75,
    resizeMode: "contain",
  },
});
