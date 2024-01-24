//Coinbase 


function createSelect(){

    cryptoEvent = "BTC-EUR";
    daysEvent = "30";

    const cryptos = [
        { code: "BTC-EUR", name: "BTC-EUR" },
        { code: "ETH-EUR", name: "ETH-EUR" },
        { code: "ADA-EUR", name: "ADA-EUR" },
        { code: "SHIB-EUR", name: "SHIB-EUR" }
    ];
    let optionsHtml = "";
    for (crypto1 of cryptos) {
        console.log(crypto1);
        optionsHtml += `
            <option value = "${crypto1.code}">
                ${crypto1.name}
    
            </option>
        `;
    
    }
    document.querySelector('#crypto').innerHTML = optionsHtml;

    d3.select('#crypto').on('click', (event) => {
         console.log(event.currentTarget.value)
         cryptoEvent = event.currentTarget.value;
         getJson(cryptoEvent, daysEvent);
    });

    
    const days = [
        { code: "30", name: "1M" },
        { code: "90", name: "3M" },
        { code: "180", name: "6M" },
        { code: "270", name: "9M" }
    ];
    let optionsHtml1 = "";
    for (day of days) {
        console.log(day);
        optionsHtml1 += `
            <option value = "${day.code}">
                ${day.name}
    
            </option>
        `;
    
    }
    document.querySelector('#days').innerHTML = optionsHtml1;

    d3.select('#days').on('click', (event) => {
         console.log(event.currentTarget.value)
         daysEvent = event.currentTarget.value;
         getJson(cryptoEvent, daysEvent)
    });

    getJson(cryptoEvent, daysEvent)
}


function getJson(cryptoEvent, daysEvent) {

    

    const today = new Date();
    const last = new Date();
    //console.log(today)
    const end = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    //console.log(end);
    last.setDate(today.getDate()-daysEvent);
    //console.log(new Date(start1).toDateString());

    const start = last.getFullYear()+'-'+(last.getMonth()+1)+'-'+last.getDate();

    //console.log(start)
   

    console.log("This is start: " + start + " This is end: " + end)

    const options = { method: 'GET', headers: { Accept: 'application/json' } };
    fetch('https://api.pro.coinbase.com/products/'+cryptoEvent+'/candles?start='+start+'&end='+end+'&granularity=86400', options)
        .then(response => response.json())
        .then(response => {

            //console.log("this is response")
            //console.log("[ time,      low,     high,     open,     close,    volume ]")
            //console.log(response[0][3])
            drawChart(response);

        })
        .catch(err => console.error(err));


}

