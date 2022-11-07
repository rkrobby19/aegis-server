FROM node:16 as builder
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

FROM node:16-alpine
COPY --from=builder /app /app
WORKDIR /app

EXPOSE 8080
CMD [ "npm", "start" ]