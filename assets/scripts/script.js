class Documentacao {
    
    constructor(){
        this.valor = []
        this.cidadeValores = []
        this.agenciaValores = []
        this.cartorioValores = [] 
        this.enquadramentoValores = []
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

        console.log(this.cidadeValores)
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
    console.log(this.agenciaValores)
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
    console.log(this.cartorioValores)
    }

    verificaEnquadramento(){

        switch(this.valor.enquadramento){

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
        console.log(this.enquadramentoValores)
    }


 }

   

 let documentacao = new Documentacao();
