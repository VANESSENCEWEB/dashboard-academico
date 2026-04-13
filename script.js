document.addEventListener("DOMContentLoaded", () => {

const disciplinas = ["Programação", "Engenharia de Software", "Banco de Dados", "Redes", "Design", "Estatística"];

const dadosNotas = {
  labels: ["Bimestre 1", "Bimestre 2", "Bimestre 3", "Bimestre 4"],
  datasets: [
    {
      label: "Programação",
      data: [7.5, 8.0, 8.5, 9.0],
      borderColor: "#4BC0C0",
      backgroundColor: "rgba(75, 192, 192, 0.12)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5
    },
    {
      label: "Engenharia de Software",
      data: [7.0, 8.0, 8.5, 9.0],
      borderColor: "#F97316",
      backgroundColor: "rgba(249, 115, 22, 0.12)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5
    },
    {
      label: "Banco de Dados",
      data: [6.5, 7.5, 8.0, 8.5],
      borderColor: "#36A2EB",
      backgroundColor: "rgba(54, 162, 235, 0.12)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5
    },
    {
      label: "Redes",
      data: [7.5, 8.5, 9.0, 9.5],
      borderColor: "#FFCE56",
      backgroundColor: "rgba(255, 206, 86, 0.12)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5
    },
    {
      label: "Design",
      data: [9.0, 9.2, 9.5, 9.8],
      borderColor: "#A855F7",
      backgroundColor: "rgba(168, 85, 247, 0.12)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5
    },
    {
      label: "Estatísticas",
      data: [9.5, 7.0, 7.5, 9.2],
      borderColor: "#E11D48",
      backgroundColor: "rgba(225, 29, 72, 0.12)",
      fill: true,
      tension: 0.4,
      borderWidth: 2.5
    }
  ]
};

const dadosFrequencia = [95, 87, 92, 90, 70, 64];
const dadosTempoEstudo = [8, 6, 5, 4, 3, 2];

console.log("Dados Carregados!");

Chart.defaults.color = "#f1f5f9";
Chart.defaults.font.family = "'Segoe UI', sans-serif";

const ctxNotas = document.getElementById("graficoNotas");
new Chart(ctxNotas, {
  type: "line",
  data: dadosNotas,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1400, easing: "easeInOutQuart" },
    plugins: {
      title: {
        display: true,
        text: "Evolução das Notas por Bimestre",
        color: "#f1f5f9",
        font: { size: 16, weight: "bold" }
      },
      legend: {
        position: "top",
        labels: { color: "#cbd5e1", padding: 15 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: { display: true, text: "Nota (0-10)" }
      }
    }
  }
});

    
const corPorFrequencia = (valor) => {
        if (valor > 90) return "rgba(34, 197, 94, 0.8)";
        if (valor >= 80) return "rgb(245, 214, 11)";
        return "rgba(225, 29, 72, 0.8)";
    };

    const bordaPorFrequencia = (valor) => {
        if (valor > 90) return "rgba(34, 197, 94, 1)";
        if (valor >= 80) return "rgb(245, 194, 11)";
        return "rgba(225, 29, 72, 1)";
    };


    const ctxFrequencia = document.getElementById("graficoFrequencia");
    new Chart(ctxFrequencia, {
        type: "bar",
        data: {
            labels: disciplinas,
            datasets: [{
                label: "Frequência (%)",
                data: dadosFrequencia,
                backgroundColor: dadosFrequencia.map(corPorFrequencia),
                borderColor: dadosFrequencia.map(bordaPorFrequencia),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Frequência por Disciplina (%)",
                    color: "#f1f5f9",
                    font: { size: 16, weight: "bold" }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const valor = context.parsed.y;
                            let status = "";
                            if (valor > 90) status = " (Excelente)";
                            else if (valor >= 80) status = " (Bom)";
                            else status = " (Baixo)";
                            return `${valor}%${status}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { callback: (value) => `${value}%` },
                    title: { display: true, text: "Percentual" }
                }
            }
        }
    });


    const totalHoras = dadosTempoEstudo.reduce((acc, n) => acc + n, 0);
    const labelsTempo = disciplinas.map((disciplina, index) => {
        const percentual = ((dadosTempoEstudo[index] / totalHoras) * 100).toFixed(1);
        return `${disciplina} (${percentual}%)`;
    });

    const ctxTempo = document.getElementById("graficoTempo");
    new Chart(ctxTempo, {
        type: "pie",
        data: {
            labels: labelsTempo,
            datasets: [{
                data: dadosTempoEstudo,
                backgroundColor: ["#4BC0C0", "#F97316", "#36A2EB",
                                 "#FFCE56", "#A855F7", "#E11D48"],
                borderColor: "#1e293b",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1400,
                easing: "easeInOutQuart"
            },
            plugins: {
                title: {
                    display: true,
                    text: "Tempo de Estudo Semanal",
                    color: "#f1f5f9",
                    font: { size: 16, weight: "bold" }
                },
                legend: {
                    position: "right",
                    labels: { color: "#cbd5e1", padding: 15 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const horas = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentual = ((horas / total) * 100).toFixed(1);
                            return ` ${horas}h (${percentual}%)`;
                        }
                    }
                }
            }
        }
    });

});
