# Gunakan Node.js sebagai base image
FROM node:16-alpine

# Buat direktori app di dalam container
WORKDIR /job-connector-ui

# Salin package.json dan package-lock.json ke dalam direktori container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Salin seluruh proyek Next.js ke dalam direktori container
COPY . .

# Berikan izin eksekusi pada file 'next'
RUN chmod +x node_modules/.bin/next

RUN npm run build

# Port yang akan digunakan oleh aplikasi
EXPOSE 4004

# Perintah untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "start"]