//System class

function System(num){
  var prob = 0.004;
  var min_dist = 60;
  this.num = num;
  this.healthy = [];
  this.sick_people = [];
  this.recovered = [];
  this.deaths = [];

  //Useful to deal with margins

  this.margin = {
    left: 40,
    right: 40,
    top: 40,
    bottom: 40}

//Generates a new arrangment of Ball objects

this.generate = function(input){
  this.healthy = [];
  this.sick_people = [];
  this.deaths = [];
  this.recovered = [];


  var pos = new p5.Vector(random(this.margin.left, width - this.margin.right), random(this.margin.top, height - this.margin.bottom));
  console.log(pos);
  this.healthy.push(new Ball(pos));
  console.log(this.healthy);

  for (var i = 0; i < this.num; i++){
      var found = false;
      var count = 0;
      var pos;

      //Find a position so that the ball does not overlap with any other ball

      while(!found && (count<100)){
         pos = new p5.Vector(random(this.margin.left, width - this.margin.right), random(this.margin.top, height - this.margin.bottom));
         var exit = 1; //Keep track of final found value to avoid a break statement

         for (var j = 0; j < this.healthy.length; j++){
           var q = this.healthy[j];
           var tmp;

           if (dist(pos.x, pos.y, q.pos.x, q.pos.y) > q.rad + q.rad + input ){
              tmp = 1 ;
           }
           else {
            tmp = 0
                }
           exit = exit * tmp;

     };
        if (exit == 1) {found = true;}
        count += 1;
   }
     if(found){
     this.healthy.push(new Ball(pos, this.healthy));
  }
}

//Mark a ball as sick
var index = int(random(0, this.healthy.length));
var p = this.healthy[index];
this.healthy.splice(index,1);
p.sick = true;
this.sick_people.push(p);
}

this.show = function(){

  this.healthy.forEach(p => p.show());
  this.sick_people.forEach(p => p.show());
  this.recovered.forEach(p => p.show());
  this.deaths.forEach(p => p.show());

}

//Some helper functions

this.getHealthy= function(){
  return this.healthy.length + this.recovered.length;
}

this.getSick = function(){
  return this.sick_people.length;
}

//Run the System

this.run = function(){
  var toAdd = [];

   for (var i = 0; i < this.healthy.length; i++){
     var p = this.healthy[i];
     var rem = false; //Take track of balls which get sick

     for (var j = 0; j < this.sick_people.length; j++){
       var q = this.sick_people[j];
       var d = dist(p.pos.x, p.pos.y, q.pos.x, q.pos.y);
       if (d < min_dist){

       if ( random(0,1) < prob ){
         rem = true
       }
     }}

       if (rem) {
         this.healthy[i].sick = true;
         this.healthy[i].unlocked = true;
       }
}

    for (var i = this.healthy.length - 1; i>=0; i-- ){
      var p = this.healthy[i];
      if (p.sick){
       this.healthy.splice(i,1);
       this.sick_people.push(p);
       }
   }
     for (var i = this.sick_people.length - 1; i>=0; i-- ){
       var p = this.sick_people[i];
       if (p.isRecovered()){
         this.sick_people.splice(i, 1);
         p.unlocked = true;
         this.recovered.push(p);
       }
}

}

this.checkDeaths = function(){
  var tot = this.sick_people.length;
  var toRemove = [];
  for (var i = tot - 1; i>=0; i--){
    var p = this.sick_people[i];
    if (random(0,1) < tot * 0.0000005){
      toRemove.push(i);
      p.dead = true;
      this.deaths.push(p);
    }
  }

for (var i = 0 ; i < toRemove.length; i++ ){
  var index = toRemove[i];
  this.sick_people.splice(index, 1);
}
return this.deaths.length;
}

//Check if the object ball is still alive

this.alive = function(){
  if (this.sick_people == 0) {
    return false
  }
  else{
    return true
  }
}
}
