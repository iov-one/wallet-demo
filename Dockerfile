FROM nginx:1.15.5-alpine

# we run in read-only volume...
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /rw-volume
VOLUME ["/rw-volume"]

# copy those assets into the image
ADD ./docker/nginx.conf /etc/nginx/nginx.conf
ADD ./dist /assets

# and as a user nginx on non-privledged port
RUN chown -R nginx:nginx /assets /rw-volume
USER "nginx"
EXPOSE 3000