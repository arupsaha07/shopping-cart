# docker build -t ecomm-project:1.0 .

# Use official node image as the base image
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build --prod




#stage 2 : Serve app with nginx server
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist/ecomm-project /usr/share/nginx/html

# Expose port 80
EXPOSE 80