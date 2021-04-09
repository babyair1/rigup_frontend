FROM httpd

WORKDIR /usr/local/apache2/htdocs/

COPY build/ .

EXPOSE 80

# CMD [“apache2ctl”, “-D”, “FOREGROUND”]

# FROM httpd

# WORKDIR /var/www/apache2/htdocs

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 2000

# CMD ["node", "index.js"]