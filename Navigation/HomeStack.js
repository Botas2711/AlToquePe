import Header from "../Components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, options }) => ({
        header: () => <Header title={options?.title ?? route.name} />,
      })}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
}
