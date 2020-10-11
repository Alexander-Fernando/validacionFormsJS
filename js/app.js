//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('form');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = 	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//EVENTS LISTENERS
eventos();
function eventos(){
    document.addEventListener('DOMContentLoaded', iniciarAPP);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    btnReset.addEventListener('click', resetFormulario);

    formulario.addEventListener('submit', enviarCorreo);

}

//funciones
function iniciarAPP(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');

}

function validarFormulario(e){
    if(e.target.value.length > 0 ){

        //ELIMINAR LOS ERRORES
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError("RELLENE TODOS LOS CAMPOS");
    }

    if(e.target.type === "email"){
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
    
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('EMAIL NO VÁLIDO');
        }
    }

    if(er.test(email.value) && asunto.value !=='' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    let numError = document.querySelectorAll('.error');
    if(numError.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarCorreo(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner');

    spinner.style.display = 'flex';
    
    setTimeout(() => {

        spinner.style.display = 'none';

        const msjEnviado = document.createElement('p');
        msjEnviado.classList.add('bg-green-500', 'text-white', 'p-3', 'my-10', 'text-center', 'font-bold', 'uppercase');
        msjEnviado.textContent = "Correo enviado....!";

        formulario.insertBefore(msjEnviado, spinner);

        setTimeout(() => {
            msjEnviado.remove();
            resetFormulario();
        }, 5000);
    }, 3000);
}

function resetFormulario(){
    formulario.reset();
    eliminarColores(email);
    eliminarColores(asunto);
    eliminarColores(mensaje);
    iniciarAPP();
}

function eliminarColores(elemento){
    elemento.classList.remove('border', 'border-red-500');
}