import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";

const ProfileItem = ({ icon, label, value }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={21} color={colors.primary} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderRadius: 10,
    borderColor: colors.disable,
    borderWidth: 1,
    padding: 10,
  },
  icon: {
    marginLeft: 6,
  },
  textContainer: {
    marginLeft: 17,
  },
  label: {
    fontFamily: "QuickSand-Medium",
    fontSize: 14,
    color: colors.primary,
  },
  value: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: 15,
    color: colors.text,
    marginTop: 2,
  },
});
