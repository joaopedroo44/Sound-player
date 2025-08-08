<?php 
header("Content-Type: application/json");
require_once "db.php";

// Recebe os dados enviados via POST
$user  = trim($_POST['usuario'] ?? '');
$email = trim($_POST['email'] ?? '');
$senha = trim($_POST['senha'] ?? '');

// Validação de campos obrigatórios
if (empty($user) || empty($email) || empty($senha)) {
    echo json_encode(["error" => "Todos os campos são obrigatórios."]);
    exit;
}

// Validação de formato de e-mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["error" => "E-mail inválido."]);
    exit;
}

// Validação de senha mínima
if (strlen($senha) < 6) {
    echo json_encode(["error" => "A senha deve ter no mínimo 6 caracteres."]);
    exit;
}

// Verifica duplicidade de e-mail ou usuário
$sql_check = "SELECT id FROM usuarios WHERE email = ? OR user = ? LIMIT 1";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("ss", $email, $user);
$stmt_check->execute();
$result_check = $stmt_check->get_result();

if ($result_check->num_rows > 0) {
    echo json_encode(["error" => "E-mail ou nome de usuário já está em uso."]);
    $stmt_check->close();
    $conn->close();
    exit;
}
$stmt_check->close();

// Criptografa a senha
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

// Insere usuário no banco
$sql = "INSERT INTO usuarios (user, email, senha) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $user, $email, $senha_hash);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["error" => "Erro ao cadastrar usuário."]);
}

$stmt->close();
$conn->close();
?>
