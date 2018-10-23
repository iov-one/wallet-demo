FROM nginx:1.15.5
# FROM nginx:1.15.5-alpine

MAINTAINER Ethan Frey <admin@iov.one>

ADD ./docker/nginx.conf /etc/nginx/nginx.conf
ADD ./dist /assets
