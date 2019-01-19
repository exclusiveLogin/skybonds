<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Request-Method: POST, GET, OPTION");

include_once "dbsetting_n_connect.php";

$arr = new stdClass();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // The request is using the GET method
    $arr = array();

    if(isset($_GET['isin'])){
        $isin = $_GET['isin'];
        
        $query = "SELECT * FROM `isins` WHERE `isin`=$isin";

        $res = $mysql->query($query);
        //echo $query;

        $row = $res->fetch_assoc();
        $json = array();

        while( $row ){
            array_push($json, $row);
            $row = $res->fetch_assoc();
        } 



        echo json_encode($json);
        
        
        
    }
    
    
}
