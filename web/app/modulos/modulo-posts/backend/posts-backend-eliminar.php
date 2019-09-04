<?php

include_once 'posts-backend.php';
//Recibe datos por medio de angular
$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $posts_pk = $request->posts_pk;

$posts = new posts();
$respuesta = $posts->eliminar($posts_pk);


echo json_encode($respuesta);