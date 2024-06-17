document.addEventListener('DOMContentLoaded', function () {
    var inputs = document.querySelectorAll('.input_inside');

    inputs.forEach(function (input) {
        // Verificar se o input já contém texto ao carregar a página
        if (input.value !== '') {
            input.classList.add('not-empty');
        }

        // Adicionar evento de input para verificar o valor enquanto o usuário digita
        input.addEventListener('input', function () {
            if (input.value !== '') {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });

        // Adicionar evento de blur para verificar o valor quando o usuário sai do campo
        input.addEventListener('blur', function () {
            if (input.value !== '') {
                input.classList.add('not-empty');
            } else {
                input.classList.remove('not-empty');
            }
        });

        // Adicionar evento de focus para garantir a classe 'not-empty' durante o foco
        input.addEventListener('focus', function () {
            if (input.value !== '') {
                input.classList.add('not-empty');
            }
        });
    });

    function addUser(username, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Cadastro realizado com sucesso!");
    }

    function checkUser(username, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.username === username && user.password === password);
    }

    // Registrar
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('userName').value;
            const password = document.getElementById('userPassword').value;

            addUser(username, password);

            alert('Usuário cadastrado com sucesso!');
            registerForm.reset();
            window.location.href = "login.html";
        });
    }

    // Logar
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('loginUserName').value;
            const password = document.getElementById('loginUserPassword').value;

            if (username === "clean" && password === "true") {
                alert("LocalStorage limpado");
                localStorage.clear();
            } else if (checkUser(username, password)) {
                alert('Login bem-sucedido!');
                window.location.href = "perfil.html"; 
            } else {
                alert('Nome de usuário ou senha incorretos!');
            }

            loginForm.reset();
        });
    }
    // Cadastro de links
        const linkContainer = document.getElementById('linkContainer');
        const addLinkButton = document.getElementById('addLinkButton');
    
        addLinkButton.addEventListener('click', function() {
            // Cria um novo campo de entrada para o link
            const newLinkInput = document.createElement('input');
            newLinkInput.type = 'text';
            newLinkInput.placeholder = 'Insira o link aqui';
            newLinkInput.id = 'newLinkInput';
    
            // Cria um botão para salvar o link
            const saveLinkButton = document.createElement('button');
            saveLinkButton.innerText = 'Salvar Link';
    
            // Adiciona eventos ao botão de salvar
            saveLinkButton.addEventListener('click', function() {
                const linkValue = newLinkInput.value;
                if (linkValue) {
                    // Cria um novo item de link
                    const linkItem = document.createElement('div');
                    linkItem.className = 'linkItem';
    
                    // Obtém o domínio do link
                    const url = new URL(linkValue);
                    const faviconUrl = `${url.origin}/favicon.ico`;
    
                    // Cria o elemento de imagem para o favicon
                    const logoImg = document.createElement('img');
                    logoImg.src = faviconUrl;
                    logoImg.alt = 'favicon';
                    logoImg.width = 16;
                    logoImg.height = 16;
    
                    const linkAnchor = document.createElement('a');
                    linkAnchor.href = linkValue;
                    linkAnchor.innerText = linkValue;
    
                    const trashSpan = document.createElement('span');
                    trashSpan.innerText = 'lixeira';
    
                    // Adiciona os elementos ao item de link
                    linkItem.appendChild(logoImg);
                    linkItem.appendChild(linkAnchor);
                    linkItem.appendChild(trashSpan);
    
                    // Adiciona o novo item ao contêiner de links
                    linkContainer.insertBefore(linkItem, addLinkButton);
    
                    // Limpa o campo de entrada e remove os botões
                    newLinkInput.remove();
                    saveLinkButton.remove();
                }
            });
    
            // Adiciona os novos elementos ao DOM
            linkContainer.insertBefore(newLinkInput, addLinkButton);
            linkContainer.insertBefore(saveLinkButton, addLinkButton);
        });
    
    
});
