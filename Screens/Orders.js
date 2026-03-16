import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../Services/orderService";
import OrderItem from "../Components/OrderItem";
import { colors } from "../Global/colors";
import { WIDTH, HEIGHT, MARGIN, FONT, RADIUS, SPACING } from "../Global/layout";

const Orders = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const { data: orders = [], isLoading } = useGetOrdersQuery(user.localId);

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
        <Text style={styles.title}>Mis pedidos</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderItem
            order={item}
            onPress={(order) => navigation.navigate("OrderDetail", { order })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={WIDTH * 0.2}
              color={colors.disable}
            />
            <Text style={styles.emptyText}>No tienes pedidos aún</Text>
            <Text style={styles.emptySubText}>Tus compras aparecerán aquí</Text>
          </View>
        }
      />
    </View>
  );
};

export default Orders;

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
  listContent: {
    padding: MARGIN,
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: HEIGHT * 0.15,
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
});
