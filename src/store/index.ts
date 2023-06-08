import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    movies: [],
  },
  getters: {
    movies(state) {
      return state.movies;
    }
  },
  mutations: {
    put_movies_data_to_arr: (state, movies) => {
      state.movies = movies;
    }
  },
  actions: {
    get_movies({commit}) {
      return axios("http://localhost:3000/movies", {method: "GET"})
      .then((movies) => {
        commit('put_movies_data_to_arr', movies.data);
        return movies;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    }
  },
  modules: {
  }
})
