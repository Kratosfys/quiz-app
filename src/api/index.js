import customFetch from "./customFetch";

const fetchCategories = () => customFetch("api_category.php");
const fetchQuizItems = ({ categoryId, difficulty }) => {
  let query = "api.php?amount=10";
  if (categoryId) {
    query += `&category=${categoryId}`;
  }
  if (difficulty) {
    query += `&difficulty=${difficulty}`;
  }
  return customFetch(query);
};

export { fetchCategories, fetchQuizItems };
