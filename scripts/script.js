const itens = []

const buscaRapida = () => {

    let lista = document.querySelector('#lista')
    lista.innerHTML = ''

    let indice = document.querySelector('.barraDeBusca').value

    indice = indice.trim()

    indice = indice.toLowerCase()

    itens.forEach(element => {
        if(element.nota.toLowerCase().includes(indice)) {

            mostrarNota(element.nota, element.materia)

        }
    });


}

function abrirModal() {

    let modal = document.querySelector('#modal')

    modal.classList.remove('esconde')

}

function fecharModal() {

    let modal = document.querySelector('#modal')
    document.querySelector('#conteudoDaNota').value = ''

    modal.classList.add('esconde')

}

function adicionarNota(){

    let conteudo = document.querySelector('#conteudoDaNota').value
    let select = document.querySelector('#selectLinguagens')
    let linguagem = select.options[select.selectedIndex].value

    let modelo = {
            nota: conteudo,
            materia: linguagem
    }

    if(conteudo.length == 0){

        alert('*Adicione uma nota')

    }else{

        itens.push(modelo)

        recarregarLista()

        fecharModal()

    }

}

function mostrarNota(nota, linguagem, indice) {

    let lista = document.querySelector('#lista')

    lista.innerHTML += `
                        <div class="item">

                            <div class="tituloNota">${nota}<button class="remover" onclick='remover(${indice})'>REMOVER</button></div>
                            <div class="tipoNota">${linguagem}</div>

                        </div>
                        `

}

function recarregarLista() {

    let lista = document.querySelector('#lista')
    lista.innerHTML = ''

    itens.forEach(element => {
        const i = itens.indexOf(element)
        
        mostrarNota(element.nota, element.materia, i)
    });

    function adicionaBrilhoAoTodos () {

        let todos = document.querySelector('.aTodos')
        todos.classList.add('selecionado')

        let html = document.querySelector('.aHTML')
        let css = document.querySelector('.aCSS')
        let js = document.querySelector('.aJavaScript')
        let java = document.querySelector('.aJAVA')
        let phyton = document.querySelector('.aPhyton')

        html.classList.remove('selecionado')
        js.classList.remove('selecionado')
        css.classList.remove('selecionado')
        java.classList.remove('selecionado')
        phyton.classList.remove('selecionado')
        
    }        adicionaBrilhoAoTodos ()

}

function remover(indice){

    itens.splice(indice, 1)

    recarregarLista()

}

function recarregarItensEspecificos(item){

    let lista = document.querySelector('#lista')
    lista.innerHTML = ''

    itens.forEach(element => {
        
        if(element.materia == item){

            mostrarNota(element.nota, element.materia)

        }

    });

    mudaACorDoSelecionado(item)

}

function mudaACorDoSelecionado(parametro){

    let todos = document.querySelector('.aTodos')
    let html = document.querySelector('.aHTML')
    let css = document.querySelector('.aCSS')
    let js = document.querySelector('.aJavaScript')
    let java = document.querySelector('.aJAVA')
    let phyton = document.querySelector('.aPhyton')

    todos.classList.remove('selecionado')
    html.classList.remove('selecionado')
    js.classList.remove('selecionado')
    css.classList.remove('selecionado')
    java.classList.remove('selecionado')
    phyton.classList.remove('selecionado')

    let indice = document.querySelector(`.a${parametro}`)

    indice.classList.add('selecionado')

}

function limpaBarraDebusca () {

    document.querySelector('.barraDeBusca').value = ''

    recarregarLista()

}

const username = localStorage.getItem('username')

const userPlace = document.querySelector('.username')
userPlace.innerHTML = username

document.addEventListener('keyup', buscaRapida)