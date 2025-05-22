FROM mcr.microsoft.com/devcontainers/java:21

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs

WORKDIR /workspace