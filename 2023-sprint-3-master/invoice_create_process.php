<?php
require_once __DIR__ . '/src/Core/Database.php';
require_once __DIR__ . '/src/Core/View.php';
require_once __DIR__ . '/src/Entity/Invoice.php';
require_once __DIR__ . '/src/Repository/InvoiceRepository.php';
require_once __DIR__ . '/src/Validator/InvoiceValidator.php';
require_once __DIR__ . '/src/Helper/FlashMessage.php';
require_once __DIR__ . '/src/Entity/Login.php';
require_once __DIR__ . '/src/Core/Security.php';
session_start();

$token = Security::getToken();
Security::isToken($token);
Security::isRoleAdministrator($token);

$config = require_once __DIR__ . '/config/config.php';

$database = new Database($config["database"]);
$invoiceRepository = new InvoiceRepository($database->getConnection(), Invoice::class);

// Verificar si s'ha enviat el formulari de confirmació
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $errors = [];
    $validator = new InvoiceValidator();

    // Pots validar i processar més camps segons les teues necessitats
    $newInvoiceArray = [
        "id" => 0,
        'number' => (string)$_POST['number'],
        'price' => (float)$_POST['price'],
        'date' => $_POST['date'],
        'customer_id' => (int)$_POST['customer_id'],
        'order_id' => (int)$_POST['order_id'],
    ];

    $newInvoice = Invoice::fromArray($newInvoiceArray);
    $errors = $validator->validate($newInvoice);

    if (empty($errors)) {
        try {
            $invoiceRepository->create($newInvoice);

            // Redirigir a invoice_list.php després de la creació exitosa
            header("Location: /invoice_list.php");
            exit;
        } catch (Exception $exception) {
            // Redirigir a la pàgina de creació amb missatge d'error
            FlashMessage::set("message", "Error en inserir les dades de la factura: " . $exception->getMessage());
            header('Location: /invoice_create.php');
            exit;
        }
    } else {
        // Redirigir a la pàgina de creació amb missatges d'error
        $errorMessages = implode(', ', $errors);
        FlashMessage::set("message", "Errors de validació: $errorMessages");
        header('Location: /invoice_create.php');
        exit;
    }
} else {
    // Gestionar el cas en què la factura no es troba
    FlashMessage::set("message", "Factura no trobada");
    header('Location: /invoice_list.php');
    exit;
}