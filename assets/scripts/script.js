
let calcular = document.getElementById("conteudo_tela")
calcular.addEventListener('input', calculaDocumentacao)

let botaoRecarregar = document.getElementById("botaoRecarregar");

botaoRecarregar.addEventListener('click', function () {
    location.reload();
});

let modificaDinheiroReal = (valor) => { return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }); }

function calculaDocumentacao() {

    const valorCompra = window.document.getElementById('compra').valueAsNumber
    const financiamento = window.document.getElementById('financiamento').valueAsNumber
    const recursosProprios = valorCompra - financiamento
    const cidade = document.getElementById('cidade')
    const enquadramento = document.getElementById('enquadramento')
    const banco = document.getElementById('banco')

    let resposta = window.document.getElementById('resposta')

    const minimoValorDeCompra = 62500

    switch (cidade.value) {

        case "campinas":
            limiteFGTS = 264000
            relacionamento = 1500
            itbi = valorCompra * 0.027
            break

        case "guarulhos":
            limiteFGTS = 264000
            relacionamento = 500
            itbi = (financiamento * 0.005) + (recursosProprios * 0.02)
            break
    }

    switch (banco.value) {
        case "caixa":
            switch (enquadramento.value) {
                case "mcmv": vistoria = financiamento * 0.015
                    break
                case "pro_cotista": vistoria = financiamento * 0.015
                    break
                case "sbpe": vistoria = 955
                    break
            }
            break

        case "bb": vistoria = 1350
            break

        case "itau": vistoria = 1950
            break
    }

    function calculaRegistro(valorCompra) {
        const valoresRegistro = [
            { valorMin: 34260.01, valorMax: 102780, valor: 1699.18 },
            { valorMin: 102780.01, valorMax: 171300, valor: 1894.28 },
            { valorMin: 171300.01, valorMax: 205560, valor: 2326.54 },
            { valorMin: 205560.01, valorMax: 239820.01, valor: 2731.51 },
            { valorMin: 239820.01, valorMax: 274080.01, valor: 2946.72 },
            { valorMin: 274080.01, valorMax: 308340.01, valor: 3163.38 },
            { valorMin: 308340.01, valorMax: 342600.01, valor: 3325.82 },
            { valorMin: 342600.01, valorMax: 685200.01, valor: 3541.74 },
            { valorMin: 685200.01, valorMax: 1027800.01, valor: 4638.21 },
            { valorMin: 1027800.01, valorMax: 1370400.01, valor: 5441.15 },
            { valorMin: 1370400.01, valorMax: 1713000.01, valor: 6244.06 },
            { valorMin: 1713000.01, valorMax: 2055600.01, valor: 6659.19 },
            { valorMin: 2055600.01, valorMax: 3426000, valor: 8734.85 },]

        let Cartorio = valoresRegistro.find(valorCartorio => valorCompra > valorCartorio.valorMin && valorCompra < valorCartorio.valorMax)

        if (!Cartorio) {
            return registro = "Compra e venda fora do limite da nossa programação"
        }
        return registro = Cartorio.valor
    }

    function imprimeResultado() {
        botaoRecarregar.style.display = "block"
        resposta.style.display = "flex";
        maximoFinanciamento = valorCompra * 0.8
        resultado = (valor) => { resposta.innerHTML = valor }

        function executaErro() {
            resposta.classList.remove('caixa_reposta')
            resposta.classList.add('resposta_erro')
        }

        function validaErro() {
            resposta.classList.remove('resposta_erro')
            resposta.classList.add('caixa_reposta')
        }

        if (Number(valorCompra) < minimoValorDeCompra) {
            executaErro()
            resultado(`O valor de compra precisa ser no minimo ${modificaDinheiroReal(minimoValorDeCompra)}`)
        }

        else if (financiamento > maximoFinanciamento) {
            executaErro()
            resultado(`O valor do financiamento máximo é ${modificaDinheiroReal(maximoFinanciamento)}`)
        }


        switch (banco.value) {

            case "nenhum":
                executaErro()
                resultado("Preencha todos os campos")
                break

            case "caixa":
                banco.style.backgroundColor = "blue";
                banco.style.color = "white";

                switch (enquadramento.value) {

                    case "mcmv":
                        if (valorCompra > limiteFGTS) {
                            executaErro()
                            resultado(" O valor do imóvel está acima do limite (MCMV)")
                        }
                        else {
                            validaErro()
                            resultado(
                                `TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
                                + `<br>` + `RELACIONAMENTO: ${modificaDinheiroReal(relacionamento)}`
                                + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
                                + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
                        }
                        break

                    case "pro_cotista":
                        validaErro()
                        resultado(
                            `TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
                            + `<br>` + `RELACIONAMENTO: ${modificaDinheiroReal(relacionamento)}`
                            + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
                            + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
                        break

                    case "sbpe":
                        validaErro()
                        resultado(
                            `TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
                            + `<br>` + `RELACIONAMENTO: ${modificaDinheiroReal(relacionamento)}`
                            + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
                            + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
                            break
                        }
            break
               

            case "bb":
                banco.style.backgroundColor = "#EEAD2D";
                banco.style.color = "#010158";

                if (enquadramento.value == "mcmv") {
                    if (valorCompra > limiteFGTS) {
                        executaErro()
                        resultado(" O valor do imóvel está acima do limite (MCMV)")
                    }

                    else {
                        validaErro()
                        resultado(`TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
                            + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
                            + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
                    }
                }
                break

            case "itau":
                banco.style.backgroundColor = "#D75413";
                banco.style.color = "#010158";

                validaErro()
                resultado(`TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
                    + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
                    + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
                break
        }
    }

    calculaRegistro(valorCompra)
    imprimeResultado()
}