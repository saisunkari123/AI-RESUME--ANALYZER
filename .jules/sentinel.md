## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2026-07-08 - Information Leakage via Stack Traces
**Vulnerability:** The application was using `e.printStackTrace()` to handle exceptions in `AiAnalysisService.java` and `AnalyzeController.java`, which prints stack traces directly to standard error. In production environments, this can lead to information leakage, exposing internal implementation details, class names, and potential vulnerabilities to attackers if logs are misconfigured or exposed.
**Learning:** `e.printStackTrace()` is an insecure practice for error handling in production code as it bypasses the configured logging framework and can leak sensitive context.
**Prevention:** Always use a proper logging framework (like SLF4J with Logback in Spring Boot) via `logger.error("Context message", e)` to handle exceptions. This ensures errors are formatted correctly, properly routed, and can be sanitized if necessary.
