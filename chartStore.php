<?php
/**
 *   RPG Chart Maker source file chartStore,
 *   Copyright (C) 2016  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


//Methods
function getMysqli() {
	$mysqli = new mysqli('localhost','root','root','rpgChartStore');

	if(mysqli_connect_errno()) {
		printf("Connect failed: %s\n", mysqli_connect_error());
		exit();
	}

	if(!$mysqli->set_charset("utf8")) {
		printf("Error loading character set utf8: %s\n", $mysqli->error);
	}
	return $mysqli;
}


/**
 * Place the json data into the database.
 */
function store(){
	$success = 'true';
	$exists = false;
	$id= '';

	if(!empty($_REQUEST['chart'])){
		$json = json_encode($_REQUEST['chart']);
		$id = hash('sha1',$json);
		$ip = getRealIpAddr();

		$mysqli = getMysqli();

		//check to see if hash already exists
		$query = 'SELECT id FROM chart where hash=?';
		if(($stmnt = $mysqli->prepare($query))){
			$stmnt->bind_param('s', $id);
			$stmnt->execute();
			$stmnt->bind_result($instance);

			while($stmnt->fetch()){
				$exists = true;
			}
		}

		$status = 'enabled';

		if(isSpam($json)){
			$status='spam';
		}

		//insert the json and hash
		if($exists == false){
		$query = 'INSERT INTO chart (hash,data,status,ip) VALUE(?,?,?,?)';

			if(($stmnt = $mysqli->prepare($query))){
				$stmnt->bind_param("ssss", $id, $json, $status, $ip);
				$stmnt->execute();
			}
		}

		echo '{"success":'.$success.', "id":"'.$id.'"}';
	}
}


/**
 * Basic spam protection.
 */
function isSpam($json){
	if(strpos($json,'http')!=false){
		return true;
	} else if(strpos($json,'www')!=false){
		return true;
	} else if(strpos($json,'.com')!=false){
		return true;
	} else if(strpos($json,'.net')!=false){
		return true;
	} else if(strpos($json,'.org')!=false){
		return true;
	} else if(strpos($json,'[url]')!=false){
		return true;
	}

	return false;
}


/**
 * Retrieve json data from the database.
 */
function retrieve(){
	$success = 'true';
	$id= '';
	$data = '';

	if(!empty($_REQUEST['id'])){
		$id = $_REQUEST['id'];
		
		$query = 'SELECT data from chart where hash = ? and status = \'enabled\'';
		$mysqli = getMysqli();

		if(($stmnt = $mysqli->prepare($query))){
			$stmnt->bind_param('s', $id);
			$stmnt->execute();
			$stmnt->bind_result($rawData);

			if($stmnt->fetch()){
				$data = $rawData;
			}else{
				$success="false";
			}
		}
		echo '{"success":'.$success.', "data":'.$data.'}';
	}
}

/**
 *   Gets the users IP address
 *@return String the users IP address.
 */
function getRealIpAddr() {
	if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
   
		//check ip from share internet
		$ip=$_SERVER['HTTP_CLIENT_IP'];
	} else if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {

		//to check ip is passed from proxy
      	$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    } else{
		$ip=$_SERVER['REMOTE_ADDR'];
	}
	return $ip;
}


//Main
if(!empty($_REQUEST['requestType'])){

	if(strcmp($_REQUEST['requestType'],'store')==0){
		store();

	} else if(strcmp($_REQUEST['requestType'],'retrieve')==0){
		retrieve();
	}
}

?>
