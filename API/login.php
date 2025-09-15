<?php
session_start();
header("Content-Type: application/json; charset=utf-8");

// Garante que não vaze warning/notice no output
ini_set('display_errors', 0);
error_reporting(0);

require_once "db.php";

$response = ["success" => false, "error" => "Credenciais inválidas."];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Suporta tanto JSON quanto form-urlencoded
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!$data) {
        // fallback para form-urlencoded
        $data = $_POST;
    }

    $email = $data['email'] ?? '';
    $senha = $data['senha'] ?? '';

    if ($email && $senha) {
        $sql = "SELECT id, usuario, senha FROM usuarios WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            if (password_verify($senha, $row['senha'])) {
                $_SESSION['usuario_id'] = $row['id'];
                $_SESSION['usuario'] = $row['usuario'];
                $response = ["success" => true, "usuario" => $row['usuario']];
            } else {
                $response = ["success" => false, "error" => "Senha incorreta."];
            }
        } else {
            $response = ["success" => false, "error" => "Usuário não encontrado."];
        }
        $stmt->close();
    }
}

$conn->close();
echo json_encode($response);
exit;
