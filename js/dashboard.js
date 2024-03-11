document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { date: '2022-01-01', value: 50 },
        { date: '2022-01-02', value: 80 },
        { date: '2022-01-03', value: 110 },
        { date: '2022-01-04', value: 90 },
        { date: '2022-01-05', value: 120 },
        { date: '2022-01-06', value: 80 },
        { date: '2022-01-07', value: 110 }
    ];

    const svg = document.getElementById('lineChart');

    const chartWidth = 400;
    const chartHeight = 200;
    const padding = 20;

    const xScale = chartWidth / (data.length - 1);
    const yScale = (chartHeight - 2 * padding) / (Math.max(...data.map(point => point.value)) - Math.min(...data.map(point => point.value)));

    const pathData = data.map((point, index) => `${index * xScale},${(chartHeight - padding) - (point.value - Math.min(...data.map(p => p.value))) * yScale}`).join(' L ');

    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.setAttribute('d', `M${pathData}`);
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', 'green');
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

    data.forEach((point, index) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', index * xScale);
        circle.setAttribute('cy', (chartHeight - padding) - (point.value - Math.min(...data.map(p => p.value))) * yScale);
        circle.setAttribute('r', 5);
        circle.setAttribute('fill', 'green');

        circle.addEventListener('mouseover', () => {
            const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tooltip.setAttribute('x', index * xScale);
            tooltip.setAttribute('y', (chartHeight - padding) - (point.value - Math.min(...data.map(p => p.value))) * yScale - 10);
            tooltip.setAttribute('font-family', 'Arial');
            tooltip.setAttribute('font-size', '12');
            tooltip.setAttribute('fill', 'black');
            tooltip.textContent = point.date;
            svg.appendChild(tooltip);
        });

        circle.addEventListener('mouseout', () => {
            const tooltip = svg.querySelector('text');
            if (tooltip) {
                svg.removeChild(tooltip);
            }
        });

        svg.appendChild(circle);
    });
})