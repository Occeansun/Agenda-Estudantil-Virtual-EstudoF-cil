const entrar = () => {

    let username = document.querySelector('.usernameField').value

    if(username.length < 3 || username.length > 15){



        alert('Insira entre 3 e 15 caracteres')

    }else{


        localStorage.setItem('username', username)

        window.location = './index.html'

    }
}