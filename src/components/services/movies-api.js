import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzllNDlkYzI0N2Y0NWQ3MTA1NTUzYThkODljOGJkOSIsIm5iZiI6MTcyNTU2Njg0OC4xMDk2NjQsInN1YiI6IjY2ZDk1Zjc1MzUyMGY4Yjg1YWJkOWU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9HMeuhOLPY8XdW4YnLsvUAnSw62kHz5BYK-w9hxDrn8";
const options = {
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

export const getTrendingMovies = async () => {
  return axios
    .get("/trending/movie/day", options)
    .then(response => response.data.results)
    .catch(error => {
      console.error("Error to get trending movies", error);
      return [];
    });
};

export const getMovieById = async movieId => {
  const response = await axios
    .get(`/movie/${movieId}`, options)
    .then(response => response.data)
    .catch(error => {
      console.error("Error to get movie by ID", error);
    });
  return response;
};

export const getMovies = async query => {
  const response = await axios
    .get(`search/movie?query=${query}`, options)
    .then(response => response.data.results)
    .catch(error => {
      console.error("Error to get movies", error);
    });
  return response;
};

// export const getMovieCast = async () => {
//   return axios
//     .get(`movie/${movie_id}/credits`, options)
//     .then(response => response.data)
//     .catch(error => {
//       console.error(error);
//     });
//   return response;
// };

// import axios from "axios";

// axios.defaults.baseURL = "https://api.unsplash.com";

// export const fetchImages = async (page, topic) => {
//   const API_KEY = "jB0iXIVOPKU9hIM7iaw4BgYB87W5iXiKVc43zSkH9-8";

//   const response = await axios.get("/search/photos", {
//     params: {
//       query: topic,
//       client_id: API_KEY,
//       orientation: "landscape",
//       page,
//       per_page: 12,
//     },
//   });

//   return {
//     images: response.data.results,
//     totalPages: response.data.total_pages,
//   };
// };
