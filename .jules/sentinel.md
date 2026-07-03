## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used a hardcoded `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing requests from any origin. This could potentially allow unauthorized cross-origin requests to access sensitive data.
**Learning:** Hardcoding CORS origins directly in annotations makes it difficult to manage and insecure for production environments.
**Prevention:** Always use configuration properties (e.g., `application.properties`) for CORS configurations and inject them into `@CrossOrigin` annotations using `${...}` property placeholders.
