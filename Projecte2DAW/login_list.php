<?php
require __DIR__ . '/src/Core/Database.php';
require __DIR__ . '/src/Core/View.php';
require __DIR__ . '/src/Entity/Login.php';
require __DIR__ . '/src/Repository/LoginRepository.php';

$config = require __DIR__ . '/config/config.php';

$database = new Database($config["database"]);

$loginRepository = new LoginRepository($database->getConnection(), Login::class);
$logins = $loginRepository->findAll();

echo View::render('login_list', 'default', ["logins"=>$logins]);


