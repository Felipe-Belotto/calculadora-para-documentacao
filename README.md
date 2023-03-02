# calculadora-para-documentacao
calculadora para documentação de financiamento imobiliario

Esse projeto foi utilizado como estudo prático, escrevi o código durante meu início de estudo de js e fui aprimorando conforme fui adquirindo conhecimento.

[Veja o projeto pelo Vercel](https://calculadora-para-documentacao.vercel.app/)

Esse código JavaScript consiste em funções que calculam valores para a compra de imóveis com financiamento em diferentes cidades e bancos. Quando um usuário preenche informações sobre a cidade, o valor da compra, o valor do financiamento, o banco e o tipo de enquadramento, o programa calcula valores como o valor do ITBI (Imposto sobre Transmissão de Bens Imóveis), o valor da vistoria, o valor do registro de compra e o valor total da documentação.

Algumas funções relevantes incluem:

calculaDocumentacao(): esta função recebe valores do formulário e calcula o valor da documentação com base em uma série de switch cases que levam em consideração a cidade e o banco escolhidos.

calculaRegistro(): esta função recebe o valor da compra e usa-o para calcular o valor do registro de compra de acordo com as taxas cobradas em diferentes faixas de valores.

modificaDinheiroReal(): esta função recebe um valor numérico e o retorna formatado em reais (R$).

O código também inclui funções que validam se o usuário preencheu todos os campos necessários e exibem mensagens de erro ou sucesso. Além disso, há funções que copiam o valor calculado para a área de transferência do usuário e atualizam a página quando um botão é clicado.

