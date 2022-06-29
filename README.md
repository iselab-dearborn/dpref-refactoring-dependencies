IEEE Transactions on Software Engineering

# Dependent or Not: Detecting and Understanding Collections of Refactorings

Thiago Ferreira, James Ivers, Jeffrey J. Yackley, Marouane Kessentini Ipek Ozkaya and Khouloud Gaaloul
 
**Abstract:** Refactoring is a program transformation to improve the internal structure of a program while preserving its external behavior. Developers frequently apply multiple refactorings that depend on each other to achieve goals such as improving code reusability. Although manually applying a sequence of dependent refactorings is a common practice, existing refactoring recommendation tools treat refactorings in isolation without revealing the dependencies among them to developers. One reason is that these relationships among refactorings are poorly understood. Current approaches treat refactoring recommendations as a strictly ordered sequence limiting developers' ability to understand, validate, and apply recommended refactorings. To address this gap, this paper describes a theory for reasoning about collections of refactorings through defining an ordering dependency relation among refactorings and organizing collection of refactorings as a set of refactoring graphs. We propose an algorithm for identifying refactoring dependencies and illustrate these concepts with a tool for visualizing such refactoring dependencies and refactoring graphs. Our validation results demonstrate that 43\% of the 1,457,873 recommended refactorings from 9,595 projects that we studied are part of dependent refactoring graphs. Furthermore, refactorings are not only commonly involved in dependent relations, but also when applied, dependent refactoring graphs improve all of the quality attribute metrics in our experiments more than individual refactorings.
