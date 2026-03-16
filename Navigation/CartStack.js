import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../Screens/Cart";
import OrderSuccess from "../Components/OrderSuccess";

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
        options={{ title: "Cart", headerShown: false }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{ title: "OrderSuccess", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
