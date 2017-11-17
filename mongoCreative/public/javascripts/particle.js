class Particle{
  constructor(x,y,color,size,child,gravity, xAcc){
    this.id= null;
    this.relation=child||'Parent'
    this.r=size||2;
    this.x=x//+ this.random(100);
    this.y=y;
    //this.sound = document.getElementById("audio"+Math.floor(Math.random() * 6).toString());
    //console.log()
    this.color=color;
    this.acc=gravity||document.getElementById("gravitySlide").value;
    this.xAcc=xAcc||document.getElementById("horrizontalSlide").value;
    this.velY=this.random(10);
    this.velX= this.random(10)
    this.mass= 1;
    this.opacity=1;
    this.canvas=null;
    this.p=[]
    this.sensitivity =5;


    //this.color = 'rgb(' + Math.floor(Math.random() * 256).toString() + ',' + Math.floor(Math.random() * 256).toString() + ',' + Math.floor(Math.random() * 256).toString() +')'
  }
  random(a,bool){
    var r= Math.floor(Math.random() * 2)
    var b=false||bool
    //console.log(r)
    if(r==1 ){
      return Math.floor(Math.random() * a)+1
    }
    else {
      return -Math.floor(Math.random() * a)-1
    }
  }

  move(){

      this.y+=this.velY;
      this.x+=this.velX;

  }
  fadeOut(){
    if(this.relation== "child"){
      if(this.opacity >0){
        this.opacity-=.05;
      }
      //console.log(this.opacity)
    }
    else{
      for (let particle of this.p){
        if(particle.opacity <=0){
          this.p.splice(particle,1)
        }
      }
    }
  }

  edges(){

    if (this.y+this.r>700){
      this.y=700 -this.r;
      //this.velX=0;

      this.velY*=-.8;
      this.velX*=.9
      if(this.relation != "child"){
        var i=0;
        if(this.velY>this.sensitivity || this.velY<-this.sensitivity){
          while(i<5){
            let gB=0
            let color=document.getElementById("colorBottom").value
            let collision =document.getElementById("collisionSlide").value
            this.p.push(new Particle(this.x,this.y,color,Math.floor(Math.random() * 3), "child",(parseInt(collision)+this.velY)));
            i++;
          }
          //this.sound.cloneNode(true).play()
        }
        //console.log(this.p.length)
      }


      //this.p[this.p.length-1].draw(this.canvas)

      //this.velY =0;
    }
    else if(this.y+this.r <0){
      this.velY *=-.8;
      this.y=0;
      if(this.relation != "child"){
        var i=0;
        if(this.velY>this.sensitivity || this.velY<-this.sensitivity){
          while(i<5){
            let gB=0
            let color=document.getElementById("colorTop").value
            let collision =document.getElementById("collisionSlide").value

            this.p.push(new Particle(this.x,this.y,color,Math.floor(Math.random() * 3), "child",(-(parseInt(collision))-this.velY)));
            i++;
          }
          //this.sound.cloneNode(true).play()
        }
        //console.log(this.p.length)
      }

    }
    else if(this.x < this.r){
      this.velX *=-.80;
      this.x=this.r;
      if(this.relation != "child"){
        var i=0;
        if(this.velX>this.sensitivity || this.velX<-this.sensitivity){
          while(i<5){
            let gB=0
            let color=document.getElementById("colorLeft").value
            let collision =document.getElementById("collisionSlide").value

            this.p.push(new Particle(this.x,this.y,color,Math.floor(Math.random() * 3), "child",0,(-(parseInt(collision))-this.velX)));
            i++;
          }
          //this.sound.cloneNode(true).play()
        }
        //console.log(this.p.length)
      }

    }
    else if(this.x + this.r > 700){
      this.velX *=-.80;
      this.x=700 -this.r
      if(this.relation != "child"){
        var i=0;
        if(this.velX>this.sensitivity || this.velX<-this.sensitivity){
          while(i<5){
            let gB=0
            let color=document.getElementById("colorRight").value
            let collision =document.getElementById("collisionSlide").value

            this.p.push(new Particle(this.x,this.y,color,Math.floor(Math.random() * 3), "child",0,(parseInt(collision)+this.velX)));
            i++;
          }
          //this.sound.cloneNode(true).play()
        }
        //console.log(this.p.length)
      }

    }
    else{
      this.velY+=(.04*this.acc)
      this.velX+=(.04*this.xAcc);

    }
  }



  draw(ctx){
    this.canvas=ctx;

    this.edges();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle=this.color;
    this.move()
    ctx.fillStyle=this.color;
    ctx.fill()
    ctx.stroke();
    ctx.globalAlpha =1;
    this.fadeOut();
    if(this.relation !="child"){
      this.acc=document.getElementById("gravitySlide").value;
      this.xAcc=document.getElementById("horrizontalSlide").value;
    }

    if(this.p.length >1){
      for(let particle of this.p){
        particle.draw(this.canvas)
      }
    }
    this.sound = document.getElementById("audio"+Math.floor(Math.random() * 6).toString());

  }


}
