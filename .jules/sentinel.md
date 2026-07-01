## 2024-05-24 - Dynamic CORS Configuration Pattern
**Vulnerability:** The `AnalyzeController` used `@CrossOrigin(origins = "*")`, a hardcoded wildcard that permits cross-origin requests from any domain, creating an overly permissive policy.
**Learning:** Hardcoding CORS origins in controllers is a reusable security anti-pattern found in this codebase. They must be managed securely via properties.
**Prevention:** Always use `@CrossOrigin(origins = "${app.cors.allowed-origins}")` to inject allowed origins from `application.properties`, ensuring environments can restrict origins appropriately.
