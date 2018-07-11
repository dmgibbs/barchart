**About**
This project aims to satisfy the stretch goal #7.

**Objective**
This module exposes a number of functions which can be called to create bar charts of the single bar type and the multibar type within an HTML document.

Example Screenshots (embedded within the readme as image tags)

![single bar]https://github.com/dmgibbs/barchart/blob/master/singlebar1.png
![single bar] https://github.com/dmgibbs/barchart/blob/master/bardemo2.png
![ 2 charts] https://github.com/dmgibbs/barchart/blob/master/manycharts1.png
![Multibar page]https://github.com/dmgibbs/barchart/blob/master/multibar1.png
![2 bars on page] https://github.com/dmgibbs/barchart/blob/master/multibar2.png

**Assumptions**

1) The user will be using ES6 style object creation.
2) In HTML Script tag, user will create relevant vars to store data to be passed to the API fxns.
See html file
3) Since the function calls/methods are associated with a specific object; function will be made from the variab	les of that object type. (eg. see below mychart.setTxtPosition("center"), mychart.draw() , etc. )

 **Sample Usage**				|	**Brief Explanation**
------------------------------------------------|-------------------------------------------
 mychart =  new BarChart(list,dim, elementname) | create an new instance of the chart object
 mychart.getLabels(alabels);                    | assign some values to it from line 20
 mychart.setColorWheel(colorlist);              | setup a list of colours that can be .
 mychart.draw();			        | draw the barchart

Describe the function and the parameters to each function

BarChart
List - the data for the charts in either a single list format [2,4,5,7,9] or in format of a multidimensional array [ [10,24,33],[12,16,28],[34,22,44]]
dim - object in format {x:somevalue, y:somevalue}  - where x,y are field names for the width and height of the canvas object (both integers)
elementname - name of the html element which will store the canvas object. Expectation is that the function will be supplied with the name of the element on which the graph is drawn

**Usable Functions**

1) **getLabels(Labels)** - function that takes an object *Labels* containing the name/value pairs for the followng:
	title   - title of graph
	x	- label	for x axis data
	y	- label for y axis data

2) **setTxtPosition(where)** - function that sets the parameter for where the data value for that bar should be displayed. "*where*" can be "top", center" or "bottom". Eg. usage setTxtPosition("top")

3) **draw()** - A function which does the following
		paints the axes for the graphs
		paints the labels
		determines using the data set the graph type to be plotted
		plots the points based on the graph type

4) **BarChart(list, dim, elementname)**
*List* - the data for the charts in either a single list format [2,4,5,7,9] or in format of a multidimensional array [ [10,24,33],[12,16,28],[34,22,44]]
*dim* - object in format {x:somevalue, y:somevalue}  - where x,y are field names for the width and height of the canvas object (both integers)
*elementname* - name of the html element which will store the canvas object. Expectation is that the function will be supplied with the name of the element on which the graph is drawn

5) **setColorWheel(colorList)**
   just a method which can be used to capture / set the list of colors for the bars where *colorlist* is an array of colours for bars.
   
   
**Features**
1. Ability to draw multiple bar chart 
1. function will examine the dataset and call right routine to draw stacked vs regular chart 
1. Ability to set title  and labels for graph axes
1. ability to create single bar chart
1. set a range of colours to use to draw bars


**A list of known issues / bugs**

- some options (eg) not properly implemented . eg. setting colour, dynamically setting bar width
- error conditions not properly accounted for.eg. empty data sets, etc.
- limitation of the chart size, does NOT resize properly.
- limitation on the number of data elements for plotting stacked/single bar charts

**A list of features that are on the roadmap but haven't been implemented yet**
- scaling of graph
- ability to load data from csv file as opposed to setting data within HTML doc.
- rewriting some code more efficiently

**A list of** *SOME* **the external resources (tutorials, docs, example code, etc)** 


https://api.jquery.com/ - Learning what jquery is.
https://forum.jquery.com/topic/jquery-passing-a-jquery-object-as-a-function-parameter
https://www.youtube.com/watch?v=VRnQOcVclS8
(Javascript & Jquery Tutorial for Beginners 1-9
https://www.digitalocean.com/community/tutorials/introduction-to-the-dsom
Basic Drawing
https://www.youtube.com/watch?v=N0BNbngr2IY
Drawing multiple thingss
https://www.kirupa.com/canvas/drawing_multiple_things.htm
More Info on drawing
https://www.codecademy.com/en/forum_questions/52296881f10c603e14002347
