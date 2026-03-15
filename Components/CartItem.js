import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Store/features/Cart/cartSlice";
import { WIDTH, MARGIN, FONT, RADIUS, SPACING } from "../Global/layout";

const IMAGE_SIZE = WIDTH * 0.22;

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.price}>S/{product.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.qtyButton,
              product.quantity === 1 && styles.qtyButtonDisabled,
            ]}
            disabled={product.quantity === 1}
            onPress={() => dispatch(decreaseQuantity(product))}
          >
            <Ionicons
              name="remove"
              size={WIDTH * 0.045}
              color={colors.primary}
            />
          </TouchableOpacity>

          <Text style={styles.quantity}>{product.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => dispatch(increaseQuantity(product))}
          >
            <Ionicons name="add" size={WIDTH * 0.045} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(removeFromCart(product))}
      >
        <Ionicons
          name="trash-outline"
          size={WIDTH * 0.052}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: SPACING.md,
    backgroundColor: colors.background,
    borderRadius: RADIUS.lg,
    marginVertical: SPACING.sm,
    alignItems: "center",
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    fontSize: FONT.sm,
    fontFamily: "QuickSand-SemiBold",
    marginBottom: SPACING.xs,
    color: colors.text,
  },
  price: {
    fontSize: FONT.md,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
    marginBottom: SPACING.sm,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  qtyButton: {
    padding: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  qtyButtonDisabled: {
    borderColor: colors.disable,
  },
  quantity: {
    fontSize: FONT.md,
    fontFamily: "QuickSand-Bold",
    minWidth: WIDTH * 0.05,
    textAlign: "center",
  },
  deleteButton: {
    padding: SPACING.sm,
  },
});
