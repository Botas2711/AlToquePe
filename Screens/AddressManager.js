import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setActiveAddress } from "../Store/features/Auth/authSlice";
import {
  useSaveAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "../Services/userService";
import AddressItem from "../Components/AddressItem";
import AddressForm from "../Components/AddressForm";
import { colors } from "../Global/colors";
import Toast from "react-native-toast-message";
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
} from "../Global/layout";

const AddressManager = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { data: addressesData } = useGetAddressesQuery(user.localId);
  const [triggerSaveAddress] = useSaveAddressMutation();
  const [triggerUpdateAddress] = useUpdateAddressMutation();
  const [triggerDeleteAddress] = useDeleteAddressMutation();
  const [showForm, setShowForm] = useState(false);

  const addresses = addressesData ? Object.values(addressesData) : [];

  useEffect(() => {
    if (addresses.length > 0) {
      const active = addresses.find((addr) => addr.active === true);
      if (active) dispatch(setActiveAddress(active));
    }
  }, [addressesData]);

  const handleSelectAddress = async (selectedAddr) => {
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
        addressId: selectedAddr.id,
        address: { ...selectedAddr, active: true },
      }).unwrap();

      dispatch(setActiveAddress({ ...selectedAddr, active: true }));
      Toast.show({
        type: "success",
        text1: "Lugar de entrega actualizado",
        text2: `Recibirás tus pedidos en ${selectedAddr.address}`,
        visibilityTime: 1500,
      });
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al seleccionar dirección" });
    }
  };

  const handleDeleteAddress = async (address) => {
    try {
      await triggerDeleteAddress({
        localId: user.localId,
        addressId: address.id,
      }).unwrap();

      if (address.active) dispatch(setActiveAddress(null));
      Toast.show({
        type: "success",
        text1: "Dirección eliminada",
        text2: "La dirección fue removida de tu lista",
        visibilityTime: 1500,
      });
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al eliminar" });
    }
  };

  const saveAddress = async (newAddress) => {
    try {
      const saved = await triggerSaveAddress({
        localId: user.localId,
        address: newAddress,
      }).unwrap();

      if (!saved.id) {
        Toast.show({ type: "error", text1: "Error al guardar el ID" });
        return;
      }

      await handleSelectAddress(saved);
      setShowForm(false);
      Toast.show({
        type: "success",
        text1: "Dirección guardada",
        text2: "Tu dirección ha sido agregada",
        visibilityTime: 1700,
      });
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al guardar" });
    }
  };

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
        <Text style={styles.title}>Mis direcciones</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <AddressItem
            address={item}
            isActive={item.active === true}
            onSelect={handleSelectAddress}
            onDelete={handleDeleteAddress}
          />
        )}
        ListEmptyComponent={
          !showForm && (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="location-outline"
                size={WIDTH * 0.18}
                color={colors.disable}
              />
              <Text style={styles.emptyText}>
                No tienes direcciones guardadas
              </Text>
              <Text style={styles.emptySubText}>
                Agrega una para recibir tus pedidos
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          showForm ? (
            <AddressForm
              onSave={saveAddress}
              onCancel={() => setShowForm(false)}
            />
          ) : null
        }
      />

      {!showForm && (
        <View style={styles.footer}>
          <Pressable
            style={styles.buttonPrimary}
            onPress={() => setShowForm(true)}
          >
            <Ionicons
              name="add-circle-outline"
              size={WIDTH * 0.055}
              color={colors.background}
            />
            <Text style={styles.buttonPrimaryText}>Agregar dirección</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AddressManager;

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
    paddingBottom: HEIGHT * 0.15,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: HEIGHT * 0.08,
    gap: SPACING.sm,
  },
  emptyText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.black,
  },
  emptySubText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: MARGIN,
    backgroundColor: colors.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    elevation: 8,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },
  buttonPrimary: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.primary,
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  buttonPrimaryText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.background,
  },
});
