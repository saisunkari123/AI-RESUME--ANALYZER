## 2024-05-24 - Stop Information Leakage via Stack Traces
**Vulnerability:** The backend was using `e.printStackTrace()` in catch blocks within `AnalyzeController` and `AiAnalysisService`. This exposes sensitive internal stack traces and implementation details to server logs or potentially the end user if not caught by a global exception handler.
**Learning:** Using `e.printStackTrace()` is a poor practice in production applications because it lacks context, formatting, and control over where the error is output. It bypasses the application's logging framework (SLF4J/Logback).
**Prevention:** Always use the application's configured logging framework (e.g., `logger.error("Message", e)`) to securely log exceptions. This ensures errors are handled, formatted, and routed securely according to the application's logging configuration, without leaking sensitive internals directly to standard error or responses.

## 2024-05-24 - Secure Overly Permissive CORS Configuration
**Vulnerability:** The `AnalyzeController` was configured with `@CrossOrigin(origins = "*")`, allowing any domain to make cross-origin requests to the application's API endpoints. This is overly permissive and exposes the API to potential abuse.
**Learning:** Hardcoding wildcard `*` for CORS origins in production applications defeats the purpose of the Same-Origin Policy, increasing the risk of CSRF and data theft if the API relies on cookie-based authentication or internal network trust.
**Prevention:** CORS origins should be explicitly defined and externally configurable. Use properties like `${app.cors.allowed-origins}` injected from `application.properties` to manage allowed origins securely per environment (e.g., local development vs. production).