function drawChart(response) {


    chartData = response;
    const data = []
    const time = [];
    const low = [];
    const high = [];
    const open = [];
    const close = [];
    const volume = [];

    for (i in response) {
            time.push(response[i][0]),
            low.push(response[i][1]),
            high.push(response[i][2]),
            open.push(response[i][3]),
            close.push(response[i][4]),
            volume.push(response[i][5])
            
    }
   

    data.push({

        time: time,
        low: low,
        high: high,
        open: open,
        close: close,
        volume: volume

     })

     console.log("shiba coin volume");
     console.log(volume);
         


    for (i in time){
        time[i] =  new Date(time[i]*1000)   
    }
    //console.log(high);
    response.reverse();
    time.reverse();
    high.reverse();
    low.reverse();
    open.reverse();
    close.reverse();
    volume.reverse();
    d3.select('svg').remove();

    const width = 1500,
        height = 800,
        barMargin = 1,
        leftMargin = 60,
        rightMargin = 40,
        bottomMargin = 40;
    //const barWidth = (width-barMargin)/chartData.length;


    //d3.select('#svg-title').text("Stolpdiagram");
    const domainMin = d3.min(low) * 0.7;
    const domainMax = d3.max(high) * 1.05;

    //Domain variabler för handelsvolym
    const volumeDomainMin = d3.min(volume) *0.8;
    const volumeDomainMax = d3.max(volume) *2.80;


    //Scale för candlestick diagrammet
    const scaleY = d3.scaleLinear()
        .domain([domainMin, domainMax])
        .range([0, height]);

    const yGuideScale = d3.scaleLinear()
        .domain([domainMin, domainMax])
        .range([height, 0]);

    //Scale för handelsvolym
    const scaleVolumeY = d3.scaleLinear()
        .domain([volumeDomainMin, volumeDomainMax])
        .range([0, height/3]);

    const yTicks = d3.axisLeft(yGuideScale).ticks(15);

    const scaleX = d3.scaleBand()
        .domain(time)
        .range([0, width - leftMargin + time.length -1]);

        console.log("here is time" + time);

    const xGuideScale = d3.scaleTime()
        .domain([time[0], time[time.length-1]])
        .range([0, width - leftMargin + time.length -1]);

    console.log(time[0])


        // const xGuideScale = d3.scaleTime()
        // .domain([dates[0], dates[dates.lenght-1]])
        // .range([0, width-leftMargin]);

    const xTicks = d3.axisBottom(xGuideScale).ticks(d3.timeweek, 1).tickFormat(d3.timeFormat("%d" + "." +"%m"));
    //const xTicks = d3.axisBottom(xGuideScale).ticks(d3.timeDay);

    
    d3.select('#candlestick')
        .append('div')
        .attr('id', 'tooltip')
        .style('display', 'none')

    const chart = d3.select('#candlestick')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', 'translate(' + leftMargin + ',0)')
        


    chart.selectAll('rect')
        .data(data[0].high)
        .enter() // for each element in chartdata
        .append('rect')
        .attr('x', (d, i) => scaleX(time[i])+ width/230 -barMargin - 0.5)
        .attr('y', (d) => height - scaleY(d))
        .attr('width', width / 350 - barMargin)
        .attr('height', (d, i) => {
            //console.log(d);
            return scaleY(d) - scaleY(low[i]);
        })
        .attr('fill', '#6f717d')
        

        console.log("This is volume: ");
        console.log(data[0].volume);
        console.log(data[0].open);

    chart.selectAll('rectVolume')
        .data(data[0].volume)
        .enter() // for each element in chartdata
        .append('rect')
        .attr('x', (d, i) => scaleX(time[i])+ width/230 -barMargin - 5.5)
        .attr('y', (d) => height - scaleVolumeY(d) -bottomMargin)
        .attr('width', width / 150 - barMargin)
        .attr('height',(d) => scaleVolumeY(d))
        .attr('fill', '#6f717d')
        .on('mouseover', (event, d) => {
            const xy = d3.pointer(event)
            
            console.log([event.pageX, event.pageY])
            console.log(d3.pointer(event))
            d3.select('#tooltip').style('display', 'block')
            .style('left', xy[0] + 60 + 'px')
            .style('top', xy[1] + 'px')
            .html(`<div>Handelsvolym: <br> ${d.toFixed(5)} st</div>
            <br>
           
            
            `)
            //console.log("This is open[i].open")
            //console.log(open[i].open)
           // console.log(open)
        })
        .on('mouseout', (event) => {
            d3.select('#tooltip').style('display', 'none')

        })


    upp = "";

    

    chart.selectAll('rect1')
        .data(data[0].open)
        .enter() // for each element in chartdata
        .append('rect')
        .attr('x', (d, i) => scaleX(time[i]))
        .attr('y', (d) => height - scaleY(d))
        .attr('width', width / 100 - barMargin)
        .attr('height', (d, i) => {
            if (scaleY(d) - scaleY(close[i]) <= 0) {
                // upp = "lime"; 
                // return Math.abs(scaleY(d) - scaleY(close[i]));
            } else {
                upp = "red";
                return scaleY(d) - scaleY(close[i]);
            }
        })
       
        .attr('fill', upp)

        chart.selectAll('rect2')
        .data(close)
        .enter() // for each element in chartdata
        .append('rect')
        .attr('x', (d, i) => scaleX(time[i]))
        .attr('y', (d) => height - scaleY(d))
        .attr('width', width / 100 - barMargin)
        .attr('height', (d, i) => {
            if (scaleY(d) - scaleY(open[i]) <= 0) {
                // upp = "lime";
                // return Math.abs(scaleY(d) - scaleY(close[i]))

            } else {
                
                return scaleY(d) - scaleY(open[i]);
            }
        })
       
        .attr('fill', "lime")

    chart.selectAll('rec3')
        .data(response).enter()
        .append('rect')
        .attr('x', (d, i) => scaleX(time[i])+ width/230 -barMargin - 6)
        .attr('y', (d) => height - scaleY(d[2]))
        .attr('width', width / 100 )
        .attr('height', (d, i) => {
            return scaleY(d[2]) - scaleY(low[i])
        })

        
        .attr('opacity', '0')
        .on('mouseover', (event, d) => {
            const xy = d3.pointer(event)
            d3.select('#tooltip').style('display', 'block')
      
                        .style('left', xy[0] + 50 +  'px')
                        .style('top', xy[1] + 'px')
    
                        .html(`Date:  ${new Date([d[0]]*1000).getDate()}.${new Date([d[0]]*1000).getMonth()}<br> Open: ${d[3]} Close: ${d[4]}`)
                   
                

        })
                .on('mouseout', (event) => {
                    d3.select('#tooltip').style('display', 'none')
        })










        d3.select('#candlestick svg').append('g')
        .attr('transform', `translate(${leftMargin}, ${height - bottomMargin})`)
        .call(xTicks)
        

       d3.select('#candlestick svg').append('g')
        .attr('transform', `translate(${leftMargin} ,0)`)
        .call(yTicks)


        console.log(xTicks);

        


 
    //     d3.select("#bars svg").append("g")
    //         .attr('transform', `translate(${leftMargin},0)`)
    //         .call(yTicks)

    //     d3.select("#bars svg").append("g")
    //         .attr('transform', `translate(${leftMargin},${height-bottomMargin})`)
    //         .call(xTicks);




}


//document.querySelector('#getter').addEventListener('onclick', getJson)



window.onload = function() {
    createSelect();
  };