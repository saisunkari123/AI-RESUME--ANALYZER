## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-05-18 - Information Exposure via Stack Traces
**Vulnerability:** The application used `e.printStackTrace()` to handle exceptions in `AnalyzeController` and `AiAnalysisService`. This practice can inadvertently expose sensitive information about the application's internal structure and state through standard output or system logs.
**Learning:** Using `e.printStackTrace()` is insecure and a poor practice in production environments because it lacks control over log levels, formatting, and the potential exposure of stack traces to unintended audiences.
**Prevention:** Always use a proper logging framework (like SLF4J) to record errors. This allows for centralized log management, filtering of sensitive information, and prevents accidental exposure of internal application details.
