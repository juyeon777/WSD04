import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Kakao SDK 초기화 로직
if (typeof window !== "undefined" && !window.Kakao) {
  console.error('Kakao SDK를 로드하지 못했습니다. index.html에 스크립트를 추가하세요.');
} else if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
  const kakaoApiKey = process.env.VUE_APP_KAKAO_API_KEY;

  if (!kakaoApiKey) {
    console.error('Kakao API Key가 정의되지 않았습니다. .env 파일에서 VUE_APP_KAKAO_API_KEY를 확인하세요.');
  } else {
    window.Kakao.init(kakaoApiKey);
    console.log('Kakao SDK Initialized with Key:', kakaoApiKey);
  }
}

// Vue 애플리케이션 초기화
const app = createApp(App);
app.use(router);
app.mount('#app');
