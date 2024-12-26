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
      // Kakao SDK 초기화
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY);
        console.log("Kakao SDK Initialized:", process.env.VUE_APP_KAKAO_API_KEY);
      }

      // Redirect 방식 로그인
      const AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAO_API_KEY}&redirect_uri=${process.env.VUE_APP_KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;
      window.location.href = AUTH_URL;
    },
    async fetchAccessToken(authCode) {
      try {
        const response = await fetch("https://kauth.kakao.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.VUE_APP_KAKAO_API_KEY,
            redirect_uri: process.env.VUE_APP_KAKAO_REDIRECT_URI,
            code: authCode,
          }),
        });

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          this.getKakaoUserInfo(data.access_token);
        } else {
          throw new Error(data.error_description || "Access Token 요청 실패");
        }
      } catch (err) {
        console.error("Access Token 요청 실패:", err);
        alert("로그인에 실패했습니다.");
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

          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              id,
              nickname,
              profileImg: kakao_account.profile.profile_image_url,
            })
          );

          alert(`환영합니다, ${nickname}님!`);
          this.$router.push({ name: "Home" });
        }
      } catch (err) {
        console.error("사용자 정보 요청 실패:", err);
        alert("사용자 정보를 가져올 수 없습니다.");
      }
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      this.fetchAccessToken(authCode);

      // URL에서 code 파라미터 제거
      const cleanUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.replaceState({}, document.title, cleanUrl);
    }
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
