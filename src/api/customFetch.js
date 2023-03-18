const baseUrl = "https://opentdb.com/";
const customFetch = (url) => fetch(baseUrl + url).then((res) => res.json());

export default customFetch;
