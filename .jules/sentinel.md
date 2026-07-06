## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2026-07-06 - Prevent Information Leakage via Stack Traces
**Vulnerability:** Spring Boot application used `e.printStackTrace()` in catch blocks within `AiAnalysisService` and `AnalyzeController`, which can leak sensitive internal system information, stack traces, and underlying infrastructure details to standard output, potentially accessible in production environments.
**Learning:** `printStackTrace()` writes directly to `System.err`, bypassing the application's logging framework and configuration, making it difficult to control log formatting, destination, or mask sensitive data.
**Prevention:** Always use the configured SLF4J logging framework (e.g., `logger.error("Message", e)`) to handle exceptions, ensuring errors are appropriately formatted, managed, and stripped of sensitive details before being logged or returned.
