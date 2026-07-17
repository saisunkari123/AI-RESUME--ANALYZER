## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-05-24 - Information Leakage via printStackTrace
**Vulnerability:** The application was using `e.printStackTrace()` for error handling in `AnalyzeController` and `AiAnalysisService`, which outputs raw stack traces to standard error. This can expose sensitive internal application details, package structures, and underlying library versions to logs or users.
**Learning:** Relying on standard output for errors bypasses the application's logging framework and can lead to unintentional information disclosure.
**Prevention:** Always use a proper logging framework like SLF4J (e.g., `logger.error("Message", e)`) to handle exceptions securely and manage log levels appropriately.
