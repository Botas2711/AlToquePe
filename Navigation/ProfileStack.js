import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile";
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
      </Stack.Navigator>
    </>
  );
}
