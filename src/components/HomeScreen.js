import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { fetchCategories } from "../api";

const difficulties = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "Hard", label: "Hard" },
];

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.trivia_categories);
    });
  }, []);

  const handleStart = () => {
    navigation.navigate("Quiz", { categoryId: selectedCategory, difficulty: selectedDifficulty });
  };

  const handleSelectChange = (value, type) => {
    switch (type) {
      case "category":
        setSelectedCategory(value);
        break;
      case "difficulty":
        setSelectedDifficulty(value);
        break;
      default:
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Choose Category</Text>

        <Picker selectedValue={selectedCategory} onValueChange={(value) => handleSelectChange(value, "category")}>
          <Picker.Item label="Any Category" value={0} />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>

        <Text>Choose Difficulty</Text>
        <Picker selectedValue={selectedDifficulty} onValueChange={(value) => handleSelectChange(value, "difficulty")}>
          <Picker.Item label="Any Difficulty" value="" />
          {difficulties.map((difficulty) => (
            <Picker.Item key={difficulty.id} label={difficulty.label} value={difficulty.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={() => handleStart("Start")}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  // button: {
  //   backgroundColor: "dodgerblue",
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   borderRadius: 15,
  //   marginVertical: 15,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  buttonText: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
  },

  startButton: {
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
