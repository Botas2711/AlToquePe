import { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import {
  WIDTH,
  HEIGHT,
  FONT,
  RADIUS,
  SPACING,
  BUTTON,
  MARGIN,
} from "../Global/layout";
import AddressSuggestionItem from "./AddressSuggestionItem";
import Toast from "react-native-toast-message";
import { GOOGLE_API_KEY } from "../Firebase/googleAPI";

const ADDRESS_NAMES = ["Casa", "Trabajo", "Otro"];

const AddressForm = ({ onSave, onCancel }) => {
  const [location, setLocation] = useState(null);
  const [addressText, setAddressText] = useState("");
  const [selectedName, setSelectedName] = useState("Casa");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeout = useRef(null);
  const mapRef = useRef(null);

  const searchPlaces = async (text) => {
    setSearchText(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const response = await fetch(
          "https://places.googleapis.com/v1/places:autocomplete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": GOOGLE_API_KEY,
            },
            body: JSON.stringify({
              input: text,
              languageCode: "es",
              includedRegionCodes: ["pe"],
            }),
          },
        );
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (e) {
        console.log("Error:", e);
      }
      setSearchLoading(false);
    }, 500);
  };

  const selectSuggestion = async (suggestion) => {
    try {
      const placeId = suggestion.placePrediction.placeId;
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": "location,formattedAddress",
          },
        },
      );
      const data = await response.json();
      const { latitude, longitude } = data.location;

      setLocation({ latitude, longitude });
      setAddressText(data.formattedAddress);
      setSearchText(data.formattedAddress);
      setSuggestions([]);

      mapRef.current?.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500,
      );
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al obtener ubicación" });
    }
  };

  const handleMarkerDrag = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });

    try {
      const [place] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const newAddress = `${place.street} ${place.streetNumber}, ${place.district}`;
      setAddressText(newAddress);
      setSearchText(newAddress);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const requestLocation = async () => {
    setLoading(true);
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        Toast.show({
          type: "error",
          text1: "Permiso denegado",
          text2: "Activa el GPS",
        });
        setLoading(false);
        return;
      }
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = current.coords;
      setLocation({ latitude, longitude });

      const [place] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const addr = `${place.street} ${place.streetNumber}, ${place.district}`;
      setAddressText(addr);
      setSearchText(addr);

      mapRef.current?.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500,
      );
    } catch (e) {
      Toast.show({ type: "error", text1: "Error al obtener ubicación" });
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (!location || !addressText.trim()) {
      Toast.show({ type: "error", text1: "Selecciona una ubicación primero" });
      return;
    }
    onSave({
      name: selectedName,
      address: addressText,
      latitude: location.latitude,
      longitude: location.longitude,
      active: false,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva dirección</Text>

      <View style={styles.nameSelector}>
        {ADDRESS_NAMES.map((name, index) => (
          <Pressable
            key={index}
            style={[
              styles.nameChip,
              selectedName === name && styles.nameChipActive,
            ]}
            onPress={() => setSelectedName(name)}
          >
            <Ionicons
              name={
                name === "Casa"
                  ? "home-outline"
                  : name === "Trabajo"
                    ? "briefcase-outline"
                    : "location-outline"
              }
              size={WIDTH * 0.04}
              color={selectedName === name ? colors.background : colors.text}
            />
            <Text
              style={[
                styles.nameChipText,
                selectedName === name && styles.nameChipTextActive,
              ]}
            >
              {name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={WIDTH * 0.05}
            color={colors.text}
          />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={searchPlaces}
            placeholder="Buscar dirección..."
            placeholderTextColor={colors.text}
          />
          {searchLoading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            searchText.length > 0 && (
              <Pressable
                onPress={() => {
                  setSearchText("");
                  setSuggestions([]);
                }}
              >
                <Ionicons
                  name="close-circle"
                  size={WIDTH * 0.05}
                  color={colors.text}
                />
              </Pressable>
            )
          )}
        </View>

        {suggestions.length > 0 && (
          <View style={styles.suggestionsList}>
            {suggestions.map((item) => (
              <AddressSuggestionItem
                key={item.placePrediction.placeId}
                suggestion={item}
                onPress={selectSuggestion}
              />
            ))}
          </View>
        )}
      </View>

      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={(e) => handleMarkerDrag(e)}
        >
          <Marker
            coordinate={location}
            draggable
            onDragEnd={handleMarkerDrag}
          />
        </MapView>
      )}

      {addressText ? (
        <View style={styles.addressPreview}>
          <Ionicons
            name="location"
            size={WIDTH * 0.05}
            color={colors.primary}
          />
          <Text style={styles.addressPreviewText} numberOfLines={2}>
            {addressText}
          </Text>
        </View>
      ) : null}

      <View style={styles.actions}>
        <Pressable style={styles.buttonSecondary} onPress={requestLocation}>
          {loading ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <>
              <Ionicons
                name="navigate-outline"
                size={WIDTH * 0.045}
                color={colors.primary}
              />
              <Text style={styles.buttonSecondaryText}>Mi ubicación</Text>
            </>
          )}
        </Pressable>

        <Pressable style={styles.buttonPrimary} onPress={handleSave}>
          <Ionicons
            name="save-outline"
            size={WIDTH * 0.045}
            color={colors.background}
          />
          <Text style={styles.buttonPrimaryText}>Guardar</Text>
        </Pressable>
      </View>

      <Pressable style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </Pressable>
    </View>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  title: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.black,
  },
  nameSelector: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  nameChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.disable,
  },
  nameChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  nameChipText: {
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.xs,
    color: colors.text,
  },
  nameChipTextActive: {
    color: colors.background,
  },
  searchWrapper: {
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.disable,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
    backgroundColor: colors.background,
  },
  searchInput: {
    flex: 1,
    fontFamily: "QuickSand-Medium",
    fontSize: FONT.sm,
    color: colors.black,
  },
  suggestionsList: {
    backgroundColor: colors.background,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.disable,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: HEIGHT * 0.25,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  addressPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: colors.primary + "10",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  addressPreviewText: {
    flex: 1,
    fontFamily: "QuickSand-SemiBold",
    fontSize: FONT.sm,
    color: colors.black,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
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
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    borderRadius: BUTTON.borderRadius,
    height: BUTTON.height,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cancelText: {
    fontFamily: "QuickSand-Bold",
    fontSize: FONT.md,
    color: colors.background,
  },
});
