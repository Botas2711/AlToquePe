import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CartItem from "../Components/CartItem";
import { colors } from "../Global/colors";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import OrderConfirm from "../Components/OrderConfirm";
import { useSaveOrderMutation } from "../Services/orderService";
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
} from "../Global/layout";

const Cart = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const activeAddress = useSelector((state) => state.auth.activeAddress);
  const user = useSelector((state) => state.auth.user);
  const [showConfirm, setShowConfirm] = useState(false);
  const [triggerSaveOrder] = useSaveOrderMutation();

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const handleConfirmOrder = async () => {
    try {
      // const order = {
      //   items: cartItems,
      //   total: totalPrice,
      //   address: activeAddress,
      //   status: "delivered",
      //   createdAt: new Date().toISOString(),
      // };

      // await triggerSaveOrder({ localId: user.localId, order }).unwrap();

      setShowConfirm(false);
      navigation.navigate("OrderSuccess");
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al confirmar el pedido" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem product={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tu carrito está vacío</Text>
            <Text style={styles.emptySubText}>
              Agrega productos para continuar
            </Text>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>S/{totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowConfirm(true)}
          >
            <Text style={styles.buttonText}>Ordenar ahora</Text>
          </TouchableOpacity>
        </View>
      )}

      <OrderConfirm
        visible={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmOrder}
        cartItems={cartItems}
        totalPrice={totalPrice}
        activeAddress={activeAddress}
      />
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
    fontSize: FONT.xl,
    textAlign: "center",
    color: colors.black,
    marginTop: HEIGHT * 0.02,
    paddingVertical: SPACING.md,
  },
  listContent: {
    paddingHorizontal: MARGIN,
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: HEIGHT * 0.15,
    gap: SPACING.sm,
  },
  emptyText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.black,
  },
  emptySubText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
  },
  footer: {
    gap: SPACING.sm,
    padding: MARGIN,
    backgroundColor: colors.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    elevation: 8,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.sm,
  },
  totalLabel: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.black,
  },
  totalPrice: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.black,
  },
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "QuickSand-Bold",
    color: colors.background,
    fontSize: FONT.md,
  },
});
