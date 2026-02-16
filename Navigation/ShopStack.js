import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Shop from "../Screens/Shop";
import ProductDetail from "../Screens/ProductDetail";
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
        <Stack.Screen name="Shop" component={Shop} options={{ title: "Search" }}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: "Product Detail", headerShown: false }}/>
      </Stack.Navigator>
    </>
  );
}
