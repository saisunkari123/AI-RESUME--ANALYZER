## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-05-24 - Prevent Information Leakage from Stack Traces
**Vulnerability:** Found instances of `e.printStackTrace()` used in exception handling (`AiAnalysisService` and `AnalyzeController`). This practice can expose sensitive system internals, execution paths, and potentially database structures or third-party service details to end-users or log files not meant to capture such granular, unformatted data, leading to Information Exposure vulnerabilities.
**Learning:** Even in non-user-facing exceptions (like those printed to standard error in Java), unformatted stack traces can be inadvertently captured by centralized logging systems or displayed in development/debug modes that make it to production.
**Prevention:** Always use a structured logging framework (like SLF4J with Logback in Spring Boot). Catch exceptions and log them using appropriate severity levels (e.g., `logger.error("Contextual message", e)`). This ensures errors are recorded securely, predictably, and without leaking raw stack trace data to standard streams.
