package edu.iselab.dpref.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.iselab.dpref.model.ApiResult;
import edu.iselab.dpref.model.InputForm;
import edu.iselab.dpref.service.GraphService;
import edu.iselab.refactorings.graph.Graph;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/graph")
public class GraphController {

    @Autowired
    protected GraphService graphService;
    
    @PostMapping("/generate")
    public ApiResult generateJson(@RequestBody InputForm inputForm) {

        log.info("Accessing /graph/generate endpoint");
        
        List<Graph> graphs = graphService.generate(inputForm);
        
        return new ApiResult(graphs);
    }
}
