document.addEventListener('keyup', (e) => {
    const botao = document.querySelector('.responder');
    const textarea = document.querySelector('.text');

    if(textarea.value == '') {
        botao.setAttribute('disabled', '');
    } else {
        botao.removeAttribute('disabled');
    }
})

const div = document.querySelector('.final');
if(div !== undefined  && div !== null) {
    var heightPage = document.body.scrollHeight;
    window.scrollTo(0 , heightPage);
} 