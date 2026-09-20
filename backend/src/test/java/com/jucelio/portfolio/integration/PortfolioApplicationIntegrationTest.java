package com.jucelio.portfolio.integration;

import com.jucelio.portfolio.persistence.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PortfolioApplicationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    void shouldRunFlywayAndLoadSeedProjects() {
        assertThat(projectRepository.count()).isEqualTo(6);
    }

    @Test
    void shouldExposeSeedProjectsThroughApi() throws Exception {
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(6))
                .andExpect(jsonPath("$[0].name").value("NexaPay"))
                .andExpect(jsonPath("$[1].name").value("InnovationHub"))
                .andExpect(jsonPath("$[2].name").value("SentinelFraud Platform"));
    }

    @Test
    void shouldExposeHealthEndpointWithApplicationRunning() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.application").value("portfolio-api"));
    }
}
