

// d3.select('#svg-title').text("SVG med D3");

// d3.select('body')
//     .append('div')
//         .text('Morjens')
//         .style('color', 'red')
//         .style('font-size', '64px')
//         .style('opacity', 0)
//         .transition()
//             .duration(2000)
//             .style('opacity', '1')
//         .transition()
//             .duration(2000)
//             .style('opacity', '0')
//         .transition()
//             .duration(2000)
//             .style('opacity', '1');

// const shapes = d3.select('#shapes')
//     .append('svg')
//         .attr('height', 300)
//         .attr('width', 300)
//         .style('background', 'LightSlateGray');

// shapes.append('rect')
//     .attr('x', 30)
//     .attr('y', 30)
//     .attr('height', 240)
//     .attr('width', 240)
//     .attr('fill', 'SandyBrown');

// shapes.append('circle')
//     .attr('cx', 150)
//     .attr('cy', 150)
//     .attr('r', 100)
//     .attr('fill', 'red');


// shapes.append('rect')
//     .attr('id', 'changeColor')
//     .attr('x', 100)
//     .attr('y', 100)
//     .attr('height', 100)
//     .attr('width', 100)
//     .attr('fill', 'Green')
//     .on('click', (event)=>{
//         console.log(d3.pointer(event));
//         d3.select(event.currentTarget).style('fill', 'black')
//     });


// //var showing = false;
// function toggleLine() {
    
// if (!document.querySelector('#toggle-line')){
//     shapes.append('line')
//     .attr('id', 'toggle-line')
//     .attr('x1', 50)
//     .attr('y1', 50)
//     .attr('x2', 250)
//     .attr('y2', 250)
//     .attr('stroke', 'black')
//     .attr('stroke-width', 5);
//     //showing = true;
// }else{
//     shapes.selectAll('line').remove();
//     // showing = false;
// }
    

// }


d3.select('#svg-title').text("Paint!");

const paint = d3.select('#paint-area')
    .append('svg')
        .attr('height', 500)
        .attr('width', 700)
        .style('background', 'white')
        .on('mousemove mousedown', (event) => {
            
            if (event.buttons == 1){
            dot(d3.pointer(event));
        }


          
        });
const dot = (xy) => {
    paint.append('circle')
    .attr('cx', xy[0] )
    .attr('cy', xy[1])
    .attr('r', document.querySelector('#range').value)
    .style('fill', document.querySelector('#color').value)

}

// const clearPainting = () => {


// }



