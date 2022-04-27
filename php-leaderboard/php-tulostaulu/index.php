<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>PHP-Leaderboard</title>
        <style>
            /*Määritellään taulukon ulkomuoto*/
        table, th, td { 
  border: 1px solid black;
  border-collapse: collapse;
}
th, td {
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 40px;
}
</style>
    </head>
    <body>
        <h2>Tulostaulu</h2>
        <table>
            <tr>
                <td>Sijoitus</td>
                <td>Nimi</td>
                <td>Pisteet</td>
                <br>
            </tr>
            <tr>            
<?php
//Luodaan yhteys MySQL-serveriin...
$con = mysqli_connect("localhost", 
"root", "", "tulostaulu");
//... Josta saadaan tulostaulun tiedot...
$result = mysqli_query($con, "SELECT nimi, 
pisteet FROM tulostaulu ORDER BY pisteet DESC");
$rank = 1;
//... Ja julkaistaan ne taulukossa
if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td>{$rank}</td>
            <td>{$row['nimi']}</td>
            <td>{$row['pisteet']}</td></tr>";

        $rank++;
    }
}
?>
</tr>
</html>