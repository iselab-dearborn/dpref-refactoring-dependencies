#!/usr/bin/env Rscript

trivial <- read.csv("input/data-trivial.txt", header = TRUE, sep = "\t")
nontrivial <- read.csv("input/data-non-trivial.txt", header = TRUE, sep = "\t")

metrics <- c("Abstraction" , "Cohesion" , "Complexity" , "Composition" , "Coupling" , "DesignSize" , "Effectiveness" , "Encapsulation" , "Extendibility" , "Flexibility" , "Functionality" , "Hierarchies" , "Inheritance" , "Messaging" , "Polymorphism" , "Reusability" , "StandardCohesion" , "StandardComplexity" , "StandardCoupling" , "TQI" , "Understandability")

for(metric in metrics) {

    #print(metric)
   
    v1 <- trivial[[metric]]  # by column number
    v2 <- nontrivial[[metric]]  # by column number

# print(v2)
    res <- wilcox.test(v1, v2)

x <- c(metric, res$p.value)
# print(res)
    print(x)
}