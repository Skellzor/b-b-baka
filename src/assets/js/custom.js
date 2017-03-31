$(document).foundation();


var $scriptScrolling = false; //
var $animation_elements = $('.animation-element');//for slide in effect when object on screen
var $window = $(window);//used in check_if_in_view

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) 
    {

      		$element.addClass('in-view');
    } 
    else 
    {
      $element.removeClass('in-view');
    }
  });
  console.log("Scrolling");
}


function goToElement(elementID){
	
	var scrollY = 0;//intermed position to move to
	var distance = 30;//pixels to move at once
	var speed = 10; //delay in ms
	
	var decelStart = 100;
	var snapDist = 40;
	
	var currentY = window.pageYOffset;//current y location
	var targetY = document.getElementById(elementID).offsetTop;//y location of target element
	var bodyHeight = document.body.offsetHeight;//total height of page
	var yPos = currentY + window.innerHeight;
	
	if(currentY > targetY - decelStart - snapDist && currentY < targetY - snapDist)//decelerate speed close to target
		{
			speed = 20;
			distance = targetY / currentY * 0.1 * distance;
			scrollY = currentY+distance;
		  window.scroll(0, scrollY);
		}
	else if(currentY >= targetY - snapDist && currentY <= targetY - snapDist)//snap to speed at last
		{
			speed = 1;
			distance = snapDist;
			scrollY =  currentY + distance ;
			window.scroll(0, scrollY);
		}
	
	
	var animator = setTimeout('goToElement(\''+elementID+'\')',speed);
	
	if(yPos > bodyHeight){//stop animating if bottom page reached
		clearTimeout(animator);
	} else {
		if(currentY < targetY-distance)//initial speed
		{
		  scrollY = currentY+distance;
		  window.scroll(0, scrollY);
	  }
		
		else
		{
		  clearTimeout(animator);
	  }
	}
	
}


$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');


var stopDelay = false;

$("#dicksOut").hover(
        function()
        {
        	stopDelay = true;

            $(this).attr("src", "assets/img/test_ani.gif");
            $(this).attr("alt", "Harambe");

           	var stopper = setTimeout('checkForStop()', 2000); //SET THE 2 SECOND DELAY FIRST. THEN CHECK IF THE ANIMATION NEEDS TO BE STOPPED
            
           	console.log(stopDelay.toString());
        },
        function()
        {
            $(this).attr("src", "assets/img/test_static.jpg");
            $(this).attr("alt", "returned");

            stopDelay = false;
        }                         
    );  

function checkForStop(){
	console.log(stopDelay.toString() + "Check stop");
	if(stopDelay == true){
		$("#dicksOut").attr("src", "assets/img/insideJob.jpg");
	    $(this).attr("alt", "returned");

	    stopDelay = false;
	}

	
}

function aniStopper(){
	$("#dicksOut").attr("src", "assets/img/test_static.jpg");
	stopDelay = false;
}


$(".portfolioItem").hover(

);


