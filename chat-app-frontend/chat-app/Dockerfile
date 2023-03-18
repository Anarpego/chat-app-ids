FROM node:14-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build
# Exponer el puerto 3000
EXPOSE 3000
# Ejecutar el comando para iniciar la aplicación
CMD ["npm", "start"]