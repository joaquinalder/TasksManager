FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
EXPOSE 5173
# El flag --host es vital para que Vite acepte conexiones externas a Docker
CMD ["npm", "run", "dev", "--", "--host"]