# Build stage
FROM node:12-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

COPY . .

RUN npm run build

# Production stage
FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

RUN npm install -g @nestjs/cli

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npx", "nest", "start"]
