FROM node:10 AS ui-build
WORKDIR /
COPY . .
RUN npm install && npm run build
EXPOSE 3000

CMD ["npm", "start"]
