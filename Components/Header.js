import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  WIDTH,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  HEADER_HEIGHT,
} from "../Global/layout";

const LOGO_SIZE = WIDTH * 0.062;
const CART_SIZE = WIDTH * 0.078;

const Header = () => {
  const total = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.label}>Enviar a</Text>
        <View style={styles.location}>
          <Text style={styles.place}>Casa</Text>
          <Ionicons
            style={styles.option}
            name="caret-down-outline"
            size={WIDTH * 0.03}
            color={colors.text}
          />
        </View>
      </View>
      <View style={styles.main}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>AlToquePe</Text>
      </View>
      <View style={styles.cartContainer}>
        <Ionicons
          name="cart-outline"
          size={WIDTH * 0.045}
          color={colors.background}
        />

        {total > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{total > 99 ? "99+" : total}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: HEADER_HEIGHT,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: MARGIN * 1.2,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 10,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    resizeMode: "contain",
  },
  title: {
    fontSize: FONT.md,
    color: colors.text,
    fontFamily: "QuickSand-Bold",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  cartContainer: {
    width: CART_SIZE,
    height: CART_SIZE,
    borderRadius: CART_SIZE / 2,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -SPACING.xs,
    right: -SPACING.xs,
    minWidth: WIDTH * 0.045,
    height: WIDTH * 0.045,
    borderRadius: WIDTH * 0.023,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  badgeText: {
    fontSize: FONT.xs,
    fontFamily: "QuickSand-Bold",
    color: colors.text,
  },
  addressContainer: {
    justifyContent: "center",
  },
  label: {
    fontSize: FONT.sm,
    color: colors.primary,
    fontFamily: "QuickSand-SemiBold",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  place: {
    fontSize: FONT.xs,
    color: colors.text,
    fontFamily: "QuickSand-Bold",
  },
  option: {
    marginTop: 2,
  },
});
