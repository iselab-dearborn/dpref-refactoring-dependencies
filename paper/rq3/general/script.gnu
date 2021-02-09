


set terminal pdf enhanced size 3,4
set output 'rq3-general.pdf'

set multiplot layout 2,1

set style fill solid 0.5 border -1
set style boxplot nooutliers
set style data boxplot

set boxwidth  0.5
set pointsize 0.5

set xtics ( \
"" 1, \
"" 2, \
"" 3, \
"" 4, \
"" 5, \
"" 6, \
"" 7, \
"" 8, \
"" 9, \
"" 10, \
"" 11, \
"" 12, \
"" 13, \
"" 14, \
"" 15, \
"" 16, \
"" 17, \
"" 18, \
"" 19, \
"" 20, \
"" 21, \
)

#

#set title "Plot 1"
#unset key
unset title 
set grid
#set ylabel "Rate of Improvement (%)"

set xtics rotate by 90 center offset 0, 14

#set tmargin 5
set rmargin 3



# set xtics ( \
#     "Non-trivial" 1, \
#     "Trivial" 2, \
# )



set style line 1 lc rgb "#C275E6"
set style line 2 lc rgb "#75C8B0"

set datafile separator '\t'

set ytics rotate by 90 center
unset key

set yrange [0:100]

set tmargin 1
set bmargin 5
set lmargin 3
#

set y2label "Trivial Graphs"

#set ylabel "# of Graphs"
plot for [i=1:21] 'data-trivial.txt' using (i):i notitle, \
#

set y2label "Non-trivial Graphs"

set xtics ( \
"Abstraction" 1, \
"Cohesion" 2, \
"Complexity" 3, \
"Composition" 4, \
"Coupling" 5, \
"Design Size" 6, \
"Effectiveness" 7, \
"Encapsulation" 8, \
"Extendibility" 9, \
"Flexibility" 10, \
"Functionality" 11, \
"Hierarchies" 12, \
"Inheritance" 13, \
"Messaging" 14, \
"Polymorphism" 15, \
"Reusability" 16, \
"Standard Cohesion" 17, \
"Standard Complexity" 18, \
"Standard Coupling" 19, \
"TQI" 20, \
"Understandability" 21, \
)
set tmargin 5
set bmargin 1
#set ylabel "# of Graphs"
plot for [i=1:21] 'data-non-trivial.txt' using (i):i notitle

