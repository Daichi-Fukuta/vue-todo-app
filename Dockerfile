FROM node:11.15.0-alpine

WORKDIR /src/app

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli

CMD ["/bin/sh"]