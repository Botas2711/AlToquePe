import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { useState } from "react";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux"

const MainNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer>
      {token ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;