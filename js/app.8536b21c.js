(function(){"use strict";var e={4519:function(e,t,o){var i=o(5130),s=o(6768),a=o(4232);const l={id:"app"},n={class:"header-top"},r={class:"menu"},c={class:"auth"},d={key:0,class:"username"};function v(e,t,o,i,v,u){const g=(0,s.g2)("router-link"),h=(0,s.g2)("router-view");return(0,s.uX)(),(0,s.CE)("div",l,[(0,s.Lk)("header",null,[(0,s.Lk)("div",n,[t[7]||(t[7]=(0,s.Lk)("div",{class:"logo"},[(0,s.Lk)("h1",null,"YeonPlay")],-1)),(0,s.Lk)("nav",r,[(0,s.bF)(g,{to:"/"},{default:(0,s.k6)((()=>t[2]||(t[2]=[(0,s.eW)("홈")]))),_:1}),(0,s.bF)(g,{to:"/popular"},{default:(0,s.k6)((()=>t[3]||(t[3]=[(0,s.eW)("대세 콘텐츠")]))),_:1}),(0,s.bF)(g,{to:"/now_playing"},{default:(0,s.k6)((()=>t[4]||(t[4]=[(0,s.eW)("현재 상영 중")]))),_:1}),(0,s.bF)(g,{to:"/genres"},{default:(0,s.k6)((()=>t[5]||(t[5]=[(0,s.eW)("장르별 콘텐츠")]))),_:1}),(0,s.bF)(g,{to:"/wishlist"},{default:(0,s.k6)((()=>t[6]||(t[6]=[(0,s.eW)("내가 찜한 콘텐츠")]))),_:1})]),(0,s.Lk)("div",c,[v.isLoggedIn?((0,s.uX)(),(0,s.CE)("span",d,(0,a.v_)(v.loggedInUser)+"님",1)):(0,s.Q3)("",!0),v.isLoggedIn?((0,s.uX)(),(0,s.CE)("button",{key:1,onClick:t[0]||(t[0]=(...e)=>u.logout&&u.logout(...e)),class:"logout-btn"},"로그아웃")):((0,s.uX)(),(0,s.CE)("button",{key:2,onClick:t[1]||(t[1]=(...e)=>u.loginWithKakao&&u.loginWithKakao(...e)),class:"login-btn"},"로그인"))])])]),(0,s.Lk)("main",null,[(0,s.bF)(h)])])}o(4114),o(4603),o(7566),o(8721);var u={data(){return{isLoggedIn:!1,loggedInUser:""}},methods:{loginWithKakao(){const e="1f4929be6087c7cec415d9b01e4cd339",t="https://juyeon777.github.io/WSD04/kakao/callback";window.Kakao&&window.Kakao.isInitialized()||window.Kakao.init(e),window.Kakao.Auth.authorize({redirectUri:t})},async logout(){try{window.Kakao&&window.Kakao.Auth&&(await window.Kakao.Auth.logout(),console.log("카카오 세션 로그아웃 완료")),localStorage.clear(),sessionStorage.clear(),this.isLoggedIn=!1,this.loggedInUser="",alert("로그아웃되었습니다. 모든 정보가 초기화됩니다."),this.$router.push("/")}catch(e){console.error("로그아웃 중 오류 발생:",e),alert("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.")}},async checkLoginStatus(){const e=localStorage.getItem("accessToken");if(e)try{const t=await fetch("https://kapi.kakao.com/v2/user/me",{headers:{Authorization:`Bearer ${e}`}}),o=await t.json();o.kakao_account&&(this.loggedInUser=o.kakao_account.profile.nickname,this.isLoggedIn=!0,localStorage.setItem("loggedInUser",this.loggedInUser),localStorage.setItem("isLoggedIn","true"))}catch(t){console.error("사용자 정보를 가져오는 중 오류 발생:",t),this.isLoggedIn=!1}else this.isLoggedIn=!1,this.loggedInUser=""}},async created(){await this.checkLoginStatus();const e=new URLSearchParams(window.location.search),t=e.get("code");if(t)try{const e="1f4929be6087c7cec415d9b01e4cd339",o="https://juyeon777.github.io/WSD04/kakao/callback",i=await fetch("https://kauth.kakao.com/oauth/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"authorization_code",client_id:e,redirect_uri:o,code:t})}),s=await i.json();s.access_token&&(localStorage.setItem("isLoggedIn","true"),localStorage.setItem("accessToken",s.access_token),await this.checkLoginStatus(),this.$router.push("/"))}catch(o){console.error("로그인 처리 중 오류 발생:",o)}}},g=o(1241);const h=(0,g.A)(u,[["render",v],["__scopeId","data-v-7ceea726"]]);var m=h,p=o(1387);const k={class:"homepage"},f={class:"movie-section now-playing"},L={class:"movie-carousel",ref:"carousel"},_=["src","alt"],w={class:"carousel-info"},y={class:"movie-section popular-movies"},b={class:"movie-grid"},I=["src","alt"],C={class:"movie-info"},P={class:"movie-section top-rated"},X={class:"movie-grid"},E=["src","alt"],M={class:"movie-info"},W={class:"movie-section upcoming"},S={class:"movie-grid"},T=["src","alt"],K={class:"movie-info"};function F(e,t,o,i,l,n){const r=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",k,[((0,s.uX)(),(0,s.CE)("h1",{key:"main-title",class:(0,a.C4)({"main-title":!0,show:l.titleVisible})}," 🎬 YeonPlay: 영화의 모든 것 ",2)),(0,s.Lk)("section",f,[t[0]||(t[0]=(0,s.Lk)("h2",{class:"section-title"},"✨ 현재 상영 중",-1)),(0,s.Lk)("div",L,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.nowPlayingMovies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"carousel-item"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:n.getPoster(e),alt:e.title},null,8,_),(0,s.Lk)("div",w,[(0,s.Lk)("h3",null,(0,a.v_)(e.title),1),(0,s.Lk)("p",null,"평점: ⭐"+(0,a.v_)(e.vote_average),1)])])),_:2},1032,["to"])))),128))],512)]),(0,s.Lk)("section",y,[t[1]||(t[1]=(0,s.Lk)("h2",{class:"section-title"},"🔥 대세 콘텐츠",-1)),(0,s.Lk)("div",b,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.popularMovies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"movie-item"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:n.getPoster(e),alt:e.title},null,8,I),(0,s.Lk)("div",C,[(0,s.Lk)("h3",null,(0,a.v_)(e.title),1),(0,s.Lk)("p",null,"평점: ⭐"+(0,a.v_)(e.vote_average),1)])])),_:2},1032,["to"])))),128))])]),(0,s.Lk)("section",P,[t[2]||(t[2]=(0,s.Lk)("h2",{class:"section-title"},"🌟 높은 평점 영화",-1)),(0,s.Lk)("div",X,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.topRatedMovies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"movie-item"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:n.getPoster(e),alt:e.title},null,8,E),(0,s.Lk)("div",M,[(0,s.Lk)("h3",null,(0,a.v_)(e.title),1),(0,s.Lk)("p",null,"평점: ⭐"+(0,a.v_)(e.vote_average),1)])])),_:2},1032,["to"])))),128))])]),(0,s.Lk)("section",W,[t[3]||(t[3]=(0,s.Lk)("h2",{class:"section-title"},"📅 개봉 예정",-1)),(0,s.Lk)("div",S,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.upcomingMovies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"movie-item"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:n.getPoster(e),alt:e.title},null,8,T),(0,s.Lk)("div",K,[(0,s.Lk)("h3",null,(0,a.v_)(e.title),1),(0,s.Lk)("p",null,"개봉일: "+(0,a.v_)(e.release_date),1)])])),_:2},1032,["to"])))),128))])])])}var $=o(4373);const x=$.A.create({baseURL:"https://api.themoviedb.org/3",params:{api_key:"a3faf964b1295f61e556a66268421e26",language:"ko-KR"}});var N=x,O={name:"HomePage",data(){return{nowPlayingMovies:[],popularMovies:[],topRatedMovies:[],upcomingMovies:[],slideInterval:null,titleVisible:!1}},methods:{async fetchMovies(){try{const e=await N.get("/movie/now_playing",{params:{language:"ko-KR",page:1}});this.nowPlayingMovies=e.data.results;const t=await N.get("/movie/popular",{params:{language:"ko-KR",page:1}});this.popularMovies=t.data.results;const o=await N.get("/movie/top_rated",{params:{language:"ko-KR",page:1}});this.topRatedMovies=o.data.results;const i=await N.get("/movie/upcoming",{params:{language:"ko-KR",page:1}});this.upcomingMovies=i.data.results}catch(e){console.error("Failed to fetch movies:",e),alert("영화 데이터를 불러오는 중 오류가 발생했습니다.")}},getPoster(e){return e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/150x225?text=No+Image"},startCarousel(){const e=this.$refs.carousel;let t=0;this.slideInterval=setInterval((()=>{if(!e)return;const o=e.offsetWidth,i=e.scrollWidth-o;t+=o/3,t>i&&(t=0),e.scrollTo({left:t,behavior:"smooth"})}),3e3)},stopCarousel(){clearInterval(this.slideInterval)}},async created(){try{await this.fetchMovies(),console.log("영화 데이터 로드 완료:",{nowPlaying:this.nowPlayingMovies,popular:this.popularMovies})}catch(e){console.error("영화 데이터를 로드하는 중 오류:",e)}},mounted(){setTimeout((()=>{this.titleVisible=!0}),500),this.startCarousel()},beforeUnmount(){this.stopCarousel(),this.titleVisible=!1}};const R=(0,g.A)(O,[["render",F],["__scopeId","data-v-5134a36a"]]);var V=R;const A={class:"popular-movies"},U={class:"movie-grid"},j=["src","alt"],G={class:"movie-info"},D={class:"movie-title"},B={class:"movie-rating"},z={class:"movie-release"},J={key:0,class:"loading-indicator"},Q={class:"pagination-buttons"},H=["disabled"],Y=["disabled"];function q(e,t,o,i,l,n){const r=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",A,[t[3]||(t[3]=(0,s.Lk)("h1",{class:"main-title"},"🔥 대세 콘텐츠",-1)),(0,s.Lk)("section",U,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.movies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"movie-card"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:n.getPoster(e),alt:e.title,class:"movie-poster"},null,8,j),(0,s.Lk)("div",G,[(0,s.Lk)("h3",D,(0,a.v_)(e.title),1),(0,s.Lk)("p",B,"평점: ⭐"+(0,a.v_)(e.vote_average),1),(0,s.Lk)("p",z,"개봉일: "+(0,a.v_)(e.release_date||"N/A"),1)])])),_:2},1032,["to"])))),128))]),l.loading?((0,s.uX)(),(0,s.CE)("div",J,"Loading...")):(0,s.Q3)("",!0),(0,s.Lk)("div",Q,[(0,s.Lk)("button",{disabled:1===l.currentPage,onClick:t[0]||(t[0]=(...e)=>n.goToPreviousPage&&n.goToPreviousPage(...e))},"이전",8,H),(0,s.Lk)("span",null,"현재 페이지: "+(0,a.v_)(l.currentPage),1),(0,s.Lk)("button",{disabled:l.currentPage===l.totalPages,onClick:t[1]||(t[1]=(...e)=>n.goToNextPage&&n.goToNextPage(...e))},"다음",8,Y)]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>n.scrollToTop&&n.scrollToTop(...e)),class:"top-button"},"Top")])}var Z={name:"PopularMovies",data(){return{movies:[],currentPage:1,totalPages:0,loading:!1}},methods:{async fetchMovies(e=1){this.loading=!0;try{const t=await N.get("/movie/popular",{params:{page:e}});this.movies=t.data.results,this.totalPages=t.data.total_pages,this.currentPage=e}catch(t){console.error("Failed to fetch popular movies:",t),alert("영화 데이터를 불러오는 중 오류가 발생했습니다.")}finally{this.loading=!1}},getPoster(e){return e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/150x225?text=No+Image"},async goToPreviousPage(){this.currentPage>1&&await this.fetchMovies(this.currentPage-1)},async goToNextPage(){this.currentPage<this.totalPages&&await this.fetchMovies(this.currentPage+1)},scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}},async created(){await this.fetchMovies()}};const ee=(0,g.A)(Z,[["render",q],["__scopeId","data-v-29701a4c"]]);var te=ee;const oe={class:"now-playing-view"},ie={key:0,class:"top-booking-movies"},se={class:"top-movies-grid"},ae={class:"ranking-badge"},le=["src","alt"],ne={class:"movie-info"},re={class:"movie-title"},ce={class:"movie-rating"},de={key:1,class:"loading"},ve={key:2,class:"movie-grid"},ue=["src","alt"],ge={class:"movie-info"},he={class:"movie-title"},me={class:"movie-date"},pe={key:3,class:"no-movies"};function ke(e,t,o,i,l,n){const r=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",oe,[(0,s.Lk)("h1",{class:(0,a.C4)({"main-title":!0,show:l.titleVisible})}," 🎬 현재 상영 중인 영화 ",2),l.topBookingMovies.length?((0,s.uX)(),(0,s.CE)("section",ie,[t[0]||(t[0]=(0,s.Lk)("h2",{class:"section-title"},"📊 예매율 Top 3",-1)),(0,s.Lk)("div",se,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.topBookingMovies,((e,t)=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"top-movie-card"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",ae,"Top "+(0,a.v_)(t+1),1),(0,s.Lk)("img",{src:e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:e.title,class:"movie-poster"},null,8,le),(0,s.Lk)("div",ne,[(0,s.Lk)("h3",re,(0,a.v_)(e.title),1),(0,s.Lk)("p",ce,"평점: ⭐"+(0,a.v_)(e.vote_average)+"/10",1)])])),_:2},1032,["to"])))),128))])])):(0,s.Q3)("",!0),l.loading?((0,s.uX)(),(0,s.CE)("div",de,"Loading...")):l.movies.length?((0,s.uX)(),(0,s.CE)("div",ve,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.movies,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"movie-item"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:e.title,class:"movie-poster"},null,8,ue),(0,s.Lk)("div",ge,[(0,s.Lk)("h3",he,(0,a.v_)(e.title),1),(0,s.Lk)("p",me,"개봉일: "+(0,a.v_)(e.release_date||"정보 없음"),1)])])),_:2},1032,["to"])))),128))])):((0,s.uX)(),(0,s.CE)("div",pe,t[1]||(t[1]=[(0,s.Lk)("p",null,"현재 상영 중인 영화를 찾을 수 없습니다.",-1)])))])}var fe={name:"NowPlayingView",data(){return{movies:[],topBookingMovies:[],loading:!0,titleVisible:!1}},async created(){try{const e=await N.get("/movie/now_playing",{params:{language:"ko-KR"}});this.movies=e.data.results,this.topBookingMovies=[...this.movies].sort(((e,t)=>t.vote_average-e.vote_average)).slice(0,3)}catch(e){console.error("Failed to fetch now playing movies:",e),alert("현재 상영 중인 영화를 불러오는 중 오류가 발생했습니다.")}finally{this.loading=!1}},mounted(){setTimeout((()=>{this.titleVisible=!0}),500)}};const Le=(0,g.A)(fe,[["render",ke],["__scopeId","data-v-185c35fa"]]);var _e=Le;const we={class:"genre-filter-view"},ye={class:"filter-container"},be=["value"],Ie={key:0,class:"loading"},Ce={key:1,class:"movie-grid"},Pe=["src","alt"],Xe={class:"movie-info"},Ee={class:"movie-title"},Me={class:"movie-date"},We={key:2,class:"no-movies"};function Se(e,t,o,l,n,r){const c=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",we,[(0,s.Lk)("h1",{class:(0,a.C4)({"main-title":!0,show:n.titleVisible})}," 🎬 장르별 영화 ",2),(0,s.Lk)("div",ye,[t[3]||(t[3]=(0,s.Lk)("label",{for:"genre",class:"filter-label"},"장르 선택:",-1)),(0,s.bo)((0,s.Lk)("select",{id:"genre","onUpdate:modelValue":t[0]||(t[0]=e=>n.selectedGenre=e),onChange:t[1]||(t[1]=(...e)=>r.filterMovies&&r.filterMovies(...e)),class:"filter-select"},[t[2]||(t[2]=(0,s.Lk)("option",{value:""},"모든 장르",-1)),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.genres,(e=>((0,s.uX)(),(0,s.CE)("option",{key:e.id,value:e.id},(0,a.v_)(e.name),9,be)))),128))],544),[[i.u1,n.selectedGenre]])]),n.loading?((0,s.uX)(),(0,s.CE)("div",Ie,t[4]||(t[4]=[(0,s.Lk)("div",{class:"loader"},[(0,s.Lk)("div"),(0,s.Lk)("div"),(0,s.Lk)("div")],-1),(0,s.Lk)("p",null,"영화 데이터를 불러오는 중입니다...",-1)]))):n.movies.length?((0,s.uX)(),(0,s.CE)("div",Ce,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.movies,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"movie-item"},[(0,s.bF)(c,{to:`/movie/${e.id}`,class:"movie-link"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:e.title,class:"movie-poster"},null,8,Pe),(0,s.Lk)("div",Xe,[(0,s.Lk)("h3",Ee,(0,a.v_)(e.title),1),(0,s.Lk)("p",Me,"개봉일: "+(0,a.v_)(e.release_date||"정보 없음"),1)])])),_:2},1032,["to"])])))),128))])):((0,s.uX)(),(0,s.CE)("div",We,t[5]||(t[5]=[(0,s.Lk)("p",null,"선택한 장르에 해당하는 영화를 찾을 수 없습니다.",-1)])))])}var Te={name:"GenreFilterView",data(){return{genres:[],movies:[],selectedGenre:"",loading:!0,titleVisible:!1}},async created(){await this.fetchGenres(),await this.fetchMovies()},mounted(){setTimeout((()=>{this.titleVisible=!0}),500)},methods:{async fetchGenres(){try{const e=await N.get("/genre/movie/list",{params:{language:"ko-KR"}});this.genres=e.data.genres}catch(e){console.error("Failed to fetch genres:",e),alert("장르 목록을 불러오는 데 실패했습니다.")}},async fetchMovies(){this.loading=!0;try{const e=await N.get("/discover/movie",{params:{language:"ko-KR",with_genres:this.selectedGenre||void 0}});this.movies=e.data.results}catch(e){console.error("Failed to fetch movies:",e),alert("영화 목록을 불러오는 데 실패했습니다.")}finally{this.loading=!1}},async filterMovies(){await this.fetchMovies()}}};const Ke=(0,g.A)(Te,[["render",Se],["__scopeId","data-v-3d3a5230"]]);var Fe=Ke;const $e={class:"wishlist-container"},xe={key:0,class:"login-message"},Ne={key:1,class:"empty-message"},Oe={key:2,class:"wishlist-grid"},Re=["src","alt"],Ve={class:"wishlist-info"},Ae={class:"wishlist-title"},Ue=["onClick"];function je(e,t,o,i,l,n){return(0,s.uX)(),(0,s.CE)("div",$e,[(0,s.Lk)("h1",{class:(0,a.C4)({"main-title":!0,show:l.titleVisible})}," 🎥 내가 찜한 콘텐츠 ",2),l.isLoggedIn?0===l.wishlist.length?((0,s.uX)(),(0,s.CE)("div",Ne,t[1]||(t[1]=[(0,s.Lk)("p",null,"찜한 콘텐츠가 없습니다.",-1)]))):((0,s.uX)(),(0,s.CE)("div",Oe,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.wishlist,(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"wishlist-item"},[(0,s.Lk)("img",{src:e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:e.title,class:"wishlist-poster"},null,8,Re),(0,s.Lk)("div",Ve,[(0,s.Lk)("h2",Ae,(0,a.v_)(e.title),1),(0,s.Lk)("p",null,[t[2]||(t[2]=(0,s.Lk)("strong",null,"개봉일:",-1)),(0,s.eW)(" "+(0,a.v_)(e.release_date||"정보 없음"),1)]),(0,s.Lk)("p",null,[t[3]||(t[3]=(0,s.Lk)("strong",null,"평점:",-1)),(0,s.eW)(" "+(0,a.v_)(e.vote_average)+"/10",1)]),(0,s.Lk)("button",{onClick:t=>n.removeFromWishlist(e.id),class:"remove-btn"},"삭제",8,Ue)])])))),128))])):((0,s.uX)(),(0,s.CE)("div",xe,t[0]||(t[0]=[(0,s.Lk)("p",null,"로그인 후 이용 가능합니다.",-1)])))])}o(8992),o(4520);var Ge={name:"WishlistView",data(){return{wishlist:[],isLoggedIn:!1,titleVisible:!1}},methods:{loadWishlist(){const e=JSON.parse(localStorage.getItem("wishlist"))||[];this.wishlist=e},removeFromWishlist(e){this.wishlist=this.wishlist.filter((t=>t.id!==e)),localStorage.setItem("wishlist",JSON.stringify(this.wishlist)),alert("찜한 콘텐츠가 삭제되었습니다.")},checkLoginStatus(){this.isLoggedIn="true"===localStorage.getItem("isLoggedIn")}},watch:{isLoggedIn(e){e&&this.loadWishlist()}},mounted(){this.checkLoginStatus(),this.loadWishlist(),setTimeout((()=>{this.titleVisible=!0}),500)}};const De=(0,g.A)(Ge,[["render",je],["__scopeId","data-v-ceabb3ce"]]);var Be=De;const ze={class:"movie-detail-container"},Je={key:0,class:"loading-container"},Qe={key:1,class:"movie-detail-card"},He={class:"movie-detail-left"},Ye=["src","alt"],qe={class:"movie-title"},Ze={class:"movie-detail-right"},et={class:"movie-overview"},tt={class:"movie-info"},ot={class:"movie-info"},it={key:2,class:"recommendations-section"},st={class:"recommendations-grid"},at=["src","alt"],lt={key:3,class:"error-message"};function nt(e,t,o,i,l,n){const r=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",ze,[l.loading?((0,s.uX)(),(0,s.CE)("div",Je,t[1]||(t[1]=[(0,s.Lk)("p",null,"로딩 중...",-1)]))):l.movie?((0,s.uX)(),(0,s.CE)("div",Qe,[(0,s.Lk)("div",He,[(0,s.Lk)("img",{src:l.movie.poster_path?`https://image.tmdb.org/t/p/w500${l.movie.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:l.movie.title,class:"movie-poster"},null,8,Ye),(0,s.Lk)("h1",qe,(0,a.v_)(l.movie.title),1)]),(0,s.Lk)("div",Ze,[(0,s.Lk)("p",et,(0,a.v_)(l.movie.overview||"영화 설명이 없습니다."),1),(0,s.Lk)("p",tt,[t[2]||(t[2]=(0,s.Lk)("strong",null,"개봉일:",-1)),(0,s.eW)(" "+(0,a.v_)(l.movie.release_date||"정보 없음"),1)]),(0,s.Lk)("p",ot,[t[3]||(t[3]=(0,s.Lk)("strong",null,"평점:",-1)),(0,s.eW)(" ⭐"+(0,a.v_)(l.movie.vote_average||"N/A")+"/10 ",1)]),(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>n.addToWishlist&&n.addToWishlist(...e)),class:"wishlist-btn"},"찜하기")])])):(0,s.Q3)("",!0),l.recommendations.length?((0,s.uX)(),(0,s.CE)("div",it,[t[4]||(t[4]=(0,s.Lk)("h2",null,"관련 추천 영화",-1)),(0,s.Lk)("div",st,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(l.recommendations,(e=>((0,s.uX)(),(0,s.Wv)(r,{key:e.id,to:`/movie/${e.id}`,class:"recommendation-item"},{default:(0,s.k6)((()=>[(0,s.Lk)("img",{src:e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://via.placeholder.com/500x750?text=No+Image",alt:e.title},null,8,at),(0,s.Lk)("h3",null,(0,a.v_)(e.title),1)])),_:2},1032,["to"])))),128))])])):((0,s.uX)(),(0,s.CE)("div",lt,t[5]||(t[5]=[(0,s.Lk)("p",null,"영화를 찾을 수 없습니다. 나중에 다시 시도해 주세요.",-1)])))])}o(7550);var rt={name:"MovieDetailView",data(){return{movie:null,recommendations:[],loading:!0}},methods:{async fetchMovieDetails(){try{const e=this.$route.params.id,t=await N.get(`/movie/${e}`,{params:{language:"ko-KR"}});this.movie=t.data}catch(e){console.error("Failed to fetch movie details:",e),alert("영화 정보를 불러오지 못했습니다. 다시 시도해 주세요.")}finally{this.loading=!1}},async fetchRecommendations(){try{const e=this.$route.params.id,t=await N.get(`/movie/${e}/recommendations`,{params:{language:"ko-KR"}});this.recommendations=t.data.results.slice(0,5)}catch(e){console.error("Failed to fetch recommendations:",e),alert("추천 영화를 불러오지 못했습니다.")}},addToWishlist(){const e=JSON.parse(localStorage.getItem("wishlist"))||[],t=e.some((e=>e.id===this.movie.id));t?alert("이미 찜한 콘텐츠입니다."):(e.push({id:this.movie.id,title:this.movie.title,release_date:this.movie.release_date,poster_path:this.movie.poster_path,vote_average:this.movie.vote_average}),localStorage.setItem("wishlist",JSON.stringify(e)),alert("찜한 콘텐츠에 추가되었습니다!"))}},watch:{"$route.params.id":{immediate:!0,handler(){this.loading=!0,this.fetchMovieDetails(),this.fetchRecommendations()}}}};const ct=(0,g.A)(rt,[["render",nt],["__scopeId","data-v-7b5f98c0"]]);var dt=ct;const vt=[{path:"/",name:"Home",component:V},{path:"/popular",name:"PopularMovies",component:te},{path:"/now_playing",name:"NowPlaying",component:_e},{path:"/genres",name:"GenreFilter",component:Fe},{path:"/wishlist",name:"Wishlist",component:Be},{path:"/movie/:id",name:"MovieDetail",component:dt}],ut=(0,p.aE)({history:(0,p.LA)("/WSD04/"),routes:vt});var gt=ut;const ht=(0,i.Ef)(m);ht.use(gt),ht.mount("#app")}},t={};function o(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,i,s,a){if(!i){var l=1/0;for(d=0;d<e.length;d++){i=e[d][0],s=e[d][1],a=e[d][2];for(var n=!0,r=0;r<i.length;r++)(!1&a||l>=a)&&Object.keys(o.O).every((function(e){return o.O[e](i[r])}))?i.splice(r--,1):(n=!1,a<l&&(l=a));if(n){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[i,s,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,a,l=i[0],n=i[1],r=i[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(s in n)o.o(n,s)&&(o.m[s]=n[s]);if(r)var d=r(o)}for(t&&t(i);c<l.length;c++)a=l[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},i=self["webpackChunkyeonplay"]=self["webpackChunkyeonplay"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=o.O(void 0,[504],(function(){return o(4519)}));i=o.O(i)})();
//# sourceMappingURL=app.8536b21c.js.map