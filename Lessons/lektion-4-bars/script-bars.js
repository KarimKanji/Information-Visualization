console.log("JSON!");

const colors = [ 
    { code: "black", name: "Svart"},
    { code: "crimson", name: "Röd"},
    { code: "navy", name: "Blå"},
    { code: "green", name: "Grön"}
];
let optionsHtml = "";
for (color of colors){
    optionsHtml += `
        <option value = "${color.code}">
            ${color.name}

        </option>
    `;

}
document.querySelector('#color').innerHTML = optionsHtml;
d3.select('#color').on('click', (event) => {
    console.log(event.currentTarget.value)
    d3.select('#bars path').attr('stroke', event.currentTarget.value)
});

//d3.json använder js fetch
d3.json('../assets/currency.json')
    .then(function(d) {
        console.log(d);
});

//Om man vill köra en namnlös function utan function:
(async () =>{
    const d = await d3.json('../assets/currency.json');
    createChart(d);
}) ();




//Normal syntax
// async function getJson(){
//     const d = await d3.json('../assets/currency.json');
//     createChart(d);
// };
// getJson();

function createChart(jsonData) {
    console.log(jsonData);

   

    const chartData =  [];
    const xData =  [];
    const dates = [];
    for (i in jsonData) {
        chartData.push(jsonData[i].avg)
        xData.push(i)
        dates.push(new Date(jsonData[i].date));
        
    }
    //console.log(dates);

    /*for (item of jsonData){
        chartData.push(item.avg);

    }*/
    
    const width = 500, 
        height = 300, 
        barMargin = 1,
        leftMargin = 40,
        bottomMargin = 20;
    //const barWidth = (width-barMargin)/chartData.length;


    d3.select('#svg-title').text("Stolpdiagram");
    const domainMin = d3.min(chartData)*0.9;
    const domainMax = d3.max(chartData)*1.05;

    const scaleY = d3.scaleLinear()
        .domain([domainMin, domainMax])
        .range([0, height]);

    const yGuideScale = d3.scaleLinear()
        .domain([domainMin, domainMax])
        .range([height, 0]);

    const yTicks = d3.axisLeft(yGuideScale).ticks(10);

    const scaleX = d3.scaleBand()
        .domain(dates)
        .range([0, width-leftMargin]);

    const xGuideScale = d3.scaleTime()
        .domain([dates[0], dates[dates.lenght-1]])
        .range([0, width-leftMargin]);

    const xTicks = d3.axisBottom(xGuideScale)
        .ticks(d3.timeWeek);

        d3.select('#bars')
        .append('div')
        .attr('id', 'tooltip')
        .style('display', 'none')

    const chart = d3.select('#bars')
        .append('svg')
            .attr('height', height)
            .attr('width', width)
            .style('background', 'LightSlateGray')
            .append('g')
                .attr('transform', 'translate('+leftMargin+',0)');

/*chart.selectAll('rect')
    .data(chartData)
    .enter() // for each element in chartdata
        .append('rect')
            .attr('x', (d, i) => i * barWidth + barMargin)
            .attr('y', (d) => height - scaleY(d))
            .attr('width', barWidth - barMargin)
            .attr('height', (d) => scaleY(d))
            .attr('fill', 'LightSlateGray')*/


    chart.append('path')
        .datum(jsonData)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('d', d3.line()
                .x((d, i) => scaleX(dates[i]))
                .y((d) => height - scaleY(d.avg))
            )
        d3.select("#bars svg").append("g")
            .attr('transform', `translate(${leftMargin},0)`)
            .call(yTicks)

        d3.select("#bars svg").append("g")
            .attr('transform', `translate(${leftMargin},${height-bottomMargin})`)
            .call(xTicks);

         
        // d3.select("#bars svg")
        // .data(chartData).enter()
        //     .append('circle')
        //     .attr('r', 3)
        //     .attr('cx', i)
        //     .attr('cy', 100)
        //     .attr('stroke', 'red')
        //     .attr('fill', 'red')

    chart.selectAll('circle')
        .data(jsonData)
        .enter().append('circle')
            .attr('r', 3)
            .attr('cx', (d, i) => scaleX(dates[i]))
            .attr('cy', (d) => height - scaleY(d.avg))
            .attr('stroke', 'black')
            .attr('fill', 'red')
                .on('mouseover', (event, d) => {
                    const xy = d3.pointer(event)
                    console.log([event.pageX, event.pageY])
                    console.log(d3.pointer(event))
                    d3.select('#tooltip').style('display', 'block')
                    .style('left', xy[0] + 60 + 'px')
                    .style('top', xy[1] + 'px')
                    .html(`<div>${d.date}</div>
                    <br>
                    <div>${d.avg}${d.symbol}</div>
                    `)
                    //.attr('x', d3.pointer(event)[0])
                    //d3.select('#tooltip').append('text')
                        //.text(chartData[])

                })
                .on('mouseout', (event) => {
                    d3.select('#tooltip').style('display', 'none')

                })

          



}