FROM node:16 AS builder

ARG REACT_APP_API_URL
ARG REACT_APP_SENTRY_DSN

WORKDIR /app
COPY . .
RUN npm install -g ionic
RUN npm install
RUN ionic build --production

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
