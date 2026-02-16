import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import ProductDetail from "../Screens/ProductDetail";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
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
        <Stack.Screen name="Home" component={Home} options={{ title: "Home" }}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: "Product Detail", headerShown: false }}/>
      </Stack.Navigator>
    </>
  );
}
