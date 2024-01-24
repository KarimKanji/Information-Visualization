(async () => {

    const data = await d3.json("./graphData.json")

    const edges = [];
    for (i in data){
        console.log(data[i])

            for (j in data[i].links){
            edges.push({
                source: data[i].id,
                target: data[i].links[j],
                traffic: data[i].volume /2
            })
        }

    }


    console.log("this is edges:");
    console.log(edges)
    //runD3 (data);

    runD3({nodes: data, links: edges})
}) ();

const width = 600, height = 600;
function runD3 (data){




    const tooltip = d3.select('#chart').append('div')
        .attr('id', 'tooltip')
        .style('position', 'absolute')
        .style('display', 'none');

    const colors = ["lime","yellow","yellow","pink"];
    const rnd = Math.round( Math.random(0, 1000));
    
    console.log(rnd);
    let choice = colors[rnd];
    const simulation = d3.forceSimulation(data.nodes)
     .force('charge', d3.forceManyBody().strength(-200))
     .force('link', d3.forceLink(data.links).id(d => d.id)
           .distance(70))
      .force('center', d3.forceCenter(width/2, height/2))
    
      const svg = d3.select("#chart").append('svg')
      .style('background', 'aliceblue')
                .attr("viewBox", [0, 0 , width, height]);
    
     const node = svg.selectAll('circle')
       .data(data.nodes)
       .enter()
        .append('circle')
        .attr('r', d => d.volume/2 + 5)
        .attr('fill', colors[rnd])
        .attr('stroke', 'crimson')
        .on('mouseover', showTooltip)
        .on('mouseout', () =>{
            tooltip.style('display', 'none')

        })
        .call(d3.drag()
            .on('start', (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;

            })
            .on('end', (event, d) => {
                d.fx = null;
                d.fy = null;
                if (!event.active) simulation.alphaTarget(0);

            })
        )

        node.append('text')
            .style('text-anchor', 'middle')
            .attr('dominant-baseline', 'central')
            .attr('font-size', d => d.volume/5+8)
            .text(d => d.id)
        
     const link = svg
       .selectAll('path.link')
       .data(data.links)
       .enter()
       .append('path')
       .attr('stroke', 'black')
       .attr('stroke-width', d => d.traffic *0.3)
       .attr('fill', 'none');


       
    
    const lineGenerator = d3.line();

     
     simulation.on('tick', () => {
                   node.attr('cx', d => d.x)
                    .attr('cy', d => d.y);
                   link.attr('d', d => lineGenerator([
                     [d.source.x, d.source.y], 
                     [d.target.x, d.target.y]]) 
                   )
     });
    // return svg.node();

    function showTooltip(event, d) {

        const realWidth = svg.style('width').replace("px", "");
        const coefficient = realWidth / width;
        tooltip.style('display', 'block')
        .style('left', d.x * coefficient + "px")
        .style('top', d.y * coefficient + "px")
            
        tooltip.html(d.name)
    
    }



     
}



// const data = {
//     "nodes":[{
//         "id":1,
//         "influence": 1
//     },{
//         "id": 2,
//         "influence": 2
//     }],
//     "links":[{
//         "source": 1,
//         "target": 2,
//         "weight": 3
//     }]
// }

//runD3(data);