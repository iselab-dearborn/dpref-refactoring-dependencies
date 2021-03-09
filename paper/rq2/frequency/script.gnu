


set terminal pdf enhanced size 10,2
set output 'rq2-frequency.pdf'

#set multiplot layout 1,6

set style fill solid 0.25 border -1
set style boxplot nooutliers pointtype 6
set style data boxplot


set boxwidth  0.5
set pointsize 0.5

#

#set title "Plot 1"
#unset key
unset title 
set grid
#set ylabel "Rate of Improvement (%)"

set xtics rotate by 0 offset 0,0 font "Verdana, 13" 

# set tmargin 5
#set lmargin 4
set rmargin 0

#set bmargin 

set xtics ( \
    "1" 1, \
    "2" 2, \
    "3" 3, \
    "4" 4, \
    "5" 5, \
    "6" 6, \
    "7" 7, \
    "8" 8, \
    "9" 9, \
    "10" 10, \
    "11" 11, \
    "12" 12, \
    "13" 13, \
    "14" 14, \
    "15" 15, \
    "16" 16, \
    "17" 17, \
    "18" 18, \
    "19" 19, \
    "20" 20, \
    "21" 21, \
    "22" 22, \
    "23" 23, \
    "24" 24, \
    "25" 25, \
    "26" 26, \
    "27" 27, \
    "28" 28, \
    "29" 29, \
    "30" 30, \
    "31+" 31, \
    "32" 32, \
    "33" 33, \
    "34" 34, \
    "35" 35, \
    "36" 36, \
    "37" 37, \
    "38" 38, \
    "39" 39, \
    "40" 40, \
    "41" 41, \
    "42" 42, \
    "43" 43, \
    "44" 44, \
    "45" 45, \
    "46" 46, \
    "47" 47, \
    "48" 48, \
    "49" 49, \
    "50" 50, \
    "50+" 51, \
)

set style line 1 lc rgb "#C275E6"
set style line 2 lc rgb "#75C8B0"

#set yrange [0:*]
#set logscale y

set datafile separator '\t'

#set key box width 2 height 3 opaque
#set key inside bottom center horizontal font "Helvetica, 20" width 1.8
set key horizontal maxrows 1

set xtics rotate by 90 right

set xlabel ("Graph Size") font "Verdana, 13" 
set ylabel ("# of Graphs") font "Verdana, 13" 
set yrange [-2:35]
#set title "Effectiveness"
#set xlabel "# Of \n Dependencies"
set grid
plot for [i=1:31] 'data.txt' using (i):i notitle pointsize 0.05, \