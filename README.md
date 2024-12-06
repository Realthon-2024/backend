# 백엔드 기술 스택

### 주요 스택

- 프레임워크 및 언어
    - NestJS
    - TypeScript
- 데이터베이스 및 데이터 접근 기술
    - TypeORM
    - MariaDB
- 배포
    - CloudType
- 협업
    - Swagger

### 외부 API

- DeepL API
- Gemini API

### 주요 기능

- 인증
    - jwt 방식 인증
    - 보안 상 이점을 위해 refresh token rotate 방식 사용
- 챗봇
    - 법률 데이터 학습한 fine-tuned gemini api 사용
    - gemini api에서 대화 목록 제공 X → 대화를 시간 순으로 데이터베이스에 저장 및 조회
    - 채팅 메시지 전송 시 백엔드 서버에 요청 전송 → 백엔드 서버에서 gemini 서버에 답변 생성 요청 → 백엔드 서버가 수신하여 프론트엔드에 전송 (→ 사용자가 번역을 요청할 경우 프론트엔드에서 DeepL 서버에 번역 요청)
    - 채팅방 생성, 채팅방 상세 조회, 채팅방 목록 조회

- 커뮤니티
    - 게시글 조회/작성, 댓글 조회/작성
    - Deepl API 이용하여 유저 Language에 맞는 언어로 게시글 번역 기능
