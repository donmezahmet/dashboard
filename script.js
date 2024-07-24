let currentTimeout;
document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'paterprymY3bvNFEU.4dc918b6de1a00a553b4eff674b73e039f2daa5b5c2f9414607e5af126a2987d';
    const baseId = 'apptCUn5WwTZtUzr9';
    const tableName = 'Audit Projects';
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const records = data.records;
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
        const statusCounts = records.reduce((acc, record) => {
            const status = record.fields.Status;
            const year = record.fields["Audit Year"];
            if (!acc[status]) {
                acc[status] = {
                    count: 0,
                    audits: []
                };
            }
            acc[status].count++;
            acc[status].audits.push(record.fields["Audit Name"]);
            return acc;
        }, {});

        const labels = Object.keys(statusCounts);
        const counts = labels.map(label => statusCounts[label].count);
        const total = counts.reduce((acc, count) => acc + count, 0);

        const ctx = document.getElementById('statusChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Status Distribution',
                    data: counts,
                    backgroundColor: labels.map(label => statusColors[label]),
                    borderColor: labels.map(label => statusBorderColors[label]),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const percentage = (value / total * 100).toFixed(2) + '%';
                            return percentage;
                        },
                        color: '#000',
                        font: {
                            weight: 'bold'
                        }
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                onClick: (evt, item) => {
                    if (item.length > 0) {
                        const index = item[0].index;
                        const status = labels[index];
                        const audits = statusCounts[status].audits;

                        if (currentTimeout) {
                            clearTimeout(currentTimeout);
                        }

                        showAuditList(audits, status);
                    }
                }
            },
            plugins: [ChartDataLabels]
        });

        // Vis Timeline setup
        const container = document.getElementById('timeline');
        const items = new vis.DataSet(records.map(record => ({
            id: record.id,
            content: record.fields["Audit Name"],
            start: record.fields["Start Date"],
            end: record.fields["Deadline"],
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
            min: new Date(new Date().getFullYear() - 1, 0, 1), // start from January of the previous year
            max: new Date(new Date().getFullYear() + 1, 11, 31), // end at December of the next year
            start: new Date(), // Start at today's date
            end: new Date(new Date().setMonth(new Date().getMonth() + 6)) // End 6 months from today's date
        };

        const timeline = new vis.Timeline(container, items, options);

        // Add today button functionality
        document.getElementById('today-button').addEventListener('click', () => {
            timeline.moveTo(new Date());
        });

        // Add hover functionality
        timeline.on('itemover', function (props) {
            const item = items.get(props.item);
            showTooltip(props.event, item.title);
        });

        timeline.on('itemout', function (props) {
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
