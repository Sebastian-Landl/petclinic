# Use the official Java 17 image as the base
FROM mcr.microsoft.com/devcontainers/java:21

# Install Node.js (LTS version) and npm
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs

# Set the working directory
WORKDIR /workspace