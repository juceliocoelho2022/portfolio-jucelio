package com.jucelio.portfolio.service;

import com.jucelio.portfolio.model.Project;
import com.jucelio.portfolio.persistence.ProjectEntity;
import com.jucelio.portfolio.persistence.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PortfolioService {

    private final ProjectRepository projectRepository;

    public PortfolioService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<Project> getProjects() {
        return projectRepository.findAllByOrderByIdAsc()
                .stream()
                .map(this::toModel)
                .toList();
    }

    private Project toModel(ProjectEntity entity) {
        return new Project(
                entity.getId(),
                entity.getName(),
                entity.getCategory(),
                entity.getDescription(),
                List.copyOf(entity.getTechnologies()),
                List.copyOf(entity.getHighlights()),
                entity.getGithubUrl()
        );
    }
}
