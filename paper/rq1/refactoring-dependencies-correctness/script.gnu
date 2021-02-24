set terminal pdf enhanced size 4.5, 1.8;
set output 'refactoring-dependencies-correctness.pdf'

set multiplot layout 1,2

set style fill solid 0.5 border -1
set style boxplot nooutliers
set style data boxplot

set boxwidth  0.5
set pointsize 0.5

COLOR_1="#9E77A1"
COLOR_2="#9A8FBB"
COLOR_3="#8AA9C0"
COLOR_4="#7BC1BF"
COLOR_5="#7ED9B1"
COLOR_6="#B2ED90"
COLOR_7="#FDF57A"

unset key
set border 10

set datafile separator '\t'


set xtics ( \
    "Before: Valid \n Non-trivial \n Graphs" 1, \
    "After: Valid \n Non-trivial \n Graphs" 2, \
    "Before: Invalid \n Non-trivial \n Graphs"	3, \
    "After: Invalid \n Non-trivial \n Graphs " 4, \
    "Number Of \n Considered \n Non-trivial \n Graphs" 5, \
)

set grid
set ylabel "# of Graphs"

set xtics rotate by 0 offset 0,0 font "Verdana, 12" 

set bmargin 4
set rmargin 0

set ytics 4 font "Verdana, 12" 

#set logscale y; 

set yrange [0:*]
#set yrange [0:*]

set lmargin 5
set rmargin at screen 0.7
plot for [i=4:5] 'data.txt' using (i):i notitle

########################################################

set style fill solid 1.5 border -1
set boxwidth  0.5
set pointsize 0.5

set datafile separator " "
unset grid
set rmargin 0
set lmargin at screen 0.8
set xtics ( "RC" 1, "MC" 2,)
set yrange [0:1.1]
set ytics 0.2
unset ylabel

plot 'rc.txt' using (1):1 title 'T1' linecolor rgb COLOR_1, \
    '' using (2):2 title 'T2' linecolor rgb COLOR_2, \
    
#plot for [i=1:2] 'rc.txt' using (i):i notitle

########################################################

