const scores = JSON.parse(localStorage.getItem('scores')) || [0, 0, 0, 0];
const labels = ['봄톤', '여름톤', '가을톤', '겨울톤'];
const totalScore = scores.reduce((acc, score) => acc + score, 0);

const percentages = scores.map(score => ((score / totalScore) * 100).toFixed(2));

const ctx = document.getElementById('resultChart').getContext('2d');
const resultChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: '퍼스널 컬러 비율 (%)',
            data: percentages,
            backgroundColor: [
                'rgba(243, 162, 159, 0.6)',
                'rgba(151, 214, 245, 0.6)',
                'rgba(221, 139, 115, 0.6)',
                'rgba(55, 61, 149, 0.6)'
            ],
            borderColor: [
                'rgba(243, 162, 159, 1)',
                'rgba(151, 214, 245, 1)',
                'rgba(221, 139, 115, 1)',
                'rgba(55, 61, 149, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        }
    }
});

const maxIndex = percentages.indexOf(Math.max(...percentages).toFixed(2));
const personalColorText = document.getElementById('personalColorText');
const colorLink = document.getElementById('colorLink');
colorLink.textContent = `당신의 퍼스널 컬러는 ${labels[maxIndex]} 입니다 >> 보러가기`;
if (maxIndex == 0) {
    colorLink.href = "https://hitostat.com/ko/tests/personal-color-test/yellow-spring";
} else if (maxIndex == 1) {
    colorLink.href = "https://hitostat.com/ko/tests/personal-color-test/blue-summer";
} else if (maxIndex == 2) {
    colorLink.href = "https://hitostat.com/ko/tests/personal-color-test/yellow-autumn";
} else {
    colorLink.href = "https://hitostat.com/ko/tests/personal-color-test/blue-winter";
}

localStorage.clear();