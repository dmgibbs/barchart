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
      this.width        = dim.x;        // graph width
      this.height       = dim.y;        // dimensions for the graph height
      this.itemId       = itemId;       // this captures the id of the webpage element that represents the graph.
      this.label        = {title:"", x:"",y:""} ;
      this.barColor     = "grey";
      this.barwidth     = 30;
      this.list         = list;   // this list captures the data used for the plotting
      this.txtPosition  = "top"; // display text at top/center/bottom of bar
      this.Spacing      = 20;
      this.txtColor     = "black";
      this.xPadding     = 40;       // just empty spacing for x axis
      this.yPadding     = 30;       // y axis padding
      this.xTitle       = "(X)";    //
      this.yTitle       = "(Y)";
      this.colorwheel   = ""; //["red","grey","purple","blue","green","brown","yellow"];
    }

/*--------------------------------------------------------------------------------*/
    setColorWheel(colorList)
    { // just a method which can be used to capture / set the list of colors for the bars
      this.colorwheel = colorList;
    }

/*--------------------------------------------------------------------------------*/
    setupXY_Axes(){
      var canvas            = document.getElementById(this.itemId);
      var ctx               = canvas.getContext("2d");
      canvas.height         = this.height;
      canvas.width          = this.width;
      this.x_AxisWidth      = canvas.width - this.xPadding ;
      this.y_AxisLength     = canvas.height - this.yPadding;

      this.max              = (isMulti(this.list)) ? this.getMaxTotal(this.list): getMax();
      if (this.max< 1 )
        this.scale = 1;
      else
        this.scale          =   Math.round(this.y_AxisLength /this.max) -2;

      ctx.strokeStyle       = this.barColor;
      ctx.fillStyle         = this.txtColor;
      ctx.lineWidth         = 1;
      ctx.beginPath();          // set line color and width
      ctx.moveTo( this.xPadding, this.yPadding );
      ctx.lineTo( this.xPadding,this.y_AxisLength);
      ctx.lineTo( this.x_AxisWidth,this.y_AxisLength);
      ctx.stroke();
    }
/*--------------------------------------------------------------------------------*/
    doChartLabels (){

      var x             = this.x_AxisWidth;
      var y             = this.y_AxisLength;
      var textx         = Math.round(this.x_AxisWidth - this.label.title.length)/2;
      textx             = Math.round(textx);

      var canvas        = document.getElementById(this.itemId);
      var ctx           = canvas.getContext("2d");
      ctx.fillText(this.xTitle, x- this.xPadding , y+this.Spacing);
      ctx.fillText(this.label.y,1 , this.y_AxisLength/2 - this.Spacing);
      ctx.fillText(this.yTitle,2 , 50);              // write the Y axis label stuff
      ctx.fillText(this.label.title,textx,this.yPadding);
    }
