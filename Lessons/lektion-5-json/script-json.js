console.log("JSON!");


//d3.json använder js fetch
d3.json('../assets/currency.json')
    .then(function(d) {
        console.log(d);
});

async function getJson(){
    const d = await d3.json('../assets/currency.json');
    createChart(d);
};
getJson();

function createChart(jsonData) {
    console.log(jsonData);

    const chartData =  [];
    for (item of jsonData){
        chartData.push(item.avg);

    }
    
    const width = 600, 
        height = 400, 
        barMargin = 1,
        leftMargin = 40,
        rightMargin
    const barWidth = (width-barMargin)/chartData.length;

    

    const scaleY = d3.scaleLinear() // Vi skapar variabeln scaleY för scaleLinear()-metoden
    .domain([0, d3.max(chartData)]) // Variationen inom vår datamängd
    .range([0, height-20]) // "Utrymmet", var domain 0 och max ska vara

    const chart = d3.select('#bars')
    .append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('background', 'silver');

    chart.selectAll('rect')
    .data(chartData).enter() // for each element in chartData
        .append('rect')
        .attr('x', (d, i) => {
            return i * barWidth + barMargin
        })
        .attr('y', (d) => height-scaleY(d)) // Vi får ett nytt värde för y från scaleY()
        .attr('height', (d) => scaleY(d))   // Vi får ett nytt värde för y från scaleY()
        .attr('width', barWidth-barMargin)
        .attr('fill', 'OrangeRed')

}