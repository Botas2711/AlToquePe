import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.85;

const ProductDetail = ({ navigation, route }) => {
  const product = route.params.product;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={26} color={colors.black} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>Marca: {product.brand}</Text>

          <View style={styles.row}>
            <View style={styles.iconRow}>
              <Ionicons name="star" size={20} color={colors.secondary} />
              <Text style={styles.smallText}> {product.rating}</Text>
            </View>

            <View style={styles.iconRow}>
              <Ionicons name="thumbs-up-sharp" size={20} color={colors.like} />
              <Text style={styles.smallText}> {product.likes}%</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View>
          {product.newPrice ? (
            <>
              <Text style={styles.newPrice}>
                S/{product.newPrice.toFixed(2)}
              </Text>
              <Text style={styles.oldPrice}>
                S/{product.oldPrice.toFixed(2)}
              </Text>
            </>
          ) : (
            <Text style={styles.newPrice}>S/{product.oldPrice.toFixed(2)}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 8,
    top: 35,
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 50,
    marginBottom: 15,
  },
  image: {
    resizeMode: "contain",
    width: ITEM_WIDTH,
    height: 320,
  },
  infoContainer: {
    padding: 25,
    backgroundColor: colors.background,
  },
  name: {
    fontFamily: "QuickSand-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  brand: {
    fontFamily: "QuickSand-Medium",
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 15,
    justifyContent: "flex-start",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  smallText: {
    fontSize: 15,
    fontFamily: "QuickSand-Medium",
  },
  description: {
    fontSize: 14,
    fontFamily: "QuickSand-Regular",
    color: colors.text,
    textAlign: "justify",
    paddingRight: 10,
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.background,
    backgroundColor: colors.background,
  },
  newPrice: {
    fontSize: 18,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "QuickSand-Bold",
    color: colors.background,
    fontSize: 15,
  },
});
