<template>
  <div class="genre-filter-view">
    <h1 :class="{ 'main-title': true, show: titleVisible }">
      🎬 장르별 영화
    </h1>

    <!-- 장르 선택 필터 -->
    <div class="filter-container">
      <label for="genre" class="filter-label">장르 선택:</label>
      <select id="genre" v-model="selectedGenre" @change="filterMovies" class="filter-select">
        <option value="">모든 장르</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>영화 데이터를 불러오는 중입니다...</p>
    </div>

    <!-- 영화 리스트 -->
    <div v-else-if="movies.length" class="movie-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <router-link :to="`/movie/${movie.id}`" class="movie-link">
          <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
            :alt="movie.title"
            class="movie-poster"
          />
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <p class="movie-date">개봉일: {{ movie.release_date || '정보 없음' }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 영화 없음 -->
    <div v-else class="no-movies">
      <p>선택한 장르에 해당하는 영화를 찾을 수 없습니다.</p>
    </div>
  </div>
</template>

---

### 스크립트

```javascript
<script>
import tmdb from "@/api/tmdb";

export default {
  name: "GenreFilterView",
  data() {
    return {
      genres: [], // 장르 목록
      movies: [], // 필터링된 영화 데이터
      selectedGenre: "", // 선택된 장르 ID
      loading: true, // 로딩 상태
      titleVisible: false, // 타이틀 애니메이션 상태
    };
  },
  async created() {
    await this.fetchGenres(); // 장르 목록 가져오기
    await this.fetchMovies(); // 모든 영화 가져오기
  },
  mounted() {
    setTimeout(() => {
      this.titleVisible = true; // 타이틀 애니메이션 활성화
    }, 500); // 약간의 지연 후 애니메이션 실행
  },
  methods: {
    // 장르 목록 가져오기
    async fetchGenres() {
      try {
        const response = await tmdb.get("/genre/movie/list", {
          params: { language: "ko-KR" },
        });
        this.genres = response.data.genres;
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        alert("장르 목록을 불러오는 데 실패했습니다.");
      }
    },
    // 영화 가져오기 (필터링 포함)
    async fetchMovies() {
      this.loading = true;
      try {
        const response = await tmdb.get("/discover/movie", {
          params: {
            language: "ko-KR",
            with_genres: this.selectedGenre || undefined, // 장르 필터 적용
          },
        });
        this.movies = response.data.results;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("영화 목록을 불러오는 데 실패했습니다.");
      } finally {
        this.loading = false;
      }
    },
    // 장르 변경 시 영화 필터링
    async filterMovies() {
      await this.fetchMovies();
    },
  },
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.genre-filter-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* 타이틀 스타일 */
.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #a259ff;
  margin-bottom: 30px;
  opacity: 0; /* 초기 상태 */
  transform: translateY(20px); /* 아래에서 위로 이동 */
  transition: opacity 1.5s ease, transform 1.5s ease; /* 스르륵 효과 */
}

.main-title.show {
  opacity: 1;
  transform: translateY(0); /* 제자리로 이동 */
}

/* 필터 스타일 */
.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.filter-label {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
}

.filter-select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 로딩 스타일 */
.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.loader {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.loader div {
  width: 12px;
  height: 12px;
  background: #42b983;
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
}

.loader div:nth-child(1) {
  animation-delay: 0s;
}
.loader div:nth-child(2) {
  animation-delay: 0.3s;
}
.loader div:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 영화 그리드 스타일 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-item {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.movie-link {
  text-decoration: none;
  color: inherit;
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-info {
  padding: 10px;
  text-align: left;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.movie-date {
  font-size: 0.9rem;
  color: #777;
}

/* 영화 없음 메시지 */
.no-movies {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin-top: 20px;
}
</style>
