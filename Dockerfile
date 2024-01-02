FROM node:18

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json && npm install

RUN npm update esbuild vite

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]