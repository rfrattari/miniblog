<?php

include_once 'posts-backend.php';
$posts = new posts();
$respuesta = $posts->ver($_GET["id"]);

echo json_encode($respuesta);