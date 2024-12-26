<template>
  <div id="app">
    <!-- 헤더 -->
    <header>
      <div class="header-top">
        <div class="logo">
          <h1>YeonPlay</h1>
        </div>
        <nav class="menu">
          <router-link to="/">홈</router-link>
          <router-link to="/popular">대세 콘텐츠</router-link>
          <router-link to="/now_playing">현재 상영 중</router-link>
          <router-link to="/genres">장르별 콘텐츠</router-link>
          <router-link to="/wishlist">내가 찜한 콘텐츠</router-link>
        </nav>
        <div class="auth">
          <span v-if="isLoggedIn" class="username">{{ loggedInUser }}님</span>
          <button v-if="isLoggedIn" @click="logout" class="logout-btn">로그아웃</button>
          <button v-else @click="loginWithKakao" class="login-btn">로그인</button>
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      loggedInUser: "",
    };
  },
  methods: {
    /** 카카오 로그인 */
    loginWithKakao() {
      const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;
      const redirectUri = process.env.VUE_APP_KAKAO_REDIRECT_URI;

      if (!window.Kakao || !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey); // 카카오 SDK 초기화
      }

      // 카카오 로그인 창 호출
      window.Kakao.Auth.authorize({
        redirectUri, // prompt 제거
      });
    },

    /** 로그아웃 */
    async logout() {
      try {
        // 1. 카카오 서버 로그아웃
        if (window.Kakao && window.Kakao.Auth) {
          await window.Kakao.Auth.logout();
          console.log("카카오 세션 로그아웃 완료");
        }

        // 2. 로컬 스토리지, 세션 스토리지 데이터 삭제
        localStorage.clear(); // 모든 localStorage 데이터 삭제
        sessionStorage.clear(); // 모든 sessionStorage 데이터 삭제

        // 3. Vue 상태 초기화
        this.isLoggedIn = false;
        this.loggedInUser = "";
        this.wishlist = []; // 찜 데이터 초기화

        // 4. 홈 화면으로 이동
        alert("로그아웃되었습니다. 모든 정보가 초기화됩니다.");
        this.$router.push("/");
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
        alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    },

    /** 로그인 상태 확인 */
    async checkLoginStatus() {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const response = await fetch("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const data = await response.json();

          if (data.kakao_account) {
            this.loggedInUser = data.kakao_account.profile.nickname;
            this.isLoggedIn = true;
            localStorage.setItem("loggedInUser", this.loggedInUser);
            localStorage.setItem("isLoggedIn", "true");
          }
        } catch (error) {
          console.error("사용자 정보를 가져오는 중 오류 발생:", error);
          this.isLoggedIn = false;
        }
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = "";
      }
    },
  },
  async created() {
    await this.checkLoginStatus();

    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      try {
        const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;
        const redirectUri = process.env.VUE_APP_KAKAO_REDIRECT_URI;

        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: kakaoApiKey,
            redirect_uri: redirectUri,
            code: authCode,
          }),
        });

        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("accessToken", data.access_token);
          await this.checkLoginStatus();
          this.$router.push("/"); // 로그인 후 홈 화면으로 이동
        }
      } catch (err) {
        console.error("로그인 처리 중 오류 발생:", err);
      }
    }
  },
};
</script>

<style scoped>
/* 기본 스타일 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* 헤더 스타일 */
header {
  background-color: #1e1e1e;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo h1 {
  font-size: 24px;
  color: #00aaff;
  margin: 0;
}

/* 메뉴 스타일 */
.menu {
  display: flex;
  gap: 20px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
}

.menu a:hover {
  background-color: #333;
}

/* 인증 섹션 스타일 */
.auth {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username {
  font-size: 16px;
  color: #00ff00;
}

.login-btn,
.logout-btn {
  background-color: #00aaff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover,
.logout-btn:hover {
  background-color: #007acc;
}
</style>
