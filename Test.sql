/*
 Navicat Premium Data Transfer

 Source Server         : source-map
 Source Server Type    : MySQL
 Source Server Version : 50564
 Source Host           : 122.51.175.158:3306
 Source Schema         : Test

 Target Server Type    : MySQL
 Target Server Version : 50564
 File Encoding         : 65001

 Date: 09/01/2020 18:40:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for error
-- ----------------------------
DROP TABLE IF EXISTS `error`;
CREATE TABLE `error` (
  `errorId` int(11) NOT NULL AUTO_INCREMENT,
  `newfilename` varchar(100) DEFAULT NULL,
  `colno` varchar(100) DEFAULT NULL,
  `lineno` varchar(100) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  `versionId` int(11) DEFAULT NULL,
  `createTime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`errorId`),
  KEY `errorForeign` (`versionId`),
  CONSTRAINT `errorForeign` FOREIGN KEY (`versionId`) REFERENCES `version` (`versionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `fileId` int(11) NOT NULL AUTO_INCREMENT,
  `fileName` varchar(100) DEFAULT NULL,
  `versionId` int(11) DEFAULT NULL,
  `sourceMap` varchar(250) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`fileId`),
  KEY `fileforeign` (`versionId`),
  CONSTRAINT `fileforeign` FOREIGN KEY (`versionId`) REFERENCES `version` (`versionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productId` varchar(100) NOT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `productDesc` varchar(100) DEFAULT NULL,
  `productCategory` varchar(100) DEFAULT NULL,
  `createPerson` varchar(255) DEFAULT NULL,
  `createTime` datetime(6) DEFAULT NULL,
  `updateTime` datetime(6) DEFAULT NULL,
  `userId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='这是一个产品表';

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `projectId` varchar(100) NOT NULL,
  `projectName` varchar(100) DEFAULT NULL,
  `projectApp` varchar(100) DEFAULT NULL,
  `projectDesc` varchar(100) DEFAULT NULL,
  `productId` varchar(100) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `createPerson` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`projectId`),
  KEY `productForegin` (`productId`),
  CONSTRAINT `productForegin` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version` (
  `versionId` int(11) NOT NULL AUTO_INCREMENT,
  `versionName` varchar(100) NOT NULL,
  `versionDesc` varchar(100) DEFAULT NULL,
  `projectId` varchar(100) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`versionId`),
  KEY `versionForeign` (`projectId`),
  CONSTRAINT `versionForeign` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
