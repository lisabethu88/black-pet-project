<?php
header('Content-Type: application/json');

// Just return a sample array to test API
$data = [
    ["id" => 1, "title" => "Story 1"],
    ["id" => 2, "title" => "Story 2"]
];

echo json_encode($data);
