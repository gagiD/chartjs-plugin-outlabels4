import Chart from 'chart.js/auto'
import OutLabels from '../src/plugin.ts'

const chart1 = new Chart<'doughnut'>('ctx', {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 5, 65, 33, 42],
                backgroundColor: ['Red', 'Orange', 'Purple', 'Green', 'Blue'],
            },
        ],
    },
    options: {
        radius: '50%',
        plugins: {
            outlabels: {
                display: item => {
                    return item.percent > 0
                },
                text: '%p',
                color: 'white',
                backgroundColor: 'red',
                //stretch: 15,
                percentPrecision: 2,
                font: {
                    size: 20,
                    resizable: true,
                    minSize: 10,
                    maxSize: 16,
                },
            },
        },
    },
    plugins: [OutLabels],
})

const chart2 = new Chart('ctx2', {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 5, 42, 33, 24],
                backgroundColor: ['Red', 'Orange', 'Purple', 'Green', 'Blue'],
            },
        ],
    },
    options: {
        radius: '50%',
        plugins: {
            outlabels: {
                display: item => {
                    return item.percent > 0
                },
                text: '%v [%p]',
                color: 'white',
                //stretch: 15,
                percentPrecision: 2,
                font: {
                    resizable: true,
                    minSize: 10,
                    maxSize: 16,
                },
            },
        },
    },
    plugins: [OutLabels],
})

function getRandomData(length: number, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * max))
}

export function changeData() {
    chart1.config.data.datasets[0].data = getRandomData(5)
    chart1.update()

    chart2.config.data.datasets[0].data = getRandomData(5)
    chart2.update()
}

document.getElementById('changeData')!.onclick = changeData
