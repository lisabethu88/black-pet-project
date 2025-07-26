<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

// require_once __DIR__ . '/vendor/autoload.php';

// function loadEnv($path) {
//     $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
//     foreach ($lines as $line) {
//         if (str_starts_with(trim($line), '#')) continue;
//         list($name, $value) = explode('=', $line, 2);
//         $_ENV[$name] = trim($value);
//     }
// }

// loadEnv(__DIR__ . '/.env');

if (!getenv('RENDER')) {
    // Only load .env file locally
    function loadEnv($path) {
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (str_starts_with(trim($line), '#')) continue;
            list($name, $value) = explode('=', $line, 2);
            putenv("$name=$value"); // Adds to getenv()
        }
    }
    loadEnv(__DIR__ . '/.env');
}

$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

try {
    $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;

    $page = max($page, 1);
    $limit = 12;

    $offset = ($page - 1) * $limit;

    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $stmt = $pdo->prepare("SELECT * FROM stories ORDER BY submitted_at DESC LIMIT :limit OFFSET :offset");
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $countStmt = $pdo->query("SELECT COUNT(*) FROM stories");
    $totalCount = (int) $countStmt->fetchColumn();
    $totalPages = ceil($totalCount / $limit);


    // Output results (JSON encoded)
    header('Content-Type: application/json');
    echo json_encode([
        'data' => $rows,
        'pagination' => [
            'total_count' => $totalCount,
            'total_pages' => $totalPages,
            'current_page' => $page,
            'limit' => $limit
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
    exit();
}
