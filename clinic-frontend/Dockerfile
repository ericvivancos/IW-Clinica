# Usa una imagen base de Node.js
FROM node:16-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia todo el código fuente
COPY . .

# Expone el puerto que utiliza React por defecto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
