FROM node:16 as builder
WORKDIR /app

COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "stagging" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .

FROM node:16-alpine
COPY --from=builder /app /app
WORKDIR /app
# COPY --chown=node:node /app /app

EXPOSE 8080
CMD [ "node", "src/index.js" ]
