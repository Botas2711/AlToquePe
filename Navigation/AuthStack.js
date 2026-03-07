import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="black"
        translucent={false}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
