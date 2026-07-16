package com.resumeai.controller;

import com.resumeai.dto.AnalysisResponseDTO;
import com.resumeai.service.AiAnalysisService;
import com.resumeai.service.PdfExtractionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class AnalyzeController {

    private static final Logger logger = LoggerFactory.getLogger(AnalyzeController.class);

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

        try {
            String resumeText = pdfExtractionService.extractTextFromPdf(resume);
            AnalysisResponseDTO response = aiAnalysisService.analyzeResume(resumeText, jobDescription);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            logger.error("Error processing resume analysis", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
