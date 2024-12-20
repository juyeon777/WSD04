<template>
  <div class="now-playing-view">
    <h1 :class="{ 'main-title': true, show: titleVisible }">
      🎬 현재 상영 중인 영화
    </h1>

    <!-- 예매율 Top 3 섹션 -->
    <section v-if="topBookingMovies.length" class="top-booking-movies">
      <h2 class="section-title">📊 예매율 Top 3</h2>
      <div class="top-movies-grid">
        <router-link
          v-for="(movie, index) in topBookingMovies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="top-movie-card"
        >
          <!-- 순위 배지 -->
          <div class="ranking-badge">Top {{ index + 1 }}</div>
          <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
            :alt="movie.title"
            class="movie-poster"
          />
          <div class="movie-info">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <p class="movie-rating">평점: ⭐{{ movie.vote_average }}/10</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 현재 상영 중 영화 목록 -->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="movies.length" class="movie-grid">
      <router-link
        v-for="movie in movies"
        :key="movie.id"
        :to="`/movie/${movie.id}`"
        class="movie-item"
      >
        <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="movie.title"
          class="movie-poster"
        />
        <div class="movie-info">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-date">개봉일: {{ movie.release_date || "정보 없음" }}</p>
        </div>
      </router-link>
    </div>
    <!-- 영화가 없을 때 -->
    <div v-else class="no-movies">
      <p>현재 상영 중인 영화를 찾을 수 없습니다.</p>
    </div>
  </div>
</template>


---

### 스크립트

```javascript
<script>
import tmdb from "@/api/tmdb";

export default {
  name: "NowPlayingView",
  data() {
    return {
      movies: [], // 현재 상영 중인 영화 데이터
      topBookingMovies: [], // 예매율 Top 3 영화 데이터
      loading: true, // 로딩 상태
      titleVisible: false, // 타이틀 표시 여부
    };
  },
  async created() {
    try {
      // 현재 상영 중 영화 데이터 가져오기
      const response = await tmdb.get("/movie/now_playing", {
        params: { language: "ko-KR" },
      });
      this.movies = response.data.results;

      // 예매율 Top 3 영화 데이터 추출 (임시로 평점 기준 정렬)
      this.topBookingMovies = [...this.movies]
        .sort((a, b) => b.vote_average - a.vote_average) // 높은 평점 순으로 정렬
        .slice(0, 3); // 상위 3개 영화 추출
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      alert("현재 상영 중인 영화를 불러오는 중 오류가 발생했습니다.");
    } finally {
      this.loading = false; // 로딩 상태 종료
    }
  },
  mounted() {
    // 타이틀 애니메이션 활성화
    setTimeout(() => {
      this.titleVisible = true;
    }, 500); // 0.5초 후 타이틀 표시
  },
};
</script>

<style scoped>
/* 기본 컨테이너 */
.now-playing-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 30px;
  opacity: 0; /* 초기 상태 */
  transform: translateY(20px); /* 아래에서 위로 이동 */
  transition: opacity 1.5s ease, transform 1.5s ease; /* 스르륵 효과 */
}

.main-title.show {
  opacity: 1;
  transform: translateY(0); /* 제자리로 이동 */
}

/* 예매율 Top 3 섹션 */
.top-booking-movies {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
}

.top-movies-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.top-movie-card {
  width: 200px;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.top-movie-card:hover {
  transform: scale(1.05); /* 볼록 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

/* 순위 배지 */
.ranking-badge {
  position: absolute; /* 포스터 위에 고정 */
  top: 10px;
  left: 10px;
  background-color: #ff5722;
  color: #fff;
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1; /* 포스터보다 위에 표시되도록 설정 */
  opacity: 1; /* 항상 표시되도록 설정 */
  transition: none; /* hover 효과 제거 */
}
/* 예매율 Top 3 카드 */
.top-movie-card {
  width: 200px;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* 배지 위치 기준 */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.top-movie-card:hover {
  transform: scale(1.05); /* 볼록 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}
/* 영화 그리드 */
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
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-item:hover {
  transform: scale(1.05); /* 볼록 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

/* 포스터 이미지 */
.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
}

/* 영화 정보 */
.movie-info {
  padding: 10px;
  text-align: left;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.movie-rating, 
.movie-date {
  font-size: 1rem;
  color: #555;
}

/* 영화 없음 메시지 */
.no-movies {
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin-top: 20px;
}

/* 링크 스타일 */
a {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 부모 색상 상속 */
}

a:hover {
  text-decoration: none; /* 호버 시에도 밑줄 제거 */
}

</style>
