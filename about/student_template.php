<?php
    $pageName = "Jane Doe's Webpage";
    require "../includes/functions.php";
    require "../includes/head.php";
    require "../includes/navbar.php";
?>

<body>
    <div class="buttons">
        <a href="MCA.php"><button class="button button2">Go Back!</button></a> 
    </div>

    <main>
        <section id="Jane Doe's Bio">
            <div class="bio-title">Jane Doe</div>
            <br>
            <div id="bio">
                Jane Doe is not a student in this class. If she was she might be a junior or senior at Somewhere HS.
                She might be thinking about majoring in Computer Science, with a concentration in Web and Application 
                Design, plus a minor in Graphic Design, and intends to graduate in 2030 or 2031 from Xtown College or University.
            </div>
        </section>
    </main>
</body>

<?php require "../includes/footer.php"; ?>