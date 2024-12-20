<template>
  <div id="app">
    <!-- 헤더 -->
    <header v-if="isLoggedIn">
      <div class="header-top">
        <div class="logo">
          <h1>YeonPlay</h1>
        </div>
        <div class="user-info">
          <!-- 로그인 상태에 따라 닉네임 표시 -->
          <span>{{ loggedInUser }}님</span>
          <button v-if="isLoggedIn" @click="logout" class="logout-btn">로그아웃</button>
        </div>
      </div>
      <div class="header-bottom">
        <nav>
          <router-link to="/">홈</router-link>
          <router-link to="/popular">대세 콘텐츠</router-link>
          <router-link to="/now_playing">현재 상영 중인 영화</router-link>
          <router-link to="/genres">장르별 영화</router-link>
          <router-link to="/wishlist">내가 찜한 콘텐츠</router-link>
        </nav>
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="영화 제목을 입력하세요."
            @keyup.enter="performSearch"
          />
          <button @click="performSearch">검색!</button>
        </div>
      </div>
    </header>
    <main>
      <router-view @login-success="checkLoginStatus" />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      isLoggedIn: false,
      loggedInUser: "", // 닉네임을 표시하기 위한 변수
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: "SearchMovies", query: { q: this.searchQuery } });
        this.searchQuery = "";
      } else {
        alert("검색어를 입력해주세요.");
      }
    },
    logout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
      this.isLoggedIn = false;
      this.loggedInUser = "";
      alert("로그아웃되었습니다.");
      this.$router.push("/signin");
    },
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      this.loggedInUser = localStorage.getItem("loggedInUser") || ""; // 닉네임 가져오기
      console.log("로그인 상태:", this.isLoggedIn, "닉네임:", this.loggedInUser);
    },
  },
  created() {
    this.checkLoginStatus();
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
};
</script>


<style>
/* 기본 스타일 */
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 헤더가 상단에 고정 */
  align-items: stretch; /* 가로 공간 채우기 */
  min-height: 100vh;
}

/* 헤더 스타일 */
header {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column; /* 상단과 하단을 수직으로 배치 */
  gap: 10px; /* 상단과 하단 사이 간격 */
}

/* 상단 로고와 사용자 정보 */
.header-top {
  display: flex;
  justify-content: space-between; /* 로고는 왼쪽, 사용자 정보는 오른쪽 */
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 1.8rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logout-btn {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* 하단 메뉴와 검색 */
.header-bottom {
  display: flex;
  justify-content: space-between; /* 메뉴는 왼쪽, 검색은 오른쪽 */
  align-items: center;
  flex-wrap: wrap; /* 좁은 화면에서 줄 바꿈 */
  gap: 10px; /* 요소 간격 */
}

nav {
  display: flex;
  gap: 20px; /* 메뉴 간 간격 */
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

nav a:hover {
  color: #1E90FF;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #1E90FF;
}

/* 검색 필드 스타일 */
.search-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-container input {
  width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.search-container button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-container button:hover {
  background-color: #1E90FF;
}

/* 반응형 처리 */
@media (max-width: 768px) {
  .header-bottom {
    flex-direction: column; /* 하단 메뉴와 검색을 세로 정렬 */
    align-items: flex-start;
  }

  .search-container {
    width: 100%; /* 검색 필드가 화면 너비에 맞게 늘어남 */
  }

  .search-container input {
    width: 100%; /* 검색 입력 필드 너비 100% */
    max-width: 300px; /* 최대 너비 제한 */
  }
}
/* 애니메이션 정의 */
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 애니메이션 클래스 */
.main-title {
  opacity: 0;
  transform: translateY(20px); /* 초기 위치 */
  transition: opacity 1.5s ease, transform 1.5s ease; /* 스르륵 효과 */
}

.main-title.show {
  opacity: 1;
  transform: translateY(0); /* 제자리로 이동 */
}

</style>
