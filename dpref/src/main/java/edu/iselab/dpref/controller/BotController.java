package edu.iselab.dpref.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.iselab.dpref.service.GraphService;
import edu.iselab.dpref.service.PrePostConditionsService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BotController {
    
    public static final String SERVICE = "service";
    
    @Autowired
    protected GraphService graphService;
    
    @Autowired
    protected PrePostConditionsService prePostConditionsService;

    @PostMapping("/bot/ibm-watson")
    public Map<String, String> ibmWatson(@RequestBody HashMap<String, String> body) {

        log.info("Accessing /bot/ibm-watson endpoint");

        log.info("Data Received: {}", body);

        Map<String, String> response = new HashMap<>();

        if (hasService(body, "pre-conditions")) {

            String refactoringType = body.get("refactoringTypeSelected");

            response.put("answer", String.join("\n", prePostConditionsService.getPreConditions(refactoringType)));
        }

        if (hasService(body, "post-conditions")) {

            String refactoringType = body.get("refactoringTypeSelected");

            response.put("answer", String.join("\n", prePostConditionsService.getPostConditions(refactoringType)));
        }

        return response;
    }
    
    private boolean hasService(HashMap<String, String> body, String service) {
        return body.containsKey(SERVICE) && body.get(SERVICE).equalsIgnoreCase(service);
    }

}
