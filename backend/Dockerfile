# Use the official PHP image with built-in web server
FROM php:8.2-cli

# Copy backend files into container
WORKDIR /app
COPY . /app

# Expose port 10000 (you can change if you want)
EXPOSE 10000

# Start PHP built-in server on container start
CMD ["php", "-S", "0.0.0.0:10000", "-t", "."]