/*--------------------------------------------------------------------------------*/
    plotYTicks (list,x1,y,ct)  { // uses the list information to draw the bars onto the canvas
      // draw 6 ticks for the Y axis at position X

      var canvas        = document.getElementById(this.itemId);
      var contxt        = canvas.getContext("2d");
      var lnWidth       = 3;
      var x             = this.xPadding;

      var max           = this.getMax();

      var incVal        = max / 7;                                    // we want spacing of about 6 ticks.

      var stx           = Math.round(incVal);
      var yVal          = this.y_AxisLength - (incVal*this.scale) ;  //contxt.height - this.y_Padding;
      contxt.fillStyle  = this.txtColor;
      // Draw the tick points along the y - axis line
      for (var i= 0; i < 6; i++ ) {
        contxt.lineWidth  = 1;
        contxt.beginPath();
        contxt.fillText(stx,x-(this.Spacing),yVal);
        contxt.moveTo(x-lnWidth, yVal);
        contxt.lineTo(x+lnWidth, yVal);
        yVal              = yVal - incVal * this.scale;
        stx               = Math.round(stx + incVal);
        contxt.stroke();
      }
    } // end the function
  /*-------------------------------------------------------------------------------*/
    plotMTicks(){
      // Show the "ticks" for multibar graphs

      var canvas        = document.getElementById(this.itemId);
      var contxt        = canvas.getContext("2d");
      var lnWidth       = 3;
      var x             = this.xPadding;
      let breaks        = 8;

      var max           = this.getMaxTotal(this.list);
      var ticks         =  Math.round(this.y_AxisLength / breaks);
      var newY          = this.y_AxisLength;
      contxt.fillStyle  = this.txtColor;
      var tickvalue     = 0;
      while (tickvalue <= this.y_AxisLength){
        contxt.beginPath();
        contxt.fillText(tickvalue,x-(this.Spacing),newY);
        contxt.moveTo(x-lnWidth, newY);
        contxt.lineTo(x+lnWidth, newY);
        tickvalue = tickvalue + ticks;
        newY      = newY - ticks;
        contxt.stroke();
      }
    }
  /*-------------------------------------------------------------------------------*/


  /*-------------------------------------------------------------------------------*/
    setBarColor (theColor){
      this.barColor = theColor;
      console.log ("bar color:", theColor);
    }
  /*-------------------------------------------------------------------------------*/
    draw (){

      this.setupXY_Axes();                    // Draw the X and Y axes
      this.doChartLabels();                    // Now show the labels for the graph

      if (isMulti(this.list)) {               // if the dataset was an array of arrays
        this.plotMTicks();                    // show the ticks for this graph type
        this.showMultiBars();                 // Now work out and draw the graph
      }
      else{
        this.plotYTicks(this.list,this.xPadding,this.y_AxisLength,this.itemId);  // draw the ticks for a ingle bar chart
        this.showBars();                                                          // show the bars
      }
    }
  /*-------------------------------------------------------------------------------*/
    showMultiBars()
    {
      var xPosition = this.xPadding+this.Spacing;

      for (var i = 0; i < this.list.length ; i++){
        this.eachBar(xPosition, this.y_AxisLength , this.list[i]);
        xPosition+= this.Spacing+this.barwidth;
      }
      this.showChartLabels();
    }
  /*-------------------------------------------------------------------------------*/
    showBars(){
    // Show the bars for the data for the graph.
      var canvas        = document.getElementById(this.itemId);
      var context       = canvas.getContext("2d");
      var listMax       = this.getMax(this.list);
      var startX        = this.xPadding+ this.Spacing ;
      var endX          = startX + this.Spacing;
      var ratio = 0;  var yDiff = 0; var h = 0; var startY = 0;

      for (var i=0; i < this.list.length; i++){

        ratio = this.list[i] / listMax;
        yDiff = Math.round(this.list[i]/ratio) * this.scale;
        h = this.list[i] * this.scale ;
        startY = this.y_AxisLength - yDiff;

        context.fillStyle = this.barcolor;
        context.fillRect(startX, this.y_AxisLength-h-1,this.barwidth,h-1 );
        context.fillStyle = this.txtColor;
        // Paint the label text
        context.fillText("Val"+i,startX+this.Spacing/2,this.y_AxisLength+(this.Spacing/2));
        // paint the value of the bar itself
        var where = this.getOffset(h); // get position based on whats stored
        context.fillText(this.list[i],startX+(this.Spacing/2),where);

        startX  = endX + this.Spacing;
        endX    = startX + this.Spacing;
      }  // end for
    }
  /*-------------------------------------------------------------------------------*/
    eachBar(xval,yval,dataset)
    {
      // var colorwheel = ["red","grey","purple","blue","green","brown","yellow"];
      var y = yval; var topY; var ratio;
      var height;
      var canvas          = document.getElementById(this.itemId);
      var ctx             = canvas.getContext("2d");
      var scale           = 1;

      var alist = dataset;
      console.log(dataset);
      var total = alist.reduce((max,item) => max +item,0) ;

      topY = yval;

      var lowY = this.y_AxisLength;
      for (var i=0; i < alist.length ; i++) {
        ratio = alist[i]/ total ;
        ctx.fillStyle = this.colorwheel[i];
        topY =  lowY - alist[i];
        ctx.fillRect(xval, topY, this.barwidth,alist[i]);
        var where = this.getMOffset(lowY, topY); // get position based on text position property
        lowY = lowY - alist[i];
      }
      this.showRatios(xval,alist,ctx);
    }
  /*-------------------------------------------------------------------------------*/
    showRatios(xval, list,ctx){
      // paint the labels for each of the bars on the graph
      var tmpfill = ctx.fillStyle;
      var ratio;
      var disp = "";

      ctx.fillStyle = "black";
      var total = list.reduce((max,item) => max +item,0) ;
      //var total = this.getMaxTotal();
      var topY =  this.y_AxisLength - list[i];
      var lowY = this.y_AxisLength ;
      for (var i =0; i < list.length; i++){
        ratio =  Math.round((list [i]/total) * 100);
        disp =  ratio.toString() + "%";
        topY =  lowY - list[i];
        var where = this.getMOffset(list[i],lowY); // get position based on text position property
        ctx.fillText(disp,xval+(this.Spacing/2),where);
        lowY = lowY - list[i];

      }
      ctx.fillStyle = tmpfill;
    }
  /*-------------------------------------------------------------------------------*/
    getMax(){
      var max=0;
      if (isMulti(this.list)){
        var temp = [].concat.apply([], this.list);
         max = temp.reduce((max, item) => max > item ? max : item,temp[0]);
      }
      else  // since the list is not a multidimensional array
         max = list.reduce((max, item) => max > item ? max : item,list[0]);
      return max;
    }
