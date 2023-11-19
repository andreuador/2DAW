<h2>Resultat del formulari</h2>

<div>
    <?php if(empty($errors)) : ?>
        <h3>L'usuari s'ha actulitzat correctament</h3>
    <?php else : ?>
        <ul>
            <?php foreach ($errors as $error) : ?>
                <li><?= $error ?></li>
            <?php endforeach;?>
        </ul>
    <?php endif;?>
    <a href="login_list.php">Tornar al formulari</a>
</div>