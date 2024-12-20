<template>
  <div class="movie-detail-container">
    <!-- 로딩 중 -->
    <div v-if="loading" class="loading-container">
      <p>로딩 중...</p>
    </div>

    <!-- 영화 상세 정보 -->
    <div v-else-if="movie" class="movie-detail-card">
      <!-- 왼쪽 섹션: 포스터 및 제목 -->
      <div class="movie-detail-left">
        <img
          :src="movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image' "
          :alt="movie.title"
          class="movie-poster"
        />
        <h1 class="movie-title">{{ movie.title }}</h1>
      </div>

      <!-- 오른쪽 섹션: 설명 및 추가 정보 -->
      <div class="movie-detail-right">
        <p class="movie-overview">{{ movie.overview || "영화 설명이 없습니다." }}</p>
        <p class="movie-info">
          <strong>개봉일:</strong> {{ movie.release_date || "정보 없음" }}
        </p>
        <p class="movie-info">
          <strong>평점:</strong> ⭐{{ movie.vote_average || "N/A" }}/10
        </p>
        <!-- 찜하기 버튼 -->
        <button @click="addToWishlist" class="wishlist-btn">찜하기</button>
      </div>
    </div>

    <!-- 관련 추천 영화 -->
    <div v-if="recommendations.length" class="recommendations-section">
      <h2>관련 추천 영화</h2>
      <div class="recommendations-grid">
        <router-link
          v-for="recommendation in recommendations"
          :key="recommendation.id"
          :to="`/movie/${recommendation.id}`"
          class="recommendation-item"
        >
          <img
            :src="recommendation.poster_path 
              ? `https://image.tmdb.org/t/p/w500${recommendation.poster_path}` 
              : 'https://via.placeholder.com/500x750?text=No+Image' "
            :alt="recommendation.title"
          />
          <h3>{{ recommendation.title }}</h3>
        </router-link>
      </div>
    </div>

    <!-- 영화 데이터를 찾을 수 없을 때 -->
    <div v-else class="error-message">
      <p>영화를 찾을 수 없습니다. 나중에 다시 시도해 주세요.</p>
    </div>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "MovieDetailView",
  data() {
    return {
      movie: null, // 영화 상세 정보
      recommendations: [], // 추천 영화 리스트
      loading: true, // 로딩 상태
    };
  },
  methods: {
    // TMDB API로 영화 상세 정보 가져오기
    async fetchMovieDetails() {
      try {
        const movieId = this.$route.params.id; // URL 파라미터에서 영화 ID 가져오기
        const response = await tmdb.get(`/movie/${movieId}`, {
          params: { language: "ko-KR" },
        });
        this.movie = response.data; // 영화 데이터 저장
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        alert("영화 정보를 불러오지 못했습니다. 다시 시도해 주세요.");
      } finally {
        this.loading = false; // 로딩 상태 종료
      }
    },
    // TMDB API로 추천 영화 가져오기
    async fetchRecommendations() {
      try {
        const movieId = this.$route.params.id; // URL 파라미터에서 영화 ID 가져오기
        const response = await tmdb.get(`/movie/${movieId}/recommendations`, {
          params: { language: "ko-KR" },
        });
        this.recommendations = response.data.results.slice(0, 5); // 최대 5개 추천 영화만 저장
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        alert("추천 영화를 불러오지 못했습니다.");
      }
    },
    // 찜하기 기능
    addToWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const alreadyInWishlist = wishlist.some((item) => item.id === this.movie.id);

      if (!alreadyInWishlist) {
        wishlist.push({
          id: this.movie.id,
          title: this.movie.title,
          release_date: this.movie.release_date,
          poster_path: this.movie.poster_path,
          vote_average: this.movie.vote_average,
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("찜한 콘텐츠에 추가되었습니다!");
      } else {
        alert("이미 찜한 콘텐츠입니다.");
      }
    },
  },
  watch: {
    // URL의 영화 ID가 변경될 때 데이터를 다시 로드
    "$route.params.id": {
      immediate: true,
      handler() {
        this.loading = true;
        this.fetchMovieDetails();
        this.fetchRecommendations();
      },
    },
  },
};
</script>

<style scoped>
/* 메인 컨테이너 */
.movie-detail-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 영화 상세 카드 */
.movie-detail-card {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.movie-detail-left {
  flex: 1 1 300px;
  text-align: center;
}

.movie-poster {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.movie-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 10px;
}

.movie-detail-right {
  flex: 2 1 400px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.movie-overview {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.movie-info {
  font-size: 0.9rem;
  color: #333;
}

.wishlist-btn {
  align-self: flex-start;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
}

.wishlist-btn:hover {
  transform: translateY(-2px);
  background-color: #369d6c;
}

/* 추천 영화 섹션 */
.recommendations-section {
  margin-top: 40px;
  text-align: left;
}

.recommendations-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.recommendation-item {
  text-decoration: none;
  color: inherit;
  text-align: center;
}

.recommendation-item img {
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s;
}

.recommendation-item:hover img {
  transform: scale(1.05);
}

.recommendation-item h3 {
  font-size: 1rem;
  margin-top: 10px;
  color: #333;
}
</style>
