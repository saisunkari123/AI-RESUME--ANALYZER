## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).
## 2024-05-18 - Improper Error Handling / Stack Trace Leakage
**Vulnerability:** The backend application used `e.printStackTrace()` in `AiAnalysisService` and `AnalyzeController`. This bypassed the standard logging framework and could inadvertently expose stack traces (containing internal system details or structure) to the standard error stream, which could then be exposed in unprotected logs or consoles.
**Learning:** Raw exception printing can expose application internals, making the system easier to map for an attacker. Centralized logging helps filter and sanitize exception messages before they are stored or broadcast.
**Prevention:** Always utilize the standardized logging framework (e.g., SLF4J with `logger.error("Message", e)`) to properly handle and record exceptions without direct raw outputs.
