# 🎬 YeonPlay: 영화 웹 애플리케이션
YeonPlay는 현재 상영 중인 영화, 대세 콘텐츠, 장르별 영화 등을 탐색하고 개인적으로 찜한 콘텐츠를 관리할 수 있는 Vue.js 기반 영화 정보 웹 애플리케이션입니다.
사용자는 카카오 계정을 통해 로그인하여 맞춤형 서비스를 이용할 수 있습니다.
---

## 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-repo-name/yeonplay.git
cd yeonplay
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env-production`, `.env-development` 파일을 작성해야 합니다.

#### `.env-development`

```env
IP_ADDRESS=localhost
PORT=3000
REACT_APP_TMDB_API_KEY=YOUR_API_KEY
REACT_APP_KAKAO_JS_KEY=YOUR_KAKAO_JS_KEY
REACT_APP_DEFAULT_LANGUAGE=KR
```

#### `.env-production`

```env
IP_ADDRESS=your-production-server-ip
PORT=80
REACT_APP_TMDB_API_KEY=YOUR_API_KEY
REACT_APP_KAKAO_JS_KEY=YOUR_KAKAO_JS_KEY
REACT_APP_DEFAULT_LANGUAGE=KR
```

**주의**: `.env`, `.env-development`, `.env-production` 파일은 `.gitignore`에 포함되어야 합니다.

---

## 명령어

### 로컬 개발 서버 실행
```bash
npm run serve
```

- 로컬 환경에서 개발 서버를 실행합니다. `http://localhost:3000`에서 앱을 확인할 수 있습니다.


### 프로젝트 빌드

```bash
npm run build
```


