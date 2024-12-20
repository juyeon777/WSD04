<template>
  <div class="wishlist-container">
    <!-- 타이틀 -->
    <h1 :class="{ 'main-title': true, show: titleVisible }">
      🎥 내가 찜한 콘텐츠
    </h1>
    <!-- 찜한 콘텐츠가 없을 경우 -->
    <div v-if="wishlist.length === 0" class="empty-message">
      <p>찜한 콘텐츠가 없습니다.</p>
    </div>

    <!-- 찜한 콘텐츠가 있을 경우 -->
    <div v-else class="wishlist-grid">
      <div v-for="item in wishlist" :key="item.id" class="wishlist-item">
        <img 
          :src="item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'"
          :alt="item.title"
          class="wishlist-poster"
        />
        <div class="wishlist-info">
          <h2 class="wishlist-title">{{ item.title }}</h2>
          <p><strong>개봉일:</strong> {{ item.release_date || '정보 없음' }}</p>
          <p><strong>평점:</strong> {{ item.vote_average }}/10</p>
          <button @click="removeFromWishlist(item.id)" class="remove-btn">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WishlistView",
  data() {
    return {
      wishlist: [], // 찜한 영화 데이터
      titleVisible: false, // 타이틀 표시 여부
    };
  },
  methods: {
    // 찜 리스트 불러오기
    loadWishlist() {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      this.wishlist = storedWishlist;
    },
    // 찜 리스트에서 항목 삭제
    removeFromWishlist(id) {
      this.wishlist = this.wishlist.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
      alert("찜한 콘텐츠가 삭제되었습니다.");
    },
  },
  mounted() {
    this.loadWishlist();
    setTimeout(() => {
      this.titleVisible = true; // 타이틀 표시
    }, 500); // 0.5초 후 타이틀 표시
  },
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.wishlist-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* 타이틀 애니메이션 */
.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 30px;
  opacity: 0; /* 초기 상태 */
  transform: translateY(20px); /* 초기 상태 */
  transition: opacity 1.5s ease, transform 1.5s ease; /* 스르륵 효과 */
}

.main-title.show {
  opacity: 1;
  transform: translateY(0); /* 제자리로 이동 */
}

/* 찜한 콘텐츠가 없을 때 메시지 */
.empty-message {
  color: #888;
  font-size: 1.2rem;
}

/* 찜한 콘텐츠 그리드 */
.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* 카드 스타일 */
.wishlist-item {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.wishlist-item:hover {
  transform: scale(1.05); /* 호버 시 살짝 볼록 효과 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 증가 */
}

.wishlist-poster {
  width: 100%;
  border-radius: 8px 8px 0 0;
  height: auto;
}

.wishlist-info {
  padding: 15px;
  text-align: left;
}

.wishlist-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.wishlist-info p {
  font-size: 0.9rem;
  color: #555;
  margin: 5px 0;
}

/* 삭제 버튼 스타일 */
.remove-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.remove-btn:hover {
  background-color: #c0392b;
}
</style>
