# Imagem base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte e configs
COPY . .

# Compila o TypeScript para JavaScript (gera a pasta dist)
RUN npm run build

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "start"]