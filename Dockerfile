FROM node:18 AS base

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g ionic
CMD npm install; ionic serve

FROM base AS builder

ARG REACT_APP_API_URL
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_GA_TRACKING_ID

COPY . .
RUN npm install -g ionic
RUN npm install

RUN ionic build --production

FROM nginx:alpine as prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
