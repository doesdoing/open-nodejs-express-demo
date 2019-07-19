/*
Navicat MariaDB Data Transfer

Source Server         : 15.17
Source Server Version : 50560
Source Host           : 192.168.15.129:3306
Source Database       : test

Target Server Type    : MariaDB
Target Server Version : 50560
File Encoding         : 65001

Date: 2019-07-19 12:16:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_network_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_network_list`;
CREATE TABLE `sys_network_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Network_model` varchar(50) DEFAULT NULL,
  `Network_user` varchar(20) DEFAULT NULL,
  `Network_password` varchar(20) DEFAULT NULL,
  `Network_ip` varchar(50) DEFAULT NULL,
  `Network_remark` varchar(50) DEFAULT NULL,
  `Network_location` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_server_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_server_list`;
CREATE TABLE `sys_server_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Server_model` varchar(100) DEFAULT NULL,
  `Server_user` varchar(20) DEFAULT NULL,
  `Server_password` varchar(20) DEFAULT NULL,
  `Server_location` varchar(20) DEFAULT NULL,
  `Server_os` varchar(20) DEFAULT NULL,
  `Server_ip` varchar(50) DEFAULT NULL,
  `Server_app` varchar(50) DEFAULT NULL,
  `Server_remark` varchar(10) DEFAULT NULL,
  `Server_sys` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_sql_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_sql_list`;
CREATE TABLE `sys_sql_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SQL_user` varchar(50) DEFAULT NULL,
  `SQL_password` varchar(30) DEFAULT NULL,
  `SQL_ip` varchar(100) DEFAULT NULL,
  `SQL_location` varchar(30) DEFAULT NULL,
  `SQL_model` varchar(10) DEFAULT NULL,
  `SQL_database` varchar(20) DEFAULT NULL,
  `SQL_remark` varchar(50) DEFAULT NULL,
  `SQL_sys` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_user_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_list`;
CREATE TABLE `sys_user_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Login_user` varchar(25) CHARACTER SET utf8 NOT NULL,
  `Login_password` varchar(25) CHARACTER SET utf8 NOT NULL,
  `Login_name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `Login_ico` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Login_level` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Login_team` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `Login_cookies` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for sys_web_list
-- ----------------------------
DROP TABLE IF EXISTS `sys_web_list`;
CREATE TABLE `sys_web_list` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Web_sys` varchar(50) DEFAULT NULL,
  `Web_outside_ip` varchar(100) DEFAULT NULL,
  `Web_inside_ip` varchar(100) DEFAULT NULL,
  `Web_user` varchar(20) DEFAULT NULL,
  `Web_password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
