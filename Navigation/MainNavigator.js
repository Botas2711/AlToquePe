import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { useState } from "react";
import AuthStack from "./AuthStack";

const MainNavigator = () => {
  const [user, setUser] = useState(true);
  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;