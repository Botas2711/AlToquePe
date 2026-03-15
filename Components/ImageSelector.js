import { Pressable, StyleSheet, Text, View, Image, Alert } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { setProfileImage } from "../Store/features/Auth/authSlice";
import { usePutProfileImageMutation } from "../Services/userService";
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

const PREVIEW_SIZE = WIDTH * 0.55;

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

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const savedImage = useSelector((state) => state.auth.profileImage);

  const currentImage = image || savedImage;

  const [triggerPutProfileImage, result] = usePutProfileImageMutation();

  const verifyPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      Toast.show({
        type: "error",
        text1: "Permisos insuficientes",
        text2: "Necesitas dar permisos de cámara para usar esta función.",
        visibilityTime: 3000,
      });
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyPermissions();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2,
      });
      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        dispatch(setProfileImage(image));
      }
    }
  };

  const confirmImage = async () => {
    try {
      await triggerPutProfileImage({
        localId: user.localId,
        image: image,
      }).unwrap();

      dispatch(setProfileImage(image));

      Toast.show({
        type: "success",
        text1: "¡Listo!",
        text2: "Tu foto de perfil fue actualizada",
        visibilityTime: 2000,
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al guardar",
        text2: "Intenta de nuevo",
      });
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
        <Text style={styles.title}>Foto de perfil</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.previewContainer}>
        {currentImage ? (
          <Image source={{ uri: currentImage }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.emptyPreview,
              { backgroundColor: getAvatarColor(user.name) },
            ]}
          >
            <Text style={styles.avatarLetter}>
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <Pressable style={styles.cameraButton} onPress={pickImage}>
          <Ionicons
            name="camera"
            size={WIDTH * 0.055}
            color={colors.background}
          />
        </Pressable>
      </View>

      <Text style={styles.hint}>
        {image ? "¿Te gusta cómo quedó?" : "Toma una foto para tu perfil"}
      </Text>

      <View style={styles.actions}>
        {image ? (
          <>
            <Pressable style={styles.buttonSecondary} onPress={pickImage}>
              <Ionicons
                name="refresh-outline"
                size={WIDTH * 0.05}
                color={colors.primary}
              />
              <Text style={styles.buttonSecondaryText}>Retomar</Text>
            </Pressable>

            <Pressable style={styles.buttonPrimary} onPress={confirmImage}>
              <Ionicons
                name="checkmark"
                size={WIDTH * 0.05}
                color={colors.background}
              />
              <Text style={styles.buttonPrimaryText}>Confirmar</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[styles.buttonPrimary, styles.buttonFull]}
            onPress={pickImage}
          >
            <Ionicons
              name="camera-outline"
              size={WIDTH * 0.055}
              color={colors.background}
            />
            <Text style={styles.buttonPrimaryText}>Abrir cámara</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: MARGIN,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: HEIGHT * 0.06,
    paddingBottom: SPACING.lg,
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
  placeholder: {
    width: WIDTH * 0.1,
  },
  previewContainer: {
    marginTop: HEIGHT * 0.04,
    marginBottom: SPACING.lg,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: PREVIEW_SIZE / 2,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarLetter: {
    fontSize: PREVIEW_SIZE * 0.4,
    fontFamily: "QuickSand-Bold",
    color: colors.background,
  },
  emptyPreview: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    borderRadius: PREVIEW_SIZE / 2,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.disable,
    marginTop: SPACING.sm,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: WIDTH * 0.08,
    backgroundColor: colors.primary,
    width: WIDTH * 0.11,
    height: WIDTH * 0.11,
    borderRadius: WIDTH * 0.055,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.background,
    elevation: 4,
  },
  hint: {
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.text,
    marginBottom: HEIGHT * 0.05,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
    width: "100%",
    position: "absolute",
    bottom: HEIGHT * 0.06,
    paddingHorizontal: MARGIN,
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
  buttonFull: {
    flex: 1,
  },
  buttonPrimaryText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.background,
  },
  buttonSecondary: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.background,
    height: BUTTON.height,
    borderRadius: BUTTON.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonSecondaryText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.primary,
  },
});
