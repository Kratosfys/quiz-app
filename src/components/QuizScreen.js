import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { fetchQuizItems } from "../api";
import shuffleArray from "../utils/shuffleArray";

export default function QuizScreen({ route, navigation }) {
  const { categoryId, difficulty } = route.params;

  const [quizzes, setQuizzes] = useState([]);
  const [quizzesStatus, setQuizzesStatus] = useState("idle");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const userAnswers = useRef([]);

  const pagesSize = quizzes.length;
  const isLastPage = currentPage === pagesSize;
  const isFirstPage = currentPage === 1;

  useEffect(() => {
    setQuizzesStatus("loading");
    fetchQuizItems({ categoryId, difficulty }).then(
      (quizItems) => {
        setQuizzesStatus("success");
        setQuizzes(quizItems.results);
      },
      () => {
        setQuizzesStatus("error");
      }
    );
  }, [categoryId, difficulty]);

  const getScore = () => {
    let score = 0;
    quizzes.forEach((quiz, i) => {
      if (quiz.correct_answer === userAnswers.current[i]) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = getScore();
    navigation.navigate("Score", { score });
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    userAnswers.current[currentPage - 1] = selectedAnswer;
    setCurrentPage((page) => page + 1);

    if (userAnswers.current[currentPage]) {
      setSelectedAnswer(userAnswers.current[currentPage]);
    } else {
      setSelectedAnswer("");
    }
  };

  const handlePrevious = () => {
    if (!isFirstPage) {
      setCurrentPage((page) => page - 1);
      setSelectedAnswer(userAnswers.current[currentPage - 2]);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const currentQuizData = useMemo(() => {
    const currentQuiz = quizzes[currentPage - 1];
    return {
      question: currentQuiz ? currentQuiz.question : "",
      answers: currentQuiz ? shuffleArray([currentQuiz.correct_answer, ...currentQuiz.incorrect_answers]) : [],
    };
  }, [currentPage, quizzes]);

  if (quizzesStatus === "idle" || quizzesStatus === "loading") {
    return <Text>Loading...</Text>;
  }

  if (quizzesStatus === "error") {
    return <Text>Error</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <>
        <View style={styles.border}>
          <Text style={styles.text}>{currentQuizData.question}</Text>
        </View>
        {currentQuizData.answers.map((answer) => (
          <TouchableOpacity
            style={answer === selectedAnswer ? styles.selectedQuestionButton : styles.questionButton}
            onPress={() => handleAnswerSelect(answer)}
            key={answer}
          >
            <Text style={styles.questionText}>{answer}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          disabled={!selectedAnswer}
          style={styles.button}
          onPress={isLastPage ? handleSubmit : handleNext}
        >
          <Text style={styles.text}>{isLastPage ? "Submit" : "Next"}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={currentPage === 1} style={styles.button} onPress={handlePrevious}>
          <Text style={styles.text}>Previous</Text>
        </TouchableOpacity>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "space-between",
    padding: 30,
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },

  questionText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  questionButton: {
    backgroundColor: "grey",
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  selectedQuestionButton: {
    backgroundColor: "purple",
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  border: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,
    justifyContent: "space-between",
    marginVertical: 10,
  },

  button: {
    backgroundColor: "dodgerblue",
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
});
