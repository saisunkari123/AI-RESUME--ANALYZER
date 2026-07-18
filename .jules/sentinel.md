## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-05-18 - Prevent Stack Trace Leakage via SLF4J
**Vulnerability:** Found `e.printStackTrace()` used in multiple locations (`AnalyzeController.java` and `AiAnalysisService.java`), which could potentially expose internal application structure and stack traces in server logs or standard output.
**Learning:** `e.printStackTrace()` bypasses the standard logging framework, potentially printing to the standard error stream which might be exposed in unexpected ways or miss central log aggregation.
**Prevention:** Consistently use the SLF4J logger (e.g., `logger.error("Message", e)`) to properly manage, format, and route error details according to application logging configuration, preventing unwanted leakage.
