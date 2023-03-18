import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function ScoreScreen({ route, navigation }) {
  const { score } = route.params;

  const handleTryAgain = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.text}>{score}</Text>
      </View>
      <TouchableOpacity style={styles.tryAgain} onPress={() => handleTryAgain("Try Again")}>
        <Text style={styles.text}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 30,
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },

  border: {
    width: "50%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    marginVertical: 10,
    alignItems: "center",
  },

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
});
