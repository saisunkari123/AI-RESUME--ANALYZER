## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).
## 2024-05-15 - Information Exposure through e.printStackTrace()
**Vulnerability:** Found `e.printStackTrace()` used for exception handling in `AiAnalysisService.java` and `AnalyzeController.java`. This can lead to Information Exposure by leaking internal stack traces to logs (or standard error streams) and potentially back to users if errors aren't caught properly at higher levels.
**Learning:** It's important to use proper logging frameworks (like SLF4J with Logback) instead of standard out/error for consistent log management, severity levels, and avoiding unwanted sensitive information exposure in unmanaged console logs.
**Prevention:** Configure ESLint/Checkstyle or other linters to flag any occurrences of `System.out.println` or `e.printStackTrace()`. Always use `Logger` (e.g. SLF4J `LoggerFactory.getLogger(...)`) to handle application logs and errors.
