


set terminal pdf enhanced size 6,3
set output 'rq2-all.pdf'

set multiplot layout 1,5

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

# set tmargin 5
set lmargin 4
set rmargin 0
set bmargin 4

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


set key at 1, 1.25
unset ylabel
#set yrange [0:1]
#set title "Effectiveness"
set xtics ("# of \n Dependencies" 1) font "Verdana, 13" 
plot for [i=1:1] 'data-1.txt' using (i):i notitle, \

set key at 1, 1.25
unset ylabel
set yrange [0: 180]
#set title "Effectiveness"
set xtics ("# of \n  Graphs" 1) font "Verdana, 13" 
plot for [i=1:1] 'data-2.txt' using (i):i notitle, \


set key at 1, 1.25
unset ylabel
#set yrange [0:1]
#set title "Effectiveness"
set xtics ("# of \n Non-Trivial Graphs" 1) font "Verdana, 13" 
plot for [i=1:1] 'data-3.txt' using (i):i notitle, \

set key at 1, 1.25
unset ylabel
#set yrange [0:1]
#set title "Effectiveness"
set xtics ("# of \n Trivial Graphs" 1) font "Verdana, 13" 
plot for [i=1:1] 'data-5.txt' using (i):i notitle, \

# set key at 1, 1.25
# unset ylabel
# #set yrange [0:1]
# #set title "Effectiveness"
# set xlabel "# Of Refactorings \n In Non-trivial \n Graphs"
# plot for [i=1:2] 'data-4.txt' using (i):i notitle, \


set key at 1, 1.25
unset ylabel
set ytics 0.1
set yrange [0:1]
#set title "Effectiveness"
set xtics ("NTR \n" 1) font "Verdana, 13" 
plot for [i=1:1] 'data-6.txt' using (i):i notitle, \

