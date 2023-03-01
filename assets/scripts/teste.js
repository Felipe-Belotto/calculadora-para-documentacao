switch (banco.value) {

    case "caixa":
        banco.style.backgroundColor = "#11114E";
        banco.style.color = "white";

        switch (enquadramento.value) {

            case "nenhum":
                executaErro()
                resultado("Preencha todos os campos")
                break

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

    case "bb":
        banco.style.backgroundColor = "#EEAD2D";
        banco.style.color = "#010158";

        if (enquadramento.value == "mcmv") {
            if (valorCompra > limiteFGTS) {
                executaErro()
                resultado(" O valor do imóvel está acima do limite (MCMV)")
            }

        else if(enquadramento.value =="nenhum"){
                executaErro()
                resultado("Preencha todos os campos") 
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
}
