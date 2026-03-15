import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { WIDTH, MARGIN, FONT, RADIUS, SPACING } from "../Global/layout";

const AddressItem = ({
  address,
  isActive,
  onSelect,
  onDelete,
  hideDelete = false,
}) => {
  return (
    <View style={[styles.container, isActive && styles.containerActive]}>
      <Pressable style={styles.selectArea} onPress={() => onSelect(address)}>
        <View style={[styles.iconContainer, isActive && styles.iconActive]}>
          <Ionicons
            name={
              address.name === "Casa"
                ? "home"
                : address.name === "Trabajo"
                  ? "briefcase"
                  : "location"
            }
            size={WIDTH * 0.05}
            color={isActive ? colors.background : colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={[styles.name, isActive && styles.nameActive]}>
            {address.name}
          </Text>
          <Text style={styles.address}>{address.address}</Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        {isActive && (
          <Ionicons
            name="checkmark-circle"
            size={WIDTH * 0.055}
            color={colors.primary}
          />
        )}
        {!hideDelete && (
          <Pressable
            style={styles.deleteButton}
            onPress={() => onDelete(address)}
          >
            <Ionicons
              name="trash-outline"
              size={WIDTH * 0.045}
              color={colors.primary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.disable,
    marginBottom: SPACING.sm,
  },
  containerActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "08",
  },
  selectArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  iconContainer: {
    width: WIDTH * 0.1,
    height: WIDTH * 0.1,
    borderRadius: RADIUS.full,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  iconActive: {
    backgroundColor: colors.primary,
  },
  info: {
    flex: 1,
    maxWidth: WIDTH * 0.55,
  },
  name: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.sm,
    color: colors.black,
    marginBottom: 2,
  },
  nameActive: {
    color: colors.primary,
  },
  address: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingLeft: SPACING.sm,
    width: WIDTH * 0.22,
    justifyContent: "flex-end",
  },
  deleteButton: {
    padding: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: colors.primary + "10",
  },
});
