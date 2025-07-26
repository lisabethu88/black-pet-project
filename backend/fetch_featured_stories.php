<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");



if (!getenv('RENDER')) {
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        require __DIR__ . '/vendor/autoload.php';
        Dotenv\Dotenv::createImmutable(__DIR__)->load();
    }
  }

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

    $stmt = $pdo->query("SELECT * FROM stories WHERE featured = true AND status = 'approved' LIMIT 5");

    // Fetch all rows as associative arrays
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output results (JSON encoded)
    header('Content-Type: application/json');
    echo json_encode($rows);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
    exit();
}
