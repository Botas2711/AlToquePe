import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CartItem from "../Components/CartItem";
import allProducts from "../Data/products";
import { colors } from "../Global/colors";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem product={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>S/{totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ordenar ahora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: 20,
    textAlign: "center",
    color: colors.black,
    marginTop: 17,
    paddingTop: 15,
    paddingBottom: 12,
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 17,
    backgroundColor: colors.background,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  totalLabel: {
    fontFamily: "QuickSand-Bold",
    fontSize: 16,
    color: colors.black,
  },
  totalPrice: {
    fontFamily: "QuickSand-Bold",
    fontSize: 18,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    fontFamily: "QuickSand-Bold",
    textAlign: "center",
    color: colors.background,
    fontSize: 15,
  },
});
