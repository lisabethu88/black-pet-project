<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}

require_once __DIR__ . '/vendor/autoload.php';

function loadEnv($path) {
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), '#')) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[$name] = trim($value);
    }
}

loadEnv(__DIR__ . '/.env');
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];



try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // Get raw input
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO stories (id, pet_name, featured, species, breed, title, body, image_url, author, submitted_at, status)
        VALUES (:id, :pet_name, :featured, :species,  :breed, :title, :body, :image_url, :author, :submitted_at, :status)
    ");

    $stmt->execute([
        ':id' => $data['id'],
        ':pet_name' => $data['pet_name'],
        ':featured' => $data['featured'] ? "true" : "false",
        ':species' => $data['species'],
        ':breed' => $data['breed'],
        ':title' => $data['title'],
        ':body' => $data['body'],
        ':image_url' => $data['image_url'],
        ':author' => $data['author'],
        ':submitted_at' => $data['submitted_at'],
        ':status' => $data['status']
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
