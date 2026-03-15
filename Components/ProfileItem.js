import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import { WIDTH, MARGIN, FONT, RADIUS, SPACING } from "../Global/layout";

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
    marginBottom: SPACING.md,
    borderRadius: RADIUS.md,
    borderColor: colors.disable,
    borderWidth: 1,
    padding: SPACING.sm,
  },
  icon: {
    marginLeft: SPACING.xs,
  },
  textContainer: {
    marginLeft: SPACING.lg,
  },
  label: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.primary,
  },
  value: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.md,
    color: colors.text,
    marginTop: SPACING.xs,
  },
});
