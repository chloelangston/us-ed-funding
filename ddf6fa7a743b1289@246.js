// https://observablehq.com/d/ddf6fa7a743b1289@246
import define1 from "./a33468b95d0b15b0@692.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["states-albers-10m.json",new URL("./files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e",import.meta.url)],["ed_funding.csv",new URL("./files/b3530b8783f9bbef1308a350e8e053f266d81ed4b5b7fca4cf41693176832174d3aed871454caacea8021c0033fdc73b5e8d33b25e6af97d58d0bc6fe28947c1",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# State Choropleth

Unemployment rate by state, July 2019. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables)`
)});
  main.variable(observer("chart")).define("chart", ["d3","legend","color","data","topojson","us","path","format"], function(d3,legend,color,data,topojson,us,path,format)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 975, 610]);

  svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => legend({color, title: data.title, width: 260}));

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      // .attr("fill", d => color(data.get(d.properties.name)))
      .attr("fill", "grey")
      .attr("id", function(d){
        return d.properties.name.split(/\s/).join('');
      })
      .attr("class", "state-path")
      .attr("data-color", function(d){
        return color(data.get(d.properties.name));
      })
      .on("mouseover", function(d){
        return d3.select(this).attr("opacity", "0.5");
      })
      .on("mouseout", function(d){
        return d3.select(this).attr("opacity", "1");
      })
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}
${format(data.get(d.properties.name))}`);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(new Map(d3.csvParse(await FileAttachment("ed_funding.csv").text(), ({name, rate}) => [name, +rate])), {title: "Spending on education per student"})
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleQuantize([6000, 22000], d3.schemeGnBu[8])
)});
  main.variable(observer("path")).define("path", ["d3"], function(d3){return(
d3.geoPath()
)});
  main.variable(observer("format")).define("format", function(){return(
d => `$${d} per student`
)});
  main.variable(observer("us")).define("us", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("states-albers-10m.json").json()
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  return main;
}
