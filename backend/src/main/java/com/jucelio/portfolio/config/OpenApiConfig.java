package com.jucelio.portfolio.config;

import io.swagger.v3.oas.models.Contact;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI portfolioOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Portfolio Jucelio API")
                        .version("1.0.0")
                        .description("API REST do portfólio profissional de Jucelio Farias Coelho.")
                        .contact(new Contact()
                                .name("Jucelio Farias Coelho")
                                .url("https://github.com/juceliocoelho2022"))
                        .license(new License()
                                .name("Portfolio Project")))
                .servers(List.of(
                        new Server()
                                .url("https://portfolio-jucelio-api.onrender.com")
                                .description("Produção"),
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local")
                ));
    }
}
