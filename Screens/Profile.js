import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileItem from "../Components/ProfileItem";
import { useSelector } from "react-redux";
import { logout } from "../Store/features/Auth/authSlice";
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

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={AVATAR_SIZE * 0.5} color={colors.black} />
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

        <ProfileItem
          icon="location-outline"
          label="Dirección"
          value="Jr. Huáscar 1584, Jesús María"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => dispatch(logout())}
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
  avatarContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  infoContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: colors.background,
    fontFamily: "QuickSand-Bold",
  },
});
