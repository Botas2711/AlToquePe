import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../Global/colors";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import ProfileStack from "./ProfileStack";
import { WIDTH, TAB_HEIGHT } from "../Global/layout";

const Tab = createBottomTabNavigator();
const ICON_SIZE = WIDTH * 0.065;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => {
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
              size={ICON_SIZE}
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    height: TAB_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -3 },
  },
});
