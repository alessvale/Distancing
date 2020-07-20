//Ball class

function Ball(pos){
  this.pos = pos;
  this.r = 5;
  this.sick = false;
  this.recovery = int(random(300, 1000)); // Recovery time
  this.recovered = false;
  this.unlocked = false
  this.dead = false;

  this.show = function(){
    //When infected, start a little animation

    if (this.unlocked){
      this.r = 8
      this.unlocked = false;
    }

    if (this.r > 5){
      this.r -= 0.05;
    }
    else{
      this.r = 5

    }

    if (!this.sick){
      fill(color("#d1d1e0"));
    }

    else{
      fill("#0099CC");
    }

    if (this.recovered){
      fill(color("#ffc266"));
    }

    if (this.dead){
      fill(color("black"));
      this.r = 7;
    }
    push();
    translate(this.pos.x, this.pos.y);
    //stroke(color("#66CCFF"));
    noStroke();
    strokeWeight(2);
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }

  this.isRecovered = function(){
    if (this.recovery > 0) {
      this.recovery -=1;
    }
    else{
     this.recovered = true;
     this.unlocked = true;}

    return this.recovered;
  }

}
