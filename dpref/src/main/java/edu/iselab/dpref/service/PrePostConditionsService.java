package edu.iselab.dpref.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.iselab.refactorings.graph.generator.Generator;
import edu.iselab.refactorings.rule.Rule;
import edu.iselab.refactorings.type.Refactoring;
import edu.iselab.refactorings.util.RefactoringUtils;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PrePostConditionsService {

    @Autowired
    public Map<String, Generator> generators;

    public List<String> getPreConditions(String refactoringType) {

        log.debug("Returning list of pre-conditions for {}", refactoringType);

        Refactoring ref = RefactoringUtils.build(refactoringType, "c1", "c2", Arrays.asList("f"), Arrays.asList("m"), Arrays.asList());

        List<Rule> rule = ref.getPreConditions();

        return rule.stream().map(el -> el.toString()).collect(Collectors.toList());
    }

    public List<String> getPostConditions(String refactoringType) {

        log.debug("Returning list of post-conditions for {}", refactoringType);

        Refactoring ref = RefactoringUtils.build(refactoringType, "c1", "c2", Arrays.asList("f"), Arrays.asList("m"), Arrays.asList());

        List<Rule> rule = ref.getPostConditions();

        return rule.stream().map(el -> el.toString()).collect(Collectors.toList());
    }
}