import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";

const Navigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Home} />
    </Stack.Navigator>
  );
};

export default Navigator;
