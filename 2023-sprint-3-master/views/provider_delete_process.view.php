<?php
session_start();
$token = bin2hex(random_bytes(24));
$_SESSION["token"] = $token;
?>
<h2>Eliminació de login</h2>
<div>
        <h3>L'usuari s'ha eliminat correctament</h3>
        <h2><a href="../provider_list.php">Tornar l'inici</a></h2>
</div>
