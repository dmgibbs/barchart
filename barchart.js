//mycode.js

// This is the bar chart helper application which will implement the charting function
// format :  drawChart( list, options, element)  where :
//    List - array of numbers to be plotted
//    options - width and height
//    element - name of element onto which chart must be located.
 var doChartLabels = function (x,y ,lab, contxt ){
    //
      //alert("recurring value: "+this.recurring)
      contxt.fillText(lab.x, x/2, y+20);
      contxt.fillText(lab.y,5 , 50);              // write the Y axis label stuff
      //contxt.stroke();
}

var draw2 = function (list , dim, someword)
{  // List : list of values to plot
   // dim: width and height values in format (x:1; y:1)
   // someword : the element onto which the canvas is targeted.

  var   xPadding    = 40;
  var   yPadding    = 30;
  var   xSpacing    = 20;
  var   bartxtpos  ;
  var   barfillcolor= "red";
  var   labeltxtcolor = "black";
  var   recurring  = "ABC";

  /*var options ={
    xAxisLabels :["First","Second","Third","Fourth","Fifth"];
    fillcolors  : ["#ccc5de","#58b6c5", "#ceef5d","#ac8447"];
  };*/


  //if hasOwnProperty
  var canvas = document.getElementById(someword);
  var context = canvas.getContext("2d");
  canvas.width = dim.width;
  canvas.height = dim.height;
  adjustWidth = list.length * (xPadding+xSpacing);
  if (adjustWidth >= canvas.width) {
    canvas.width = adjustWidth;
    xSpacing = xPadding/2;
  }
  //var context = canvas.getContext("2d");
  context.strokeStyle = "black";
  context.fillStyle = "#FF0000";
  context.lineWidth = 2;

  var x_AxisWidth = canvas.width - xPadding ;
  var y_AxisWidth = canvas.height - yPadding;

  // find the maximum value in list
  var listMax = list.reduce((max, item) => max > item ? max : item,list[0]);
  alert("largest numb: " + listMax);
  var scale = (listMax >= 50  && listMax <= 300) ? 1 : 3.5;
  //  var scale = 1;
  // setup some of the needed vars

  // Draw the axes for the graph
  context.beginPath();          // set line color and width
  context.moveTo( xPadding, yPadding );
  context.lineTo( xPadding,y_AxisWidth);
  context.lineTo(x_AxisWidth,y_AxisWidth);
  //context.lineTo( x_AxisWidth, y_AxisWidth );
  context.stroke();
  var endY = y_AxisWidth;
  //  Plot the charts using the values given
  var spacing = 10; barwidth = 30;
  var yMax = y_AxisWidth ;
  var startX = xPadding+spacing ;
  var endX = startX + xSpacing;
  // Draw  the Y Axis Ticks for the graph
  plotYTicks(list,startX,yMax, context);
  var n = {x:"X Axis" ,y:"Y Axis"};
  doChartLabels(x_AxisWidth,y_AxisWidth,n,context);
  for (var i=0; i < list.length; i++){
    var ratio = list[i] / listMax;
    var yDiff = Math.round(list[i]/ratio) * scale;
    var h = list[i] * scale;
    //alert("yDiff :" + yDiff);
    startY = y_AxisWidth - yDiff;

    context.fillStyle = "red";
    context.fillRect(startX, y_AxisWidth-h-1,barwidth,h-1 );
    // set fill color and chnge label color
    context.fillStyle = "black";
    // Paint the label text
    context.fillText("Val"+i,startX+spacing/2,y_AxisWidth+spacing);

    // paint the value of the bar itself
    context.fillText(list[i],startX+(spacing/2),y_AxisWidth-h-2,);

    //context.fillRect(0, startY,60, y_AxisWidth);
    startX = endX + xSpacing;
    endX = startX + xSpacing;
  }  // end for
}
  var plotYTicks = function (list,x,y,contxt)
  {  // uses the list information to draw the bars onto the canvas
    // draw 6 ticks for the Y axis at position X
    //
    //var start  = max;
    var max = list.reduce((max, item) => max > item ? max : item,list[0]);
    var incVal = max / 6;
    var scale = (max >= 50  && max <= 300) ? 1 : 3.5;
    var stx = Math.round(incVal);
    var yVal = y - (incVal*scale) ;  //contxt.height - this.y_Padding;
    for (i= 0; i < 6; i++ ) {
      contxt.lineWidth = 1;
      contxt.beginPath();
      contxt.fillText(stx,x-25,yVal);
      contxt.moveTo(x-10, yVal);
      contxt.lineTo(x-6, yVal);
      yVal = yVal - incVal * scale;
      stx = Math.round(stx + incVal);
      contxt.stroke();
    }
  }


function helloWorld(aword){
    document.write("Hello World, my name is "+ aword);
  //drawStuff();
  }

jQuery(document).ready(function() {



  //}

});  // end document ready

