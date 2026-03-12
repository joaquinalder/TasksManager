# 1. Usamos una imagen liviana de Node (Alpine Linux)
FROM node:20-alpine

# 2. Creamos la carpeta de la app dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiamos los archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código
COPY . .

# 6. Generamos el cliente de Prisma (Vital para tu Data Management)
RUN npx prisma generate

# 7. Exponemos el puerto de Nest
EXPOSE 3000

# 8. Comando para arrancar en modo desarrollo
CMD ["npm", "run", "start:dev"]