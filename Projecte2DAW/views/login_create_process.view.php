<h2>Resultat del formulari</h2>
<div>
    <?php if (empty($errors)) : ?>
        <h3>L'usuari s'ha creat correctament</h3>
    <?php else : ?>
        <h3>Hi ha els següents errors:</h3>
        <ul>
            <?php foreach ($errors as $error) : ?>
                <li><?= $error ?></li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
</div>

<div>
    <a href="login_list.php">Torna a veure els inicis de sessió</a>
    <a href="login_create.php">Torna al formulari</a>
</div>