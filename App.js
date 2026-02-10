import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import { loadFonts } from "./Global/fonts";
import Navigator from "./Navigation/Navigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAllFonts();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
