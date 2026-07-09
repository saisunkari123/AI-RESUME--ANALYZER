## 2024-05-18 - Overly Permissive CORS Configuration
**Vulnerability:** The Spring Boot backend used `@CrossOrigin(origins = "*")` on the `AnalyzeController`, allowing any website to make cross-origin requests to the application. This could expose sensitive operations to Cross-Site Request Forgery (CSRF) or other attacks from malicious sites.
**Learning:** Hardcoding wildcard CORS origins in controllers bypasses the intended security benefits of the Same-Origin Policy.
**Prevention:** Always use configuration properties (e.g., `${app.cors.allowed-origins}`) to explicitly define trusted origins, managing them securely via `application.properties` for different environments (development, production).

## 2026-07-09 - Prevent Stack Trace Leakage via Proper Logging
**Vulnerability:** Use of `e.printStackTrace()` writes directly to standard error, bypassing logging frameworks and potentially exposing sensitive application internals (stack traces) in unmanaged logs or output.
**Learning:** Relying on standard error for exception logging circumvents centralized log management, formatting, and masking, which can lead to information leakage (CWE-209/CWE-532).
**Prevention:** Always utilize structured logging frameworks like SLF4J (e.g., `logger.error(...)`) for exception handling to ensure errors are appropriately processed, stored, and protected.
