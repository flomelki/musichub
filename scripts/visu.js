// data format is : genre, number
function visu1(data)
{
    data.sort(function(a,b)
    {
       if (a.genre < b.genre)   return -1;
       if (a.genre > b.genre)   return 1;
       if (a.genre === b.genre) return 0;
    });
    
    var i = 0;
    data.forEach(function(d) {
        d['index'] = i++;
    });
    var genres = data.map(function(d) { return d.genre});
    var indexes = data.map(function(d) { return d.index});

    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 150, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);
    x.domain([0, data.length]);
    y.domain([0, d3.max(data, function(d) { return d.number; })]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").tickValues(indexes).tickFormat(function(d) { return data[d].genre; });
    var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
    
    // Define the line
    var valueline = d3.svg.line()
    .x(function(d) { return x(d.index); })
    .y(function(d) { return y(d.number); });
    
    // Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data)); // remaining bug there

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );;

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}