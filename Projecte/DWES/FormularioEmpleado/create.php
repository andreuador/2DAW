<!DOCTYPE html>
<html lang="es">

<head>
    <link rel="stylesheet" src="css/RegistroAdmin.css" type="text/css">
    <meta charset="utf-8">
    <title>Formulario Registro Administradores</title>
  <script src="js/RegistroAdmin.js"></script>
</head>
<style>
    .error {
        color: red;
    }
    input[type="text"]:invalid {
        background-color: red;
    }
    input[type="email"]:invalid {
        background-color: red;
        color: blue;
    }
    input[type="password"]:invalid {
        background-color: red;
    }
</style>
<body>
    <?php 
    session_start();
    $token = bin2hex(random_bytes(24));
    $_SESSION["token"]=$token;
    ?>
    <h1>Formulario Administradores</h1>
    <form action="EmpleadoVali.php" id="registroForm" method="post" novalidate ="novalidate">
        <input type="hidden" id="token" name="csrf_token" value= "<?= $token ?>">
        <script>
            //El siguiente script muestra el valor del input con ID=token
            const mostrar=document.getElementById("token").value;
            console.log (mostrar);
            </script>
        <ul>
            <li>
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre" id="nombre" required><span id="nombreError" class="error"></span>
            </li>
            <li>
                <label for="apellido">Apellido:</label>
                <input type="text" name="Apellido" id="apellido" required><span id="apellidoError" class="error"></span>
            </li>
            <li>
                <label for="mail">Correo electrónico:</label>
                <input type="email" name="correo" id="correo" required><span id="correoError" class="error"></span>
            </li>
            <li>
                <label for="password">Contraseña:</label>
                <input type="password" name="Contraseña" id="password" required><span id="passwordError"
                    class="error"></span>
            </li>
            <li>
                <label for="confirm_pass">Confirmar Contraseña:</label>
                <input type="password" name="confirmarContraseña" id="confirmPass" required><span id="confirmPassError"
                    class="error"></span>
            </li>
            <li>
                <button name="button" type="submit">Enviar</button>
            </li>
        </ul>
    </form>
    <div>
        <button id="cookie" name="cookies" type="button">Aceptar</button>
        <button id="mostrar" name="mostrar" type="button">Mostrar Cookie</button>
        <button id="mostrarT" name="mostrat" type="button">Mostrar Todas las Cookies</button>
    </div>
    <div>
        <ul id="ul"></ul>
    </div>
</body>

</html>