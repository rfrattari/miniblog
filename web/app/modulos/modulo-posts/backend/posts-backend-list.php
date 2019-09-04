<?php

include_once 'posts-backend.php';
$posts = new posts();
$respuesta = $posts->listar();

echo json_encode($respuesta);