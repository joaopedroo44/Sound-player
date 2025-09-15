<?php
session_start();
header("Content-Type: application/json");
require_once "db.php";

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "Usuário não autenticado."]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST": // Adicionar vídeo
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['video_id'], $data['titulo'])) {
            echo json_encode(["error" => "Dados incompletos."]);
            exit;
        }

        $sql = "INSERT INTO playlists (usuario_id, video_id, titulo) VALUES (?, ?, ?)";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("iss", $usuario_id, $data['video_id'], $data['titulo']);
            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "Erro ao adicionar vídeo."]);
            }
            $stmt->close();
        }
        break;

    case "GET": // Listar playlist
        $sql = "SELECT id, video_id, titulo FROM playlists WHERE usuario_id = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("i", $usuario_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $playlist = [];
            while ($row = $result->fetch_assoc()) {
                $playlist[] = $row;
            }
            echo json_encode($playlist);
            $stmt->close();
        }
        break;

    case "DELETE": // Remover vídeo
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            echo json_encode(["error" => "ID não informado."]);
            exit;
        }

        $sql = "DELETE FROM playlists WHERE id = ? AND usuario_id = ?";
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("ii", $data['id'], $usuario_id);
            if ($stmt->execute()) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["error" => "Erro ao remover vídeo."]);
            }
            $stmt->close();
        }
        break;

    default:
        echo json_encode(["error" => "Método não permitido."]);
}

$conn->close();
