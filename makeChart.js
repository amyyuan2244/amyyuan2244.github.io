export function makeChart() {
    var x = d3.scaleBand().domain(xCategories).range([0, width]);
    var y = d3.scaleLinear().domain([0,maxY]).range([height, 0]);
    var rectColor = "red"
    var tooltip = d3.select("#tooltip");

    d3.select('svg')
    .attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin)
    .append("g")
    .attr("transform", "translate("+margin+","+margin+")")
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', function(d,i) { return (width * i)/xCategories.length;})
    .attr('y', function(d) {return (height - (d.percentageChange * height/maxY));})
    .attr("width", function(d,i ) {return width/xCategories.length;})
    .attr("height", function(d,i) {return d.percentageChange * height/maxY;})
    .attr("fill", rectColor)
    .on("mouseover", function(d,i) {
        tooltip.style("opacity", 1)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html("The CPI of " + xCategories[i] + " has increased by " + d.percentageChange + "% from March 2020 to June 2025")
    })
    .on("mouseout", function() { tooltip.style("opacity", 0)});

    // axes
    d3.select("svg").append("g")
    .attr("transform", "translate("+margin+","+margin+")")
    .call(d3.axisLeft(y));

    d3.select("svg").append("g")
    .attr("transform", "translate("+margin+","+(height + margin)+")")
    .call(d3.axisBottom(x));
};