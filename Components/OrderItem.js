import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { WIDTH, FONT, RADIUS, SPACING } from "../Global/layout";

const OrderItem = ({ order, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={() => onPress(order)}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="receipt-outline"
            size={WIDTH * 0.055}
            color={colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.date}>
            {new Date(order.createdAt).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.items}>
            {order.items.length}{" "}
            {order.items.length === 1 ? "producto" : "productos"}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.total}>S/{order.total.toFixed(2)}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Entregado</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons
          name="location-outline"
          size={WIDTH * 0.04}
          color={colors.text}
        />
        <Text style={styles.address} numberOfLines={1}>
          {order.address?.address || "Sin dirección"}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={WIDTH * 0.04}
          color={colors.disable}
        />
      </View>
    </Pressable>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: colors.disable,
    gap: SPACING.sm,
    elevation: 2,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  iconContainer: {
    width: WIDTH * 0.11,
    height: WIDTH * 0.11,
    borderRadius: RADIUS.full,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  date: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  items: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs,
    color: colors.text,
  },
  right: {
    alignItems: "flex-end",
    gap: SPACING.xs,
  },
  total: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.black,
  },
  statusBadge: {
    backgroundColor: colors.success + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  statusText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.xs * 0.9,
    color: colors.success,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: colors.disable,
    paddingTop: SPACING.sm,
  },
  address: {
    flex: 1,
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.xs,
    color: colors.text,
  },
});
