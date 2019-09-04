<?php
//clase de conexion incluida
include_once '../../conexion.php';

class posts{
//metodos
    public function __construct() {
        $this->con = new conexion();
    }
    
 //Todas las funciones siguientes reciben y devuelven datos de la base de datos 
public function eliminar($posts_PK){
        $sql="delete from posts where posts_PK='{$posts_PK}'";
        $eliminar = $this->con->consultaRetorno($sql);
            if($eliminar){
                $error=false;
                $mensaje="Acción ejecutada correctamente";
            }else{
                $error=true;
                $mensaje=mysql_error();
            }

        $respuesta = array(
          'error'=>$error,
          'mensaje'=>$mensaje 
        );
        return $respuesta;
    }
 
public function ver($posts_PK){
        $sql="select * from posts where posts.posts_PK=".$posts_PK;
        $resultado = $this->con->consultaRetorno($sql);

        $registros = array();

        while ($row = mysql_fetch_array($resultado)){
            
            array_push($registros, $row);
        }


        $respuesta = array(
          'error'=>false,
          'datos'=>$registros
            
        );
        return $respuesta;
    }
public function crear($posts_titulo, $posts_descripcion){
        $sql="INSERT INTO posts (posts_titulo, posts_descripcion) VALUES ('{$posts_titulo}', '{$posts_descripcion}')";
    
        $crear = $this->con->consultaSimple($sql);

        if($crear){
            
            $error=true;
            $mensaje=mysql_error();
        }else{
            $error=false;
            $mensaje="Acción ejecutada correctamente";
        }
    

        $respuesta = array(
          'error'=>$error,
          'mensaje'=>$mensaje 
        );

        return $respuesta;
    }
public function editar($posts_titulo, $posts_descripcion, $posts_PK){
        $sql="update posts set posts_titulo='{$posts_titulo}',posts_descripcion='{$posts_descripcion}' where posts_PK='{$posts_PK}'"; 
    
        $editar = $this->con->consultaSimple($sql);

            if($editar){
                
                $error=true;
                $mensaje=mysql_error();
            }else{
                $error=false;
                $mensaje="Acción ejecutada correctamente";
            }

            $respuesta = array(
              'error'=>$error,
              'mensaje'=>$mensaje 
            );

        return $respuesta;
    }
public function listar(){
        $sql="select * from posts order by posts.posts_PK ASC";
        $resultado = $this->con->consultaRetorno($sql);

        $registros = array();

        while ($row = mysql_fetch_array($resultado)){
            
            array_push($registros, $row);
        }


        $respuesta = array(
          'error'=>false,
          'datos'=>$registros
            
        );

        return $respuesta;
    }



}