<?php
session_start();

require __DIR__ . '/src/Core/Database.php';
require __DIR__ . '/src/Core/View.php';
require __DIR__ . '/src/Entity/Login.php';
require __DIR__ . '/src/Repository/LoginRepository.php';
require __DIR__ . '/src/Validator/LoginValidator.php';

$config = require __DIR__ . '/config/config.php';
$mensaje = "";
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    try {
        $token = $_POST["csrf_token"];
        $id = $_POST["id"];

        $database = new Database($config["database"]);
        $loginRepository = new LoginRepository($database->getConnection(), Login::class);

        $existing = $loginRepository->find($id);

        if ($existing) {
            $loginRepository->delete($existing);
        }

    } catch (PDOException $e) {
        $mensaje = 'Error de conexión: ' . $e->getMessage();
    }
}
  else {
    $mensaje = 'No se recibieron datos del formulario';
}

echo View::render('login_delete_process', 'default',  ["mensaje"=>$mensaje]);