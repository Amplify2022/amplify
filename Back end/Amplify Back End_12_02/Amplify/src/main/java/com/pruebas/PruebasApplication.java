package com.pruebas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

@Configuration
@SpringBootApplication
@EnableScheduling
public class PruebasApplication {


	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}

	public static void main(String[] args) {
		//ConfigurableApplicationContext configurableApplicationContext = 
		SpringApplication.run(PruebasApplication.class, args);
	}
}
