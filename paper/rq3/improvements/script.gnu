name = "Understandability"

set terminal png size 500, 800
set output name.".png"


#set size 1,1

#set terminal pdf
#set output 'out.pdf'

set style fill solid 0.5 border -1
set style boxplot outliers
set style data boxplot

set title name

set boxwidth  0.5
set pointsize 0.5

#set ytics 0.1
unset key
set border 10

set xtics ( \
    "Non-trivial" 1, \
    "Trivial" 2, \
)

set grid
set ylabel "Rate of Improvement (%)"

set xtics rotate by 0 offset 0,0

set bmargin 4

set logscale y; 

#set yrange [0:*]
set yrange [0:*]

set datafile separator '\t'

plot for [i=1:2] name.'.txt' using (i):i notitle