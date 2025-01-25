let vendasDia = 0; // Total de palhas vendidas no dia
let vendas1por7 = 0; // Contador de vendas de 1 por 7
let vendas2por12 = 0; // Contador de vendas de 2 por 12
let vendasMaisDe2 = 0; // Contador de vendas com mais de 2 palhas
let palhasRestantes = 0; // Quantidade de palhas restantes no estoque

let valorTotalDia = 0; // Total de vendas no dia

// Função para exibir ou esconder a quantidade
function toggleQuantidade(exibir) {
    const quantidadeSection = document.getElementById("quantidade-section");
    if (exibir) {
        quantidadeSection.classList.remove("hidden");
    } else {
        quantidadeSection.classList.add("hidden");
    }
}

// Carregar os dados do localStorage ao carregar a página
window.onload = function () {
    // Verificar se há dados salvos no localStorage
    if (localStorage.getItem('vendasDia')) {
        vendasDia = parseInt(localStorage.getItem('vendasDia'));
        vendas1por7 = parseInt(localStorage.getItem('vendas1por7'));
        vendas2por12 = parseInt(localStorage.getItem('vendas2por12'));
        vendasMaisDe2 = parseInt(localStorage.getItem('vendasMaisDe2'));
        valorTotalDia = parseFloat(localStorage.getItem('valorTotalDia'));
        palhasRestantes = parseInt(localStorage.getItem('palhasRestantes'));
    }

    // Atualizar a interface com os dados carregados
    document.getElementById("valor-total-dia").innerText = valorTotalDia.toFixed(2);
    document.getElementById("vendas-1por7").innerText = vendas1por7;
    document.getElementById("vendas-2por12").innerText = vendas2por12;
    document.getElementById("vendas-mais-de-2").innerText = vendasMaisDe2;
    document.getElementById("total-palhas-vendidas").innerText = vendasDia;
    document.getElementById("palhas-restantes").innerText = palhasRestantes;

    // Carregar a quantidade inicial de palhas, se presente
    const quantidadeInicial = localStorage.getItem('quantidadeInicial');
    if (quantidadeInicial) {
        document.getElementById("quantidade-inicial").value = quantidadeInicial;
        palhasRestantes = parseInt(quantidadeInicial); // Definir palhasRestantes com a quantidade inicial
    }
};

// Função para registrar a venda
function registrarVenda() {
    const tipoPromocao = document.querySelector('input[name="promocao"]:checked');
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const horaInicio = document.getElementById("hora-inicio").value;
    const horaFim = document.getElementById("hora-fim").value;

    if (!tipoPromocao) {
        alert("Por favor, selecione um tipo de promoção.");
        return;
    }

    let valorVenda = 0;

    // Calcular o valor da venda com base na promoção selecionada
    if (tipoPromocao.value === "1por7" && quantidade === 1) {
        valorVenda = 7;
        vendas1por7++;
    } else if (tipoPromocao.value === "2por12") {
        // Para 2 por R$12, a quantidade já é fixa para 2
        valorVenda = 12;
        vendas2por12++;
    } else if (tipoPromocao.value === "maisDe2" && quantidade > 2) {
        valorVenda = 7 * quantidade;
        vendasMaisDe2++;
    } else {
        alert("Selecione a quantidade correta para a promoção escolhida.");
        return;
    }

    // Atualizar o total de vendas e o valor total do dia
    vendasDia += quantidade;
    valorTotalDia += valorVenda;

    // Subtrair a quantidade de palhas vendidas do estoque
    palhasRestantes -= quantidade;

    // Atualizar a interface com as informações de vendas
    document.getElementById("hora-inicio-venda").innerText = horaInicio;
    document.getElementById("hora-fim-venda").innerText = horaFim;
    document.getElementById("valor-total-dia").innerText = valorTotalDia.toFixed(2);
    document.getElementById("vendas-1por7").innerText = vendas1por7;
    document.getElementById("vendas-2por12").innerText = vendas2por12;
    document.getElementById("vendas-mais-de-2").innerText = vendasMaisDe2;
    document.getElementById("total-palhas-vendidas").innerText = vendasDia;
    document.getElementById("palhas-restantes").innerText = palhasRestantes;

    // Salvar os dados no localStorage
    localStorage.setItem('vendasDia', vendasDia);
    localStorage.setItem('vendas1por7', vendas1por7);
    localStorage.setItem('vendas2por12', vendas2por12);
    localStorage.setItem('vendasMaisDe2', vendasMaisDe2);
    localStorage.setItem('valorTotalDia', valorTotalDia);
    localStorage.setItem('palhasRestantes', palhasRestantes);

    // Salvar a quantidade inicial de palhas
    localStorage.setItem('quantidadeInicial', document.getElementById("quantidade-inicial").value);
}

