<?php
require_once __DIR__ . '/src/Core/View.php';
require_once __DIR__ . '/src/Core/Database.php';
require_once __DIR__ . '/src/Entity/Login.php';
require_once __DIR__ . '/src/Repository/LoginRepository.php';
require_once __DIR__ . '/src/Core/Security.php';
require_once __DIR__ . '/src/Helper/FlashMessage.php';
session_start();

$config = require_once __DIR__ . '/config/config.php';

$database = new Database($config["database"]);
$loginRepository = new LoginRepository($database->getConnection(), Login::class);

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $username = $_POST['username'] ?? "";
    $password = $_POST['password'] ?? "";
    try {
        Security::login($username, $password, $loginRepository);

        header('Location: index.php');
        exit;
    } catch (Exception $e) {
        FlashMessage::set("message", $e->getMessage());
        header('Location: login.php');
        exit;
    }
}

echo View::render('login');