
document.addEventListener('DOMContentLoaded', function(){
    //AJAX
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    xhr.send();
    xhr.onload = ()=>{
        const json = JSON.parse(xhr.responseText).data;
        const w = 800;
        const h = 600;
        const padding = 50;
        console.log(json)
        const xScale = d3.scaleLinear();
        xScale.domain([0,dataset.length]).range([padding,w-padding]);

        const yScale = d3.scaleLinear();
        yScale.domain([0,d3.max(dataset)]).range([h-padding,padding]);

        const hScale = d3.scaleLinear();
        hScale.domain([0,d3.max(dataset)]).range([padding,h-padding]);

        // console.log(hScale(31)-padding);
        const myChart = d3.select('main').select('div')
                        .append('svg')
                        .attr('width',w)
                        .attr('height',h);

                        

        myChart.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr('width',(w-padding*2)/(dataset.length*1.1))
                .attr('height',(data)=>hScale(data)-padding)
                .attr('x',(data,i)=>xScale(i))
                .attr('y',(data,i)=>yScale(data))
                .attr('class','bar')
                .append('title')
                .text((data)=>data);

        const xAxis = d3.axisBottom(xScale);
        myChart.append('g')
            .attr('id','x-axis')
            .attr('transform',`translate(0,${h-padding})`)
            .call(xAxis);
        const yAxis = d3.axisLeft(yScale);
        myChart.append('g')
            .attr('id','y-axis')
            .attr('transform',`translate(${padding},0)`)
            .call(yAxis);
        }
        // chart code
        const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9, 31,100, 31, 22, 17, 25, 18, 29, 14, 9, 31,100, 22, 17, 9, 31,100, 25, 18, 29, 14, 9];
    
    
  });
    
                

