import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import ProfileItem from "../Components/ProfileItem";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={50} color={colors.black} />
      </View>

      <View style={styles.infoContainer}>
        <ProfileItem
          icon="person-outline"
          label="Nombre Completo"
          value="Agustin Aguilar Lindo"
        />

        <ProfileItem
          icon="mail-outline"
          label="Correo"
          value="agustinalex14@gmail.com"
        />

        <ProfileItem icon="call-outline" label="Número" value="+51 920628427" />

        <ProfileItem
          icon="location-outline"
          label="Dirección"
          value="Jr. Huáscar 1584, Jesús María"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
