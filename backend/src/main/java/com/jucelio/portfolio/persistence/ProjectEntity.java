package com.jucelio.portfolio.persistence;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class ProjectEntity {

    @Id
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 120)
    private String category;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "github_url", nullable = false, length = 500)
    private String githubUrl;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "project_technologies",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @OrderColumn(name = "position")
    @Column(name = "technology", nullable = false, length = 120)
    private List<String> technologies = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "project_highlights",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @OrderColumn(name = "position")
    @Column(name = "highlight", nullable = false, length = 180)
    private List<String> highlights = new ArrayList<>();

    protected ProjectEntity() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public List<String> getHighlights() {
        return highlights;
    }
}
