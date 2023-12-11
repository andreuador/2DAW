<?php

require_once __DIR__ . '/src/Core/Database.php';
require_once __DIR__ . '/src/Core/View.php';
require_once __DIR__ . '/src/Entity/Invoice.php';
require_once __DIR__ . '/src/Repository/InvoiceRepository.php';
require_once __DIR__ . '/src/Entity/Customer.php';
require_once __DIR__ . '/src/Repository/CustomerRepository.php';
require_once __DIR__ . '/src/Helper/FlashMessage.php';
require_once __DIR__ . '/src/Entity/Login.php';
require_once __DIR__ . '/src/Core/Security.php';
session_start();

$token = Security::getToken();
Security::isToken($token);
Security::isRoleAdministrator($token);

// Carreguem la configuració del fitxer config.php
$config = require_once __DIR__ . '/config/config.php';

// Inicialitzem la connexió a la base de dades i els repositoris
$database = new Database($config["database"]);
$invoiceRepository = new InvoiceRepository($database->getConnection(), Invoice::class);
$customerRepository = new CustomerRepository($database->getConnection(), Customer::class);

// Obté l'ID de la factura de la URL
$invoiceId = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

// Verifica si l'ID és vàlid
if ($invoiceId !== false) {
    // Troba la factura per ID
    try {
        $invoiceToUpdate = $invoiceRepository->find($invoiceId);
        $customer = $customerRepository->find($invoiceToUpdate->getCustomerId());
        $invoiceToUpdate->setCustomer($customer);

        if ($invoiceToUpdate !== null) {
            // Renderitza la vista d'actualització de factura
            echo View::render('invoice_update_confirmation', 'backoffice', ["invoiceToUpdate" => $invoiceToUpdate]);
            exit;
        } else {
            // Redirigeix a invoice_list.php amb un missatge d'error si la factura no es troba
            FlashMessage::set("message", "Factura no trobada");
            header('Location: /invoice_list.php');
            exit;
        }
    } catch (\Exception $e) {
        // Gestionar errors al recuperar la factura
        FlashMessage::set("message", "Error al recuperar la factura: " . $e->getMessage());
        header('Location: /invoice_list.php');
        exit;
    }
} else {
    // Redirigeix a invoice_list.php amb un missatge d'error si l'ID no és vàlid
    FlashMessage::set("message", "ID no vàlid");
    header('Location: /invoice_list.php');
    exit;
}