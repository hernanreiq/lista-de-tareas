var alerta = document.getElementById('alerta');
var titulo_formulario = document.getElementById('titulo-formulario');
var descripcion_formulario = document.getElementById('descripcion-formulario');
var guardar_formulario = document.getElementById('guardar-formulario');

var contenedor_tareas = document.getElementById('contenedor-tareas');
var matrizTareas = [];
var tareasCompletadas = 0;
var indiceTarea = -1;

var fecha = new Date();

guardar_formulario.addEventListener('click', comprobarCampos);

function comprobarCampos() {
    if (titulo_formulario.value == "" || descripcion_formulario.value == "") {
        alerta.innerText = "Debe llenar los campos antes de guardar";
        alerta.style.display = "block";
        alerta.classList.remove('correcto');
        setTimeout(() => {
            alerta.innerText = "";
            alerta.style.display = "none";
        }, 5000);
    } else {
        guardarTarea();
    }
}

function guardarTarea() {
    indiceTarea += 1;
    var article = document.createElement('article');
    article.classList.add('tarea');
    article.setAttribute('id', 'articulo-' + indiceTarea);

    var h2 = document.createElement('h2');
    var textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', 'readonly');

    var a_borrar = document.createElement('a');
    a_borrar.href = "javascript:void(0)";
    a_borrar.classList.add('borrar');
    a_borrar.innerHTML = "Borrar <i class=\"fas fa-trash-alt\"></i>";

    var marcar_completada = document.createElement('a');
    marcar_completada.href = "javascript:void(0)";
    marcar_completada.classList.add('marcar-completado');
    marcar_completada.innerHTML = "Marcar como completado <i class=\"fas fa-check-circle\"></i>";
    marcar_completada.setAttribute('id', 'completado-' + indiceTarea);

    var marcar_incompleta = document.createElement('a');
    marcar_incompleta.href = "javascript:void(0)";
    marcar_incompleta.classList.add('marcar-incompleta');
    marcar_incompleta.innerHTML = "Marcar como incompleta <i class=\"fas fa-recycle\"></i>";
    marcar_incompleta.setAttribute('id', 'incompleta-' + indiceTarea);
    marcar_incompleta.style.display = "none";

    var titulo_tarea = titulo_formulario.value;
    titulo_formulario.value = "";
    h2.innerText = titulo_tarea;
    var descripcion_tarea = descripcion_formulario.value;
    descripcion_formulario.value = "";
    textarea.value = descripcion_tarea;

    article.appendChild(h2);
    article.appendChild(textarea);
    article.appendChild(a_borrar);
    article.appendChild(marcar_completada);
    article.appendChild(marcar_incompleta);

    alerta.innerText = "Tarea guardada con éxito";
    alerta.style.display = "block";
    alerta.classList.add('correcto');
    setTimeout(() => {
        alerta.innerText = "";
        alerta.style.display = "none";
        alerta.classList.remove('correcto');
    }, 5000);

    a_borrar.setAttribute('onclick', 'borrarTarea(' + indiceTarea + ')');
    marcar_completada.setAttribute('onclick', 'tareaCompletada(' + indiceTarea + ')');
    marcar_incompleta.setAttribute('onclick', 'tareaIncompleta(' + indiceTarea + ')');

    matrizTareas.push(article);
    contenedor_tareas.appendChild(matrizTareas[indiceTarea]);
    actualizarPorcentaje();
}

function borrarTarea(tareaElegida) {
    if ((matrizTareas[tareaElegida].className).substring(6, 16) == "completada") {
        tareasCompletadas -= 1;
    }
    contenedor_tareas.removeChild(matrizTareas[tareaElegida]);
    alerta.innerText = "Tarea eliminada";
    alerta.style.display = "block";
    alerta.classList.add('correcto');
    setTimeout(() => {
        alerta.innerText = "";
        alerta.style.display = "none";
        alerta.classList.remove('correcto');
    }, 5000);
    actualizarPorcentaje();
}

