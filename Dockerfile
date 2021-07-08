FROM node:14-buster-slim as BUILD

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Add the package.json first to have this step cached
ADD ./lit-app/package.json /usr/src/app

# Install dependencies of the project (and have cache of this)
RUN yarn install

# Add only necessary files to production build
# to not waste cache
ADD ./lit-app/LICENSE /usr/src/app
ADD ./lit-app/README.md /usr/src/app
ADD ./lit-app/custom-elements.json /usr/src/app
ADD ./lit-app/index.html /usr/src/app
ADD ./lit-app/tsconfig.json /usr/src/app
ADD ./lit-app/rollup.config.js /usr/src/app
ADD ./lit-app/src /usr/src/app/src

RUN ls -la /usr/src/app

RUN yarn run build

FROM nginx:1.19.2-alpine

EXPOSE 80

ADD /default.conf /etc/nginx/conf.d/
COPY --from=BUILD /usr/src/app/dist /var/www/html

ADD /startup.sh /

CMD [ "/startup.sh" ]
