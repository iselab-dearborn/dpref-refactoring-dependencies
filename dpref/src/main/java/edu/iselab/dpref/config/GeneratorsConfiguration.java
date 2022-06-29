package edu.iselab.dpref.config;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import edu.iselab.refactorings.graph.generator.ByPreAndPostConditionsGenerator;
import edu.iselab.refactorings.graph.generator.BySourceAndTargetClassGenerator;
import edu.iselab.refactorings.graph.generator.Generator;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class GeneratorsConfiguration {

    public Map<String, Generator> generators;
    
    @PostConstruct
    public void init(){
        
        log.info("Initializing Generators");
        
        this.generators = new HashMap<>();
       
        addGenerator(new BySourceAndTargetClassGenerator());
        addGenerator(new ByPreAndPostConditionsGenerator());
    }
    
    private void addGenerator(Generator generator) {
        
        log.info("Adding generator: {}", generator.getName());
        
        generators.put(generator.getKey(), generator);
    }
    
    @Bean
    public Map<String, Generator> getGenerators() {
        return generators;
    }
}
