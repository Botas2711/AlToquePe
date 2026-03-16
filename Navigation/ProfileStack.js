import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile";
import ImageSelector from "../Components/ImageSelector";
import AddressManager from "../Screens/AddressManager";
import Orders from "../Screens/Orders";
import OrderDetail from "../Components/OrderDetail";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
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
          name="Profile"
          component={Profile}
          options={{ title: "Profile", headerShown: false }}
        />
        <Stack.Screen
          name="ImageSelector"
          component={ImageSelector}
          options={{ title: "ImageSelector", headerShown: false }}
        />
        <Stack.Screen
          name="AddressManager"
          component={AddressManager}
          options={{ title: "AddressManager", headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ title: "Orders", headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{ title: "OrderDetail", headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
