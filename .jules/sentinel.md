## 2024-05-18 - [Security Enhancements]
**Vulnerability:** Found overly permissive CORS configurations using `*` origins in backend controllers.
**Learning:** Hardcoded strings in `@CrossOrigin` annotations bypass centralized configuration and pose security risks by potentially allowing any origin.
**Prevention:** Always externalize configurations such as allowed origins to `application.properties` and inject them using variables (e.g., `@CrossOrigin(origins = "${app.cors.allowed-origins}")`).
