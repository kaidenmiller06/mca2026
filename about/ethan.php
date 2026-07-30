<?php
    $pageName = "Ethan's Webpage";
    require "../includes/functions.php";
    require "../includes/head.php";
    require "../includes/navbar.php";
?>

<body>
    <div class="buttons">
        <a href="MCA.php"><button class="button button2">Go Back!</button></a> 
    </div>

    <main>
        <section id="Ethan's Bio">
            <div class="bio-title">Ethan</div>
            <br>
            <div id="bio">
                My name is Ethan
            </div>
            <br><span>Ethan's dog:</span><br>
            <img src="teampics/dog.jpg" width=200>
        </section>
    </main>
</body>

<?php require "../includes/footer.php"; ?>