import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../Global/colors";

const { width } = Dimensions.get("window");

const ProductOffer = ({ product }) => {
  return (
    <LinearGradient
      colors={[product.color, colors.background]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.boxContainer}
    >
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.prices}>
          <Text style={styles.oldPrice}>S/{product.oldPrice.toFixed(2)}</Text>
          <Text style={styles.newPrice}>S/{product.newPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>

      <Image source={product.image} style={styles.image} />
    </LinearGradient>
  );
};

export default ProductOffer;

const styles = StyleSheet.create({
  boxContainer: {
    width: width - 32,
    flexDirection: "row",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16
  },
  info: {
    width: "60%",
  },
  brand: {
    fontSize: 13,
    fontFamily: "QuickSand-Medium",
    color: colors.black,
  },
  title: {
    fontSize: 15,
    marginVertical: 4,
    fontFamily: "QuickSand-SemiBold",
    color: colors.black,
  },
  prices: {
    flexDirection: "column",
    marginVertical: 4,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: colors.text,
    fontFamily: "QuickSand-Regular",
    fontSize: 11,
  },

  newPrice: {
    fontSize: 15,
    fontFamily: "QuickSand-SemiBold",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  buttonText: {
    color: colors.background,
    fontFamily: "QuickSand-Regular",
    fontSize: 11,
  },
  image: {
    width: 130,
    height: 100,
    resizeMode: "contain",
  },
});
