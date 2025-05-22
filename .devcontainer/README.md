# GitHub Codespaces Setup for PetClinic

This directory contains the configuration for GitHub Codespaces development environment.

## What's Included

- **Java 21** with Gradle support
- **Node.js 22** for the Svelte frontend
- **VS Code extensions** for Java, Spring Boot, and Svelte development
- **Port forwarding** for backend (8080) and frontend (5000)
- **Pre-configured tasks** for running both services

## Getting Started

1. Open this repository in GitHub Codespaces
2. Wait for the container to build and the post-create script to run
3. Use one of these methods to start the application:

### Option 1: Use VS Code Tasks (Recommended)
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Tasks: Run Task"
- Select "Start Both (Backend + Frontend)" to start both services

### Option 2: Manual Start
```bash
# Terminal 1 - Start Backend
./gradlew :app:server:bootRun

# Terminal 2 - Start Frontend
cd app/client
npm run dev
```

## Available Services

- **Backend API**: http://localhost:8080
  - REST API: http://localhost:8080/api
  - GraphQL: http://localhost:8080/api/graphql
  - GraphiQL: http://localhost:8080/api/graphiql
  - Health: http://localhost:8080/actuator/health

- **Frontend**: http://localhost:5000

## Development Features

- **Hot Reload**: Both frontend and backend support hot reloading
- **Debugging**: Java debugging is configured for the Spring Boot application
- **Testing**: Run tests with `./gradlew test`
- **Code Formatting**: 
  - Java: `./gradlew spotlessApply`
  - Frontend: `npm run prettierApply` (in app/client)

## VS Code Extensions Included

- Java Extension Pack
- Spring Boot Dashboard
- Spring Boot Tools
- Svelte for VS Code
- Tailwind CSS IntelliSense

## Troubleshooting

If you encounter issues:

1. **Dependencies not installed**: Run the post-create script manually:
   ```bash
   .devcontainer/postCreateCommand.sh
   ```

2. **Port conflicts**: Check if ports 8080 or 5000 are already in use

3. **Java issues**: Ensure Java 21 is being used:
   ```bash
   java -version
   ```

4. **Frontend issues**: Reinstall dependencies:
   ```bash
   cd app/client
   rm -rf node_modules package-lock.json
   npm install
   ```
