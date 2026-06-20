## 2024-06-20 - Overly Permissive CORS Configuration

**Vulnerability:** The Spring Boot backend controllers used a hardcoded `@CrossOrigin(origins = "*")` annotation. This is an overly permissive CORS configuration that allows any website to make cross-origin requests to the API, potentially leading to CSRF or unauthorized data access if session cookies or other credentials are included in requests.

**Learning:** CORS configurations should never be hardcoded with a wildcard `*` in production environments, especially on controllers handling sensitive data or actions. They should be managed securely via application configuration properties to allow environment-specific settings and restrict access to known, trusted origins (like the frontend application).

**Prevention:** Always use configuration properties (e.g., `app.cors.allowed-origins` in `application.properties`) injected via `${...}` in `@CrossOrigin` annotations, or use a global `WebMvcConfigurer` to define CORS mappings securely and restrict them to specific trusted origins.
