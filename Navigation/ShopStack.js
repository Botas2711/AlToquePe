import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopScreen from "../Screens/ShopScreen";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="black"
        translucent={false}
      />
      <Stack.Navigator
        screenOptions={({ route, options }) => ({
          header: () => <Header title={options?.title ?? route.name} />,
        })}
      >
        <Stack.Screen
          name="Search"
          component={ShopScreen}
          options={{ title: "Search" }}
        />
      </Stack.Navigator>
    </>
  );
}
