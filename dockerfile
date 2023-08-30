# Use uma imagem base Node.js com a versão desejada
FROM node:16-alpine3.17

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Build the React app
RUN npm run build

# Defina o comando para iniciar o servidor Next.js
CMD ["npm", "run", "server"]
