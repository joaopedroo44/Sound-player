<?php
$host = "sql311.infinityfree.com";
$user = "if0_39062946";
$pass = "Jpmr190508";
$db   = "if0_39062946_sound_player_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erro na conexão com o Banco de Dados."]));
}
?>