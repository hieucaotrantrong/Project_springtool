# Sử dụng Node.js image chính thức
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port mà ứng dụng sẽ chạy
EXPOSE 5000

# Khởi động ứng dụng
CMD ["npm", "run", "start"]