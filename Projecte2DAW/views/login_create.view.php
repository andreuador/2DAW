<?php
session_start();
$token = bin2hex(random_bytes(24));
$_SESSION["token"] = $token;
?>
<div class="container">
    <h1>Formulario Administradores</h1>
    <form action="login_create_process.php" id="form-control" method="post" novalidate="novalidate">

        <input type="hidden" id="token" name="csrf_token" value="<?= $token ?>">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" required><span id="apellidoError" class="error"></span>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required><span id="confirmPassError" class="error"></span>
        </div>
        <div class="form-group">
            <label for="role">Role:</label>
            <select name="role" id="role" required>
                <option disabled selected value="">Role</option>
                <option>Administrator</option>
                <option>Administrative</option>
                <option>Customer</option>
            </select>
        </div>
        <div class="form-group">
            <button name="button" type="submit">Enviar</button>
        </div>
    </form>
</div>