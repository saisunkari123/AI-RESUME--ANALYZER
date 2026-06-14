package com.resumeai.controller;

import com.resumeai.dto.AnalysisResponseDTO;
import com.resumeai.service.AiAnalysisService;
import com.resumeai.service.PdfExtractionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173") // 🛡️ Sentinel: Restrict CORS to known frontend origin
public class AnalyzeController {

    private final PdfExtractionService pdfExtractionService;
    private final AiAnalysisService aiAnalysisService;

    public AnalyzeController(PdfExtractionService pdfExtractionService, AiAnalysisService aiAnalysisService) {
        this.pdfExtractionService = pdfExtractionService;
        this.aiAnalysisService = aiAnalysisService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponseDTO> analyze(
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("jobDescription") String jobDescription) {

        // 🛡️ Sentinel: Add input validation
        if (resume == null || resume.isEmpty() || resume.getContentType() == null || !resume.getContentType().equals("application/pdf")) {
            return ResponseEntity.badRequest().build();
        }
        if (jobDescription == null || jobDescription.trim().isEmpty() || jobDescription.length() > 10000) {
            return ResponseEntity.badRequest().build();
        }

        try {
            String resumeText = pdfExtractionService.extractTextFromPdf(resume);
            AnalysisResponseDTO response = aiAnalysisService.analyzeResume(resumeText, jobDescription);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            // 🛡️ Sentinel: Do not leak stack traces
            System.err.println("Error processing resume extraction");
            return ResponseEntity.internalServerError().build();
        }
    }
}
