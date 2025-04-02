import * as d3 from 'd3';
import { D3Node } from 'd3-node'

export function Visualize(nodeData, screenHeight) {
    // Ensure screen height is a number
    let h = Number(screenHeight);
    
    // Set the dimensions to be approximately a fourth of screen height
    const size = h / 2; // Size for both width and height (square)
    const width = size;
    // Increase height to accommodate the legend at the bottom
    const height = size * 1.2; // Adding 20% more height for the legend
    
    // Calculate radius with some margin
    const radius = Math.min(width, height * 0.8) / 2 - 20; // Use 80% of height for pie chart
    
    // Softer, more harmonious color palette that still contrasts with royal blue
    const colorPalette = [
        "#E6C770", // Muted gold
        "#D9A76A", // Soft tan
        "#A8D5BA", // Sage green
        "#C7CEEA", // Periwinkle
        "#F4C2C2", // Soft pink
        "#E1AD9D", // Dusty rose
        "#C5D5C5", // Pale green
        "#F0D5E0", // Soft lavender
        "#ECE2D0", // Cream
        "#D5E5E5", // Pale cyan
        "#E5C1CD", // Dusty pink
        "#D6E0FF"  // Pale blue
    ];
    
    let svgStrings = [];

    nodeData.forEach(data => {
        const d3n = new D3Node();
        const svg = d3n.createSVG()
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('width', width)
            .attr('height', height);
        
        // Group for the pie chart, centered in the top part
        const pieG = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height * 0.4})`);

        const allocations = data.allocation;
        const pie = d3.pie().value(d => d.value)(allocations);
        const arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        // Add pie slices with the softer color palette
        pieG.selectAll('.arc')
            .data(pie)
            .enter().append('path')
            .attr('d', arc)
            .style('fill', (d, i) => colorPalette[i % colorPalette.length]);

        // Add subtle stroke to pie slices for better visual separation
        pieG.selectAll('.arc-stroke')
            .data(pie)
            .enter().append('path')
            .attr('d', arc)
            .style('stroke', '#555')
            .style('stroke-width', '0.5px')
            .style('fill', 'none')
            .style('opacity', 0.8);

        // Create a group for the legend at the bottom
        const legendG = svg.append('g')
            .attr('transform', `translate(${width * 0.05}, ${height * 0.85})`);
        
        // Calculate font size and item width based on available space and number of items
        const fontSize = Math.min(14, Math.max(8, radius * 0.09));
        const itemWidth = width / allocations.length; // Distribute evenly across width
        
        // Add legend items horizontally
        allocations.forEach((item, i) => {
            // Calculate position for each legend item
            const xPos = i * itemWidth;
            
            const legendItem = legendG.append('g')
                .attr('transform', `translate(${xPos}, 0)`);
            
            // Add colored rectangle with softer colors
            legendItem.append('rect')
                .attr('width', fontSize)
                .attr('height', fontSize)
                .style('fill', colorPalette[i % colorPalette.length])
                .style('stroke', '#555')
                .style('stroke-width', '0.5px')
                .style('opacity', 0.9);
            
            // Add text label with good contrast but not harsh white
            const legendText = legendItem.append('text')
                .attr('x', fontSize * 1.5)
                .attr('y', fontSize)
                .attr('font-size', `${fontSize}px`)
                .style('fill', '#ECECEC') // Slightly off-white for less harsh contrast
                .text(`${item.name}: ${item.value}%`);
            
            // Handle potential text overlap
            const textLength = item.name.length + item.value.toString().length + 3;
            if (textLength * fontSize * 0.6 > itemWidth * 0.8) {
                legendText.attr('font-size', `${fontSize * 0.8}px`);
            }
        });

        svgStrings.push(d3n.svgString());
    });

    return svgStrings;
}

/*
old test function
export function Visualize(data) {
    const parsedData = Object.entries(data.categories).map(([key, value]) => {
        return { label: key, value: value };
    });

    // Create a new JSDOM instance for a virtual DOM
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

    let document = dom.window.document;

    // Creating an SVG node directly in the DOM
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '360');
    svg.setAttribute('height', '360');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', 'translate(180, 180)');
    svg.appendChild(g);
    document.body.appendChild(svg);

    // Create and append paths
    const pie = d3.pie().value(d => d.value)(parsedData);
    const arcPath = d3.arc().outerRadius(180).innerRadius(0);

    pie.forEach((d, i) => {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', arcPath(d));
        path.setAttribute('fill', d3.schemeCategory10[i % 10]);
        g.appendChild(path);
    });

    // Return the SVG's outer HTML
    //console.log(svg.outerHTML);
    return svg.outerHTML;
}
*/

// used to test Visualize
// Visualize({
//     categories: {
//         needs: 50,
//         wants: 30,
//         savings: 20
//     },
//     userID: 1,
//     budgetID: 1
//   })