<?php

require __DIR__ . '/../Core/Repository.php';


class LoginRepository extends Repository
{

    /**
     * @inheritDoc
     */
    public function find(int $id): EntityInterface
    {
        try {
        // TODO: Implement find() method.
        $pdoStatement = $this->pdo->prepare("SELECT * FROM login WHERE id = :id");
        $pdoStatement->bindValue("id", $id);
        $pdoStatement->execute();
        // TODO: Implement FetchMode in PDO object
        $row = $pdoStatement->fetch(PDO::FETCH_ASSOC);

            if ($row !== false) {
                $login = Login::fromArray($row);
                return $login;
            }
        } catch (Exception $e) {
            // Handle the exception, e.g., display an error message or log it
            echo "Error: " . $e->getMessage();
        }
        throw new Exception("Usuari no trobat");
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
        // TODO: Implement create() method.
        $pdoStatement = $this->pdo->prepare("INSERT INTO login (username, password, role) VALUES (:username, :password, :role)");

        // Bind parameters
        $pdoStatement->bindValue(':username', $entity->getUsername());
        $pdoStatement->bindValue(':password', $entity->getPassword());
        $pdoStatement->bindValue(':role', $entity->getRole());

        // Execute the query
        $pdoStatement->execute();
    }

    /**
     * @inheritDoc
     */
    public function delete(EntityInterface $entity): void
    {
        $id = $entity->getId();
        // TODO: Implement delete() method.
        $pdoStatment = $this->pdo->prepare("DELETE FROM login WHERE id = :id");
        $pdoStatment->bindValue(':id', $id, PDO::PARAM_INT);

        $ok = $pdoStatment->execute();

        if (!$ok || $pdoStatment->rowCount() != 1) {
            throw new Exception("Error en esborrar");
        }
    }

    /**
     * @inheritDoc
     */
    public function update(EntityInterface $entity): void
    {
        // TODO: Implement update() method.
        $id = $entity->getId();
        $username = $entity->getUsername();
        $password = $entity->getPassword();
        $role = $entity->getRole();

        $pdoStatement = $this->pdo->prepare("UPDATE login SET username = :username, password = :password, role = :role WHERE id = :id;");
        $pdoStatement->bindValue('id', $id, PDO::PARAM_INT);
        $pdoStatement->bindValue('username', $username, PDO::PARAM_STR);
        $pdoStatement->bindValue('password', $password, PDO::PARAM_STR);
        $pdoStatement->bindValue('role', $role, PDO::PARAM_STR);

        try {
            $pdoStatement->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}