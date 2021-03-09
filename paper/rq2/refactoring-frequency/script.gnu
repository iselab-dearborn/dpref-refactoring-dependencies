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
set xtics ( \
"project\\_smell\\_density" 1, \
"project\\_total\\_arch\\_smell\\_count" 2, \
"project\\_total\\_design\\_smell\\_count" 3, \
"project\\_total\\_impl\\_smell\\_count" 4, \
"component\\_loc" 5, \
"component\\_smell\\_density" 6, \
"method\\_cc" 7, \
"method\\_loc" 8, \
"method\\_pc" 9, \
"class\\_dit" 10, \
"class\\_fanin" 11, \
"class\\_fanout" 12, \
"class\\_lcom" 13, \
"class\\_loc" 14, \
"class\\_nc" 15, \
"class\\_nof" 16, \
"class\\_nom" 17, \
"class\\_nopf" 18, \
"class\\_nopm" 19, \
"classv\\_wmc" 20, \
) scale 0.0 rotate by 90 right
set ytics 1
set ylabel "Developer's Feedback"
set yrange [1:5]

set bmargin 13

set datafile separator " "
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
    '' using (13):13 title 'T13' linecolor rgb COLOR_6, \
    '' using (14):14 title 'T14' linecolor rgb COLOR_7, \
    '' using (15):15 title 'T15' linecolor rgb COLOR_1, \
    '' using (16):16 title 'T16' linecolor rgb COLOR_2, \
    '' using (17):17 title 'T17' linecolor rgb COLOR_3, \
    '' using (18):18 title 'T18' linecolor rgb COLOR_4, \
    '' using (19):19 title 'T19' linecolor rgb COLOR_5, \
    '' using (20):20 title 'T20' linecolor rgb COLOR_6