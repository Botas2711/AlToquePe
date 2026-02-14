import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Shop from "../Screens/Shop";

const Stack = createNativeStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, options }) => ({
        header: () => <Header title={options?.title ?? route.name} />,
      })}
    >
      <Stack.Screen
        name="Search"
        component={Shop}
        options={{ title: "Search" }}
      />
    </Stack.Navigator>
  );
}
