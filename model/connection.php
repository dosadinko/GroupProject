<?php

class connection
{
   private $servername;
       private $username;
       private $password;
       private $database;

       public function getConnection(){
           $conn = new mysqli($this->servername, $this->username, $this->password, $this->database);
           // Check connection
           if ($conn->connect_error)
           {
               die("Connection failed: " . $conn->connect_error);
           }
           return $conn;
       }
}