function tareaCompletada(tareaElegida) {
    tareasCompletadas += 1;
    matrizTareas[tareaElegida].classList.add('completada');

    var ocultarBotonCompletado = document.getElementById('completado-' + tareaElegida);
    ocultarBotonCompletado.style.display = "none";

    var mostrarBotonIncompleta = document.getElementById('incompleta-' + tareaElegida);
    mostrarBotonIncompleta.style.display = "inline";

    alerta.innerText = "Nueva tarea completada";
    alerta.style.display = "block";
    alerta.classList.add('correcto');
    setTimeout(() => {
        alerta.innerText = "";
        alerta.style.display = "none";
        alerta.classList.remove('correcto');
    }, 5000);
    asignarDatos(tareaElegida);
    actualizarPorcentaje();
}

function tareaIncompleta(tareaElegida) {
    tareasCompletadas -= 1;
    matrizTareas[tareaElegida].classList.remove('completada');
    var mostrarBotonCompletado = document.getElementById('completado-' + tareaElegida);
    mostrarBotonCompletado.style.display = "inline";

    var ocultarBotonIncompleta = document.getElementById('incompleta-' + tareaElegida);
    ocultarBotonIncompleta.style.display = "none";

    alerta.innerText = "Tarea cambiada a incompleta";
    alerta.style.display = "block";
    alerta.classList.add('correcto');
    setTimeout(() => {
        alerta.innerText = "";
        alerta.style.display = "none";
        alerta.classList.remove('correcto');
    }, 5000);
    quitarDatos(tareaElegida);
    actualizarPorcentaje();
}

function actualizarPorcentaje() {
    if (contenedor_tareas.childElementCount > 0) {
        var porcentajeCompletadas = Math.round((tareasCompletadas / contenedor_tareas.childElementCount) * 100, 2);
        var porciento = document.getElementById('porciento');
        porciento.innerText = porcentajeCompletadas + "%";
        porciento.style.width = porcentajeCompletadas + "%";
    } else {
        var porciento = document.getElementById('porciento');
        porciento.innerText = "0%";
        porciento.style.width = 0 + "%";
    }
}

function asignarDatos(tareaElegida) {
    fechaActual();
    console.log(matrizTareas[tareaElegida]);
    var span_sello = document.createElement('span');
    span_sello.classList.add('sello');
    span_sello.style.display = "block";
    span_sello.innerHTML = "Completada <i class=\"fas fa-check-circle\"></i>";
    span_sello.setAttribute('id', 'sello-' + tareaElegida);
    var span_fecha = document.createElement('span');
    span_fecha.classList.add('fecha');
    span_fecha.style.display = "block";
    span_fecha.setAttribute('id', 'fecha-' + tareaElegida);
    span_fecha.innerHTML = mesTexto + " - " + fecha.getDate() + " - " + fecha.getFullYear();
    matrizTareas[tareaElegida].appendChild(span_sello);
    matrizTareas[tareaElegida].appendChild(span_fecha);
}

var mes = fecha.getMonth();
var mesTexto;

function fechaActual() {
    switch (mes) {
        case 0:
            mesTexto = "Enero";
            break;

        case 1:
            mesTexto = "Febrero";
            break;

        case 2:
            mesTexto = "Marzo";
            break;

        case 3:
            mesTexto = "Abril";
            break;

        case 4:
            mesTexto = "Mayo";
            break;

        case 5:
            mesTexto = "Junio";
            break;

        case 6:
            mesTexto = "Julio";
            break;

        case 7:
            mesTexto = "Agosto";
            break;

        case 8:
            mesTexto = "Septiembre";
            break;

        case 9:
            mesTexto = "Octubre";
            break;

        case 10:
            mesTexto = "Noviembre";
            break;

        case 11:
            mesTexto = "Diciembre";
            break;
        default:
            mesTexto = "Ninguno";
            break;
    }
}

function quitarDatos(tareaElegida) {
    var span_sello = document.getElementById('sello-' + tareaElegida);
    var span_fecha = document.getElementById('fecha-' + tareaElegida);
    span_sello.parentNode.removeChild(span_sello);
    span_fecha.parentNode.removeChild(span_fecha);
}