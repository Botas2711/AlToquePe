import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { WIDTH, HEIGHT, MARGIN, FONT, RADIUS, SPACING } from "../Global/layout";
import OrderProductItem from "../Components/OrderProductItem";

const OrderDetail = ({ navigation, route }) => {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={WIDTH * 0.06}
            color={colors.black}
          />
        </Pressable>
        <Text style={styles.title}>Detalle del pedido</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusContainer}>
          <Ionicons
            name="checkmark-circle"
            size={WIDTH * 0.14}
            color={colors.success}
          />
          <Text style={styles.statusTitle}>Pedido entregado</Text>
          <Text style={styles.statusDate}>
            {new Date(order.createdAt).toLocaleDateString("es-PE", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="location-outline"
              size={WIDTH * 0.05}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>Dirección de entrega</Text>
          </View>
          <View style={styles.addressCard}>
            <Ionicons
              name={
                order.address?.name === "Casa"
                  ? "home"
                  : order.address?.name === "Trabajo"
                    ? "briefcase"
                    : "location"
              }
              size={WIDTH * 0.05}
              color={colors.primary}
            />
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>{order.address?.name}</Text>
              <Text style={styles.addressText}>{order.address?.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="cart-outline"
              size={WIDTH * 0.05}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>Productos</Text>
          </View>
          {order.items.map((item, index) => (
            <OrderProductItem key={index} item={item} />
          ))}
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>S/{order.total.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Envío</Text>
            <Text style={styles.freeShipping}>Gratis</Text>
          </View>
          <View style={[styles.totalRow, styles.totalFinal]}>
            <Text style={styles.totalFinalLabel}>Total pagado</Text>
            <Text style={styles.totalFinalValue}>
              S/{order.total.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: HEIGHT * 0.06,
    paddingBottom: SPACING.md,
    paddingHorizontal: MARGIN,
    backgroundColor: colors.background,
    elevation: 2,
  },
  backButton: {
    backgroundColor: colors.background,
    padding: SPACING.sm,
    borderRadius: RADIUS.full,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.black,
  },
  placeholder: { width: WIDTH * 0.1 },
  content: {
    padding: MARGIN,
    paddingBottom: SPACING.xl,
    gap: SPACING.lg,
  },
  statusContainer: {
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.lg,
    backgroundColor: colors.success + "08",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: colors.success + "30",
  },
  statusTitle: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.success,
  },
  statusDate: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
    textTransform: "capitalize",
  },
  section: {
    gap: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
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
    borderColor: colors.disable,
  },
  addressInfo: { flex: 1 },
  addressName: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  addressText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs,
    color: colors.text,
  },
  totalContainer: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: colors.disable,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
  },
  totalValue: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  freeShipping: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.success,
  },
  totalFinal: {
    borderTopWidth: 1,
    borderTopColor: colors.disable,
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  totalFinalLabel: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.black,
  },
  totalFinalValue: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.primary,
  },
});
