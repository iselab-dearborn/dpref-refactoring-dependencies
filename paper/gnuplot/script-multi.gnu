


set multiplot layout 1,2 title "Multiplot layout 1, 3" font ",14"

set style fill solid 0.5 border -1
set style boxplot nooutliers
set style data boxplot

set boxwidth  0.5
set pointsize 0.5

#

set title "Plot 1"
unset key

set grid
set ylabel "Number of Graphs"

set xtics rotate by 0 offset 0,0

set bmargin 4

set xtics ( \
    "After Invalid \n Non-trivial \n Graphs " 1, \
    "After Valid \n Non-trivial \n Graphs" 2, \
    "Before Invalid \n Non-trivial \n Graphs"	3, \
    "Before Valid \n Non-trivial \n Graphs" 4, \
    "Number Of \n Considered \n Non-trivial \n Graphs" 5, \
)


set yrange [0:*]

set datafile separator '\t'

plot for [i=1:5] 'data-1.txt' using (i):i notitle

#

set title "Plot 2"
unset key
plot 'data-2.txt'

unset multiplot