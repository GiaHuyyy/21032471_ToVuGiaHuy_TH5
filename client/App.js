import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import ForgotPassword from "./Screens/ForgotPassword";
import ChangePassword from "./Screens/ChangePassword";
import Home from "./Screens/Home";
import CustomDrawerContent from "./components/CustomDrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ route }) {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
        />
      )}
    >
      <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} initialParams={route.params} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" headerShow={false}>
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} initialParams />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
