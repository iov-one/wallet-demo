FROM nginx:1.15.5-alpine

# we run in read-only volume...
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /rw-volume /assets

# copy those assets into the image
ADD ./docker/nginx.conf /etc/nginx/nginx.conf
ADD ./dist /assets

# set volume permissions
RUN chown -R nginx:nginx /assets /rw-volume
VOLUME ["/rw-volume"]

# and as a user nginx on non-privledged port
USER "nginx"
EXPOSE 3000