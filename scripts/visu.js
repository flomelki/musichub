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
        .attr("d", valueline(data))
        ;

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

function visu2(jsonData)
{
    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    var length, total = 0;
    var color = d3.scale.linear()
    .range(["lightgrey", "#66E2FF", "#FFBA3A"])

    var colorsArray = [];
    var cumul = 0;
    
    var numbers = jsonData.map(function(r) { console.log(r); return r.number;});
    var max = Math.max.apply(null, numbers);
    total = numbers.reduce(function(a, b) { return parseInt(a) + parseInt(b); });
    
    for (var i = 0; i < jsonData.length ; i ++)
    {
        jsonData[i]['cumul'] = cumul + parseInt(jsonData[i].number);
        cumul = cumul + parseInt(jsonData[i].number);
    }

    for (var i = 0; i < max ; i += max / 6)
    {
        colorsArray.push(parseInt(i.toString()));
    }
    colorsArray.push(max)
    color = color.domain(colorsArray);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);
        
    // Define the div for the tooltip
    var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);
            
    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.number; });

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(jsonData))
    .enter().append("g")
        .attr("class", "arc")
            .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(d.data.genre)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });;

    g.append("path")
        .attr("d", arc)
        .attr("id", function(d,i){return "s"+i;})
        .style("fill", function(d) { return color(parseInt(d.data.number)); });

    g.append("text")
    .style("font-size",13)
        .attr("dy", "30")
        .append("textPath")
        .attr("xlink:href",function(d,i){return "#s"+i;})
        .attr("startOffset",function(d,i){return "15%";})     
        .text(function(d) { 
            if (parseInt(d.data.number) > (total * 0.05) )
            {return d.data.genre;}
            return ""; 
    });
}


function visu3(jsonData)
{
 var width = 960,
    height = 600,
    radius = 0;

var length, total = 0;
var color = d3.scale.linear()
    .range(["lightgrey", "#66E2FF", "#FFBA3A"])

    var colorsArray = [];
    var cumul = 0;

    var numbers = jsonData.map(function(r) { return r.number;});
    var max = Math.max.apply(null, numbers);
    total = numbers.reduce(function(a, b) { return parseInt(a) + parseInt(b); });

    for (var i = 0; i < jsonData.length ; i ++)
    {
    jsonData[i]['cumul'] = cumul + parseInt(jsonData[i].number);
    cumul = cumul + parseInt(jsonData[i].number);
    }

    jsonData.sort(function(a,b)
    {
        if (parseInt(a.number) < parseInt(b.number))   return -1;
        if (parseInt(a.number) > parseInt(b.number))   return 1;
        if (parseInt(a.number) === parseInt(b.number)) return 0;
    });

    radius = 0.5  * Math.min(width, height) / jsonData.length;
        
    for (var i = 0; i < max ; i += max / 6)
    {
    colorsArray.push(parseInt(i.toString()));
    }
    colorsArray.push(max)
    color = color.domain(colorsArray);
    
    var arc = d3.svg.arc()
    .startAngle(0)
    .outerRadius(function(d, i) {/*console.log(0.5 * radius * (i+1) - 10);*/ return radius * (i+1) - 10})
    .innerRadius(function(d, i) {return radius * (i+1) - 30});

    // Define the div for the tooltip
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
        
    var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.number; });

    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(jsonData))
        .enter().append("g")
        .attr("class", "arc")

    g.append("path")
        .attr("d", arc)
        .attr("id", function(d,i){return "s"+i;})
        .style("fill", function(d) { return color(parseInt(d.data.number)); });

    g.append("text")
    .style("font-size",11)
        .attr("dy", "17")
        .append("textPath")
        .attr("xlink:href",function(d,i){return "#s"+i;})
        .attr("startOffset",function(d,i){return "15%";})     
        .text(function(d) { 
        if (parseInt(d.data.number) > total * 0.005 )
            {return d.data.genre;}
            return ""; 
    });
}