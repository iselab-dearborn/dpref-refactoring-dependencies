set terminal pdfcairo enhanced dashed size 4, 1.5;

set output "refactorings-per-dataset.pdf"

#set title "Title"

set style fill solid 0.5 border -1
set style boxplot outliers pointtype 7
set style data boxplot
set boxwidth  0.5
set pointsize 0.5

unset key
set border 2
set xtics ("Dataset #1" 1, "Dataset #2" 2, "Dataset #3" 3, "Dataset #4" 4, "Dataset #5" 5) scale 0.0
#set xtics rotate
set ytics 1
#set ytics rotate
set ylabel "# of Refactorings \n per Graph"
set yrange [0:10]

set datafile separator "\t"
set grid

COLOR_1="#9E77A1"
COLOR_2="#9A8FBB"
COLOR_3="#8AA9C0"
COLOR_4="#7BC1BF"
COLOR_5="#7ED9B1"
COLOR_6="#B2ED90"
COLOR_7="#FDF57A"

plot 'data.txt' using (1):1 title 'T1' linecolor rgb COLOR_1, \
    '' using (2):2 title 'T2' linecolor rgb COLOR_2, \
    '' using (3):3 title 'T3' linecolor rgb COLOR_3, \
    '' using (4):4 title 'T4' linecolor rgb COLOR_4, \
    '' using (5):5 title 'T5' linecolor rgb COLOR_5, \