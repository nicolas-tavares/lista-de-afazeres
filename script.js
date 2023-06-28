
const localStorageKey = 'to-do-list-nt'  //'const' = variavel que nunca muda

function validateIfExistsNewTask()  //Função para ver se ja existe um item com o nome tentando ser inserido
{
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value   //Pega o valor pelo imput
    let exists     = values.find(x => x.name == inputValue)     //Verifica se x (elemento da lista) não é igual ao inputValue (elemento que vai ser adicionado)
    return !exists ? false : true   //Se não tiver, retorna falso. Se tiver, retorna true
}

function newTask()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''   //Inicia-se a pagina com uma borda vazia (caso dê erro fica vermelha)

    //Validação 
    if(!input.value){    // ! = negação , ou seja, "se não houver 'input.value'..."
    
        input.style.border = '2px solid red'  //Adiciona uma borda vermelha (sinalizando que deu erro)
        alert('Digite algo para inserir em sua lista.')
    }
    else if(validateIfExistsNewTask())
    {
        alert('Já existe uma task com essa descrição.')
    }
    else{
        //Salvar os dados no localStorage (do próprio navegador)
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]") //Converter string para array (lista)
        values.push({           //"push" -> colocar valor no array
            name: input.value   // ".value" -> pega o valor da variavel
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))  //stringify - converter string para array
        showValues()
    }
    input.value = ''   //Depois que o valor for inserido, ele limpa a variavel
}

function showValues()   //Função para mostrar abaixo do botão a lista
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''   //Iniciando a lista com nenhum elemento dentro
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['name']}<button id='button-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
        /*

        '+=' -> para adicionar sempre +1 na lista e não substituir o que ja tem

        */
    }
}

function removeItem(data)  //Função para ao clicar no check, o item da lista ser removido
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)   //Cria uma variavel index, e a define para procurar qual o elemento que tem o nome = tipo
    values.splice(index,1)  //Vê qual é o index e o deleta
    localStorage.setItem(localStorageKey,JSON.stringify(values))  //Atualiza o localStorage
    showValues()
}

showValues()    //Ao abrir a página, carregar os valores antes salvos.


