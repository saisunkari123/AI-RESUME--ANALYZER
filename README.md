# AI-Powered Resume Analyzer & ATS Scorer

An advanced, full-stack application that analyzes resumes against target job descriptions using OpenAI's LLM to generate an Applicant Tracking System (ATS) match score, identify missing keywords, highlight strengths and weaknesses, and provide actionable suggestions.

## 📌 Project Overview

This project is designed to help job seekers optimize their resumes. Users can upload a PDF of their resume and paste the job description of the role they are applying for. The application then:
1.  **Extracts** the text from the uploaded PDF resume.
2.  **Analyzes** the resume against the job description using an AI Model (`gpt-4o-mini`).
3.  **Generates** a comprehensive report including an ATS score, missing keywords, and actionable feedback.
4.  **Displays** the results in a beautiful, responsive dashboard.

## 🏗️ Architecture & Tech Stack

### Backend
*   **Language:** Java 21
*   **Framework:** Spring Boot 3
*   **Build Tool:** Gradle
*   **Web Layer:** Spring WebFlux (for reactive API calls using `WebClient`)
*   **PDF Processing:** Apache PDFBox (`3.0.1`)
*   **JSON Processing:** Jackson (`jackson-databind`)

### Frontend
*   **Library:** React (bootstrapped with Vite)
*   **Styling:** Tailwind CSS
*   **HTTP Client:** Axios
*   **UI Components/Icons:** `lucide-react`, `react-circular-progressbar`

### AI Integration
*   **Service:** OpenAI API (`gpt-4o-mini`)

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
*   [Java Development Kit (JDK) 21](https://jdk.java.net/21/)
*   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)
*   An [OpenAI API Key](https://platform.openai.com/api-keys)

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```shell
    cd backend
    ```
2.  Set your OpenAI API Key as an environment variable. The backend uses this to communicate with OpenAI.
    *   **Linux/macOS:**
        ```shell
        export OPENAI_API_KEY="your_actual_api_key_here"
        ```
    *   **Windows (Command Prompt):**
        ```cmd
        set OPENAI_API_KEY="your_actual_api_key_here"
        ```
    *   **Windows (PowerShell):**
        ```powershell
        $env:OPENAI_API_KEY="your_actual_api_key_here"
        ```
3.  Build and run the application using the Gradle wrapper:
    ```shell
    ./gradlew bootRun
    ```
    The Spring Boot server will start on `http://localhost:8080`.

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```shell
    cd frontend
    ```
2.  Install the required dependencies:
    ```shell
    npm install
    ```
3.  Start the development server:
    ```shell
    npm run dev &
    ```
    The Vite development server will typically start on `http://localhost:5173`. Open this URL in your browser to access the application.

---

## ⚙️ Configuration (Environment Variables)

### Backend (`backend/src/main/resources/application.properties`)

The backend is configured to read the OpenAI API key from the environment variable `OPENAI_API_KEY`. If it is not set, it defaults to a placeholder string.

```properties
server.port=8080
openai.api.key=${OPENAI_API_KEY:your_api_key_here}
openai.api.url=https://api.openai.com/v1/chat/completions
```

Make sure the environment variable is properly exported in the terminal session where you run the backend.

---

## 📝 API Endpoints

### `POST /api/v1/analyze`

Analyzes a resume against a job description.

*   **Content-Type:** `multipart/form-data`
*   **Parameters:**
    *   `resume`: (File) The PDF resume file to analyze.
    *   `jobDescription`: (String) The text of the target job description.
*   **Response:**
    *   Returns a JSON object matching the `AnalysisResponseDTO` structure, containing the ATS score, match status, missing keywords, strengths, weaknesses, and suggestions.
