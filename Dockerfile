FROM node:12-alpine

WORKDIR /app

ARG uid

COPY . .

RUN chown $uid:$uid /app -R

USER $uid
