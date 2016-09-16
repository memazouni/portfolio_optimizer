import {Component, Input, OnChanges} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'line-graph',
  templateUrl: 'line-graph.component.html',
  styleUrls: ['line-graph.component.css']
})
export class LineGraphComponent {// implements OnChanges {
  constructor() {}

  @Input() optimalAllocs: Array<any>;
  @Input() title: string;
  @Input() performance: Object;

  createChart() {
    let container = document.getElementsByClassName("chart")[0];
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = container.clientWidth - margin.left - margin.right,
    height = 384 - margin.top - margin.bottom;

    let formatDate = d3.time.format("%d-%b-%y");

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
  }

  // removeOldChart() {
  //   // If svg element exists, remove it
  //   // If it doesn't, nothing happens
  //   d3.select('svg').remove();
  // }

  // ngOnChanges(){
  //   // Called on changes to the bindings
  //   // At the very beginning when the bindings are first specified, this counts as a change
  //   this.removeOldChart();
  //   this.createChart();
  // }

}
