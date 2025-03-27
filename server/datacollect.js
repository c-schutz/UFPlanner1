import * as d3 from 'd3';
import { D3Node } from 'd3-node'

export function Visualize(nodeData) {
    let svgStrings = [];
    const width = 300, height = 300;
    const radius = Math.min(width, height) / 2 - 10; // Leave some margin

    nodeData.forEach(data => {
        const d3n = new D3Node();
        const svg = d3n.createSVG().attr('viewBox', `0 0 ${width} ${height}`);
        const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const allocations = data.allocation;
        const pie = d3.pie().value(d => d.value)(allocations);
        const arc = d3.arc().outerRadius(radius).innerRadius(0);

        g.selectAll('.arc')
            .data(pie)
            .enter().append('path')
            .attr('d', arc)
            .style('fill', (d, i) => d3.schemeCategory10[i % 10]);

        g.selectAll('text')
            .data(pie)
            .enter().append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr("dy", "0.35em")
            .text(d => `${d.data.name}: ${d.data.value}%`);

        svgStrings.push(d3n.svgString());
    });

    //console.log(svgStrings);
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