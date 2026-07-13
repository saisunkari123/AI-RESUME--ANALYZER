## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-05-24 - Information Leakage via Stack Traces
**Vulnerability:** The Spring Boot backend used `e.printStackTrace()` in catch blocks within `AnalyzeController` and `AiAnalysisService`, which outputs detailed stack traces to standard output. This can inadvertently expose sensitive internal workings of the application (such as library versions, file paths, or internal logic) to the console or logs, making it easier for an attacker to understand the system and craft targeted exploits.
**Learning:** Bypassing standard logging frameworks and directly writing to the standard error stream (`System.err`) can cause information leakage and fails to capture exceptions in the application's central logging system properly.
**Prevention:** Always use appropriate logging mechanisms (e.g., SLF4J's `logger.error()`) to handle exceptions securely and consistently, preventing unintended exposure of stack traces while ensuring errors are tracked within the logging framework.
