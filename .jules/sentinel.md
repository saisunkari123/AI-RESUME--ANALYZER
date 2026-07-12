## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2026-07-12 - Fix Stack Trace Leakage in Error Handling
**Vulnerability:** The application was using `e.printStackTrace()` to handle exceptions in `AnalyzeController.java` and `AiAnalysisService.java`. This could potentially leak internal stack traces and application structure to logs, or worse, to the end-user if the standard error output is captured or misconfigured.
**Learning:** Printing stack traces directly to `System.err` bypasses the application's logging framework and can inadvertently expose internal implementation details. It also makes logs harder to manage, parse, and aggregate properly in production environments.
**Prevention:** Always use a proper logging framework (like SLF4J with Logback) to log exceptions. Use methods like `logger.error("Contextual message", e)` to ensure the error is formatted correctly, context is preserved, and sensitive stack trace information is appropriately handled by the logging configuration.
