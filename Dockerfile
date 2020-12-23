FROM node:15-alpine
WORKDIR /app
COPY backend ./
COPY config.yaml /
RUN npm install 
VOLUME /zoneminder
EXPOSE 3000/tcp
CMD ["npm", "start"]