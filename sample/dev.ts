import Chart from 'chart.js/auto'
import OutLabels from '../src/plugin.ts'

new Chart<'doughnut'>('ctx', {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 5, 65, 33, 42],
                backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
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

new Chart('ctx2', {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 5, 42, 33, 24],
                backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
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
