package edu.iselab.dpref.config;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import edu.iselab.refactorings.graph.Graph;
import edu.iselab.refactorings.graph.generator.Generator;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class CacheConfiguration {

    @Autowired
    public Map<String, Generator> generators;
    
    public Map<String, Map<String, List<Graph>>> cache;
    
    @PostConstruct
    public void init(){
        
        log.info("Create cache");
        
        this.cache = new ConcurrentHashMap<>();

        for (String key : generators.keySet()) {
            this.cache.put(key, new ConcurrentHashMap<>());
        }
    }
    
    @Bean
    public Map<String, Map<String, List<Graph>>> getCache() {
        return cache;
    }
}
