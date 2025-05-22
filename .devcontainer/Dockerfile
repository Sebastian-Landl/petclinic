FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install basic tools
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    unzip \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create vscode user
RUN groupadd --gid 1000 vscode \
    && useradd --uid 1000 --gid vscode --shell /bin/bash --create-home vscode

# Switch to vscode user for the rest of the setup
USER vscode
WORKDIR /home/vscode

# The Java and Node.js features will be installed by devcontainer.json
# This Dockerfile just provides the base environment