/*-------------------------------------------------------------------------------*/
    getOffset(h){
      // determine where txt for each bargraph should be printed
      var offset =0;
      var  pad = 5;

      if (this.txtPosition ==="top")
        offset = this.y_AxisLength-h-2 ;
      else if (this.txtPosition ==="center")
        offset = Math.round(this.y_AxisLength - h/2) ;   // Y position midway
      else if  (this.txtPosition ==="bottom")
        offset = this.y_AxisLength - pad ;               // y position close to y axis

      return offset;
    }
/*-------------------------------------------------------------------------------*/
    getMOffset(top,bottom){
      // for the multiple bar charts, calculate the location of the text based on option set by user
      var offset = 0;
      var pad = 2;

      if (this.txtPosition ==="top")
        offset = bottom-top-2 ;
      else if (this.txtPosition ==="center")
        offset = Math.round(bottom - top/2) ;   // Y position midway
      else if  (this.txtPosition ==="bottom")
        offset = bottom - pad ;               // y position close to y axis

      return offset;
    }
/*-------------------------------------------------------------------------------*/
    showChartLabels(){
      // THis is the routine for the multibar chart  , to show the label info.

      var canvas        = document.getElementById(this.itemId);
      var ctx           = canvas.getContext("2d");
      var x             = this.xPadding  ;  // centre position of x
      var ytop          =  this.yPadding;
      var h             =  8;
      var distFromBar       = 10;
      var ylow          = this.y_AxisLength + distFromBar;
      var movex         = x + this.Spacing ;
      var ct = 0;

      for (var i = 0;i < this.list[0].length; i++){
        if ((i  >= 3) ) {                             // if the index is 3 , then move down the y positon to write in lower row
          movex = this.xPadding + this.Spacing;       // reset the xposition
          ylow = ylow + 10 ;

        }
        ctx.fillStyle = this.colorwheel[ct];          // get a color from the colorwheel

        ctx.fillRect(movex, ylow ,h,h);            // goto top
        ctx.fillStyle = this.colorwheel[ct];
        ctx.fillStyle = "black";                    // we wanna write text in black please.
        movex = movex + distFromBar;  // move pointer over 10 spaces
        ctx.fillText(this.label.x[i] ,movex, ylow +h );  // write the label for that bar
        ct++;                                            // move down into thw wheel
        //this.label.x[i].length+this.Spacing
        movex = movex +this.label.x[i].length+this.Spacing*3 ;  //move the x position of draw pointer to end of string printed + some extra spaces.

      } // end for loop
    }
/*-------------------------------------------------------------------------------*/
    getLabels(alabels){
      // Store labels for useful graph components
      this.label.x      = alabels.x;
      this.label.y     = alabels.y;
      this.label.title = alabels.title;
    }
/*-------------------------------------------------------------------------------*/
    getMaxTotal(mylist){
      // find the largest array sum from the multidimensional array
      var imax =0;
      //console.log("in max total routine..");
      for (var i = 0; i < mylist.length; i++)
      {
        var tmp = mylist[i].reduce((max, item) => max + item,0);
        if (tmp > imax)
          imax = tmp;
      }
      return imax;
    }
/*-------------------------------------------------------------------------------*/
  }  //  end of class
/*-------------------------------------------------------------------------------*/
  function isMulti(list){
  // checks for multidimensionality of an array & returns true
  // otherwise if list is not array of arrys, returns false;
    var a = list.length;
    var found = false;

    for (var i = 0; i < a; i++){
      if (Array.isArray(list[i])){
        found = true;
        break;
      }
    }
    return found;
  } // end function isMulti Array
