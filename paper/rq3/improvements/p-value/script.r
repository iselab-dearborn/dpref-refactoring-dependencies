#!/usr/bin/env Rscript

args = commandArgs(trailingOnly=TRUE)

paste("Running script for ", args[1])

my_data <- read.csv(args[1] , header = TRUE, sep = "\t")

v1 <- my_data[[1]]  # by column number
v2 <- my_data[[2]]  # by column number

res <- wilcox.test(v1, v2)

res$p.value