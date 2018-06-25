//mycode.js

// This is the bar chart helper application which will implement the charting function
// format :  drawChart( list, options, element)  where :
//    List - array of numbers to be plotted
//    options - width and height
//    element - name of element onto which chart must be located.



var draw2 = function (list , dim, someword)
{  // List : list of values to plot
   // dim: width and height values in format (x:1; y:1)
   // someword : the element onto which the canvas is targeted.

  var xPadding = 30;
  var yPadding = 10;
  var xSpacing = 15;
  /*var options ={
    xAxisLabels :["First","Second","Third","Fourth","Fifth"];
    fillcolors  : ["#ccc5de","#58b6c5", "#ceef5d","#ac8447"];
  };*/


  //if hasOwnProperty
  var canvas = document.getElementById(someword);
  canvas.width = dim.width;
  canvas.height = dim.height;
  adjustWidth = list.length * (xPadding+xSpacing);
  if (adjustWidth >= canvas.width) {
    canvas.width = adjustWidth;
    xSpacing = 5;
  }
  var context = canvas.getContext("2d");
  context.beginPath();          // set line color and width
  context.strokeStyle = "black";
  context.fillStyle = "#FF0000";
  context.lineWidth = 4;

  var x_AxisWidth = canvas.width - xPadding ;
  var y_AxisWidth = canvas.height - yPadding;
  //var yMax = y_AxisWidth;
  // alert ("Y axis width : " + canvas.width);

  // find the maximum value in list
  var listMax = list.reduce((max, item) => max > item ? max : item,list[0]);
  alert("largest numb: " + listMax);
  var scale = (listMax >= 50) ? 2.5 : 5;
  // setup some of the needed vars


  // Draw the axes for the graph
  context.moveTo( xPadding, yPadding );
  context.lineTo( xPadding,y_AxisWidth);
  context.lineTo(x_AxisWidth,y_AxisWidth);
  //context.lineTo( x_AxisWidth, y_AxisWidth );
  context.stroke();
  var endY = y_AxisWidth;
  //  Plot the charts using the values given
  var spacing = 10; barwidth = 10;
  var yMax = y_AxisWidth ;
  var startX = xPadding+spacing ;
  var endX = startX + xSpacing;
  // Draw  the bars for the graph
  for (var i=0; i < list.length; i++){
    var ratio = list[i] / listMax;
    var yDiff = Math.round(list[i]/ratio) * scale;
    var h = list[i] * scale;
    //alert("yDiff :" + yDiff);
    startY = y_AxisWidth - yDiff;
    //if (i <=1){
    //  alert("ratio: "+ ratio + "startX: "+startX + "startY: "+startY);
    //  alert("endX: "+ endX + "endY: "+endY);
    //}
    //alert("startx :" +startX );
    // set fill color and plot bar
    context.fillStyle = "red";
    context.fillRect(startX, y_AxisWidth-h-1,xSpacing,h-1 );
    // set fill color and chnge label color
    context.fillStyle = "black";
    context.fillText("Val"+i,startX+spacing/2,y_AxisWidth+spacing);

    context.fillText(list[i],startX+(spacing/2),y_AxisWidth-h-2,);

    //context.fillRect(0, startY,60, y_AxisWidth);
    startX = endX + xSpacing;
    endX = startX + xSpacing;
  }


  var plotLabels = function (xpos,ypos, arr,contxt)
  {  // uses the list information to draw the bars onto the canvas
    //

  }


}

function helloWorld(aword){
    document.write("Hello World, my name is "+ aword);
  //drawStuff();
  }

jQuery(document).ready(function() {

//draw2("canvasdiv");
  // get the canvas
  //var canvas = document.getElementByID("canvas");
  // or create canvas by code  as below

  //canvas = document.createElement("canvas");
  //document.body.appendChild(canvas);

  //function drawChart(){
  // initialize the canvas for the chart


  //}

});  // end document ready

