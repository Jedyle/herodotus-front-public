FROM node:16 AS builder

ENV REACT_APP_API_URL=https://api.herodotus-app.com

WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
