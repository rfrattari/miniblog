 

<?php
	//Recibe datos por medio de angular
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $posts_titulo = $request->posts->posts_titulo;
    $posts_descripcion = $request->posts->posts_descripcion;
    $posts_pk = $request->posts->posts_pk;
    include_once 'posts-backend.php';
    $posts = new posts();
    $respuesta = $posts->editar($posts_titulo, $posts_descripcion, $posts_pk);

echo json_encode($respuesta);
