
    <section>
        <h2>Inicis de sessió</h2>
        <table>
            <tr>
                <th>id</th>
                <th>username</th>
                <th>password</th>

                <th>role</th>
                <th colspan="1">operacions</th>
            </tr>
            <?php foreach ($logins as $login): ?>
                <tr>
                    <td><?= $login->getId() ?></td>
                    <td>
                        <?= $login->getUsername()?>
                    </td>
                    <td><?= $login->getPassword() ?></td>
                    <td><?= $login->getRole() ?></td>
                    <td><a href="login_create.php">Crear</a></td>
                    <td><a href="login_delete.php?id=<?= $login->getId();?>">Esborrar</a></td>
                    <td><a href="login_update.php?id=<?= $login->getId();?>">Actualitzar</a></td>
                </tr>
            <?php endforeach; ?>
        </table>
    </section>
