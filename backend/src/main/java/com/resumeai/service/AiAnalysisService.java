package com.resumeai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeai.dto.AnalysisResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class AiAnalysisService {

    private static final Logger logger = LoggerFactory.getLogger(AiAnalysisService.class);

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    public AiAnalysisService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public AnalysisResponseDTO analyzeResume(String resumeText, String jobDescription) {
        String prompt = String.format(
                "You are an expert ATS. Evaluate the resume against the job description. " +
                "Output ONLY a valid JSON object with atsScore (integer 0-100), matchStatus (string), " +
                "missingKeywords (array), strengths (array), weaknesses (array), suggestions (array). " +
                "Job: %s Resume: %s", jobDescription, resumeText);

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-4o-mini",
                    "messages", List.of(
                            Map.of("role", "system", "content", "You are a helpful assistant designed to output JSON."),
                            Map.of("role", "user", "content", prompt)
                    ),
                    "response_format", Map.of("type", "json_object")
            );

            Map<String, Object> response = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    String content = (String) message.get("content");
                    return objectMapper.readValue(content, AnalysisResponseDTO.class);
                }
            }
        } catch (Exception e) {
            logger.error("Error analyzing resume", e);
        }

        return new AnalysisResponseDTO(
                0,
                "Error analyzing resume",
                Collections.emptyList(),
                Collections.emptyList(),
                Collections.emptyList(),
                Collections.emptyList()
        );
    }
}
