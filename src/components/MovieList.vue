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
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'MovieDetail', params: { id } });
    },
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
