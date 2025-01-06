let currentTimeout;

document.addEventListener("DOMContentLoaded", function () {
 
    const baseId = 'apptCUn5WwTZtUzr9';
    const tableName = 'Audit Projects';
   

    fetch(url, {
        headers: {
          
        }
    })
    .then(response => response.json())
    .then(data => {
        const records = data.records;

        // Risk Rating Breakdown
        const riskRatingData = {
            labels: ['Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'],
            datasets: [{
                data: [3, 12, 39, 46],
                backgroundColor: ['#FF5A5E', '#FF8C00', '#FFCD56', '#4BC0C0'],
                borderColor: ['#FF5A5E', '#FF8C00', '#FFCD56', '#4BC0C0'],
                borderWidth: 1
            }]
        };

        new Chart(document.getElementById('riskRatingChart').getContext('2d'), {
            type: 'doughnut',
            data: riskRatingData,
            options: {
                plugins: {
                    legend: {
                        display: false, // Burada legend'ı gizle
                    },
                    datalabels: {
                        formatter: (value) => `${value}%`,
                        color: '#000',
                        font: { weight: 'bold' }
                    }
                }
            }
        });

        const actionPlanData = {
            labels: ['Deferred', 'TBD', 'Implemented', 'Planned'],
            datasets: [{
                data: [4, 53, 33, 10], // Yüzdelik dilimler
                backgroundColor: ['#36A2EB', '#FF9F40', '#4BC0C0', '#FFCE56'],
                borderColor: ['#36A2EB', '#FF9F40', '#4BC0C0', '#FFCE56'],
                borderWidth: 1
            }]
        };

        new Chart(document.getElementById('actionPlanChart').getContext('2d'), {
            type: 'doughnut',
            data: actionPlanData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // Default legendi gizliyoruz
                        position: 'top'
                    },
                    datalabels: {
                        formatter: (value) => `${value}%`,
                        color: '#000',
                        font: { weight: 'bold' }
                    }
                }
            }
        });

const riskMapData = {
    datasets: [{
        label: 'Risk Map',
        data: [
            { x: 1, y: 1, r: (Math.random() * 10 + 5) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 2, y: 2, r: (Math.random() * 10 + 10) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 2, y: 3, r: (Math.random() * 10 + 15) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 3, y: 2, r: (Math.random() * 10 + 20) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 3, y: 3, r: (Math.random() * 10 + 25) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 4, y: 4, r: (Math.random() * 10 + 30) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 4, y: 5, r: (Math.random() * 10 + 40) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 5, y: 4, r: (Math.random() * 10 + 45) * 0.5, count: Math.floor(Math.random() * 10) + 1 },
            { x: 5, y: 5, r: (Math.random() * 10 + 50) * 0.5, count: Math.floor(Math.random() * 10) + 1 }
        ],
        backgroundColor: function(context) {
            const value = context.dataset.data[context.dataIndex];
            const riskScore = value.x * value.y;

            if (riskScore <= 5) {
                return '#28a745'; // Green (Low risk)
            } else if (riskScore <= 10) {
                return '#ffecb3'; // Yellow (Medium-low risk)
            } else if (riskScore <= 15) {
                return '#ffcc00'; // Dark yellow (Medium risk)
            } else if (riskScore <= 20) {
                return '#dc3545'; // Red (High risk)
            } else if (riskScore <= 25) {
                return '#c82333'; // Dark red (Very high risk)
            } else {
                return '#FF5733'; // Higher risk levels
            }
        },
        hoverBackgroundColor: function(context) {
            return context.dataset.data[context.dataIndex].backgroundColor;
        },
        borderColor: '#FFF',
        borderWidth: 1,
        // Display count inside the bubble
       datalabels: {
            display: true,
            color: '#000',
            font: {
                weight: 'bold',
                size: 14
            },
            formatter: function(value, context) {
                return context.dataset.data[context.dataIndex].count;
            }
        }
    }]
};

// Chart.js'yi başlatma
new Chart(document.getElementById('riskMapChart').getContext('2d'), {
    type: 'bubble',
    data: riskMapData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                min: 0,
                ticks: {
                    stepSize: 1,
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'Impact'
                }
            },
            y: {
                min: 0,
                ticks: {
                    stepSize: 1,
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'Probability'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function(tooltipItem) {
                        return ''; // No title
                    },
                    label: function(tooltipItem) {
                        return `Impact: ${tooltipItem.raw.x}, Probability: ${tooltipItem.raw.y}`;
                    }
                }
            },
            legend: {
                display: false // Buradaki satırı ekleyerek legend'ı gizle
            }
        }
    }
});


const riskCategoryData = {

    datasets: [{
        data: [50, 15, 20, 20, 5, 30], // Yüzdelik dilimler
        backgroundColor: ['#FF9F40', '#36A2EB', '#FFCD56', '#4BC0C0', '#FF5A5E', '#a750ca'],
        hoverBackgroundColor: ['#FF9F40', '#36A2EB', '#FFCD56', '#4BC0C0', '#FF5A5E', '#a750ca'],
        borderColor: '#FFF',
        borderWidth: 1
    }]
};

