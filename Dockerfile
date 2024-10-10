FROM node:20
RUN npm install -g bun
WORKDIR /usr/src/app
COPY bun.lockb ./
COPY package*.json ./
RUN bun install
COPY .env ./
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start:prod"]