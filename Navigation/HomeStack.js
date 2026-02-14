import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </>
  );
}
