function formataData(data) {
    const dataAtual = new Date();
    let diferenca = ((dataAtual.getTime() - data.getTime()) / 1000).toFixed(0);

    if(diferenca < 60) {
        return `Há ${diferenca === 0 ? 1: diferenca} segundos...`
    }
    if(diferenca < 3600) {
        return `Há ${(diferenca/60).toFixed(0)} minutos...`
    }
    if(diferenca < 86400) {
        return `Há ${(diferenca/3600).toFixed(0)} horas...`
    }

    diferenca = (diferenca/3600).toFixed(0);

    if(diferenca < 730) {
        return `Há ${(diferenca/24).toFixed(0)} dias...`
    }
}

module.exports = formataData;