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
        const statusCounts = records.reduce((acc, record) => {
            const status = record.fields.Status;
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
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Status Distribution',
                    data: counts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const status = context.label;
                                const audits = statusCounts[status].audits;
                                return `Audit Projects: \n` + audits.join(', ');
                            }
                        }
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const percentage = (value / total * 100).toFixed(2) + '%';
                            return percentage;
                        },
                        color: '#000000',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
