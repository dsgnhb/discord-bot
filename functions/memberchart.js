const ChartjsNode = require('chartjs-node');
const fs = require('fs');

module.exports = (message, client) => {
    const stats = client.stats;
    const keys = stats.keys();
    const users = Object.values(stats).map(a => a.member);

    const list = [];
    const pattern = /(\d{1,2})\.(\d{1,2})\.(\d{4})/;
    for (let j = 0; j < keys.length; j++) {
        list.push({'date': new Date(keys[j].replace(pattern, '$3-$2-$1')), 'members': users[j]});
    }
    list.sort(function(a, b) {
        return ((a.date.valueOf() < b.date.valueOf()) ? -1 : ((a.date.valueOf() === b.date.valueOf()) ? 0 : 1));
    });
    for (let k = 0; k < list.length; k++) {
        keys[k] = list[k].date.toUTCString();
        users[k] = list[k].members;
    }

    const chartNode = new ChartjsNode(700, 500);
    return chartNode.drawChart({
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                fill: false,
                backgroundColor: "#3498db",
                borderColor: "#3498db",
                data: users,
            }]
        },
        options: {
            legend: {
                display: false
            },
            layout: {
                padding: 20
            },
            responsive: true,
            title:{
                display: true,
                text: 'Members'
            },
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false
                    }
                }]
            },
            plugins: {
                beforeDraw: (chart, easing) => {
                    const ctx = chart.chart.ctx;
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, chart.chart.width, chart.chart.height);
                }
            }
        },
    }).then(buffer => {
        return chartNode.getImageStream('image/png');
    }).then(streamResult => {
        return chartNode.writeImageToFile('image/png', './assets/imgs/memberchart.png');
    }).then(() => {
        message.channel.send('Hier ein Diagramm:', new Attachment('./assets/imgs/memberchart.png', 'memberchart.png'));
        fs.unlinkSync('./assets/imgs/memberchart.png');
    });
};