<?php
require __DIR__ . '/src/Core/Database.php';
require __DIR__ . '/src/Core/View.php';
require __DIR__ . '/src/Entity/Login.php';
require __DIR__ . '/src/Repository/LoginRepository.php';

$id = $_GET["id"] ?? 0;

if(!empty($id)) {
    $config = require __DIR__ . '/config/config.php';
    $database = new Database($config["database"]);

    $loginRepository = new LoginRepository($database->getConnection(), Login::class);

    $login = $loginRepository->find($id);

    if($login !== null) {
        echo View::render('login_update', 'default', ["login" => $login]);
    } else {
        echo "Error al obtindre el id del usuari";
    }
}