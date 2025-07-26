<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit();
}


require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

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
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['id']) || !isset($input['featured'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing id or featured value']);
        exit();
    }

    $id = $input['id'];
    $featured = filter_var($input['featured'], FILTER_VALIDATE_BOOLEAN);

    // Prepare & execute update
    $stmt = $pdo->prepare("UPDATE stories SET featured = :featured WHERE id = :id");
    $stmt->bindParam(':featured', $featured, PDO::PARAM_BOOL);
    $stmt->bindParam(':id', $id);

    $stmt->execute();

    echo json_encode(['success' => true, 'updated_id' => $id, 'featured' => $featured]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
    exit();
}