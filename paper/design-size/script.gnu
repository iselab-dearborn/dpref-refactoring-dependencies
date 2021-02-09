#set terminal png size 1000, 500
#set output 'out.png'

#set size 1,1
set terminal pdf enhanced size 6,3
set output 'design-size.pdf'

set multiplot layout 1,3

set style fill solid 0.5 border -1
set style boxplot nooutliers
set style data boxplot

set boxwidth  0.5
set pointsize 0.5

unset key
set border 10

# set xtics ( \
#     "After Invalid \n Non-trivial \n Graphs " 1, \
#     "After Valid \n Non-trivial \n Graphs" 2, \
#     "Before Invalid \n Non-trivial \n Graphs"	3, \
#     "Before Valid \n Non-trivial \n Graphs" 4, \
#     "Number Of \n Considered \n Non-trivial \n Graphs" 5, \
# )

set grid

set xtics rotate by 0 offset 0,0

#set bmargin 4

#set ytics 2

#set logscale y; 

set yrange [0:*]
#set yrange [0:*]

set datafile separator '\t'

unset ylabel
#set yrange [0:1]
#set title "Effectiveness"
set xtics ("Community" 1)
plot for [i=1:1] 'comunity.txt' using (i):i notitle, \

unset ylabel
set xtics ("Size" 1)
plot for [i=1:1] 'size.txt' using (i):i notitle, \

unset ylabel
#set yrange [0:1]
#set title "Effectiveness"
set xtics ("# of Classes" 1)
plot for [i=1:1] 'classes.txt' using (i):i notitle, \