import { createRouter, createWebHistory } from 'vue-router';
import PopularMovies from '../views/PopularMovies.vue';
import MovieDetailView from '../views/MovieDetailView.vue';
import AboutView from '../views/AboutView.vue';
import MovieList from '../components/MovieList.vue';
import MovieSearch from '../views/MovieSearch.vue';
import GenreFilterView from '../views/GenreFilterView.vue';
import SignInView from '../components/SignIn.vue';
import WishlistView from '../views/WishlistView.vue';
import NowPlayingView from '../views/NowPlayingView.vue';
import HomePage from '../views/HomePage.vue';

// 라우트 정의
const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInView,
    meta: { hideHeader: true }, // 헤더 숨김 설정
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/popular',
    name: 'PopularMovies',
    component: PopularMovies,
    meta: { requiresAuth: true },
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetailView,
    meta: { requiresAuth: true },
  },
  {
    path: '/now_playing',
    name: 'nowplaying',
    component: NowPlayingView,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/movielist',
    name: 'MovieList',
    component: MovieList,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'SearchMovies',
    component: MovieSearch,
    meta: { requiresAuth: true },
  },
  {
    path: '/genres',
    name: 'GenreFilter',
    component: GenreFilterView,
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistView,
    meta: { requiresAuth: true },
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 전역 가드: 로그인이 필요한 경로 보호
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // 로그인 여부 확인
  const splashScreen = document.querySelector("#splash-screen"); // 스플래시 화면 요소

  // 스플래시 화면이 있으면 제거
  if (splashScreen) {
    splashScreen.style.opacity = "0";
    splashScreen.style.visibility = "hidden";
  }

  // 인증이 필요한 경로 접근 시
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('로그인이 필요합니다.');
    next({ name: 'SignIn' });
  } else if (to.name === 'SignIn' && isLoggedIn) {
    // 이미 로그인된 상태에서 로그인/회원가입 페이지 접근 시 메인으로 리다이렉트
    next({ name: 'Home' });
  } else {
    // 모든 조건을 충족한 경우 이동
    next();
  }
});

export default router;
