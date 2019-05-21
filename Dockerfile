# This docker file takes a local build from the ./dist directory and just
# creates a webserver container. So be sure to have a clean build.

# See https://hub.docker.com/_/nginx/
FROM nginx:1.15-alpine

# we run in read-only volume...
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /rw-volume /assets

# copy those assets into the image
ADD ./docker/nginx.conf /etc/nginx/nginx.conf
ADD ./dist /assets

# set permissions
RUN chown -R nginx:nginx /assets /rw-volume
# We define this as a separate volume, so it is not affected by the --read-only flag
VOLUME ["/rw-volume"]

# and as a user nginx on non-privledged port
USER "nginx"
EXPOSE 3000