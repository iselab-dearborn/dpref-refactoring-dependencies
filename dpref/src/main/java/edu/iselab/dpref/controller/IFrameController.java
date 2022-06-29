package edu.iselab.dpref.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import edu.iselab.dpref.model.IframeForm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class IFrameController {

    @PostMapping("/iframe")
    public String index(Model model, @ModelAttribute IframeForm form) {
        
        log.info("Accessing /iframe endpoint");
        
        String graph = form.getGraphs();
        
        System.out.println(graph);
        
        model.addAttribute("graphs", graph);
        
        return "iframe";
    }
    
    @GetMapping("/iframe")
    public String index(Model model) {
        
        log.info("Accessing /iframe endpoint");
        
      
        
        return "iframe";
    }
}
