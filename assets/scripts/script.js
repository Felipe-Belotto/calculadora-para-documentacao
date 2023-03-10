class Documentacao {
    
    constructor(){
        this.valor = []
        this.cidadeValores = []
        this.agenciaValores = []
        this.cartorioValores = [] 
        this.enquadramentoValores = []
        this.documentacaoValores = []
    }

    lerDados(){
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

    verificaCidade(){

    switch(this.valor.cidade){
    
        case "campinas": 
        this.cidadeValores.limiteFGTS = 264000
        this.cidadeValores.itbi = this.valor.compra * 0.027
        break

        case "guarulhos": 
        this.cidadeValores.limiteFGTS = 264000
        this.cidadeValores.itbi = (0.02 * this.valor.recursosProprios) + (0.005 * this.valor.financiamento)
        break
    }
    }

    verificaAgencia(){

    switch(this.valor.agencia){

        case "0676":
        this.agenciaValores.relacionamento = 1500  
        break

        case "3231":
        this.agenciaValores.relacionamento = 800  
        break 
    }
    }

    verificaRegistro(){
    this.lerDados
    this.cartorioValores.referenciaCompra = [34260.01, 102780.01, 171300.01, 205560.01, 239820.01, 274080.01, 308340.01, 342600.01, 685200.01, 1027800.01, 1370400.01, 1713000.01, 2055600.01, Infinity]
    this.cartorioValores.referenciaValor = [1699.18, 1894.28, 2326.54, 2731.51, 2946.72 , 3163.38 ,3325.82 , 3541.74, 4638.21, 5441.15, 6244.06, 6659.19, 8734.85]
    
    for(let i = 0; i < this.cartorioValores.referenciaCompra.length - 1; i++){
        if(this.valor.compra > this.cartorioValores.referenciaCompra[i]  &&  this.valor.compra < this.cartorioValores.referenciaCompra[i + 1]){
             this.cartorioValores.registro = this.cartorioValores.referenciaValor[i]
        }
    }
    }

    verificaEnquadramento(){

        let telaEnquadramento = document.querySelector(".caixa_enquadramento")
        telaEnquadramento.classList.remove("display-none")

        switch(this.valor.banco){
    
        case "caixa":
        switch(this.valor.enquadramento){

            case "mcmv" || "proCotista": 
            this.enquadramentoValores.taxa = (this.valor.financiamento * 0.015) + 50
            break

            case "sbpe": 
            this.enquadramentoValores.taxa = 1050
            break   
        }    

        case "bb":

        switch(this.valor.enquadramento){
            

            case "mcmv" || "proCotista": 
            this.enquadramentoValores.taxa = (this.valor.financiamento * 0.015) + 50
            break

            case "sbpe": 
            this.enquadramentoValores.taxa = 1365
            break   
        }
        
        case "itau":
        
        if(this.valor.enquadramento == "nenhum"){
            this.enquadramentoValores.taxa = 1950
        }

        else{
            resultado(" No Itau não há outros enquadramentos ")
        }

        }
    }

    verificaExecucoes(){

    this.documentacaoValores.taxa = this.enquadramentoValores.taxa 
    this.documentacaoValores.relacionamento = this.agenciaValores.relacionamento
    this.documentacaoValores.itbi = this.cidadeValores.itbi
    this.documentacaoValores.registro = this.cartorioValores.registro

    let resposta = window.document.getElementById('resposta')
    let resultado = (valor) => { resposta.innerHTML = valor}
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

    if(this.valor.compra < 62000){
        executaErro()
        resultado("Valor de compra e venda inferior ao minimo " + modificaDinheiroReal(62000))
    }

    else if (this.valor.compra * 0.8 < this.valor.financiamento){
        executaErro()
        resultado("Valor de financiamento maior do que 80% do valor de compra,<br> valor possivel: " + modificaDinheiroReal(this.valor.compra * 0.8))
    }

    else {
       

    }

    console.log(this.documentacaoValores)
    }


 }

   

 let documentacao = new Documentacao();
