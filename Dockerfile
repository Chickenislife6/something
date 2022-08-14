FROM node:16 AS builder
WORKDIR /
COPY package.json ./
RUN npm install 

COPY . ./
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /build .
RUN rm /etc/nginx/conf.d/default.conf
COPY default /etc/nginx/conf.d
COPY default /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
