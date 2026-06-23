## 2024-06-23 - [CORS Overly Permissive Configuration]
**Vulnerability:** Found `@CrossOrigin(origins = "*")` in `AnalyzeController.java`. This is an overly permissive CORS configuration that allows any domain to access the backend API.
**Learning:** Hardcoded wildcard CORS origins expose the API to Cross-Origin Resource Sharing attacks, potentially allowing malicious sites to make requests on behalf of users.
**Prevention:** Always use property-based configuration for CORS (e.g., `@CrossOrigin(origins = "${app.cors.allowed-origins}")`) to allow environments to specify secure origins and avoid hardcoding `*` in production code.

## 2024-06-23 - [Information Leakage via Stack Traces]
**Vulnerability:** Found `e.printStackTrace()` in `AnalyzeController.java` catch block.
**Learning:** Using `e.printStackTrace()` leaks stack traces into standard output, which could be exposed in logs and provide attackers with internal system details.
**Prevention:** Use a proper logging framework like SLF4J and log only the necessary error message (e.g., `logger.error("Error message: {}", e.getMessage())`) instead of the entire stack trace.
