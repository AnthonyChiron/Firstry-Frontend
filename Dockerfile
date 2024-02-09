# Etape 1: Construire l'application
FROM node:latest as build-step
WORKDIR /app

# Argument pour spécifier l'environnement de build (par défaut: production)
ARG ENV=production

COPY package.json ./
RUN npm install
COPY . .

# Utiliser l'argument ENV pour spécifier l'environnement de build
RUN npm run build -- --configuration=${ENV}

# Etape 2: Préparer l'image de production
FROM nginx:alpine
COPY --from=build-step /app/dist/firstry /usr/share/nginx/html

# Ajout de la configuration Nginx personnalisée
COPY default.conf /etc/nginx/conf.d/default.conf

# Configuration pour améliorer la performance et la sécurité
RUN echo "gzip on;" > /etc/nginx/conf.d/gzip.conf && \
    echo "gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;" >> /etc/nginx/conf.d/gzip.conf && \
    echo "gzip_proxied any;" >> /etc/nginx/conf.d/gzip.conf && \
    echo "gzip_comp_level 6;" >> /etc/nginx/conf.d/gzip.conf && \
    echo "gzip_min_length 256;" >> /etc/nginx/conf.d/gzip.conf