// Chart.js'yi başlatma
new Chart(document.getElementById('riskCategoryChart').getContext('2d'), {
    type: 'pie',
    data: riskCategoryData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    title: function(tooltipItem) {
                        return 'Risk Category: ' + tooltipItem[0].label;
                    },
                    label: function(tooltipItem) {
                        return `Risk Rating: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    }
});

// Top 5 Vulnerabilities Chart Data
const topVulnerabilitiesData = {
    labels: ['Encryption Vulnerabilities', 'Excessive User Permissions', 'Dormant Accounts', 'Physical Security', 'Overly Trusting Employees'],
    datasets: [{
        label: 'Vulnerabilities',
        data: [30, 48, 35, 60, 28], // Values for each vulnerability
        backgroundColor: ['#4F27B7', '#36A2EB', '#FF9F40', '#FFCE56', '#4BC0C0'],
        borderColor: ['#4F27B7', '#36A2EB', '#FF9F40', '#FFCE56', '#4BC0C0'],
        borderWidth: 1
    }]
};

// Top 5 Risks Chart Data
const topRisksData = {
    labels: ['Risk 1', 'Risk 2', 'Risk 3', 'Risk 4', 'Risk 5'],
    datasets: [{
        label: 'Risks',
        data: [54, 18, 11, 12, 14], // Values for each risk
        backgroundColor: ['#4F27B7', '#36A2EB', '#FF9F40', '#FFCE56', '#4BC0C0'],
        borderColor: ['#4F27B7', '#36A2EB', '#FF9F40', '#FFCE56', '#4BC0C0'],
        borderWidth: 1
    }]
};

// Creating the chart for Top 5 Vulnerabilities (Horizontal Bar)
new Chart(document.getElementById('topVulnerabilitiesChart').getContext('2d'), {
    type: 'bar',
    data: topVulnerabilitiesData,
    options: {
        responsive: true,
        indexAxis: 'y',  // Yatay bar chart
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});

// Creating the chart for Top 5 Risks (Horizontal Bar)
new Chart(document.getElementById('topRisksChart').getContext('2d'), {
    type: 'bar',
    data: topRisksData,
    options: {
        responsive: true,
        indexAxis: 'y',  // Yatay bar chart
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }
});



        // Vis Timeline setup
        const container = document.getElementById('timeline');

        const statusColors = {
            'Completed': 'rgba(54, 162, 235, 0.2)',
            'In progress': 'rgba(255, 206, 86, 0.2)',
            'Fieldwork': 'rgba(255, 99, 132, 0.2)'
        };
        const statusBorderColors = {
            'Completed': 'rgba(54, 162, 235, 1)',
            'In progress': 'rgba(255, 206, 86, 1)',
            'Fieldwork': 'rgba(255, 99, 132, 1)'
        };

        const items = new vis.DataSet(records.map(record => ({
            id: record.id,
            content: record.fields["Audit Name"],
            start: new Date(record.fields["Start Date"]), // Tarih formatını düzelt
            end: new Date(record.fields["Deadline"]), // Tarih formatını düzelt
            title: `Status: ${record.fields["Status"]}`,
            className: `timeline-item-${record.fields.Status.replace(/\s+/g, '-').toLowerCase()}`,
            style: `background-color: ${statusColors[record.fields.Status]}; border-color: ${statusBorderColors[record.fields.Status]};`
        })));

        const options = {
            stack: true,
            horizontalScroll: true,
            zoomKey: 'ctrlKey',
            editable: false,
            align: 'center',
            orientation: 'top',
            min: new Date(new Date().getFullYear() - 1, 0, 1),
            max: new Date(new Date().getFullYear() + 1, 11, 31),
            start: new Date(),
            end: new Date(new Date().setMonth(new Date().getMonth() + 6))
        };

        const timeline = new vis.Timeline(container, items, options);

        // Today button functionality
        document.getElementById('today-button').addEventListener('click', () => {
            timeline.moveTo(new Date());
        });

        // Hover functionality for tooltips
        timeline.on('itemover', function (props) {
            const item = items.get(props.item);
            showTooltip(props.event, item.title);
        });

        timeline.on('itemout', function () {
            hideTooltip();
        });

        // Populate year dropdown
        const yearSelector = document.getElementById('yearSelector');
        const years = [...new Set(records.map(record => record.fields["Audit Year"]))];
        years.sort().forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelector.appendChild(option);
        });

        // Move to today on load
        timeline.moveTo(new Date());
    })
    .catch(error => console.error('Error fetching data:', error));
});

function showAuditList(audits, status) {
    const auditListWrapper = document.getElementById('auditListWrapper');
    const auditList = document.getElementById('auditList');
    const auditListTitle = document.getElementById('auditListTitle');
    auditList.innerHTML = '';

    audits.forEach(audit => {
        const li = document.createElement('li');
        li.textContent = audit;
        auditList.appendChild(li);
    });

    auditListTitle.textContent = `${status} Audit Projects`;
    auditListWrapper.style.display = 'block';

    if (currentTimeout) {
        clearTimeout(currentTimeout);
    }

    currentTimeout = setTimeout(() => {
        auditListWrapper.style.display = 'none';
    }, 5000);
}

function showTooltip(event, content) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 30) + 'px';
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.remove();
    });
}
