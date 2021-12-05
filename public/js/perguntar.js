document.addEventListener('keyup', (e) => {
    const botao = document.querySelector('.botao');
    const input = document.querySelector('.input');
    const textarea = document.querySelector('.text');

    if(input.value == '' || textarea.value == '') {
        botao.setAttribute('disabled', '');
    } else {
        botao.removeAttribute('disabled');
    }
})