<template>
  <div>
    <h1>Search Results</h1>

    <!-- 필터링 UI -->
    <div class="filter-container">
      <select v-model="selectedGenre" @change="filterMovies">
        <option value="">모든 장르</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <select v-model="selectedRating" @change="filterMovies">
        <option value="">모든 평점</option>
        <option value="8">8점 이상</option>
        <option value="7">7점 이상</option>
        <option value="6">6점 이상</option>
      </select>

      <select v-model="sortOption" @change="sortMovies">
        <option value="popularity">인기순</option>
        <option value="release_date">최신 개봉일</option>
        <option value="vote_average">평점순</option>
      </select>

      <button @click="resetFilters">초기화</button>
    </div>

    <!-- 결과 표시 -->
    <div class="movie-grid">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-item"
      >
        <img
          :src="movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="movie.title"
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.release_date || '개봉일 정보 없음' }}</p>
      </div>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">로딩 중...</div>

    <!-- 무한 스크롤 감지 요소 -->
    <div ref="observer" class="scroll-observer"></div>
  </div>
</template>

<script>
import tmdb from '@/api/tmdb';

export default {
  data() {
    return {
      movies: [], // 전체 영화 목록
      filteredMovies: [], // 필터링된 영화 목록
      genres: [], // 장르 데이터
      selectedGenre: '', // 선택된 장르
      selectedRating: '', // 선택된 평점
      sortOption: 'popularity', // 정렬 기준
      page: 1, // 현재 페이지
      totalPages: null, // 전체 페이지 수
      loading: false, // 로딩 상태
    };
  },
  methods: {
    async fetchGenres() {
      const response = await tmdb.get('/genre/movie/list', { params: { language: 'ko-KR' } });
      this.genres = response.data.genres;
    },
    async fetchMovies() {
      if (this.loading || (this.totalPages && this.page > this.totalPages)) return;

      this.loading = true;
      try {
        const response = await tmdb.get('/search/movie', {
          params: {
            query: this.$route.query.q || '',
            page: this.page,
            language: 'ko-KR',
          },
        });
        const { results, total_pages } = response.data;
        this.movies.push(...results);
        this.filteredMovies = [...this.movies];
        this.totalPages = total_pages;
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        this.loading = false;
      }
    },
    filterMovies() {
      this.filteredMovies = this.movies.filter(movie => {
        const matchesGenre = this.selectedGenre ? movie.genre_ids.includes(parseInt(this.selectedGenre)) : true;
        const matchesRating = this.selectedRating ? movie.vote_average >= parseFloat(this.selectedRating) : true;
        return matchesGenre && matchesRating;
      });
    },
    sortMovies() {
      this.filteredMovies.sort((a, b) => {
        if (this.sortOption === 'popularity') return b.popularity - a.popularity;
        if (this.sortOption === 'release_date') return new Date(b.release_date) - new Date(a.release_date);
        if (this.sortOption === 'vote_average') return b.vote_average - a.vote_average;
      });
    },
    resetFilters() {
      this.selectedGenre = '';
      this.selectedRating = '';
      this.sortOption = 'popularity';
      this.filteredMovies = [...this.movies];
    },
    observeScroll() {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.page++;
          this.fetchMovies();
        }
      });
      observer.observe(this.$refs.observer);
    },
  },
  created() {
    this.fetchGenres();
    this.fetchMovies();
  },
  mounted() {
    this.observeScroll();
  },
};
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-item {
  text-align: center;
}

.movie-item img {
  width: 100%;
  border-radius: 8px;
}

.movie-item h3 {
  margin: 10px 0 5px;
  font-size: 1.1rem;
}

.movie-item p {
  font-size: 0.9rem;
  color: #666;
}

.filter-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}

.scroll-observer {
  height: 1px;
}
</style>
