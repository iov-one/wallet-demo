FROM nginx:1.15.5-alpine
# FROM nginx:1.15.5

MAINTAINER Ethan Frey <admin@iov.one>

# we run in read-only volume...
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# and as a user nginx on non-privledged port
RUN chown -R nginx:nginx /etc/nginx /assets
USER "nginx"
EXPOSE 3000

# oh, and copy those assets into the image
ADD ./docker/nginx.conf /etc/nginx/nginx.conf
ADD ./dist /assets
