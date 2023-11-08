<html lang="en">
<head>
    <title>Empleados</title>
</head>
<body>
    <h1>Empleados</h1>
    <div>
        <?php
        try {
            $pdo = new PDO("mysql:host=mysql-server; dbname=db_proyecto", "root", "secret");
            $stmt = $pdo->query("SELECT * FROM profesional");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            while ($row=$stmt->fetch()) {
                echo "<strong>Id</strong>: " . $row['id'] . "<br/>";
                echo "<strong>Nombre</strong>: " . $row['nombre'] . "<br/>";
                echo "<strong>Apellido</strong>: " . $row['apellido'] . "<br/>";
                echo "<strong>Domicilio</strong>: " . $row['domicilio'] . "<br/>";
                echo "<strong>DNI</strong>: " . $row['DNI'] . "<br/>";
                echo "<strong>CIF</strong>: " . $row['CIF'] . "<br/>";
                echo "<strong>NIF Gerente</strong>: " . $row['NIF_gerente'] . "<br/>";
                echo "<strong>Documento LOPD</strong>: " . $row['documento_LOPD'] . "<br/>";
                echo "<strong>Escritura constitución</strong>: " . $row['escritura_constitucion'] . "<br/>";
                echo "<strong>Telefono</strong>: " . $row['telefono'] . "<br/>";
                echo "<strong>Razon social</strong>: " . $row['razon_social'] . "<br/>";
                echo "<strong>Correo electronico</strong>: " . $row['correo_electronico'] . "<br/>";
            }
        }
        catch (PDOException $e) {
            echo "Error " . $e->getMessage();
        }
        ?>
    </div>
</body>
</html>