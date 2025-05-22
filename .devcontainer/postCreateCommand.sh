#!/bin/bash

echo "🚀 Setting up PetClinic development environment..."

# Make sure we're in the workspace directory
cd /workspace

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd app/client
npm install
cd ../..

# Make gradlew executable (in case it's not)
chmod +x ./gradlew

# Build the project to ensure everything works
echo "🔨 Building the project..."
./gradlew build clean

echo "✅ Setup complete! You can now:"
echo "  - Run 'npm run dev' in app/client/ to start the frontend"
echo "  - Run './gradlew :app:server:bootRun' to start the backend"
echo "  - Or use the VS Code tasks (Ctrl+Shift+P -> Tasks: Run Task)"
