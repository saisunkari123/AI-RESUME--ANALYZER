## 2024-06-24 - Overly Permissive CORS Configuration
**Vulnerability:** The API used `@CrossOrigin(origins = "*")`, allowing any domain to make cross-origin requests to the backend.
**Learning:** Hardcoding wildcard CORS origins in controllers circumvents the same-origin policy and exposes the API to CSRF or cross-origin data theft if not careful. The configuration should be environment-specific.
**Prevention:** Always use environment-specific properties (e.g., `app.cors.allowed-origins`) instead of hardcoding `*` or specific domains directly in the code.
