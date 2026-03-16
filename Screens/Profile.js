import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileItem from "../Components/ProfileItem";
import { useSelector } from "react-redux";
import { logout } from "../Store/features/Auth/authSlice";
import { clearCart } from "../Store/features/Cart/cartSlice";
import { useDispatch } from "react-redux";
import {
  WIDTH,
  HEIGHT,
  MARGIN,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
} from "../Global/layout";

const AVATAR_SIZE = WIDTH * 0.25;

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const activeAddress = useSelector((state) => state.auth.activeAddress);

  const dispatch = useDispatch();

  const getAvatarColor = (name) => {
    const colors = [
      "#8E24AA",
      "#D81B60",
      "#5E35B1",
      "#1E88E5",
      "#00897B",
      "#43A047",
      "#FB8C00",
      "#F4511E",
      "#039BE5",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.avatarWrapper}>
        <View
          style={[
            styles.avatarContainer,
            !profileImage && { backgroundColor: getAvatarColor(user.name) },
          ]}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarText}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        <Pressable
          onPress={() => navigation.navigate("ImageSelector")}
          style={styles.editButton}
        >
          <Ionicons
            name="camera"
            size={WIDTH * 0.045}
            color={colors.background}
          />
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <ProfileItem
          icon="person-outline"
          label="Nombre Completo"
          value={user.name || "Nombre no disponible"}
        />

        <ProfileItem
          icon="mail-outline"
          label="Correo"
          value={user.email || "Correo no disponible"}
        />

        <ProfileItem
          icon="call-outline"
          label="Número"
          value={user.phone ? `+51 ${user.phone}` : "Número no disponible"}
        />

        {activeAddress ? (
          <Pressable onPress={() => navigation.navigate("AddressManager")}>
            <ProfileItem
              icon="location"
              label="Dirección"
              value={activeAddress.address}
              onPress={true}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.addAddress}
            onPress={() => navigation.navigate("AddressManager")}
          >
            <Ionicons
              name="add-circle-outline"
              size={WIDTH * 0.055}
              color={colors.primary}
            />
            <Text style={styles.addAddressText}>Agregar dirección</Text>
          </Pressable>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              dispatch(clearCart());
              dispatch(logout());
            }}
          >
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MARGIN,
  },
  content: {
    paddingBottom: SPACING.xl,
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
  avatarWrapper: {
    alignSelf: "center",
    marginVertical: SPACING.md,
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: "cover",
  },
  avatarText: {
    fontFamily: "QuickSand-Bold",
    fontSize: AVATAR_SIZE * 0.4,
    color: colors.background,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: WIDTH * 0.09,
    height: WIDTH * 0.09,
    borderRadius: WIDTH * 0.045,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.background,
    elevation: 4,
  },
  infoContainer: {
    marginTop: SPACING.md,
    paddingHorizontal: MARGIN * 0.5,
  },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: "dashed",
    marginBottom: SPACING.md,
  },
  addAddressText: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.sm,
    color: colors.primary,
  },
  buttonContainer: {
    marginTop: SPACING.xl,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: colors.background,
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
  },
});
