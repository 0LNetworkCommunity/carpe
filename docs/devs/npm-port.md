# Development Server Port Configuration

## Verifying the Development Server Port

When running Carpe in development mode, ensure that the npm development server is running on port 5050. If you have a previous process that wasn't properly terminated and is still using port 5050, npm may automatically start on a different random port.

You should see output similar to this when the server starts correctly:

```
  Your application is ready~! 🚀

  - Local:      http://localhost:5050
```

## Troubleshooting Port Issues

If the server starts on a different port, you may need to:

1. Kill any existing processes using port 5050
2. Restart the development server with `yarn dev`
3. Verify the port number in the console output

The Tauri development configuration expects the frontend to be served on port 5050 for proper integration.
