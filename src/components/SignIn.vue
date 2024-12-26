<template>
  <div class="auth-container">
    <h1>YeonPlay 로그인</h1>
    <button @click="loginWithKakao" class="form-btn kakao-btn">카카오로 로그인</button>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  methods: {
    loginWithKakao() {
      const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;
      const redirectUri = process.env.VUE_APP_KAKAO_REDIRECT_URI;


      if (!kakaoApiKey || !redirectUri) {
        console.error("환경 변수가 제대로 설정되지 않았습니다.");
        alert("시스템 설정에 문제가 있습니다. 관리자에게 문의하세요.");
        return;
      }

      if (!window.Kakao || !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey);
        console.log("Kakao SDK Initialized:", kakaoApiKey);
      }

      // 상태 토큰(state) 생성
      const stateToken = Math.random().toString(36).substring(2);
      localStorage.setItem("kakaoStateToken", stateToken);

      // Kakao 로그인 URL 생성 및 리다이렉트
      const AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${redirectUri}&response_type=code&state=${stateToken}&prompt=login`;
      window.location.href = AUTH_URL;
    },

    async fetchAccessToken(authCode, state) {
      try {
        const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;
        const redirectUri = process.env.VUE_APP_KAKAO_REDIRECT_URI;

        if (!kakaoApiKey || !redirectUri) {
          throw new Error("환경 변수가 올바르게 설정되지 않았습니다.");
        }

        // 상태 토큰 검증
        const storedState = localStorage.getItem("kakaoStateToken");
        if (state !== storedState) {
          throw new Error("상태 토큰 불일치: 인증 요청이 위조되었을 가능성이 있습니다.");
        }

        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: kakaoApiKey,
            redirect_uri: redirectUri,
            code: authCode,
          }),
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          this.getKakaoUserInfo(data.access_token);
        } else {
          console.error("Access Token 요청 실패:", data);
          alert("로그인에 실패했습니다.");
        }
      } catch (err) {
        console.error("Access Token 요청 중 오류 발생:", err);
        alert("Access Token 요청 실패: 시스템 관리자에게 문의하세요.");
      }
    },

    async getKakaoUserInfo(accessToken) {
      try {
        const response = await fetch("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userInfo = await response.json();

        if (userInfo) {
          const { id, kakao_account } = userInfo;
          const nickname = kakao_account.profile.nickname;
          const profileImg = kakao_account.profile.profile_image_url || "/default-profile.png";

          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              id,
              nickname,
              profileImg,
            })
          );

          alert(`환영합니다, ${nickname}님!`);
          this.$router.push({ name: "Home" });
        } else {
          throw new Error("사용자 정보를 가져올 수 없습니다.");
        }
      } catch (err) {
        console.error("사용자 정보 요청 중 오류 발생:", err);
        alert("사용자 정보를 가져올 수 없습니다. 시스템 관리자에게 문의하세요.");
      }
    },

    handleAuthCode() {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");
      const state = urlParams.get("state");

      if (authCode && state) {
        this.fetchAccessToken(authCode, state);

        // URL에서 code와 state 파라미터 제거
        const cleanUrl = `${window.location.origin}${window.location.pathname}`;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    },
  },
  mounted() {
    this.handleAuthCode();
  },
};
</script>

<style scoped>
.auth-container {
  text-align: center;
  margin-top: 100px;
}
.kakao-btn {
  background-color: #fee500;
  color: #000;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.kakao-btn:hover {
  background-color: #ffd700;
}
</style>
