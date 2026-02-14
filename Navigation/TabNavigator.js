import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 60,
        },
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home-sharp" : "home-outline";
          if (route.name === "Search")
            iconName = focused ? "search" : "search-outline";
          if (route.name === "Cart")
            iconName = focused ? "cart" : "cart-outline";
          if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return (
            <Ionicons
              name={iconName}
              size={size ?? 24}
              color={focused ? colors.primary : colors.black}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={ShopStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
