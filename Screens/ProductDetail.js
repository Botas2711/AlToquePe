import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Store/features/Cart/cartSlice";
import {
  WIDTH,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  DETAIL_IMAGE_HEIGHT,
  DETAIL_IMAGE_WIDTH,
  BUTTON,
} from "../Global/layout";

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const product = route.params.product;
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="chevron-back"
          size={WIDTH * 0.065}
          color={colors.black}
        />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>Marca: {product.brand}</Text>

          <View style={styles.row}>
            <View style={styles.iconRow}>
              <Ionicons
                name="star"
                size={WIDTH * 0.05}
                color={colors.secondary}
              />
              <Text style={styles.smallText}> {product.rating}</Text>
            </View>

            <View style={styles.iconRow}>
              <Ionicons
                name="thumbs-up-sharp"
                size={WIDTH * 0.05}
                color={colors.like}
              />
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
        {isInCart ? (
          <View style={styles.buttonDisabled}>
            <Text style={styles.buttonText}>En el carrito</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch(addToCart(product))}
          >
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </TouchableOpacity>
        )}
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
    borderRadius: RADIUS.full,
    padding: SPACING.sm,
    top: SPACING.xl * 1.5,
    left: MARGIN,
    zIndex: 10,
    elevation: 3,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: MARGIN,
    marginTop: SPACING.xl * 2,
    marginBottom: SPACING.md,
  },
  image: {
    resizeMode: "contain",
    width: DETAIL_IMAGE_WIDTH,
    height: DETAIL_IMAGE_HEIGHT,
  },
  infoContainer: {
    padding: MARGIN * 1.5,
    backgroundColor: colors.background,
  },
  name: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    marginBottom: SPACING.sm,
  },
  brand: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.xl,
    marginBottom: SPACING.md,
    justifyContent: "flex-start",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  smallText: {
    fontSize: FONT.sm,
    fontFamily: "QuickSand-Medium",
  },
  description: {
    fontSize: FONT.sm,
    fontFamily: "QuickSand-Regular",
    color: colors.text,
    textAlign: "justify",
    lineHeight: FONT.sm * 1.4,
    marginBottom: SPACING.sm,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: MARGIN * 1.5,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderColor: colors.background,
    backgroundColor: colors.background,
  },
  newPrice: {
    fontSize: FONT.md,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
  },
  oldPrice: {
    fontSize: FONT.sm,
    textDecorationLine: "line-through",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: BUTTON.height * 0.25,
    paddingHorizontal: MARGIN * 3,
    borderRadius: BUTTON.borderRadius,
    flex: 1,
    marginLeft: MARGIN,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: colors.disable,
    paddingVertical: BUTTON.height * 0.25,
    paddingHorizontal: MARGIN * 3,
    borderRadius: BUTTON.borderRadius,
    flex: 1,
    marginLeft: MARGIN,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "QuickSand-Bold",
    color: colors.background,
    fontSize: FONT.sm,
  },
});
