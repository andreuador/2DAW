<?php
declare(strict_types=1);

require_once __DIR__ . '/src/Core/Database.php';
require_once __DIR__ . '/src/Entity/Order.php';
require_once __DIR__ . '/src/Repository/OrderRepository.php';
require_once __DIR__ . '/src/Repository/VehicleRepository.php';
require_once __DIR__ . '/src/Core/Security.php';
require_once __DIR__ . '/src/Helper/FlashMessage.php';
require_once __DIR__ . '/src/Entity/Login.php';

session_start();

$token = Security::getToken();
Security::isToken($token);
Security::isRoleAdministrator($token);

$config = require_once __DIR__ . '/config/config.php';

try {
    $database = new Database($config['database']);

    if (!isset($_POST['vehicle_id']) || $_POST['vehicle_id'] < 0) {
        FlashMessage::set('message', 'ID de vehículo no válido.');
        header('Location: /garage_list.php');
        exit;
    }

    $vehicleId = (int)$_POST['vehicle_id'];

    $orderRepository = new OrderRepository($database->getConnection(), Order::class);
    $vehicleRepository = new VehicleRepository($database->getConnection(), Vehicle::class);

    $customerId = $_SESSION["loginToken"]->getId();

    $activeOrder = $orderRepository->findActiveOrderByCustomer($customerId);

    if ($activeOrder) {
        $vehicleRepository->updateOrderForVehicle($vehicleId);

        FlashMessage::set('message', 'Vehículo eliminado del pedido exitosamente.');
    } else {
        FlashMessage::set('message', 'No hay un pedido activo para este cliente.');
    }

    header('Location: /garage_list.php');
    exit;

} catch (Exception $e) {
    FlashMessage::set('message', 'Error: ' . $e->getMessage());
    header('Location: /vehicle_detail.php?id=' . $vehicleId);
    exit;
}