<?php

require __DIR__ . '/src/Core/Database.php';
require __DIR__ . '/src/Core/View.php';
require __DIR__ . '/src/Entity/Login.php';
require __DIR__ . '/src/Repository/LoginRepository.php';
require __DIR__ . '/src/Validator/LoginValidator.php';

$config = require __DIR__ . '/config/config.php';

$mensaje = "";
$errors = [];
try {
    $id = $_POST['id'] ?? 0;
    $nombre = $_POST['name'];
    $contrasena = $_POST['password'];
    $tipo = $_POST['role'];

    $database = new Database($config["database"]);
    $loginRepository = new LoginRepository($database->getConnection(), Login::class);

    $login = $loginRepository->find($id);

    $login->setUsername($nombre);
    $login->setPassword($contrasena);
    $login->setRole($tipo);

    $loginValidator = new LoginValidator();
    $errors = $loginValidator->validate($login);

    if(empty($errors)) {
        $loginRepository->update($login);
    }
} catch (PDOException $e) {
    $mensaje = 'Error de conexión: ' . $e->getMessage();
}

echo View::render('login_update_process', 'default', ["errors" => $errors]);
