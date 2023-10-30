<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dades del Formulari</title>
</head>
<body>
<h1>Dades del Formulari</h1>

<?php

function validarEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["telefon"];
    $url = $_POST["url"];

    if (validarEmail($email)) {
        ?>

        <table>
            <tr>
                <th>Nom</th>
                <td><?php echo $nom; ?></td>
            </tr>
            <tr>
                <th>Correu electrònic</th>
                <td><?php echo $email; ?></td>
            </tr>
            <tr>
                <th>Telèfon</th>
                <td><?php echo $phone; ?></td>
            </tr>
            <tr>
                <th>URL de la pàgina personal</th>
                <td><?php echo $url; ?></td>
            </tr>
        </table>

        <?php
    } else {
        echo "<p>Email incorrente</p>";
    }
} else {
    echo "<p>No s'han rebut dades.</p>";
}
?>
</body>
</html>