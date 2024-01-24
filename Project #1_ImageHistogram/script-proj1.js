const canvas = document.querySelector('#canvas');
const context = canvas.getContext("2d");
let imgData = null;
var colorEvent = "RGB";

document.querySelector('#infile').addEventListener('change', uploadFile) //eller (event) => uploadFile(event)
document.q
function uploadFile(event) {
    const reader = new FileReader;
    const imgUrl = reader.readAsDataURL(event.target.files[0]);
    //           console.log(imgUrl); 

    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        //console.log(img);

        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;
            context.drawImage(img, 0, 0);

            imgData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            console.log(imgData);

            readImg(imgData);

        }
    }
}

const colors = [
    { code: "RGB", name: "RGB" },
    { code: "red", name: "Röd" },
    { code: "blue", name: "Blå" },
    { code: "lime", name: "Grön" }
    
];
let optionsHtml = "";
for (color of colors) {
    optionsHtml += `
        <option value = "${color.code}">
            ${color.name}

        </option>
    `;

}
document.querySelector('#color').innerHTML = optionsHtml;
d3.select('#color').on('click', (event) => {
    console.log(event.currentTarget.value)
    colorEvent = event.currentTarget.value;
    readImg(imgData)
});
d3.select('#color').style('visibility', 'visible');

console.log("Here comes colorevent" + colorEvent)


function readImg(imgData) {

    console.log("Loaded");
    let chartDataR = [];
    let chartDataG = [];
    let chartDataB = [];

    for (var i = 0; i < 256; i++) {
        chartDataR[i] = 0;
        chartDataG[i] = 0;
        chartDataB[i] = 0;

    }

    for (let i = 0; i < imgData.length; i += 4) {

        chartDataR[imgData[i]]++;
        chartDataG[imgData[i + 1]]++;
        chartDataB[imgData[i + 2]]++;
        //i++; // alpha
    }
    const domainMin = d3.min([d3.min(chartDataR), d3.min(chartDataG), d3.min(chartDataB)]);
    const domainMax = d3.max([d3.max(chartDataR), d3.max(chartDataG), d3.max(chartDataB)]);
    const width = 800, height = 500, barMargin = -1;
    const barWidth = width / 256;

    const scaleY = d3.scaleLinear() // Vi skapar variabeln scaleY för scaleLinear()-metoden
        .domain([domainMin, domainMax]) // Variationen inom vår datamängd
        .range([0, height - 20]) // "Utrymmet", var domain 0 och max ska vara


    d3.select('svg').remove();
    d3.select('#svg-title').text("Stolpdiagram");
    const chart = d3.select('#bars')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .style('background', '#000')

    if (colorEvent == "red" || colorEvent == "RGB") {
        chart.selectAll('rect0')
            .data(chartDataR).enter() // for each element in chartData
            .append('rect')
            .attr('x', (d, i) => i * barWidth + barMargin )
            .attr('y', (d) => height - scaleY(d)) // Vi får ett nytt värde för y från scaleY()
            .attr('height', (d) => scaleY(d))   // Vi får ett nytt värde för y från scaleY()
            .attr('width', barWidth - barMargin)
            .attr('fill', 'red')
            .style('mix-blend-mode', 'screen')
            
    }

    if (colorEvent == "lime" || colorEvent == "RGB") {
        chart.selectAll('rect2')
            .data(chartDataG).enter() // for each element in chartData
            .append('rect')
            .attr('x', (d, i) => i * barWidth + barMargin )
            .attr('y', (d) => height - scaleY(d)) // Vi får ett nytt värde för y från scaleY()
            .attr('height', (d) => scaleY(d))   // Vi får ett nytt värde för y från scaleY()
            .attr('width', barWidth - barMargin)
            .attr('fill', 'lime')
            .style('mix-blend-mode', 'screen');
    }
    if (colorEvent == "blue" || colorEvent == "RGB") {
        chart.selectAll('rect3')
            .data(chartDataB).enter() // for each element in chartData
            .append('rect')
            .attr('x', (d, i) => i * barWidth + barMargin )
            .attr('y', (d) => height - scaleY(d)) // Vi får ett nytt värde för y från scaleY()
            .attr('height', (d) => scaleY(d))   // Vi får ett nytt värde för y från scaleY()
            .attr('width', barWidth - barMargin)
            .attr('fill', 'blue')
            .style('mix-blend-mode', 'screen')
    }


    
}

//readImg(document.querySelector('#infile'));



