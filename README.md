Buzatu-Pahontu Mihnea-Nicolae

# News-App

![alt text](https://github.com/mihneabuz/news-app/blob/main/arch.png)

Features:
  - "Micro"service infrastructure
  - User Authentification using JWT tokens
  - Caching in API Gateway
  - MongoDB for persistent storage
  - Every service is dockerized
  - Users can be Readers or Journalists
  - Readers can query the posts
  - Journalists can create a post
  - Readers can add tags to posts (not implemented in frontend)
  - Can query posts by tags or author (not implemented in frontend)

# Running
`docker compose up`
API will be available on port 3000
Web app will be available on port 3001
