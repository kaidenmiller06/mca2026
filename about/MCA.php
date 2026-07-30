<?php
    $pageName = "2026 MCA Webpage";
    require "../includes/functions.php";
    require "../includes/head.php";
    require "../includes/navbar.php";
?>

<body>
    <div class="buttons">
        <a href="../about.php"><button class="button button2">Go Back!</button></a>
    </div>

    <div class="team-section">

        <div id="welcome-text">THE 2026 MOMENTUM CODING ACADEMY PAGE</div>
        <br>
        <div class="section"> These projects were taken on by the Summer 2026 Coding and Careers class. <BR></div>
        <br>
        <div class="pfp">
            <img id="Team2026Pic" src="teampics/MCA.jpg" alt="2026 Class picture." width=1000 usemap="#classmap">
            <map id="classmap">
                <area shape="circle" coords="102, 237, 30" href="student_template.php">
            </map>    
        </div>

        <div class="section" id="team-names">
            <span class="name">
                <a href='student_template.php'>Jane Doe</a>
                <br><a href='ethan.php'>Ethan</a>
                <br><a href='arvindpage.php'>Arvind</a>
            </span>
        </div>
    </div>
</body>

<?php require "../includes/footer.php"; ?>