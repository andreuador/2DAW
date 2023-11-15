<?php

require __DIR__ . '/../Core/Repository.php';


class LoginRepository extends Repository
{

    /**
     * @inheritDoc
     */
    public function find(int $id): EntityInterface
    {
        // TODO: Implement find() method.
        try {
            $pdoStatement = $this->pdo->prepare("SELECT * FROM login WHERE id = :id");

            // Enlazar el parámetro
            $pdoStatement->bindValue(':id', $id);

            // Ejecutar la consulta
            $pdoStatement->execute();

            // Obtener el registro como un array asociativo
            $loginRecord = $pdoStatement->fetch(PDO::FETCH_ASSOC);

            if (!$loginRecord) {
                // Manejar el caso en que no se encuentra el registro (lanzar una excepción, devolver null, etc.)
                throw new Exception("Login no encontrado con ID: $id");
            }

            // Transformar el registro en un objeto
            $loginEntity = call_user_func_array([$this->entityClassName, "fromArray"], [$loginRecord]);

            return $loginEntity;
        } catch (PDOException $e) {
            // Manejar la excepción (registrarla, lanzar una excepción personalizada, etc.)
            echo "Error: " . $e->getMessage();
            // Puedes lanzar una excepción personalizada aquí para indicar un fallo al buscar la entidad.
            throw new Exception("Error al encontrar el login con ID: $id");
        }
    }

    /**
     * @inheritDoc
     */
    public function findAll(): array
    {
        // TODO: Implement findAll() method.
        $pdoStatement = $this->pdo->prepare("SELECT * FROM login");
        $pdoStatement->execute();
        // TODO: Implement FetchMode in PDO object
        $pdoStatement->setFetchMode(PDO::FETCH_ASSOC);

        // get all records from database
        $loginRecords = $pdoStatement->fetchAll();

        $logins = [];
        // transform records into objects
        foreach ($loginRecords as $loginRecord) {
            $logins[] = call_user_func_array([$this->entityClassName, "fromArray"], [$loginRecord]);
        }

        return $logins;
    }

    /**
     * @inheritDoc
     */
    public function create(EntityInterface $entity): void
{
    try {
        $pdoStatement = $this->pdo->prepare("INSERT INTO login (username, password, role) VALUES (:username, :password, :role)");
    
        // Bind parameters
        $pdoStatement->bindValue(':username', $entity->getUsername());
        $pdoStatement->bindValue(':password', $entity->getPassword());
        $pdoStatement->bindValue(':role', $entity->getRole());
    
        // Execute the query
        $pdoStatement->execute();
    } catch (PDOException $e) {
        // Handle the exception (log it, throw a custom exception, etc.)
        echo "Error: " . $e->getMessage();
    }
}

    

    /**
     * @inheritDoc
     */
    public function delete(EntityInterface $entity): void
    {
        // TODO: Implement delete() method.
        try {
            $pdoStatement = $this->pdo->prepare("DELETE FROM login WHERE id = :id");
            
            // Enlazar el parámetro
            $pdoStatement->bindValue(':id', $entity->getId());
            
            // Ejecutar la consulta
            $pdoStatement->execute();
        } catch (PDOException $e) {
            // Manejar la excepción (registrala, lanza una excepción personalizada, etc.)
            echo "Error: " . $e->getMessage();
        }
    }

    /**
     * @inheritDoc
     */
    public function update(EntityInterface $entity): void
    {
        // TODO: Implement update() method.
    }
}