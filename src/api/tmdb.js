import axios from 'axios';

// axios 인스턴스 생성 및 내보내기
const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // TMDB API 기본 URL
  params: {
    api_key: process.env.VUE_APP_TMDB_API_KEY, // 환경 변수에서 API 키 가져오기
    language: 'ko-KR', //tmdb api의 언어 설정 추가
  },
});


export default tmdb;