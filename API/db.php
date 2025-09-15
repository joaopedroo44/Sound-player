<?php
$host = "solucaosistemas.net.br";
$user = " solucaos_sound_player";
$pass = "sound_player@2025";
$db   = "solucaos_sound_player";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erro na conexão com o Banco de Dados."]));
}
?>