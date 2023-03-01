
    let calcular = document.getElementById("conteudo_tela")
    calcular.addEventListener('input',calculaDocumentacao)

    let botaoRecarregar = document.getElementById("botaoRecarregar")
    botaoRecarregar.addEventListener('click',recarregaPagina)

    let esconder = (referencia) => {referencia.style.display="none";}

    function recarregaPagina(){
        location.reload()
    }

    function calculaDocumentacao (){

    let cidade = document.getElementById('cidade')
    let enquadramento = document.getElementById('enquadramento')
    let banco = document.getElementById('banco')
    const valorCompra = window.document.getElementById('compra').valueAsNumber
    const financiamento = window.document.getElementById('financiamento').valueAsNumber
    const recursosProprios = valorCompra - financiamento
    let resposta = window.document.getElementById('resposta')

    const minimoValorDeCompra = 62500
    /* Valores de Campinas */
    const limiteFGTSCampinas = 264000
    const relacionamentoCampinas = 1200
    const itbiCampinas = valorCompra * 0.027
    /* Valores de Guarulhos */
    const limiteFGTSGuarulhos = 264000
    const relacionamentoGuarulhos= 500
    const itbiGuarulhos=(financiamento * 0.005) + (recursosProprios * 0.02)

    let modificaDinheiroReal = (valor) => {return valor.toLocaleString('pt-br',{style:'currency', currency:'BRL'});}

    function calculaVistoria(){
    if (banco.value == "caixa"){
    if (enquadramento.value == "mcmv") {return vistoria = financiamento * 0.015}
    else if (enquadramento.value == "pro_cotista"){return vistoria = financiamento * 0.015}
    else if (enquadramento.value == "sbpe") {return vistoria = 955}
    }

    else if (banco.value == "bb"){return vistoria = 1350}

    else if (banco.value == "itau"){return vistoria = 1950}

}

    function calculaRegistro(valorCompra){
/* Valores dos serviços cartórarios sem desconto, usando a tabela de SP como refêrencia */
    if (valorCompra > 34260.01  && valorCompra < 102780 )         
    {return registro = 1699.18}
    else if (valorCompra > 102780.01 && valorCompra < 171300)     
    {return registro = 1894.28}
    else if (valorCompra > 171300.01 && valorCompra < 205560)     
    {return registro = 2326.54}
    else if (valorCompra > 205560.01 && valorCompra < 239820.01)  
    {return registro = 2731.51}
    else if (valorCompra > 239820.01 && valorCompra < 274080.01)  
    {return registro = 2946.72}
    else if (valorCompra > 274080.01 && valorCompra < 308340.01)  
    {return registro = 3163.38}
    else if (valorCompra > 308340.01 && valorCompra < 342600.01)  
    {return registro = 3325.82}
    else if (valorCompra > 342600.01 && valorCompra < 685200.01)  
    {return registro = 3541.74}
    else if (valorCompra > 685200.01 && valorCompra < 1027800.01) 
    {return registro = 4638.21}
    else if (valorCompra > 1027800.01 && valorCompra < 1370400.01)
    {return registro = 5441.15}
    else if (valorCompra > 1370400.01 && valorCompra < 1713000.01)
    {return registro = 6244.06}
    else if (valorCompra > 1713000.01 && valorCompra < 2055600.01)
    {return registro = 6659.19}
    else if (valorCompra > 2055600.01 && valorCompra < 3426000)   
    {return registro = 8734.85}
    else {registro = "Compra e venda fora do limite da nossa programação"}}

    function imprimeResultado(){
    botaoRecarregar.style.display="block"
    resposta.style.display="flex";
    maximoFinanciamento = valorCompra * 0.8
    resultado = (valor) =>{ resposta.innerHTML = valor}

    function executaErro() {
        resposta.classList.remove('caixa_reposta')
        resposta.classList.add('resposta_erro')
    }

    function validaErro(){
        resposta.classList.remove('resposta_erro')
        resposta.classList.add('caixa_reposta')
    }

    if (Number(valorCompra) < minimoValorDeCompra){
        executaErro() 
        resultado(`O valor de compra precisa ser no minimo ${modificaDinheiroReal(minimoValorDeCompra)}`)}

    else if(financiamento > maximoFinanciamento){
        executaErro()
        resultado(`O valor do financiamento máximo é ${modificaDinheiroReal(maximoFinanciamento)}`)} 
 
    else if(banco.value == "caixa") {
        banco.style.backgroundColor="#11114E";
        banco.style.color="white";

        if (enquadramento.value == "mcmv"){
            if (valorCompra > limiteFGTS){
                executaErro()
                resultado(" O valor do imóvel está acima do limite (MCMV)")
            }
            else {
            validaErro()
            resultado(
            `TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
             + `<br>` + `RELACIONAMENTO: ${modificaDinheiroReal(relacionamento)}`
             + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
             + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)  }
        }
        
        else if (enquadramento.value == "nenhum"){
            executaErro()
            resultado("Preencha todos os campos") 
        }

        else {
            validaErro()
            resultado(`TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
             + `<br>` + `RELACIONAMENTO: ${modificaDinheiroReal(relacionamento)}`
             + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
             + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
        } }

        else if(banco.value == "bb") {
        banco.style.backgroundColor="#EEAD2D";
        banco.style.color="#010158";

        if (enquadramento.value == "mcmv"){
            if (valorCompra > limiteFGTS){
                executaErro()
                resultado(" O valor do imóvel está acima do limite (MCMV)")}

            else{ 
            validaErro()
            resultado(`TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
             + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
             + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`) }
        }

        else if (enquadramento.value == "nenhum"){
            executaErro()
            resultado("Preencha todos os campos")
        }

        else{
            validaErro()
            resultado(`TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
             + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
             + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`)
        }}
        
        else if (banco.value == "itau") {
        banco.style.backgroundColor="#D75413";
        banco.style.color="#010158";
            validaErro()
            resultado(`TAXA A VISTA: ${modificaDinheiroReal(vistoria)} `
             + `<br>` + `ITBI: ${modificaDinheiroReal(itbi)}`
             + `<br>` + `REGISTRO: ${modificaDinheiroReal(registro)}`) 
        }}

    /* CAMPINAS */
    if(cidade.value == "campinas"){
    limiteFGTS = limiteFGTSCampinas
    relacionamento = relacionamentoCampinas
    itbi = itbiCampinas   }
    
    /* GUARULHOS */
    else if(cidade.value == "guarulhos"){
    limiteFGTS = limiteFGTSGuarulhos
    relacionamento = relacionamentoGuarulhos
    itbi = itbiGuarulhos  } 

    calculaVistoria()
    calculaRegistro(valorCompra)
    imprimeResultado()
    }

