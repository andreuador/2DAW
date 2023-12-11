<?php
require_once __DIR__ . '/src/Entity/Login.php';
require_once __DIR__ . '/src/Helper/FlashMessage.php';

session_start();

require __DIR__ . '/src/Core/View.php';
echo View::render('index');


