<template>
  <div class="movie-grid">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="movie-item"
      @click="goToDetail(movie.id)"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <h3>{{ movie.title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [], // TMDB에서 가져온 영화 데이터를 저장할 배열
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_TMDB_BASE_URL}/movie/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        this.movies = data.results; // TMDB에서 가져온 영화 데이터를 저장
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    goToDetail(id) {
      this.$router.push({ name: "MovieDetail", params: { id } });
    },
  },
  mounted() {
    this.fetchMovies(); // 컴포넌트가 마운트되면 TMDB API를 호출
  },
};
</script>

<style>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}
.movie-item {
  cursor: pointer;
  text-align: center;
}
.movie-item img {
  width: 100%;
  border-radius: 8px;
}
</style>
