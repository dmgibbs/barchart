//bc.js

/* class graph{
  this.chartTitle;
  this.fontsize;
  this.fontcolor;

}
*/
class BarChart {
  constructor (list,dim,itemId) {
    this.bkgrndcolor  = "red";
    this.data         = list;
    this.width        = dim.x;
    this.height       = dim.y;
    this.itemId       = itemId;

    this.barColor     = "red";
    this.barwidth     = 30;
    this.list         = list;
    this.txtPosition  = "bottom"; // display text at top of bar
    this.Spacing      = 20;
    this.txtColor     = "black";
    this.xPadding     = 40;
    this.yPadding     = 30;
    this.xTitle       = "(X)"
    this.yTitle       ="(Y)"

  }

  setupXY_Axes(){
    var canvas        = document.getElementById(this.itemId);
    var ctx           = canvas.getContext("2d");
    canvas.height     = this.height;
    canvas.width      = this.width;
    this.x_AxisWidth  = canvas.width - this.xPadding ;
    this.y_AxisWidth  = canvas.height - this.yPadding;

    // alert("got here");
    ctx.strokeStyle = this.txtColor;
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = 2;
    ctx.beginPath();          // set line color and width
    ctx.moveTo( this.xPadding, this.yPadding );
    ctx.lineTo( this.xPadding,this.y_AxisWidth);
    ctx.lineTo(this.x_AxisWidth,this.y_AxisWidth);
    ctx.stroke();
  }

  doChartLabels (){

    var x             = this.x_AxisWidth;
    var y             = this.y_AxisWidth;
    var canvas        = document.getElementById(this.itemId);
    var ctx           = canvas.getContext("2d");
    ctx.fillText(this.xTitle, x/2, y+20);
    ctx.fillText(this.yTitle,5 , 50);              // write the Y axis label stuff

  }
/*----------------------------------------------------*/

  plotYTicks (list,x1,y,ct)  { // uses the list information to draw the bars onto the canvas
    // draw 6 ticks for the Y axis at position X

    var canvas        = document.getElementById(this.itemId);
    var contxt        = canvas.getContext("2d");
    var lnWidth       = 3;
    var x             = this.xPadding;

    var max = this.getMax(this.list);
    var incVal = max / 6;
    var scale = (max >= 50  && max <= 300) ? 1 : 3.5;
    var stx = Math.round(incVal);
    var yVal = this.y_AxisWidth - (incVal*scale) ;  //contxt.height - this.y_Padding;

    // Draw the tick points along the y - axis line
    for (var i= 0; i < 6; i++ ) {
      contxt.lineWidth = 1;
      contxt.beginPath();
      contxt.fillText(stx,x-(this.Spacing),yVal);
      contxt.moveTo(x-lnWidth, yVal);
      contxt.lineTo(x+lnWidth, yVal);
      yVal = yVal - incVal * scale;
      stx = Math.round(stx + incVal);
      contxt.stroke();
    }
  } // end the function

/*----------------------------------------------------*/
  setBarColor (theColor){
    this.barColor = theColor;
    console.log ("bar color:", theColor);
  }

  draw (){
    console.log(" in draw fxn");
    console.log("background color: " + this.bkgrndcolor);
    this.setupXY_Axes();
    this.doChartLabels();
    this.plotYTicks(this.list,this.xPadding,this.y_AxisWidth,this.itemId);
    console.log(isMulti([[1,2,4,5,6], [2,3,4]]));
    this.showBars();
  };

  showBars(){
  // Show the bars for the data for the graph.
    var canvas        = document.getElementById(this.itemId);
    var context       = canvas.getContext("2d");
    var listMax       = this.getMax(this.list);
    var startX        = this.xPadding+ this.Spacing ;
    var endX          = startX + this.Spacing;
    var ratio = 0;  var yDiff = 0; var h = 0; var startY = 0;
    var scale = (listMax >= 50  && listMax <= 300) ? 1 : 3.5;

    var offset = 0;
    if (this.txtPosition ==="top")
      offset = 0;
    else if (this.txtPosition ==="center")
      offset = 40 ;
    else if  (this.txtPosition ==="bottom")
      offset =  Math.round(this.y_AxisWidth/2) - this.yPadding;

    for (var i=0; i < this.list.length; i++){

      ratio = this.list[i] / listMax;
      yDiff = Math.round(this.list[i]/ratio) * scale;
      h = this.list[i] * scale;
      startY = this.y_AxisWidth - yDiff;

      context.fillStyle = "red";
      context.fillRect(startX, this.y_AxisWidth-h-1,this.barwidth,h-1 );
      context.fillStyle = "black";
      // Paint the label text
      context.fillText("Val"+i,startX+this.Spacing/2,this.y_AxisWidth+(this.Spacing/2));
      // paint the value of the bar itself
      var where = this.getOffset(h); // get
      context.fillText(this.list[i],startX+(this.Spacing/2),where);

      startX = endX + this.Spacing;
      endX = startX + this.Spacing;
    }  // end for
  }

  getMax(list){

    if (isMulti(this.list)){
      var temp =list.flat();
      alert (" we got multi values !!")
      var max = temp.reduce((max, item) => max > item ? max : item,temp[0]);
    }
    else  // since the list is not a multidimensional array
      var max = list.reduce((max, item) => max > item ? max : item,list[0]);
    return max;
  }

  getOffset(h){
    var offset =0;
    var  pad = 5;

    if (this.txtPosition ==="top")
      offset = this.y_AxisWidth-h-2 ;
    else if (this.txtPosition ==="center")
      offset = Math.round(this.y_AxisWidth - h/2) ;
    else if  (this.txtPosition ==="bottom")
      offset = this.y_AxisWidth - pad ;

    return offset;
  }


  update () {
    console.log("in update routine..");
  }
   // end  function declaration  , et



};  //


function isMulti(list){
// checks for multidimensionality of an array & returns true
// otherwise if list is not array of arrys, returns false;

  var a = list.length;
  var found = false;

  for (var i=0; i < a; i++){
    if (Array.isArray(list[i])){
      found = true;
      break;
    }
  }
  return found;
} // end function isMulti Array

