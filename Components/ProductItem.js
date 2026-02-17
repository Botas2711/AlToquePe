import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { colors } from "../Global/colors";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - 10;

const ProductItem = ({ product, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.imageContainer} onPress={onPress}>
        <Image source={product.image} style={styles.image} />
      </Pressable>

      <Text style={styles.name}>{product.name}</Text>

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
    alignItems: "center",
    width: ITEM_WIDTH,
  },
  imageContainer: {
    backgroundColor: colors.background,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: ITEM_WIDTH * 0.7,
    height: ITEM_WIDTH * 0.7,
    resizeMode: "contain",
  },
  name: {
    fontSize: 13,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
    textAlign: "left",
    marginBottom: 6,
    width: "80%",
  },
  prices: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "80%",
    marginBottom: 15,
  },
  newPrice: {
    fontSize: 13,
    fontFamily: "QuickSand-Medium",
    color: colors.black,
    marginRight: 9,
  },
  oldPrice: {
    fontSize: 12,
    fontFamily: "QuickSand-Light",
    color: colors.text,
    textDecorationLine: "line-through",
  },
});
