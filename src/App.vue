<template>
  <h1>Ответьте на следующие вопросы и система предложит фильмы на основе ваших предпочтений</h1>
  <button 
    v-if="startBtn" 
    @click="openForm"
    style="width: 340px">Начать
  </button>
  <FormWithQuestions 
    v-if="formVisibility" 
    @getFilmsData="getFilmsData"/>
  <div class="movies-container">
    <MovieCard 
    v-if="moviesBlockVisibility"
    v-for="movieItem in filteredMovies"
    :key="movieItem.id"
    :movieItem="movieItem"/>
  </div>
  <button 
    class="tryAgainBtn"
    v-if="tryAgainBtn"
    @click="tryAgain">Попробовать снова!</button>
</template>

<script>
  import { defineComponent } from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import FormWithQuestions from "./components/form.vue"
  import MovieCard from "./components/movie_card.vue"

  export default defineComponent({
    name: 'App',
    components: {
      FormWithQuestions,
      MovieCard
    },
    data() {
      return {
        startBtn: true,
        formVisibility: false,
        moviesBlockVisibility: false,
        tryAgainBtn: false,
        filteredMovies: [],
      }
    },
    computed: {
      ...mapGetters([
        "movies"
      ])
    },
    methods: {
      ...mapActions([
        "get_movies"
      ]),
      openForm() {
        this.formVisibility = !this.formVisibility;
      },
      getFilmsData(data) {
        this.filteredMovies = this.movies.filter((currMovie) => {
          return data.genre == currMovie.genres[0] 
                  && data.age_restriction === currMovie.age_restriction 
                  && data.rating[0] <= currMovie.rating 
                  && data.rating[1] >= currMovie.rating;
        })
        this.moviesBlockVisibility = !this.moviesBlockVisibility;
        this.tryAgainBtn = !this.tryAgainBtn;
        this.startBtn = !this.startBtn;
        this.openForm();
        // console.log(this.filteredMovies);
      },
      tryAgain() {
        this.moviesBlockVisibility = !this.moviesBlockVisibility;
        this.tryAgainBtn = !this.tryAgainBtn;
        this.startBtn = !this.startBtn;
      }
    },
    mounted() {
      this.get_movies()
    }
  });
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: large;
  }

  button {
    font-size: x-large;
    color: #2c3e50
  }

  .movies-container {
    width: 70%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .tryAgainBtn {
    margin-top: 30px;
  }
</style>
