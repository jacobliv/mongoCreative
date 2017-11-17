

$(document).ready(function(){



var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player1=[];
var randomH=false;
var randomV=false;
var randomC=false;
var randomCol=false;
var dataURL;

var mouseX;
var trails=false;
var mouseY;
var mouseDown=false;
$("canvas").mousedown(function(e){
  mouseDown=true;
  mouseX=e.clientX
  mouseY=e.clientY
})
$("canvas").mousemove(function(e){
  mouseX=e.clientX
  mouseY=e.clientY
})
$("canvas").mouseup(function(e){
  mouseDown=false;

})
var lastcolor;
function draw(){


  var x = document.getElementById("color").value;
  if(mouseDown==true){
    var rect = canvas.getBoundingClientRect();
    var i=0;
    while(i<1){
     player1.push(new Particle(mouseX-rect.left,mouseY-rect.top,x));
     i++;
   }
  }
  var collision=document.getElementById("collisionSlide").value;
  document.getElementById("collisionVal").innerHTML="Collision: " +collision;


  var gravity=document.getElementById("gravitySlide").value;
  document.getElementById("gravityVal").innerHTML="Gravity: " +gravity;
  var horrizontal=document.getElementById("horrizontalSlide").value;
    document.getElementById("horrizontalVal").innerHTML="Horrizontal Force: " +horrizontal;
  if(!trails){
    ctx.fillStyle=$("#colorBackground").val();
    ctx.fillRect(0,0,700,700);
  }

  if(player1.length>0){

    for(var i=0; i<player1.length;i++){

      player1[i].draw(ctx,player1);
      if(player1.length > 50){
        player1.splice(i,1)
      }

    }
  }




  window.requestAnimationFrame(draw);
}



$("#trails").click(function(e){
  if(trails ==false){
    trails=true;
  }
  else{
    trails=false;
  }
})

$("#clear").click(function(e){

  ctx.fillStyle=$('#colorBackground').val();
  ctx.fillRect(0,0,700,700)

})

$("#reset").click(function(e){
  player1.splice(0,player1.length)

})

$("#horrizontalButton").click(function(e){
  if(randomH){
    $("#horrizontalSlide").val(Math.floor(Math.random() * 20))
    randomH=false;
  }
  else{
    $("#horrizontalSlide").val(-Math.floor(Math.random() * 20))
    randomH=true;
  }

})

$("#verticalButton").click(function(e){
  if(randomV){
    $("#gravitySlide").val(Math.floor(Math.random() * 20))
    randomV=false;
  }
  else{
    $("#gravitySlide").val(-Math.floor(Math.random() * 20))
    randomV=true;
  }

})

$("#collisionButton").click(function(e){
  if(randomC){
    $("#collisionSlide").val(Math.floor(Math.random() * 80))
    randomC=false
  }
  else{
    $("#collisionSlide").val(-Math.floor(Math.random() * 80))
    randomC=true
  }
})

$("#randomizeColors").click(function(e){
  if(randomCol){
    randomCol =false;
    let a=(Math.floor(Math.random() * 9)).toString()
    let b =(Math.floor(Math.random() * 9)).toString()
    let c=(Math.floor(Math.random() * 9)).toString()
    let d=(Math.floor(Math.random() * 9)).toString()
    let e=(Math.floor(Math.random() * 9)).toString()
    let f= (Math.floor(Math.random() * 9)).toString()

    document.getElementById("color").value="#"+a+b+"c"+d+e+f;
    document.getElementById("colorRight").value="#"+f+f+f+f+f+f;
    document.getElementById("colorLeft").value="#"+"f"+b+c+f+e+f;
    document.getElementById("colorTop").value="#"+a+d+d+d+"e"+f;
    document.getElementById("colorBottom").value="#"+f+e+d+c+b+a;
    document.getElementById("colorBackground").value="#"+f+e+a+c+b+a;
  }
  else{
    randomCol=true;
  }
})

$("#snapShot").click(function(e){
  dataURL = canvas.toDataURL();
  $("#download").attr("href",dataURL)
  $("#displayImage").attr("src",dataURL)
  $("#snapShotDiv").toggle("slide")
})
$("#closeSnap").click(function(){

  $("#snapShotDiv").toggle("slide")
})
$("#closeImagePanel").click(function(){

  $("#displayAllImages").toggle("slide")
})

$('#databaseButton').click(function(e){
    e.preventDefault();
  if($("#name").val() == ""){
    return;
  }
  var name = $("#name").val()
  var obj= {
    Name: name,
    Img: dataURL
  }
  //console.log(obj)
  var jobj = JSON.stringify(obj);

  var url = "img"
  $.ajax({
    url:url,
    type: "POST",
    data: jobj,
    contentType: "application/json; charset=utf-8",
    success: function(data,textStatus){
      $("#snapShotDiv").toggle("slide")
    }
  })

})

$("#showAll").click(function(e){
  var url = "img"
  $.ajax({
    url:url,
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(data){

        $("#displayAllImages").toggle("slide")

        var inside="";
        for(var img of data){
          //console.log(img.Name)
          inside='<div class="logo-image"><img src="'+img.Img+'" alt="Placeholder Image" id="images" /><h4 id="names">Name: '+img.Name+'</h4>  <a href="'+img.Img+'"  download><button style="cursor:pointer;">Download Image</button></a></div>'+inside
        }
        $("#imageBox").html(inside)
    }
  })

})
  window.requestAnimationFrame(draw);
})
