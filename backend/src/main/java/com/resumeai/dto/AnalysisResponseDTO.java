package com.resumeai.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponseDTO {
    private int atsScore;
    private String matchStatus;
    private List<String> missingKeywords;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;
}
