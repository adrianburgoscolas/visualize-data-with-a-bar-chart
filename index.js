
document.addEventListener('DOMContentLoaded', function(){
    //AJAX
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    xhr.send();
    xhr.onload = ()=>{
        const dataset = JSON.parse(xhr.responseText).data;
        const w = 800;
        const h = 500;
        const padding = 50;
        
        const xScale = d3.scaleLinear();
        const xData = dataset.map((data)=>parseInt(data[0].split('-')[0],10))
        console.log(xData)
        xScale.domain([0,dataset.length]).range([padding,w-padding]);

        const xAxisScale = d3.scaleLinear();
        xAxisScale.domain([d3.min(xData),d3.max(xData)]).range([padding,w-padding]);
        
        const yScale = d3.scaleLinear();
        yScale.domain([0,d3.max(dataset,(d)=>d[1])]).range([h-padding,padding]);

        const hScale = d3.scaleLinear();
        hScale.domain([0,d3.max(dataset,(d)=>d[1])]).range([padding,h-padding]);

        // console.log(hScale(31)-padding);
        const myChart = d3.select('main').select('div')
                        .append('svg')
                        .attr('width',w)
                        .attr('height',h);

        let tooltip = d3.select('main')
            .append('div')
            .attr('id','tooltip')   
            .attr('z-index',5)
            .style('visibility','hidden')
            .attr('data-date','')
            

        myChart.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .on('mouseover',(d)=>{
                    tooltip.style('visibility','visible')
                    tooltip.text(d.target[Object.keys(JSON.parse(JSON.stringify(d.target)))[0]])
                    tooltip.attr('data-date',d.target[Object.keys(JSON.parse(JSON.stringify(d.target)))[0]][0])
                })
                .on('mouseout',(d)=>{
                    tooltip.style('visibility','hidden')
                })
                .attr('width',(w-padding*2)/(dataset.length*0.3))
                .attr('height',(data)=>hScale(data[1])-padding)
                .attr('x',(data,i)=>xAxisScale(xData[i]))
                .attr('y',(data,i)=>yScale(data[1]))
                .attr('class','bar')
                .attr('data-date',(d,i)=>d[0])
                .attr('data-gdp',(d)=>d[1]);
         
              
                
        const xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format('d'));
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
        // const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9, 31,100, 31, 22, 17, 25, 18, 29, 14, 9, 31,100, 22, 17, 9, 31,100, 25, 18, 29, 14, 9];
    
    
  });
    
                

