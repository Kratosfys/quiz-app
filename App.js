import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/components/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizScreen from "./src/components/QuizScreen";
import ScoreScreen from "./src/components/ScoreScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const handleButtonPress = (buttonIndex) => {
    console.log(`Button ${buttonIndex} pressed!`);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
