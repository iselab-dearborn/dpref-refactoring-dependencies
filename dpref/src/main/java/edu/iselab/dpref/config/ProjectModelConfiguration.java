package edu.iselab.dpref.config;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;

import edu.iselab.refactorings.constant.NodeConstants;
import edu.iselab.refactorings.constant.Type;
import edu.iselab.refactorings.graph.Graph;
import edu.iselab.refactorings.graph.Node;
import edu.iselab.refactorings.model.ProjectModel;
import edu.iselab.refactorings.type.Refactoring;
import edu.iselab.refactorings.util.EvaluateUtil;
import edu.iselab.refactorings.util.FileReaderUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class ProjectModelConfiguration implements ApplicationListener<ContextRefreshedEvent>{

    public Map<String, ProjectModel> projectModels = new HashMap<>();
    
    @Bean
    public Map<String, ProjectModel> getProjectModels() {
        return projectModels;
    }
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        
        log.info("Initializing project models");

        loadProjectModel("grocery");
        loadProjectModel("jfreechart");
        
        log.info("Done");
    }

    public void loadProjectModel(String projectName) {

        projectModels.put(projectName, readProjectModel(projectName));
    }
    
    public ProjectModel readProjectModel(String projectName) {

        log.info("Loading project model for {}", projectName);
        
        Path file = Paths.get("src/main/resources/static/examples/")
                .resolve(projectName)
                .resolve(projectName + ".blocks");

        ProjectModel projectModel = null;
        
        try {
            projectModel = FileReaderUtils.readBlockFile(file);
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        
        log.info("Calculating quality attributes for {}", projectName);
        
        EvaluateUtil.calculateQualityAttributes(projectModel);
        
        return projectModel;
    }
    
    public Properties calculate(ProjectModel projectModel, Graph graph) {
        
        ProjectModel copy = projectModel.copy();

        EvaluateUtil.calculateQualityAttributes(copy);
        
        for (Node node : graph.nodes()) {
            
            Refactoring refactoring = node.getRefactoring();

            Type status = (Type) node.getProperty(NodeConstants.STATUS, Type.VALID);

            if (status != Type.INVALID) {
                refactoring.apply(copy);
            }
        }
        
        EvaluateUtil.calculateQualityAttributes(copy);
        
        return copy.getProperties();
    }
}
