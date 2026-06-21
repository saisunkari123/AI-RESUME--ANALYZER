## 2024-06-21 - Fix Overly Permissive CORS Configuration
**Vulnerability:** The application used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any domain to make cross-origin requests to the backend API.
**Learning:** Hardcoding `*` for CORS origins is a common insecure pattern. It's better to configure origins dynamically via application properties so they can be securely managed per environment.
**Prevention:** Always use `@CrossOrigin(origins = "${app.cors.allowed-origins}")` (or similar environment-driven configurations) rather than hardcoding `*` or specific domains in the source code.
