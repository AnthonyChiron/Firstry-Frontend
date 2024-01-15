# Etape 1: Construire l'application
FROM node:latest as build-step
WORKDIR /src/app
COPY package.json /src/app
RUN npm install
COPY . /src/app
RUN npm run build

# Etape 2: Préparer l'image de production
FROM nginx:alpine
COPY --from=build-step /src/app/dist/firstry /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
