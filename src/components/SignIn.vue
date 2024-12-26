<template>
  <div class="signin">
    <h1>YeonPlay 로그인</h1>
    <p>카카오 계정으로 로그인하려면 아래 버튼을 클릭하세요.</p>
    <button @click="loginWithKakao" class="kakao-btn">카카오 계정으로 로그인</button>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithKakao() {
      const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;
      const redirectUri = process.env.VUE_APP_KAKAO_REDIRECT_URI;

      if (!window.Kakao || !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey); // 카카오 SDK 초기화
      }

      window.Kakao.Auth.authorize({
        redirectUri,
      });
    },
  },
};
</script>

<style scoped>
/* 로그인 페이지 스타일 */
.signin {
  text-align: center;
  margin-top: 100px;
}

.kakao-btn {
  background-color: #fee500;
  color: #000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.kakao-btn:hover {
  background-color: #ffd700;
}
</style>
