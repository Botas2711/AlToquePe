import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.addressContainer}>
        <Text style={styles.label}>Enviar a</Text>
        <View style={styles.location}>
          <Text style={styles.place}>Casa</Text>
          <Ionicons style={styles.option} name="caret-down-outline" size={12} color={colors.text} />
        </View>
      </View>
      <View style={styles.main}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>AlToquePe</Text>
      </View>
      <Pressable style={styles.cartContainer}>
        <Ionicons name="cart-outline" size={18} color={colors.background} />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.23,
    shadowRadius: 6,
    elevation: 6,
  },
  logo: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  title: {
    fontSize: 17,
    color: colors.text,
    fontFamily: "QuickSand-Bold",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  cartContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -7,
    right: -7,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 10,
    fontFamily: "QuickSand-Bold",
    color: colors.text,
  },
  addressContainer: {
    justifyContent: "center",
  },
  label: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: "QuickSand-SemiBold",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  place: {
    fontSize: 12,
    color: colors.text,
    fontFamily: "QuickSand-Bold",
  },
  option: {
    marginTop: 3
  }
});
