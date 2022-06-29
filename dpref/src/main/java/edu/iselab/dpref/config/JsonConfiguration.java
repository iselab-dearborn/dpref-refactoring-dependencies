package edu.iselab.dpref.config;

import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import edu.iselab.refactorings.json.deserializer.PropertiesJsonDeserializer;
import edu.iselab.refactorings.json.serializer.PropertiesJsonSerializer;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class JsonConfiguration {

    @PostConstruct
    public void init() {
        log.info("Create json configuration");
    }
    
    @Bean
    public ObjectMapper objectMapper() {
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        SimpleModule module = new SimpleModule("GraphJsonSerializer", new Version(1, 0, 0, null, null, null));

        module.addSerializer(Properties.class, new PropertiesJsonSerializer());
        
        module.addDeserializer(Properties.class, new PropertiesJsonDeserializer());
        
        objectMapper.registerModule(module);
        
        return objectMapper;
    }
}
