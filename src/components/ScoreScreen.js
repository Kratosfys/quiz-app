/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import backgroundImage from "../../assets/bk.png";

export default function ScoreScreen({ route, navigation }) {
  const { score } = route.params;

  const handleTryAgain = () => {
    navigation.navigate("Home");
  };

  const scoreStatus = {
    color: score <= 5 ? "red" : score > 5 && score < 8 ? "yellow" : "green",
    text: score <= 5 ? "Try Harder" : score > 5 && score < 8 ? "Not Bad" : "Great Job!",
  };

  return (
    <ImageBackground style={styles.imageBackground} source={backgroundImage}>
      <View style={styles.container}>
        <View style={styles.score(scoreStatus.color)}>
          <Text style={styles.text}>{score}</Text>
        </View>
        <Text style={styles.scoreText}>{scoreStatus.text}</Text>
        <TouchableOpacity style={styles.tryAgain} onPress={() => handleTryAgain("Try Again")}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  text: {
    color: "black",
    fontSize: 34,
    fontWeight: "bold",
  },
  imageBackground: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  score: (color) => ({
    backgroundColor: color,
    width: "50%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  }),

  tryAgain: {
    backgroundColor: "dodgerblue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  scoreText: {
    marginBottom: 45,
    fontSize: 18,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
