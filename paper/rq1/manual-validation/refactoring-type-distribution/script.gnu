set terminal pdfcairo enhanced dashed size 4, 4;

set output "box-plot.pdf"

#set title "Title"

set style fill solid 0.5 border -1
set style boxplot outliers pointtype 7
set style data boxplot
set boxwidth  0.5
set pointsize 0.5

unset key
set border 2
set xtics ("DecreaseFieldSecurity" 1, "EncapsulateField" 2, "ExtractClass" 3, "ExtractSubClass" 4, "ExtractSuperClass" 5, "IncreaseFieldSecurity" 6, "IncreaseMethodSecurity" 7, "MoveField" 8, "MoveMethod" 9, "PullUpField" 10, "PullUpMethod" 11, "PushDownField" 12, "PushDownMethod" 13,) scale 0.0
set xtics rotate
set ytics 1
set ytics rotate
set ylabel "# of Refactorings"
set yrange [0:11]

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
    '' using (6):6 title 'T6' linecolor rgb COLOR_6, \
    '' using (7):7 title 'T7' linecolor rgb COLOR_7, \
    '' using (8):8 title 'T8' linecolor rgb COLOR_1, \
    '' using (9):9 title 'T9' linecolor rgb COLOR_2, \
    '' using (10):10 title 'T10' linecolor rgb COLOR_3, \
    '' using (11):11 title 'T11' linecolor rgb COLOR_4, \
    '' using (12):12 title 'T12' linecolor rgb COLOR_5, \
    '' using (13):13 title 'T13' linecolor rgb COLOR_6,