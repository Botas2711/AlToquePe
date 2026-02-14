import { useEffect, useState } from "react";
import { loadFonts } from "./Global/fonts";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Navigation/TabNavigator";

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
      <TabNavigator />
    </NavigationContainer>
  );
}
