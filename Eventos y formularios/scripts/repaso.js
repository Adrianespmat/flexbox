function mostrarAlerta() {
    let intervalo;

    document.getElementById('aviso').addEventListener('click', function() {

        alert("Este sábado a las 3 son las 2");


        intervalo = setInterval(function() {
            alert("Este sábado a las 3 son las 2");
        }, 3000);
    });

    document.getElementById('parar').addEventListener('click', function() {
        if (intervalo) {
            clearInterval(intervalo);
            intervalo = null;
        }
    });
}