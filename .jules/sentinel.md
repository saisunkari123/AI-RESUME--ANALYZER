## 2024-06-19 - Overly Permissive CORS Configuration

**Vulnerability:** The `AnalyzeController` used an overly permissive CORS configuration (`@CrossOrigin(origins = "*")`), allowing any origin to make requests to the API.

**Learning:** Hardcoded, wildcard CORS configurations can expose the API to unauthorized cross-origin requests.

**Prevention:** Always externalize CORS configurations using properties and specify exact allowed origins.
