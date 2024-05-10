FROM nginx:latest
LABEL maintainer="wyler 1102214883@qq.com"
WORKDIR /etc/nginx/html/dist
ADD dist  .
EXPOSE 9898
