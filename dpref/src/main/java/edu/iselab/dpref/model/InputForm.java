package edu.iselab.dpref.model;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.logging.log4j.util.Strings;

import edu.iselab.refactorings.graph.generator.ByPreAndPostConditionsGenerator;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InputForm {

    @NotBlank
    protected String projectName;
    
    @NotNull
    @NotEmpty
    protected List<String> refactorings;
    
    protected List<Integer> ignoreNodeList;
    
    protected boolean calculateMetrics = true;
    
    @NotNull
    protected String generator = new ByPreAndPostConditionsGenerator().getKey();
    
    public void prepareAndVerifyData() {
        
        refactorings = refactorings.stream()
            .filter(el -> !Strings.isBlank(el))
            .collect(Collectors.toList());
        
        if (refactorings.isEmpty()) {
            throw new IllegalArgumentException("The sequence of refactorings should not be null or empty");
        }
    }
}
