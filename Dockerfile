FROM node:20

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install vite -g --silent

COPY . .


EXPOSE 5173
CMD ["npm", "run", "dev"]