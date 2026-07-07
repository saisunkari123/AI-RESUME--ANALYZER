## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-05-18 - Stack Trace Leakage via e.printStackTrace()
**Vulnerability:** The Spring Boot backend used `e.printStackTrace()` in catch blocks within `AnalyzeController` and `AiAnalysisService`. This can lead to information leakage by printing stack traces to standard error, which might be exposed in certain logging configurations or unhandled server responses, revealing internal application structure and dependency versions.
**Learning:** Using `e.printStackTrace()` is an insecure practice as it circumvents the established logging framework and can expose sensitive internal details.
**Prevention:** Always use a proper logging framework (e.g., SLF4J with `logger.error("message", e)`) to handle exceptions. This ensures errors are recorded securely according to the application's logging configuration without leaking internal state.
