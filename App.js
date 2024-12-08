import { NavigationContainer } from "@react-navigation/native"; // npm install @react-navigation/native
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // npm install @react-navigation/native-stack
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import NewTravelScreen from "./Screens/NewTravelScreen";
import AllTravelsScreen from "./Screens/AllTravelsScreen";
import TravelDetailsScreen from "./Screens/TravelDetailsScreen";
import MapScreen from "./Screens/MapScreen";
import { UserContextProvider } from "./Context";

export default function App() {
  //Opretter Stack navigator til navigation
  const Stack = createNativeStackNavigator();

  return (
    <UserContextProvider>
      <NavigationContainer>
        {/* Tilføjer screens til at navigere rundt i */}
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Hjem" component={HomeScreen} />
          <Stack.Screen name="NyRejse" component={NewTravelScreen} />
          <Stack.Screen name="Rejser" component={AllTravelsScreen} />
          <Stack.Screen name="RejseDetaljer" component={TravelDetailsScreen} />
          <Stack.Screen name="Kort" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}
