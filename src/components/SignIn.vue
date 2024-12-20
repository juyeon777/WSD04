<template>
  <div class="auth-container">
    <!-- 로그인 및 회원가입 카드 -->
    <div class="auth-card">
      <!-- 로고 -->
      <div class="auth-logo">
        <h1>YeonPlay</h1>
      </div>
      <transition name="slide" mode="out-in">
        <!-- 로그인 폼 -->
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
          <p class="switch-form">
            계정이 없으신가요? <span @click="toggleCard">회원가입</span>
          </p>
        </form>

        <!-- 회원가입 폼 -->
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
        nickname: "", // 닉네임 추가
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
        !!this.registerForm.nickname && // 닉네임 입력 여부 확인
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

      // 로컬 스토리지에 저장된 사용자 정보 가져오기
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");
      const storedNickname = localStorage.getItem("userNickname"); // 닉네임 가져오기

      if (email === storedEmail && password === storedPassword) {
        // 로그인 성공
        localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장
        localStorage.setItem("loggedInUser", storedNickname); // 닉네임을 로그인 사용자로 설정

        alert("로그인 성공!");

        // 홈 페이지로 이동
        this.$router.push({ name: "Home" }); // "Home"은 라우터에서 정의된 경로 이름
      } else {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    },
    handleRegister() {
      const { nickname, email, password } = this.registerForm;

      // 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem("userNickname", nickname); // 닉네임 저장
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isLoggedIn", "false"); // 기본값은 로그인되지 않음

      alert("회원가입 성공!");
      this.toggleCard(); // 회원가입 완료 후 로그인 화면으로 전환
    },
  },
};
</script>


<style scoped>
/* 전체 배경 */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e1e, #121212);
  color: #e5e7eb;
}

/* 카드 */
.auth-card {
  width: 400px;
  padding: 60px 30px 30px; /* 로고 공간 확보 */
  background: #1f2937;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  text-align: center;
  position: relative;
}

/* 로고 */
.auth-logo {
  position: absolute;
  top: -50px; /* 더 위로 이동 */
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.auth-logo h1 {
  font-size: 2.5rem;
  color: #3b82f6;
  text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
}

/* 제목 */
.form-title {
  margin-top: 50px; /* 로고와 간격 확보 */
  font-size: 1.5rem;
  color: #ffffff; /* 하얀색 */
}

/* 입력 필드 */
.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #2d3748;
  color: #e5e7eb;
}

input::placeholder {
  color: #9ca3af;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 5px #3b82f6;
}

/* 버튼 */
.form-btn {
  width: 100%;
  padding: 10px;
  background-color: #3b82f6;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-btn:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}

.form-btn:hover:enabled {
  background-color: #2563eb;
}

/* 전환 텍스트 */
.switch-form {
  text-align: center;
  margin-top: 15px;
}

.switch-form span {
  color: #3b82f6;
  cursor: pointer;
  text-decoration: underline;
}

/* 체크박스 */
.checkbox-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #e5e7eb;
}

/* 전환 애니메이션 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
