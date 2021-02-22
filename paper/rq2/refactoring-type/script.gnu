


set terminal pdf enhanced size 1.8,3
set output 'rq2-refactoring-type.pdf'

#set multiplot layout 1,6

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


# set tmargin 5
set lmargin 6
set rmargin 0
set tmargin 0
set bmargin 11

set xtics ( \
"Decrease Field Security" 1, \
"Decrease Method Security" 2, \
"Encapsulate Field" 3, \
"Extract Class" 4, \
"Extract Sub Class" 5, \
"Extract Super Class" 6, \
"Increase Field Security" 7, \
"Increase Method Security" 8, \
"Move Field" 9, \
"Move Method" 10, \
"PullUp Field" 11, \
"PullUp Method" 12, \
"Push Down Field" 13, \
"Push Down Method" 14, \
)

set style line 1 lc rgb "#C275E6"
set style line 2 lc rgb "#75C8B0"

#set yrange [0:*]
#set logscale <axes>

set ytics rotate by 90 right

set datafile separator '\t'

#set key box width 2 height 3 opaque
#set key inside bottom center horizontal font "Helvetica, 20" width 1.8
set key horizontal maxrows 1

set xtics rotate by 90 right font "Verdana, 12" 

set ylabel ("# of Graphs") font "Verdana, 12"  offset 3,0
set yrange [0:30]
set ytics 6

#set title "Effectiveness"
#set xlabel "# Of \n Dependencies"
plot for [i=1:14] 'data.txt' using (i):i notitle, \