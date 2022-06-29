package edu.iselab.dpref.service;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.iselab.dpref.model.InputForm;
import edu.iselab.refactorings.graph.Graph;
import edu.iselab.refactorings.graph.generator.ByPreAndPostConditionsGenerator;
import edu.iselab.refactorings.graph.generator.Generator;
import edu.iselab.refactorings.model.ProjectModel;
import edu.iselab.refactorings.type.Refactoring;
import edu.iselab.refactorings.util.ConverterUtils;
import edu.iselab.refactorings.util.EvaluateUtil;
import edu.iselab.refactorings.util.GraphUtils;
import lombok.Getter;

@Getter
@Service
public class GraphService {

    @Autowired
    public Map<String, Generator> generators;
    
    @Autowired
    protected Map<String, ProjectModel> projectModels;
    
    @Autowired
    protected Map<String, Map<String, List<Graph>>> cache;
    
    public List<Graph> generate(InputForm inputForm) {

        checkNotNull(inputForm, "The input form should not be null");
        
        inputForm.prepareAndVerifyData();
        
        List<Refactoring> refactorings = ConverterUtils.toRefactorings(inputForm.getRefactorings());
        
        if (!generators.containsKey(inputForm.getGenerator())) {
            throw new IllegalArgumentException(String.format("The '%s' generator is not a recognized one", inputForm.getGenerator()));
        }
        
        refactorings = refactorings.stream()
                .filter(el -> !inputForm.getIgnoreNodeList().contains(el.getSequenceId()))
                .collect(Collectors.toList());
        
        Generator generator = generators.get(inputForm.getGenerator());

        if (generator == null) {
            throw new IllegalArgumentException(String.format("The '%s' generator exists but it is null", inputForm.getGenerator()));
        }
        
        String key = String.join("", ConverterUtils.toStringList(refactorings));

        if (cache.get(generator.getKey()).containsKey(key)) {
            return cache.get(generator.getKey()).get(key);
        }
        
        Graph graph = generator.generate(refactorings);
        
        List<Graph> graphs = GraphUtils.getSubgraphs(graph);
        
        if (inputForm.isCalculateMetrics()) {

            ProjectModel projectModel = projectModels.get(inputForm.getProjectName());

            for (Graph g : graphs) {
                EvaluateUtil.generate(projectModel, g);
            }
        }
        
        cache.get(generator.getKey()).put(key, graphs);

        return graphs;
    }
}