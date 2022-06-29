package edu.iselab.dpref.controller;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import edu.iselab.dpref.model.InputForm;
import edu.iselab.dpref.service.GraphService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class IndexController {

    @Value("${app.version}")
    private String appVersion;
    
    @Value("${app.description}")
    private String appDescription;
    
    @Autowired
    private GraphService graphService;
    
    @GetMapping("/")
    public String index(Model model) {
        
        log.info("Accessing / endpoint");
        
        model.addAttribute("appVersion", appVersion);
        model.addAttribute("appDescription", appDescription);
        model.addAttribute("inputForm", new InputForm());
        
        model.addAttribute("generators", graphService.getGenerators()
            .values()
            .stream()
            .sorted((g1, g2)-> g1.getKey().compareTo(g2.getKey()))
            .collect(Collectors.toList()) 
        );
        
        return "index";
    }
}
