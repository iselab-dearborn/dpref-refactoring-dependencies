


set terminal pdf enhanced size 6,3
set output 'rq3-improvement.pdf'

set multiplot layout 1,6

set style fill solid 0.5 border -1
set style boxplot nooutliers
set style data boxplot

set boxwidth  0.5
set pointsize 0.5

#

#set title "Plot 1"
#unset key
unset title 
set grid
#set ylabel "Rate of Improvement (%)"

set xtics rotate by 0 offset 0,0

set tmargin 3
set lmargin 4
#set rmargin 6

#set bmargin 

# set xtics ( \
#     "Non-trivial" 1, \
#     "Trivial" 2, \
# )

set xtics ( \
    "" 1, \
    "" 2, \
)

set style line 1 lc rgb "#C275E6"
set style line 2 lc rgb "#75C8B0"

#set yrange [0:*]

set datafile separator '\t'

#set key box width 2 height 3 opaque
#set key inside bottom center horizontal font "Helvetica, 20" width 1.8
set key horizontal maxrows 1


set key at 1.1, 1.15
unset ylabel
set yrange [0:1]
#set title "Effectiveness"
set xlabel "Effectiveness" font "Verdana, 14" 
plot for [i=1:2] 'Effectiveness.txt' using (i):i notitle, \
NaN with boxes ls 1 title "Non-trivial", \
NaN with boxes ls 2 title "Trivial"

set lmargin 0.8
unset key
unset ylabel
set yrange [0:1]
#set title "Extendibility"
set xlabel "Extendibility"
plot for [i=1:2] 'Extendibility.txt' using (i):i notitle

set lmargin 0.8
unset key
unset ylabel
set yrange [0:1]
#set title "Flexibility"
set xlabel "Flexibility"
plot for [i=1:2] 'Flexibility.txt' using (i):i notitle

set lmargin 0.8
unset key
unset ylabel
set yrange [0:1]
#set title "Functionality"
set xlabel "Functionality"
plot for [i=1:2] 'Functionality.txt' using (i):i notitle

set lmargin 0.8
unset key
unset ylabel
set yrange [0:1]
#set title "Reusability"
set xlabel "Reusability"
plot for [i=1:2] 'Reusability.txt' using (i):i notitle


unset key
unset ylabel
set yrange [0:1]
#set title "Understandability"
set xlabel "Understandability"
plot for [i=1:2] 'Understandability.txt' using (i):i notitle

