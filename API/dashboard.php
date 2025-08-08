<?php
session_start();
if (!isset($_SESSION['usuario_nome'])) {
    header('Location: index.html');
    exit;
}

// Lê o conteúdo HTML
$html = file_get_contents('dashboard_content.html');

// Substitui o placeholder pelo nome real
$usuario = htmlspecialchars($_SESSION['usuario_nome']);
$html = str_replace('{{nome_usuario}}', $usuario, $html);

// Exibe o HTML modificado
echo $html;