# Backend (Node.js) build stage
FROM node:16 AS backend

WORKDIR /app
COPY graphql-server/package*.json ./graphql-server/
RUN cd graphql-server && npm install
COPY graphql-server ./graphql-server

# Frontend (React) build stage
FROM node:16 AS frontend

WORKDIR /app
COPY graphql-client/package*.json ./graphql-client/
RUN cd graphql-client && npm install
COPY graphql-client ./graphql-client
RUN cd graphql-client && npm run build

# Nginx stage for serving the frontend
FROM nginx:alpine AS nginx

COPY --from=frontend /app/graphql-client/build /usr/share/nginx/html
COPY graphql-client/nginx.conf /etc/nginx/conf.d/default.conf

# Final backend stage
FROM node:16 AS final-backend

WORKDIR /app
COPY --from=backend /app/graphql-server ./graphql-server
WORKDIR /app/graphql-server
EXPOSE 4000
CMD ["npm", "start"]
