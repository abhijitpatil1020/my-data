document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const monthlyInvestmentInput = document.getElementById('monthly_investment');
    const monthlyInvestmentRange = document.getElementById('monthly_investment_range');
    const annualRateInput = document.getElementById('annual_rate');
    const annualRateRange = document.getElementById('annual_rate_range');
    const yearsInput = document.getElementById('years');
    const yearsRange = document.getElementById('years_range');
    const calculateBtn = document.getElementById('calculate-btn');
    const futureValueEl = document.getElementById('future_value');
    const totalInvestmentEl = document.getElementById('total_investment');
    const estimatedReturnsEl = document.getElementById('estimated_returns');
    
    // Sync range and number inputs
    monthlyInvestmentInput.addEventListener('input', function() {
        monthlyInvestmentRange.value = this.value;
    });
    
    monthlyInvestmentRange.addEventListener('input', function() {
        monthlyInvestmentInput.value = this.value;
    });
    
    annualRateInput.addEventListener('input', function() {
        annualRateRange.value = this.value;
    });
    
    annualRateRange.addEventListener('input', function() {
        annualRateInput.value = this.value;
    });
    
    yearsInput.addEventListener('input', function() {
        yearsRange.value = this.value;
    });
    
    yearsRange.addEventListener('input', function() {
        yearsInput.value = this.value;
    });
    
    // Initialize chart
    const ctx = document.getElementById('sipChart').getContext('2d');
    let sipChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    '#4361ee',
                    '#4cc9f0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: {
                            family: 'Poppins',
                            size: 14
                        }
                    }
                },
                tooltip: {
                    bodyFont: {
                        family: 'Poppins',
                        size: 14
                    },
                    titleFont: {
                        family: 'Poppins',
                        size: 14
                    }
                }
            },
            cutout: '70%'
        }
    });
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        calculateSIP();
    });
    
    // Initial calculation on page load
    calculateSIP();
    
    // Calculate SIP function
    function calculateSIP() {
        const data = {
            monthly_investment: monthlyInvestmentInput.value,
            annual_rate: annualRateInput.value,
            years: yearsInput.value
        };
        
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Format numbers with commas
                const formatCurrency = (num) => {
                    return '₹' + num.toLocaleString('en-IN');
                };
                
                futureValueEl.textContent = formatCurrency(data.future_value);
                totalInvestmentEl.textContent = formatCurrency(data.total_investment);
                estimatedReturnsEl.textContent = formatCurrency(data.estimated_returns);
                
                // Update chart
                sipChart.data.datasets[0].data = [
                    data.total_investment,
                    data.estimated_returns
                ];
                sipChart.update();
                
                // Add animation to results
                document.querySelectorAll('.result-card').forEach(card => {
                    card.style.animation = 'none';
                    void card.offsetWidth; // Trigger reflow
                    card.style.animation = 'fadeIn 0.5s ease-out';
                });
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while calculating. Please try again.');
        });
    }
    
    // Add animation for form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animation = `slideIn 0.5s ease-out ${index * 0.1}s forwards`;
        group.style.opacity = '0';
    });
    
    // Add keyframe animations to style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
});
