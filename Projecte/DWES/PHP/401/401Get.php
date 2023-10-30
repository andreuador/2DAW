<?php
    ini_set("display_errors", "on");
    $name = $_POST['name'];
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <title>ExempleGET</title>
        <meta charset="utf-8">
    </head>
    <body>

        <div>
            <p>Benvingut <?php echo $name ?></p>
        </div>
    </body>
</html>