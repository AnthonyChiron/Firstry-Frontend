# Etape 1: Construire l'application
FROM node:latest as build-step
WORKDIR /src/app

# Argument pour spécifier l'environnement de build (par défaut: production)
ARG ENV=production

COPY package.json /src/app
RUN npm install
COPY . /src/app

# Utiliser l'argument ENV pour spécifier l'environnement de build
RUN npm run build -- --configuration=${ENV}


# Etape 2: Préparer l'image de production
FROM nginx:alpine
RUN echo "gzip on;" > /etc/nginx/conf.d/gzip.conf
RUN echo "gzip_types text/plain text/css text/javascript application/javascript application/x-javascript application/json;" >> /etc/nginx/conf.d/gzip.conf
RUN echo "gzip_proxied any;" >> /etc/nginx/conf.d/gzip.conf
RUN echo "gzip_comp_level 6;" >> /etc/nginx/conf.d/gzip.conf
RUN echo "gzip_min_length 256;" >> /etc/nginx/conf.d/gzip.conf
COPY --from=build-step /src/app/dist/firstry /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
