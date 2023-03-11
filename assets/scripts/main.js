class Documentacao {

    constructor() {
        this.valor = []
        this.cidadeValores = []
        this.agenciaValores = []
        this.cartorioValores = []
        this.enquadramentoValores = []
        this.documentacaoValores = []
    }

    lerDados() {
        this.valor.compra = document.getElementById('compra').valueAsNumber
        this.valor.financiamento = document.getElementById('financiamento').valueAsNumber
        this.valor.recursosProprios = (this.valor.compra) - (this.valor.financiamento)
        this.valor.cidade = document.querySelector('#cidade').value
        this.valor.banco = document.querySelector('#banco').value
        this.valor.agencia = document.querySelector('#agencia').value
        this.valor.enquadramento = document.querySelector('#enquadramento').value

        this.verificaCidade()
        this.verificaAgencia()
        this.verificaRegistro()
        this.verificaEnquadramento()
        this.verificaExecucoes()
    }

    verificaCidade() {
        let optionCaixa= document.getElementById('caixa')
        let optionBB   = document.getElementById('bb')
        let optionItau = document.getElementById('itau')
        let option0676 = document.getElementById('0676')
        let option3231 = document.getElementById('3231')

        switch (this.valor.cidade) {

            case "campinas":
                this.cidadeValores.limiteFGTS = 264000
                this.cidadeValores.itbi = this.valor.compra * 0.027

                if(this.valor.cidade == "campinas"){
                optionBB.classList.remove("display-none")
                option0676.classList.remove("display-none")
                option3231.classList.add("display-none")
                }
                break

            case "guarulhos":
                this.cidadeValores.limiteFGTS = 264000
                this.cidadeValores.itbi = (0.02 * this.valor.recursosProprios) + (0.005 * this.valor.financiamento)
                if(this.valor.cidade == "guarulhos"){
                optionBB.classList.add("display-none")
                option3231.classList.remove("display-none")
                option0676.classList.add("display-none")
                }
                break
        }
    }

    verificaAgencia() {

        let telaAgencia = document.querySelector('.caixa_agencia')
        switch (this.valor.banco) {

            case "caixa":
                telaAgencia.classList.remove("display-none")
                switch (this.valor.agencia) {

                    case "0676":
                        this.agenciaValores.relacionamento = 1500
                        break

                    case "3231":
                        this.agenciaValores.relacionamento = 800
                        break
                }
                break

            case "bb":
                telaAgencia.classList.add("display-none")
                break

            case "itau":
                telaAgencia.classList.add("display-none")
                break
        }
    }

    verificaRegistro() {
        this.lerDados
        this.cartorioValores.referenciaCompra = [34260.01, 102780.01, 171300.01, 205560.01, 239820.01, 274080.01, 308340.01, 342600.01, 685200.01, 1027800.01, 1370400.01, 1713000.01, 2055600.01, Infinity]
        this.cartorioValores.referenciaValor = [1699.18, 1894.28, 2326.54, 2731.51, 2946.72, 3163.38, 3325.82, 3541.74, 4638.21, 5441.15, 6244.06, 6659.19, 8734.85]

        for (let i = 0; i < this.cartorioValores.referenciaCompra.length - 1; i++) {
            if (this.valor.compra > this.cartorioValores.referenciaCompra[i] && this.valor.compra < this.cartorioValores.referenciaCompra[i + 1]) {
                this.cartorioValores.registro = this.cartorioValores.referenciaValor[i]
            }
        }
    }

    verificaEnquadramento() {

        let telaEnquadramento = document.querySelector(".caixa_enquadramento")
        telaEnquadramento.classList.remove("display-none")

        switch (this.valor.banco) {

            case "caixa":

                switch (this.valor.enquadramento) {

                    case "mcmv":
                        this.enquadramentoValores.taxa = (this.valor.financiamento * 0.015) + 50
                        break

                    case "proCotista":
                        this.enquadramentoValores.taxa = (this.valor.financiamento * 0.015) + 50
                        break

                    case "sbpe":
                        this.enquadramentoValores.taxa = 1050
                        break
                }
                break


            case "bb":

                switch (this.valor.enquadramento) {

                    case "mcmv":
                        this.enquadramentoValores.taxa = (this.valor.financiamento * 0.015) + 50
                        break

                    case "proCotista":
                        this.enquadramentoValores.taxa = (this.valor.financiamento * 0.015) + 50
                        break

                    case "sbpe":
                        this.enquadramentoValores.taxa = 1365
                        break
                }
                break

            case "itau":

                telaEnquadramento.classList.add("display-none")
                this.enquadramentoValores.taxa = 1950
                break
        }
    }

    verificaExecucoes() {

        this.documentacaoValores.taxa = this.enquadramentoValores.taxa
        this.documentacaoValores.relacionamento = this.agenciaValores.relacionamento
        this.documentacaoValores.itbi = this.cidadeValores.itbi
        this.documentacaoValores.registro = this.cartorioValores.registro

        let resposta = window.document.getElementById('resposta')
        let resultado = (valor) => { resposta.innerHTML = valor }
        let modificaDinheiroReal = (valor) => { return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }); }        


        function executaErro() {
            resposta.classList.remove('caixa_reposta')
            resposta.classList.add('resposta_erro')
        }

        function validaErro() {
            resposta.classList.remove('resposta_erro')
            resposta.classList.add('caixa_reposta')
        }

        botaoCopiar.style.display = "block"
        botaoRecarregar.style.display = "block"
        resposta.style.display = "flex";

        if (this.valor.compra < 62000) {
            executaErro()
            resultado("Valor de compra e venda inferior ao minimo " + modificaDinheiroReal(62000))
        }

        else if (this.valor.compra * 0.8 < this.valor.financiamento) {
            executaErro()
            resultado("Valor de financiamento maior do que 80% do valor de compra,<br> valor possivel: " + modificaDinheiroReal(this.valor.compra * 0.8))
        }

        else if (this.valor.cidade == "nenhum" || this.valor.banco == "nenhum") {
            executaErro()
            resultado("Preencha todos os campos")
        }

        else {
            validaErro()
            switch (this.valor.banco) {
                case "caixa":
                    resultado(
                        `Taxa a vista: ${modificaDinheiroReal(this.documentacaoValores.taxa)} ` +
                        `<br>Relacionamento ${modificaDinheiroReal(this.documentacaoValores.relacionamento)} ` +
                        `<br>ITBI: ${modificaDinheiroReal(this.documentacaoValores.itbi)} ` +
                        `<br>Registro: ${modificaDinheiroReal(this.documentacaoValores.registro)} `
                    )
                    break

                case "bb":
                    resultado(
                        `Taxa a vista: ${modificaDinheiroReal(this.documentacaoValores.taxa)} ` +
                        `<br>ITBI: ${modificaDinheiroReal(this.documentacaoValores.itbi)} ` +
                        `<br>Registro: ${modificaDinheiroReal(this.documentacaoValores.registro)} `
                    )
                    break

                case "itau":
                    resultado(
                        `Taxa a vista: ${modificaDinheiroReal(this.documentacaoValores.taxa)} ` +
                        `<br>ITBI: ${modificaDinheiroReal(this.documentacaoValores.itbi)} ` +
                        `<br>Registro: ${modificaDinheiroReal(this.documentacaoValores.registro)} `
                    )
                    break
            }
        }
    }
}

let documentacao = new Documentacao();
// Adiciona um listener de eventos a cada campo de entrada
document.getElementById('compra').addEventListener('change', () => {
    documentacao.lerDados();
});
document.getElementById('financiamento').addEventListener('change', () => {
    documentacao.lerDados();
});
document.getElementById('cidade').addEventListener('change', () => {
    documentacao.lerDados();
});
document.getElementById('banco').addEventListener('change', () => {
    documentacao.lerDados();
});
document.getElementById('agencia').addEventListener('change', () => {
    documentacao.lerDados();
});
document.getElementById('enquadramento').addEventListener('change', () => {
    documentacao.lerDados();
});

//Botões
let botaoCopiar = document.getElementById('botaoCopiar')
botaoCopiar.addEventListener('click', function () {
    let valoresDocumentacao = document.getElementById('resposta')
    navigator.clipboard.writeText(valoresDocumentacao.textContent)
})

let botaoRecarregar = document.getElementById("botaoRecarregar")
botaoRecarregar.addEventListener('click', function () {
    location.reload();
});
