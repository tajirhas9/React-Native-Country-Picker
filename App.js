import React from "react";
import Index from "./src/index";
import CountryList from "./src/countryList";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenStack } from "react-native-screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Index} />
          <Stack.Screen name="Country List" component={CountryList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
