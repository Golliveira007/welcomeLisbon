"use strict"; // Modo restrito

//Verifica se cep é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido(cep.value)){
        const dados = await fetch(url);
        const addres = await dados.json();
        
        if(addres.hasOwnProperty("erro")){
            alert("CEP não encontrado");
        } else {
            preencherFormulario(addres);
        }
    } else {
        alert("CEP inválido");
    }
};

const preencherFormulario = (endereco) => {
    document.querySelector("#rua").value = endereco.logradouro;
    document.querySelector("#bairro").value = endereco.bairro;
    document.querySelector("#cidade").value = endereco.localidade;
    document.querySelector("#estado").value = endereco.estado;
}

 const limparFormulario = () => {
    document.querySelector("#rua").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#cidade").value = "";
    document.querySelector("#estado").value = "";
}

document.querySelector("#cep").addEventListener("focusout", pesquisarCep);