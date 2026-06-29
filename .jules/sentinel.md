## 2024-05-15 - Fix overly permissive CORS configuration
**Vulnerability:** The Spring Boot API (`AnalyzeController`) had an overly permissive CORS configuration, allowing requests from any origin (`@CrossOrigin(origins = "*")`).
**Learning:** Hardcoding wildcard CORS domains makes the application vulnerable to cross-origin attacks. Instead of hardcoding CORS, it should be managed via configuration properties.
**Prevention:** Always use `@CrossOrigin(origins = "${property.name}")` and configure the allowed origins securely in `application.properties` (with safe defaults like `http://localhost:5173` and environment variable overrides like `${ALLOWED_ORIGINS}`).
