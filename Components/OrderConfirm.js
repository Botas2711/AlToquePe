import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OrderProductItem from "../Components/OrderProductItem";
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
} from "../Global/layout";

const OrderConfirm = ({
  visible,
  onClose,
  onConfirm,
  cartItems,
  totalPrice,
  activeAddress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            { paddingBottom: insets.bottom + SPACING.xl * 1.6 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Confirmar pedido</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={WIDTH * 0.06} color={colors.black} />
            </Pressable>
          </View>

          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Ionicons
                      name="location-outline"
                      size={WIDTH * 0.05}
                      color={colors.primary}
                    />
                    <Text style={styles.sectionTitle}>
                      Dirección de entrega
                    </Text>
                  </View>
                  {activeAddress ? (
                    <View style={styles.addressCard}>
                      <Ionicons
                        name={
                          activeAddress.name === "Casa"
                            ? "home"
                            : activeAddress.name === "Trabajo"
                              ? "briefcase"
                              : "location"
                        }
                        size={WIDTH * 0.05}
                        color={colors.primary}
                      />
                      <View style={styles.addressInfo}>
                        <Text style={styles.addressName}>
                          {activeAddress.name}
                        </Text>
                        <Text style={styles.addressText}>
                          {activeAddress.address}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.noAddress}>
                      <Ionicons
                        name="warning-outline"
                        size={WIDTH * 0.05}
                        color={colors.secondary}
                      />
                      <Text style={styles.noAddressText}>
                        No tienes una dirección activa
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.sectionHeader}>
                  <Ionicons
                    name="cart-outline"
                    size={WIDTH * 0.05}
                    color={colors.primary}
                  />
                  <Text style={styles.sectionTitle}>Productos</Text>
                </View>
              </>
            }
            renderItem={({ item }) => <OrderProductItem item={item} />}
            ListFooterComponent={
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total a pagar</Text>
                <Text style={styles.totalPrice}>S/{totalPrice.toFixed(2)}</Text>
              </View>
            }
          />
          <Pressable
            style={[styles.button, !activeAddress && styles.buttonDisabled]}
            onPress={onConfirm}
            disabled={!activeAddress}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={WIDTH * 0.055}
              color={colors.background}
            />
            <Text style={styles.buttonText}>Confirmar pedido</Text>
          </Pressable>

          {!activeAddress && (
            <Text style={styles.warningText}>
              Agrega una dirección de entrega para continuar
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: colors.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: MARGIN,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.black,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary + "08",
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.primary,
  },
  addressText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs,
    color: colors.text,
  },
  noAddress: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.secondary + "10",
  },
  noAddressText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.secondary,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: colors.disable,
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.black,
  },
  totalPrice: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.xl,
    color: colors.primary,
  },
  button: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  buttonDisabled: {
    backgroundColor: colors.disable,
  },
  buttonText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.background,
  },
  warningText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs,
    color: colors.text,
    textAlign: "center",
    marginTop: SPACING.sm,
  },
});
