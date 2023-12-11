<?php
require_once __DIR__. '/src/Core/Database.php';
require_once __DIR__. '/src/Core/View.php';
require_once __DIR__. '/src/Entity/Vehicle.php';
require_once __DIR__. '/src/Repository/VehicleRepository.php';
require_once __DIR__ . '/src/Helper/FlashMessage.php';
require_once __DIR__ . '/src/Core/Security.php';
session_start();

$token = Security::getToken();
Security::isToken($token);
Security::isRoleAdministrator($token);

$config = require_once __DIR__. '/config/config.php';

$database = new Database($config["database"]);

$vehicleRepository = new VehicleRepository($database->getConnection(), Vehicle::class);
$vehicles = $vehicleRepository->findAll();

echo View::render('vehicle_list', 'backoffice', ["vehicles" => $vehicles]);