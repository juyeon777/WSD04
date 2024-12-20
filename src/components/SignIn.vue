<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-logo">
        <h1>YeonPlay</h1>
      </div>
      <transition name="slide" mode="out-in">
        <form v-if="isLoginVisible" @submit.prevent="handleLogin" key="login">
          <h2 class="form-title">로그인</h2>
          <div class="input-group">
            <input type="email" v-model="loginForm.email" placeholder="이메일" required />
          </div>
          <div class="input-group">
            <input type="password" v-model="loginForm.password" placeholder="비밀번호" required />
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="loginForm.rememberMe" />
              <span>Remember me</span>
            </label>
          </div>
          <button type="submit" :disabled="!isLoginFormValid" class="form-btn">로그인</button>
          <button @click="loginWithKakao" class="form-btn kakao-btn">카카오로 로그인</button> <!-- 카카오 로그인 버튼 추가 -->
          <p class="switch-form">
            계정이 없으신가요? <span @click="toggleCard">회원가입</span>
          </p>
        </form>
        <form v-else @submit.prevent="handleRegister" key="register">
          <h2 class="form-title">회원가입</h2>
          <div class="input-group">
            <input type="text" v-model="registerForm.nickname" placeholder="닉네임" required />
          </div>
          <div class="input-group">
            <input type="email" v-model="registerForm.email" placeholder="이메일" required />
          </div>
          <div class="input-group">
            <input type="password" v-model="registerForm.password" placeholder="비밀번호" required />
          </div>
          <div class="input-group">
            <input
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="registerForm.acceptTerms" />
              <span>약관에 동의합니다</span>
            </label>
          </div>
          <button type="submit" :disabled="!isRegisterFormValid" class="form-btn">회원가입</button>
          <p class="switch-form">
            이미 계정이 있으신가요? <span @click="toggleCard">로그인</span>
          </p>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      isLoginVisible: true,
      loginForm: {
        email: "",
        password: "",
        rememberMe: false,
      },
      registerForm: {
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      },
    };
  },
  computed: {
    isLoginFormValid() {
      return !!this.loginForm.email && !!this.loginForm.password;
    },
    isRegisterFormValid() {
      return (
        !!this.registerForm.nickname &&
        !!this.registerForm.email &&
        !!this.registerForm.password &&
        this.registerForm.password === this.registerForm.confirmPassword &&
        this.registerForm.acceptTerms
      );
    },
  },
  methods: {
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    handleLogin() {
      const { email, password } = this.loginForm;
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");
      const storedNickname = localStorage.getItem("userNickname");

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", storedNickname);
        alert("로그인 성공!");
        this.$router.push({ name: "Home" });
      } else {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    },
    handleRegister() {
      const { nickname, email, password } = this.registerForm;
      localStorage.setItem("userNickname", nickname);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isLoggedIn", "false");
      alert("회원가입 성공!");
      this.toggleCard();
    },
    loginWithKakao() {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.VUE_APP_KAKAO_API_KEY);
      }
      window.Kakao.Auth.login({
        success: (auth) => {
          console.log("Login Success:", auth);
          this.getKakaoUserInfo();
        },
        fail: (err) => {
          console.error("Kakao Login Failed:", err);
        },
      });
    },
    getKakaoUserInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log("User Info:", res);
          const nickname = res.kakao_account.profile.nickname;
          alert(`카카오 로그인 성공! 닉네임: ${nickname}`);
        },
        fail: (err) => {
          console.error("Failed to get Kakao user info:", err);
        },
      });
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
/* 카카오 버튼 추가 */
.kakao-btn {
  background-color: #fee500;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
}

.kakao-btn:hover {
  background-color: #ffd700;
}
</style>
