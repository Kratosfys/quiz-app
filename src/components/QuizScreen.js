import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { fetchQuizItems } from "../api";
import shuffleArray from "../utils/shuffleArray";
import backgroundImage from "../../assets/bk.png";

export default function QuizScreen({ route, navigation }) {
  const { categoryId, difficulty } = route.params;

  const [quizzes, setQuizzes] = useState([]);
  const [quizzesStatus, setQuizzesStatus] = useState("idle");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const providedAnswers = useRef([]);

  const pagesSize = quizzes.length;
  const isLastPage = currentPage === pagesSize - 1;
  const isFirstPage = currentPage === 0;

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

  /** if the user has already answered to a question, select that answer */
  useEffect(() => {
    setSelectedAnswer("");
    const providedAnswer = providedAnswers.current[currentPage];
    if (providedAnswer) {
      setSelectedAnswer(providedAnswer);
    }
  }, [currentPage]);

  const getScore = () => {
    const score = quizzes.reduce(
      (sum, quiz, i) => (quiz.correct_answer === providedAnswers.current[i] ? sum + 1 : sum + 0),
      0
    );
    return score;
  };

  const handleSubmit = () => {
    const score = getScore();
    navigation.navigate("Score", { score });
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    providedAnswers.current[currentPage] = selectedAnswer;
    setCurrentPage((page) => page + 1);
  };

  const handlePrevious = () => {
    if (!isFirstPage) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const currentQuizData = useMemo(() => {
    const currentQuiz = quizzes[currentPage];
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

  if (!quizzes.length) {
    return (
      <Text style={styles.errorText}>There were no questions found, please change the settings and try again</Text>
    );
  }

  return (
    <ImageBackground style={styles.imageBackground} source={backgroundImage}>
      <ScrollView style={styles.container}>
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
        <View style={styles.buttonsWrapper}>
          {!isFirstPage ? (
            <TouchableOpacity style={styles.button({ marginRight: 10 })} onPress={handlePrevious}>
              <Text style={styles.text}>Previous</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            disabled={!selectedAnswer}
            style={styles.button({ opacity: !selectedAnswer ? 0.4 : 1 })}
            onPress={isLastPage ? handleSubmit : handleNext}
          >
            <Text style={styles.text}>{isLastPage ? "Submit" : "Next"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  imageBackground: {
    flex: 1,
    paddingTop: 120,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  errorText: {
    fontWeight: "bold",
    marginTop: 250,
    fontSize: 25,
    textAlign: "center",
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
    justifyContent: "space-between",
    marginVertical: 10,
  },

  button: ({ marginRight = 0, opacity = 1 }) => ({
    backgroundColor: "dodgerblue",
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
    flex: 1,
    marginRight,
    opacity,
  }),

  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
