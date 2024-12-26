import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PopularMovies from "../views/PopularMovies.vue";
import NowPlayingView from "../views/NowPlayingView.vue";
import GenreFilterView from "../views/GenreFilterView.vue";
import WishlistView from "../views/WishlistView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/popular", name: "PopularMovies", component: PopularMovies },
  { path: "/now_playing", name: "NowPlaying", component: NowPlayingView },
  { path: "/genres", name: "GenreFilter", component: GenreFilterView },
  { path: "/wishlist", name: "Wishlist", component: WishlistView },
  { path: "/movie/:id", name: "MovieDetail", component: MovieDetailView },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
