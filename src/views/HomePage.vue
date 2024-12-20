<template>
  <div class="homepage">

    <!-- 메인 타이틀 -->
    <h1
      :key="'main-title'" 
      :class="{ 'main-title': true, show: titleVisible }"
    >
      🎬 YeonPlay: 영화의 모든 것
    </h1>

    <!-- 현재 상영 중 -->
    <section class="movie-section now-playing">
      <h2 class="section-title">✨ 현재 상영 중</h2>
      <div class="movie-carousel" ref="carousel">
        <router-link
          v-for="movie in nowPlayingMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="carousel-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <div class="carousel-info">
            <h3>{{ movie.title }}</h3>
            <p>평점: ⭐{{ movie.vote_average }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 대세 콘텐츠 -->
    <section class="movie-section popular-movies">
      <h2 class="section-title">🔥 대세 콘텐츠</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in popularMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>평점: ⭐{{ movie.vote_average }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 높은 평점 영화 -->
    <section class="movie-section top-rated">
      <h2 class="section-title">🌟 높은 평점 영화</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in topRatedMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>평점: ⭐{{ movie.vote_average }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 개봉 예정 -->
    <section class="movie-section upcoming">
      <h2 class="section-title">📅 개봉 예정</h2>
      <div class="movie-grid">
        <router-link
          v-for="movie in upcomingMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="movie-item"
        >
          <img :src="getPoster(movie)" :alt="movie.title" />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p>개봉일: {{ movie.release_date }}</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import tmdb from "@/api/tmdb";

export default {
  name: "HomePage",
  data() {
    return {
      nowPlayingMovies: [],
      popularMovies: [],
      topRatedMovies: [],
      upcomingMovies: [],
      slideInterval: null,
      titleVisible: false,
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const nowPlayingResponse = await tmdb.get("/movie/now_playing", {
          params: { language: "ko-KR", page: 1 },
        });
        this.nowPlayingMovies = nowPlayingResponse.data.results;

        const popularResponse = await tmdb.get("/movie/popular", {
          params: { language: "ko-KR", page: 1 },
        });
        this.popularMovies = popularResponse.data.results;

        const topRatedResponse = await tmdb.get("/movie/top_rated", {
          params: { language: "ko-KR", page: 1 },
        });
        this.topRatedMovies = topRatedResponse.data.results;

        const upcomingResponse = await tmdb.get("/movie/upcoming", {
          params: { language: "ko-KR", page: 1 },
        });
        this.upcomingMovies = upcomingResponse.data.results;
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        alert("영화 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    },
    getPoster(movie) {
      return movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/150x225?text=No+Image";
    },
    startCarousel() {
      const carousel = this.$refs.carousel;
      let scrollPosition = 0;

      this.slideInterval = setInterval(() => {
        if (!carousel) return;

        const carouselWidth = carousel.offsetWidth;
        const maxScrollLeft = carousel.scrollWidth - carouselWidth;

        scrollPosition += carouselWidth / 3;

        if (scrollPosition > maxScrollLeft) {
          scrollPosition = 0;
        }

        carousel.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }, 3000);
    },
    stopCarousel() {
      clearInterval(this.slideInterval);
    },
  },
  async created() {
    await this.fetchMovies();
  },
  mounted() {
    setTimeout(() => {
      this.titleVisible = true;
    }, 500);
    this.startCarousel();
  },
  beforeUnmount() {
    this.stopCarousel();
    this.titleVisible = false;

  },
};
</script>

<style scoped>
/* 전체 레이아웃 */
.homepage {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #121212;
  color: #ffffff;
}

/* 메인 타이틀 */
.main-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #3b82f6;
  text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6; /* 네온 효과 */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.main-title.show {
  opacity: 1;
  transform: translateY(0);
}

/* 영화 섹션 */
.movie-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff; /* 섹션 타이틀을 흰색으로 */
}

/* 캐러셀 */
.movie-carousel {
  display: flex;
  overflow-x: hidden;
  gap: 20px;
}

.carousel-item {
  flex: 0 0 auto;
  width: 200px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.carousel-item:hover {
  transform: scale(1.1);
}

.carousel-item img {
  width: 100%;
  border-radius: 10px;
}

/* 그리드 레이아웃 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.movie-item {
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;
}

.movie-item:hover {
  transform: scale(1.05);
}

.movie-item img {
  width: 100%;
  border-radius: 10px;
}

.movie-info {
  margin-top: 10px;
}

/* 링크 밑줄 제거 */
a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}
</style>
