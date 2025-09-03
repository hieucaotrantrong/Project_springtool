# Build stage
FROM node:18-alpine as build

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy source code
COPY . .

# Hiển thị thông tin debug
RUN ls -la
RUN echo "Node version: $(node -v)"
RUN echo "NPM version: $(npm -v)"

# Thử build với --force flag
RUN npm run build || (echo "Build failed, trying with --force" && npm run build -- --force)

# Production stage
FROM nginx:alpine

# Copy built files từ build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
