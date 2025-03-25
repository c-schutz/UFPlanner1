import * as d3 from 'd3';
import { JSDOM } from 'jsdom';

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