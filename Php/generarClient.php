<!DOCTYPE html>
<html lang="es">
    <head>
        <title>Client</title>
        <meta charset="utf-8">
    </head>
    <body>
        <?php
            ini_set('display_errors', 'on');
            error_reporting(E_ALL);

            require 'Client.php';
            $client = new Client(); 
        ?>
        <div>
            <button onclick="desplegar()">Usuario</button>
            <div id="enlaces" style="display: none;">
            <a href="./generarcliente.php">Información Usuario</a><br>
            <a href="./cataleg.php">Cataleg</a><br>
            <a href="./carrito.php">Carrito</a><br>
            </div>
        </div>
        
        <p><?php echo "Nombre:". $client->generarNom() ?></p>
        <p><?php echo "Usuario:".$client->generarUsuari() ?></p>
        <p><?php echo "Email:".$client->generarEmail() ?></p>
        <p><?php echo "DNI:".$client->generarDNI() ?></p>
        <p><?php echo "Direcció:".$client->generarDireccio() ?></p>
        <p><?php echo "Targeta:".$client->generarTargeta() ?></p>
    
        <script>
        function desplegar() {
            var x = document.getElementById("enlaces");
            if (x.style.display === "none") {
            x.style.display = "block";
            } else {
            x.style.display = "none";
            }
        }
      </script>
    </body>
</html>