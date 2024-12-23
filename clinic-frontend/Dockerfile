# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Exponer el puerto del servidor de desarrollo
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
