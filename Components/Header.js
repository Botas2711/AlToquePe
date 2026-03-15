import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  StatusBar,
  Modal,
  FlatList,
} from "react-native";
import { useState } from "react";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AddressItem from "../Components/AddressItem";
import { setActiveAddress } from "../Store/features/Auth/authSlice";
import {
  useGetAddressesQuery,
  useUpdateAddressMutation,
} from "../Services/userService";
import {
  WIDTH,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  HEADER_HEIGHT,
  TAB_HEIGHT,
} from "../Global/layout";
import Toast from "react-native-toast-message";

const LOGO_SIZE = WIDTH * 0.062;
const CART_SIZE = WIDTH * 0.078;

const Header = () => {
  const dispatch = useDispatch();
  const [showAddresses, setShowAddresses] = useState(false);

  const total = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const activeAddress = useSelector((state) => state.auth.activeAddress);
  const user = useSelector((state) => state.auth.user);

  const { data: addressesData } = useGetAddressesQuery(user?.localId, {
    skip: !user?.localId,
  });
  const [triggerUpdateAddress] = useUpdateAddressMutation();
  const addresses = addressesData ? Object.values(addressesData) : [];

  const handleSelectAddress = async (selected) => {
    try {
      for (const addr of addresses) {
        if (addr.active) {
          await triggerUpdateAddress({
            localId: user.localId,
            addressId: addr.id,
            address: { ...addr, active: false },
          }).unwrap();
        }
      }

      await triggerUpdateAddress({
        localId: user.localId,
        addressId: selected.id,
        address: { ...selected, active: true },
      }).unwrap();

      dispatch(setActiveAddress({ ...selected, active: true }));
      setShowAddresses(false);
      Toast.show({
        type: "success",
        text1: "Lugar de entrega actualizado",
        text2: `Recibirás tus pedidos en ${selected.address}`,
        visibilityTime: 1700,
      });
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al seleccionar dirección" });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.addressContainer}
          onPress={() => setShowAddresses(true)}
        >
          <Text style={styles.label}>Enviar a</Text>
          <View style={styles.location}>
            <Text style={styles.place}>
              {activeAddress ? activeAddress.name : "Mi ubicación"}
            </Text>
            <Ionicons
              style={styles.option}
              name="caret-down-outline"
              size={WIDTH * 0.03}
              color={colors.text}
            />
          </View>
        </Pressable>
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

      <Modal
        visible={showAddresses}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowAddresses(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowAddresses(false)}
        >
          <Pressable style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mis direcciones</Text>
              <Pressable onPress={() => setShowAddresses(false)}>
                <Ionicons
                  name="close"
                  size={WIDTH * 0.055}
                  color={colors.black}
                />
              </Pressable>
            </View>

            {addresses.length > 0 ? (
              <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <AddressItem
                    address={item}
                    isActive={item.active === true}
                    onSelect={(selected) => handleSelectAddress(selected)}
                    onDelete={() => {}}
                    hideDelete={true}
                  />
                )}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="location-outline"
                  size={WIDTH * 0.15}
                  color={colors.disable}
                />
                <Text style={styles.emptyText}>
                  No tienes direcciones guardadas
                </Text>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
    maxHeight: "50%",
    paddingBottom: TAB_HEIGHT,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.lg,
    color: colors.black,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    gap: SPACING.sm,
  },
  emptyText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
  },
});
