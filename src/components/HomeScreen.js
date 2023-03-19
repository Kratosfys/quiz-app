import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { fetchCategories } from "../api";
import backgroundImage from "../../assets/bk.png";

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
    <ImageBackground style={styles.imageBackground} source={backgroundImage}>
      <View style={styles.container}>
        <View>
          <Text style={styles.chooseText}>Choose Category</Text>

          <Picker selectedValue={selectedCategory} onValueChange={(value) => handleSelectChange(value, "category")}>
            <Picker.Item label="Any Category" value={0} />
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>

          <Text style={styles.chooseText}>Choose Difficulty</Text>
          <Picker
            style={styles.pickerColor}
            selectedValue={selectedDifficulty}
            onValueChange={(value) => handleSelectChange(value, "difficulty")}
          >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },
  pickerColor: {
    fontWeight: "bold",
  },
  chooseText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  buttonText: {
    color: "black",
    fontSize: 19,
    fontWeight: "bold",
  },
  imageBackground: {
    flex: 1,
    paddingTop: 80,
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
