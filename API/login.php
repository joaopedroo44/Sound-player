<?php
session_start();
header("Content-Type: application/json");
require_once "db.php";

if (!isset($_POST['email'], $_POST['senha'])) {
    echo json_encode(["error" => "Dados incompletos."]);
    exit;
}

$email = trim($_POST['email']);
$senha = $_POST['senha'];

$sql = "SELECT id, user, senha FROM usuarios WHERE email = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Email não cadastrado."]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($senha, $user['senha'])) {
    $_SESSION['usuario_id'] = $user['id'];
    $_SESSION['usuario_nome'] = $user['user'];

    echo json_encode([
        "success" => true,
        "usuario" => $user['user']
    ]);
} else {
    echo json_encode(["error" => "Senha incorreta."]);
}

$stmt->close();
$conn->close();
?>
