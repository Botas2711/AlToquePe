import { useEffect, useState } from "react";
import { loadFonts } from "./Global/fonts";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import MainNavigator from "./Navigation/MainNavigator.js";

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
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
