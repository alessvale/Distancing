var system;
var time = 0;
var svg;
var tot_s = 0;
var data = [];
var line;
var linea;
var num = 600;
var max_time = 300;
var n = 20;
var deaths = 0;


function preload(){
svg = d3.select("#curve").style("background-color", "#e6edf7");
svg.append("circle").attr("cx", 300).attr("cy", 20).attr("r", 5).attr("fill", "#0099CC");
svg.append("text").attr("x", 310).attr("y", 25).text("Infected").style("font-size", "60%");
svg.append("circle").attr("cx", 300).attr("cy", 40).attr("r", 5).attr("fill", "#ffc266");
svg.append("text").attr("x", 310).attr("y", 45).text("Immune").style("font-size", "60%");
svg.append("circle").attr("cx", 300).attr("cy", 60).attr("r", 5).attr("fill", "black");
svg.append("text").attr("x", 310).attr("y", 65).text("Dead").style("font-size", "60%");

  }


function setup() {
  createCanvas(800, 600);
  background(255);

  d3.select("#mySlider").attr("value", n);
  system = new System(num);
  system.generate(n);

  var xscale = d3.scaleLinear().domain([0, max_time]).range([0, 500]);
  var yscale = d3.scaleLinear().domain([0, num]).range([80, 0]);

  line = d3.line().x(d => xscale(d[0])).y(d => yscale(d[1])).curve(d3.curveBasis);

  linea = d3.select("svg").append("path").datum(data)
  .style("fill", "none")
  .style("stroke", "#0099CC")
  .style("opacity", 1.0)
  .style("stroke-width", 3.6)
  .attr("d", line(data))
  .attr("transform", "translate(0 50)");

  d3.select("#mySlider").on("change", function(d){
      var selectedValue = this.value;
      reset(selectedValue);
    });
}

function reset(val){
  data = [];
  time = 0;
  system.generate(int(val));
}

function draw() {
  background(255);
  system.show();

  if (system.alive()){
    system.run();
    deaths = system.checkDeaths();
  }

  if (time < max_time){
    time += 0.1;
  }
  tot_s = system.getSick();
  d3.select("#time").text(round(time))
  d3.select("#infected").text(round(tot_s));
  d3.select("#deaths").text(deaths);
  data.push([time, tot_s]);
  updateLine(data);

}


function updateLine(data){
   linea.transition().duration(3000).attr("d", line(data));
}
