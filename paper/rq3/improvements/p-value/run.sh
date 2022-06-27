#!/bin/sh

search_dir=input

for entry in "$search_dir"/*
do
    Rscript script.r $entry
done

