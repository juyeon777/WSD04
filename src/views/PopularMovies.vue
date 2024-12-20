<template>
  <div class="popular-movies">
    <h1 class="main-title">🔥 대세 콘텐츠</h1>

    <!-- 영화 목록 -->
    <section class="movie-grid">
      <router-link
        v-for="movie in movies"
        :key="movie.id"
        :to="`/movie/${movie.id}`"
        class="movie-card"
      >
        <img :src="getPoster(movie)" :alt="movie.title" class="movie-poster" />
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-rating">평점: ⭐{{ movie.vote_average }}</p>
          <p class="movie-release">개봉일: {{ movie.release_date || "N/A" }}</p>
        </div>
      </router-link>
    </section>

    <!-- 로딩 인디케이터 -->
    <div v-if="loading" class="loading-indicator">Loading...</div>

    <!-- 페이지네이션 버튼 -->
    <div class="pagination-buttons">
      <button :disabled="currentPage === 1" @click="goToPreviousPage">이전</button>
      <span>현재 페이지: {{ currentPage }}</span>
      <button :disabled="currentPage === totalPages" @click="goToNextPage">다음</button>
    </div>

    <!-- "Top" 버튼 -->
    <button @click="scrollToTop" class="top-button">Top</button>
  </div>
</template>

---

### 스크립트

```javascript
<script>
import tmdb from "@/api/tmdb";

export default {
  name: "PopularMovies",
  data() {
    return {
      movies: [], // 현재 페이지의 영화 데이터
      currentPage: 1, // 현재 페이지 번호
      totalPages: 0, // 전체 페이지 수
      loading: false, // 로딩 상태
    };
  },
  methods: {
    // TMDB API에서 영화 데이터 가져오기
    async fetchMovies(page = 1) {
      this.loading = true;
      try {
        const response = await tmdb.get("/movie/popular", { params: { page } });
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
        this.currentPage = page;
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        alert("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
    // 포스터 URL 생성
    getPoster(movie) {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150x225?text=No+Image";
    },
    // 이전 페이지로 이동
    async goToPreviousPage() {
      if (this.currentPage > 1) {
        await this.fetchMovies(this.currentPage - 1);
      }
    },
    // 다음 페이지로 이동
    async goToNextPage() {
      if (this.currentPage < this.totalPages) {
        await this.fetchMovies(this.currentPage + 1);
      }
    },
    // "Top" 버튼 클릭 시 스크롤 맨 위로 이동
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  async created() {
    await this.fetchMovies(); // 컴포넌트 생성 시 첫 번째 페이지 데이터 로드
  },
};
</script>


<style scoped>
.popular-movies {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  color: #ff5722;
  margin-bottom: 30px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-card {
  display: block;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #333;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-bottom: 2px solid #ff5722;
}

.movie-info {
  padding: 15px;
  text-align: left;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.movie-rating,
.movie-release {
  font-size: 0.9rem;
  color: #555;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination-buttons button {
  padding: 10px 20px;
  border: none;
  background-color: #ff5722;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination-buttons button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination-buttons button:hover:not(:disabled) {
  background-color: #e64a19;
}

.top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 1000;
}

.top-button:hover {
  background-color: #e64a19;
  transform: scale(1.1);
}
</style>
