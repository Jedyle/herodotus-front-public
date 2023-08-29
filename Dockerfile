FROM node:18.17.1 AS base

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g @ionic/cli@7.1.1
CMD npm install; ionic serve --host=0.0.0.0

FROM base AS builder

ARG VITE_APP_API_URL
ARG VITE_APP_SENTRY_DSN
ARG VITE_APP_GA_TRACKING_ID

COPY . .
RUN npm install -g @ionic/cli@7.1.1
RUN npm install

RUN ionic build --production

FROM nginx:alpine as prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
