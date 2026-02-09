import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import { loadFonts } from "./Global/fonts"

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
    <Header/>
  );
}

const styles = StyleSheet.create({});
