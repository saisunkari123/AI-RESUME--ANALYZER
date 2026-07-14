## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2024-07-14 - Prevent Stack Trace Leakage via Proper Logging
**Vulnerability:** The application was using `e.printStackTrace()` for error handling in controllers and services. This practice poses a medium security risk as it can leak internal application details, file paths, and potential dependency versions to system standard error, which might be exposed in centralized logging systems without proper severity filtering or potentially to users if not caught globally.
**Learning:** Error handling needs to consistently utilize a logging framework (like SLF4J) to ensure errors are appropriately categorized, formatted, and securely recorded without unintended information disclosure.
**Prevention:** Always use a configured logger (e.g., `logger.error("Message", e)`) instead of `e.printStackTrace()`. Include static analysis rules to flag usage of `printStackTrace()` in the codebase.
