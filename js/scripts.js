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
                localStorage.setItem('currentUser', username);
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
    const currentUser = localStorage.getItem('currentUser');

    if (linkContainer && addLinkButton && currentUser) {
        loadLinksForUser(currentUser);

        addLinkButton.addEventListener('click', function() {
            const newLinkInput = document.createElement('input');
            newLinkInput.type = 'text';
            newLinkInput.placeholder = 'Insira o link aqui';
            newLinkInput.id = 'newLinkInput';

            const saveLinkButton = document.createElement('button');
            saveLinkButton.innerText = 'Salvar Link';

            saveLinkButton.addEventListener('click', function() {
                const linkValue = newLinkInput.value;
                if (linkValue) {
                    saveLinkForUser(currentUser, linkValue);

                    const linkItem = createLinkItem(linkValue);
                    linkContainer.insertBefore(linkItem, addLinkButton);

                    newLinkInput.remove();
                    saveLinkButton.remove();
                }
            });

            linkContainer.insertBefore(newLinkInput, addLinkButton);
            linkContainer.insertBefore(saveLinkButton, addLinkButton);
        });
    } else if (linkContainer && addLinkButton) {
        alert('Usuário não logado!');
        window.location.href = 'login.html';
    }

    function saveLinkForUser(user, link) {
        let links = JSON.parse(localStorage.getItem(user)) || [];
        links.push(link);
        localStorage.setItem(user, JSON.stringify(links));
    }

    function loadLinksForUser(user) {
        const links = JSON.parse(localStorage.getItem(user)) || [];
        linkContainer.innerHTML = '';
        linkContainer.appendChild(addLinkButton);

        links.forEach(linkValue => {
            const linkItem = createLinkItem(linkValue);
            linkContainer.insertBefore(linkItem, addLinkButton);
        });
    }

    function createLinkItem(linkValue) {
        const linkItem = document.createElement('div');
        linkItem.className = 'linkItem';

        const url = new URL(linkValue);
        const faviconUrl = `${url.origin}/favicon.ico`;

        const logoImg = document.createElement('img');
        logoImg.src = faviconUrl;
        logoImg.alt = 'favicon';
        logoImg.width = 16;
        logoImg.height = 16;

        const linkAnchor = document.createElement('a');
        linkAnchor.href = linkValue;
        linkAnchor.innerText = linkValue;

        const trashSpan = document.createElement('span');
        trashSpan.innerText = '🗑️';
        trashSpan.addEventListener('click', function() {
            removeLinkForUser(currentUser, linkValue);
            linkItem.remove();
        });

        linkItem.appendChild(logoImg);
        linkItem.appendChild(linkAnchor);
        linkItem.appendChild(trashSpan);

        return linkItem;
    }

    function removeLinkForUser(user, link) {
        let links = JSON.parse(localStorage.getItem(user)) || [];
        links = links.filter(storedLink => storedLink !== link);
        localStorage.setItem(user, JSON.stringify(links));
    }
});
