set terminal pdf enhanced
set output 'rq1.pdf'

set multiplot layout 1,2

set style fill solid 0.5 border -1
set style boxplot nooutliers
set style data boxplot

set boxwidth  0.5
set pointsize 0.5

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

set ytics 2 font "Verdana, 12" 

#set logscale y; 

set yrange [0:*]
#set yrange [0:*]

set lmargin 5
set rmargin at screen 0.7
plot for [i=3:5] 'data.txt' using (i):i notitle

########################################################

set style fill solid 1.5 border -1
set boxwidth  0.5
set pointsize 0.5

unset grid
set rmargin 0
set lmargin at screen 0.8
set xtics ( \
    "RC" 1, \
)
set yrange [0:1.1]
set ytics 0.1
unset ylabel
plot for [i=1:1] 'rc.txt' using (i):i notitle