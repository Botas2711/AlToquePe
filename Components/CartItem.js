import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 4;

const CartItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        <Text style={styles.price}>
          S/{(product.newPrice ?? product.oldPrice).toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.qtyButton}>
            <Ionicons name="remove" size={18} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.quantity}>1</Text>

          <TouchableOpacity style={styles.qtyButton}>
            <Ionicons name="add" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 15,
    marginVertical: 9,
    alignItems: "center",
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: ITEM_WIDTH,
    height: 80,
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 13,
  },
  name: {
    fontSize: 14,
    fontFamily: "QuickSand-SemiBold",
    marginBottom: 3,
    color: colors.text,
  },
  price: {
    fontSize: 15,
    fontFamily: "QuickSand-Bold",
    color: colors.black,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  qtyButton: {
    padding: 3,
    borderRadius: 8,
  },
  quantity: {
    fontSize: 15,
    fontFamily: "QuickSand-Bold",
  },
  deleteButton: {
    padding: 8,
  },
});
