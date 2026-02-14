import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../Screens/Cart";

const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, options }) => ({
        header: () => <Header title={options?.title ?? route.name} />,
      })}
    >
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ title: "Cart" }}
      />
    </Stack.Navigator>
  );
}
