package com.jucelio.portfolio.model;

import java.util.List;

public record Project(
        Long id,
        String name,
        String category,
        String description,
        List<String> technologies,
        List<String> highlights,
        String githubUrl
) {}
