<?php

    // Start the session to access session variables
    session_start();

    $_SESSION['hangman'] = 0;
    $_SESSION['flappy'] = 0;
    $_SESSION['twozerofoureight'] = 0;
    echo "I don't think so hacker"
    session_abort();
    exit;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Etown</title>
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar bg-blue">
            <a class="navbar-brand" href="index.php">
                <img id="logo" src="includes/images/logo.png" alt="Logo" width='100px.'>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">
                            <i class="fas fa-home"></i> Home
                        </a>
                    </li>

                    <?php if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="settings.php">
                            <i class="fas fa-cog"></i> Settings
                        </a>
                    </li>

                    <?php } else { ?>
                    <li class="nav-item">
                        <a class="hidden" href="settings.php">
                            <i class="fas fa-cog hidden"></i> Settings
                        </a>
                    </li>
                    <?php } ?>

                    <li class="nav-item">
                        <a class="nav-link" href="about.php">
                            <i class="fas fa-info-circle"></i> About
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="games/menu.php">
                            <i class="fas fa-gamepad"></i> Games
                        </a>
                    </li>

                    <!-- Checking whether to display login or logout button. -->
                    <?php if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">
                            <i class="fas fa-key"></i> Logout
                        </a>
                    </li>

                    <?php } else { ?>
                    <li class="nav-item">
                        <a class="nav-link" href="login.php">
                            <i class="fas fa-key"></i> Login
                        </a>
                    </li>
                    <?php } ?>
                </ul>
            </div>
        </nav>
    </header>

    <main>
        <section id="welcome">
            <div id="welcome-text">Welcome to the Etown Momentum Coding Academy Demo website!</div>
            <br>
            <div id="welcome-subtext">
                This website will primarily be used for open houses for parent events to 
                introduce them to work done by these Etown Dual enrolled
                college students. 
            </div>
        </section>
        <section id="game">
            <br>
            <div id="welcome-text-2">Click Around</div>
            <br>
            <div id="welcome-subtext-2">Enjoy checking out what students did this summer.</div>
            <br><br><br><br>
        </section>
    </main>

    <?php require_once "includes/footer.php"; ?>

</body>
</html>
