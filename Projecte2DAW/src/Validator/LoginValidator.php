<?php

require_once __DIR__ . '/../Core/ValidatorInterface.php';

class LoginValidator implements ValidatorInterface
{

    public function validate(EntityInterface $entity): array
    {
        // TODO: Implement validate() method.

        // Realizar las validaciones de campos
        $patronNombre = "/^[A-Za-z]{1,30}$/";
        $patronPass = '/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s:])(\S){8,16}$/m';

        $errores = [];

        $name = $entity->getUsername();
        $password = $entity->getPassword();

        if (!preg_match($patronNombre, $name)) {
            $errores[] = 'Nombre incorrecto';
            $errores[] = 'No se ha podido crear el empleado';
        }

        if (!preg_match($patronPass, $password)) {
            $errores[] = 'Contraseña incorrecta';
            $errores[] = 'No se ha podido crear el empleado';
        }

        return $errores;
    }
}