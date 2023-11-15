<?php
function TokenGenerator() {
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    $token = bin2hex(random_bytes(32));

    $_SESSION['csrf_token'] = $token;

    return $token;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> Cliente Profesional </title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>

<h1>Registrarse como profesional</h1>
<div class="container">
    <form action="Validation.php" method="POST">
        <div class="form">
            <div class="form-left">
                <div>
                    <label for="name">Nombre:</label><br>
                    <input id="name" name="name" type="text">
                </div>
                <div>
                    <label for="lastname">Apellidos:</label><br>
                    <input id="lastname" name="lastname" type="text">
                </div>
                <div>
                    <label for="email">Email:</label><br>
                    <input id="email" name="email" type="text">
                </div>
                <div>
                    <label for="username">Nombre de usuario:</label><br>
                    <input id="username" name="username" type="text">
                </div>
                <div>
                    <label for="nif">NIF:</label><br>
                    <input id="nif" name="nif" type="text">
                </div>
                <div>
                    <label for="businessName">Nombre de la empresa:</label><br>
                    <input id="businessName" name="businessName" type="text">
                </div>
            </div>
            <div class="form-right">
                <div>
                    <label for="phone">Telefono:</label><br>
                    <input id="phone" name="phone" type="tel">
                </div>
                <div>
                    <label for="address">Domicilio:</label><br>
                    <input id="address" name="address" type="text">
                </div>
                <div>
                    <label for="cif">CIF:</label><br>
                    <input id="cif" name="cif" type="text">
                </div>
                <div>
                    <label for="escrituraconstitucion">Escritura Constitucion:</label><br>
                    <input id="escrituraconstitucion" name="escrituraconstitucion" type="file">
                </div>
                <div>
                    <label for="passwd">Password:</label><br>
                    <input id="passwd" name="passwd" type="password">
                </div>
                <div>
                    <label for="rpasswd">Repeat password:</label><br>
                    <input id="rpasswd" name="rpasswd" type="rpasswd">
                </div>
            </div>
            <input type="hidden" name="csrf_token" value="<?php echo TokenGenerator(); ?>">
            <div id="button">
                <button type="submit">Enviar</button>
            </div>
        </div>
    </form>
</div>
</body>
</html>