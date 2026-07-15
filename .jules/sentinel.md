## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2026-07-15 - Stack Trace Information Leakage
**Vulnerability:** Application code was using `e.printStackTrace()` in catch blocks, which can expose internal system information, stack traces, and underlying technology details to standard error output or potentially end-users, aiding attackers in reconnaissance.
**Learning:** Hardcoded stack trace printing bypasses standard logging configurations and security filters.
**Prevention:** Always use standard logging frameworks (like SLF4J's `Logger`) to log errors (e.g., `logger.error("Message", e)`), which allows for proper formatting, routing, and filtering of sensitive execution information based on deployment environments.
