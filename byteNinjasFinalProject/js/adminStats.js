 /*
=============
Global
=============
*/

// year,value
// 2011,45
// 2012,47
// 2013,52
// 2014,70
// 2015,75
// 2016,78
var data = [
    {"year": "Yesterday", "value": 45},
    {"year": "Today", "value": 47},
    {"year": "Last Week", "value": 52},
    {"year": "This Week", "value": 70},
    {"year": "Last Month", "value": 75},
    {"year": "This Month", "value": 78},
    {"year": "This Year", "value": 78}
];

/*
=============
Document Loaded
=============
*/
window.addEventListener("DOMContentLoaded", function () {
    displayChart();
});

function displayChart() {
    var svg = d3.select("svg"),
        margin = 50,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;


    var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range ([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");

    
    // X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.year; }))
        .padding(0.2);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([ height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y)
        .tickFormat(function(d){
            return d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Sales");

    // Bars
    svg.selectAll("s")
    .data(data)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.year); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2");

    // xScale.domain(data.map(function(d) { return d.year; }));
    // yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

    // g.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(xScale));

    // g.append("g")
    //     .call(d3.axisLeft(yScale).tickFormat(function(d){
    //         return "$" + d;
    //     }).ticks(10))
    //     .append("text")
    //     .attr("y", 6)
    //     .attr("dy", "0.71em")
    //     .attr("text-anchor", "end")
    //     .text("value");
}

