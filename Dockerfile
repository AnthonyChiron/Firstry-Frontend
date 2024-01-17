# Etape 1: Construire l'application
FROM node:latest as build-step
WORKDIR /src/app

# Argument pour spécifier l'environnement de build (par défaut: production)
ARG ENV=production

COPY package.json /src/app
RUN npm install
COPY . /src/app

# Utiliser l'argument ENV pour spécifier l'environnement de build
RUN npm run build --configuration=${ENV}

# Etape 2: Préparer l'image de production
FROM nginx:alpine
COPY --from=build-step /src/app/dist/firstry /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
