<?php


header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
}

if (!getenv('RENDER') && class_exists('Dotenv\Dotenv')) {
    Dotenv\Dotenv::createImmutable(__DIR__)->load();
}

// Now import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$smtp_host = $_ENV['SMTP_HOST'];
$smtp_username = $_ENV['SMTP_USER'];
$smtp_password = $_ENV['SMTP_PASS'];
$smtp_port = $_ENV['SMTP_PORT'];

// Backend validation
function validateInput($data) {
    $errors = [];

    if (empty($data['name']) || strlen(trim($data['name'])) < 2) {
        $errors[] = 'Name must be at least 2 characters.';
    }

    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if (empty($data['message']) || strlen(trim($data['message'])) < 10) {
        $errors[] = 'Message must be at least 10 characters.';
    }

    return $errors;
}

// Get and sanitize input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

$errors = validateInput($data);

if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// Send email with PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = $smtp_host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_username;
    $mail->Password   = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $smtp_port;

    // Recipients
    $mail->setFrom($data['email'], $data['name']); 
    $mail->addAddress($_ENV['ADMIN_EMAIL'], 'Admin'); 

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body    = "
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> {$data['name']}</p>
        <p><strong>Email:</strong> {$data['email']}</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($data['message'])) . "</p>
    ";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Your message has been sent.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
