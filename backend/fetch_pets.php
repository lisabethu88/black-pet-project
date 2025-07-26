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

$client_id = $_ENV['PETFINDER_API_KEY'];
$client_secret = $_ENV['PETFINDER_API_SECRET'];

$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$limit = 12;

$auth_response = file_get_contents("https://api.petfinder.com/v2/oauth2/token", false, stream_context_create([
  "http" => [
    "method" => "POST",
    "header" => "Content-Type: application/x-www-form-urlencoded",
    "content" => http_build_query([
      "grant_type" => "client_credentials",
      "client_id" => $client_id,
      "client_secret" => $client_secret
    ])
  ]
]));
$auth = json_decode($auth_response);
$token = $auth->access_token;

$opts = [
  "http" => [
    "header" => "Authorization: Bearer $token"
  ]
];
$context = stream_context_create($opts);
$api_response = file_get_contents("https://api.petfinder.com/v2/animals?color=black&page=$page&limit=$limit", false, $context);

header('Content-Type: application/json');
echo $api_response;
