-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: express4
-- ------------------------------------------------------
-- Server version	5.5.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `parentKey` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `optype` int(11) DEFAULT '0',
  `title` varchar(10) NOT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `searchSchemaKey` varchar(50) DEFAULT NULL,
  `formSchemaKey` varchar(50) DEFAULT NULL,
  `dataSchemaKey` varchar(50) DEFAULT NULL,
  `templateUrl` varchar(100) DEFAULT NULL,
  `controller` varchar(20) DEFAULT NULL,
  `linkUrl` varchar(30) DEFAULT NULL,
  `columns` text,
  `clearCurrentItem` tinyint(1) DEFAULT '0',
  `interfaces` text,
  `isList` tinyint(1) DEFAULT '0',
  `isRefresh` tinyint(1) DEFAULT '1',
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `defaultDatas` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `action_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
INSERT INTO `action` VALUES (1,'menu-view','module',1,1,'menus列表数据','pageview','module-form-search	',NULL,'module-data','','','','[{\"name\":\"ID\",\"template\":\"item.id\"},{\"name\":\"名称\",\"template\":\"item.title\"},{\"name\":\"KEY\",\"template\":\"item.key\"},{\"name\":\"图标\",\"template\":\"<ng-md-icon icon=\'{{item.icon}}\'></ng-md-icon>\"},{\"name\":\"链接\",\"template\":\"item.link\"},{\"name\":\"lft\",\"template\":\"item.lft\"},{\"name\":\"rgt\",\"template\":\"item.rgt\"}]',0,'[{\"inteface\":\"menus-fetch\"}]',1,1,NULL,'2016-03-15 07:05:32','2016-03-15 07:05:32',NULL),(2,'menu-add','module',4,4,'新建模块','add',NULL,'module-form-add&edit','module-data','','','',NULL,1,'[{\"inteface\":\"menus-add\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 10:28:43',NULL),(3,'menu-child-add','module',2,4,'新建子模块','add',NULL,'module-form-add&edit','module-data','','','',NULL,1,'[{\"inteface\":\"menus-add\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 10:40:56','{\n  \"parentKey\": {\n    \"path\": \"currentItem.key\"\n  }\n}'),(4,'menu-edit','module',2,4,'修改模块','edit',NULL,'module-form-add&edit','module-data','','','',NULL,0,'[{\"inteface\":\"menus-id-edit\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 10:28:57',NULL),(5,'menu-delete','module',2,2,'删除模块','delete',NULL,'module-form-add&edit','module-data','','','',NULL,0,'[{\"inteface\":\"menus-id-delete\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 10:29:04',NULL),(6,'schema-view','schema',1,1,'SCHEMA列表数据','pageview','schema-form-search',NULL,'schema-data','','','','[{\"name\":\"ID\",\"template\":\"item.id\"},{\"name\":\"KEY\",\"template\":\"item.key\"},{\"name\":\"DESCTRIBUTION\",\"template\":\"item.description\"}]',0,'[{\"inteface\":\"schemas-fetch\"}]',1,1,NULL,'2016-03-15 07:05:32','2016-03-15 09:47:34',NULL),(7,'schema-add','schema',4,4,'新建SCHEMA','add','schema-form-search','schema-form-add&edit','schema-data','','','',NULL,0,'[{\"inteface\":\"schemas-add\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 07:05:32',NULL),(8,'schema-edit','schema',2,4,'修改SCHEMA','edit',NULL,'schema-form-add&edit','schema-data','','','',NULL,0,'[{\"inteface\":\"schemas-id-edit\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 07:05:32',NULL),(9,'schema-delete','schema',2,2,'删除SCHEMA','delete',NULL,'','','','','',NULL,0,'[{\"inteface\":\"schemas-id-delete\"}]',0,1,NULL,'2016-03-15 07:05:32','2016-03-15 09:57:55',NULL),(10,'action-view','action',1,1,'ACTION列表操作','pageview','action-form-search',NULL,'action-data',NULL,NULL,NULL,'[\n  {\n    \"name\": \"ID\",\n    \"template\": \"item.id\"\n  },\n  {\n    \"name\": \"key\",\n    \"template\": \"item.key\"\n  },\n  {\n    \"name\": \"标题\",\n    \"template\": \"item.title\"\n  },\n  {\n    \"name\": \"ICON\",\n    \"template\": \"<ng-md-icon ng-if=\'item.icon\' icon=\'{{item.icon}}\'></ng-md-icon>\"\n  },\n  {\n    \"name\": \"菜单类型\",\n    \"template\": \"item.type\"\n  },\n  {\n    \"name\": \"操作类型\",\n    \"template\": \"item.optype\"\n  },\n  {\n    \"name\": \"搜索SCHEMA\",\n    \"template\": \"item.searchSchemaKey\"\n  },\n  {\n    \"name\": \"表单SCHEMA\",\n    \"template\": \"item.formSchemaKey\"\n  },\n  {\n    \"name\": \"数据SCHEMA\",\n    \"template\": \"item.dataSchemaKey\"\n  },\n  {\n    \"name\": \"列表页?\",\n    \"template\": \"<ng-md-icon icon=\'{{item.isList?\\\"done\\\":\\\"clear\\\"}}\'></ng-md-icon>\"\n  },\n  {\n    \"name\": \"刷新否？\",\n    \"template\": \"<ng-md-icon icon=\'{{item.isRefresh?\\\"done\\\":\\\"clear\\\"}}\'></ng-md-icon>\"\n  }\n]',0,'[\n  {\n    \"inteface\": \"actions-fetch\",\n    \"key\":\"1\"\n  }\n]',1,1,NULL,'0000-00-00 00:00:00','2016-03-15 10:15:39',NULL),(11,'action-add','action',4,4,'新建操作','add',NULL,'action-form-add&edit','action-data',NULL,NULL,NULL,NULL,0,'[{\"inteface\":\"actions-add\"}]',0,1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),(12,'action-edit','action',2,4,'修改操作','edit',NULL,'action-form-add&edit','action-data',NULL,NULL,NULL,NULL,0,'[{\"inteface\":\"actions-id-edit\"}]',0,1,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),(13,'action-delete','action',2,4,'删除操作','delete',NULL,'','',NULL,NULL,NULL,NULL,0,'[{\"inteface\":\"actions-id-delete\"}]',0,1,NULL,'0000-00-00 00:00:00','2016-03-15 09:58:09',NULL),(14,'interface-view','interface',1,1,'接口viewlist','pageview','interface-form-search',NULL,'interface-data',NULL,NULL,NULL,'[\n  {\n    \"name\": \"ID\",\n    \"template\": \"item.id\"\n  },\n  {\n    \"name\": \"KEY\",\n    \"template\": \"item.key\"\n  },\n  {\n    \"name\": \"地址\",\n    \"template\": \"item.baseUrl\"\n  },\n  {\n    \"name\": \"端口\",\n    \"template\": \"item.port\"\n  },\n  {\n    \"name\": \"api\",\n    \"template\": \"item.api\"\n  },\n  {\n    \"name\": \"协议\",\n    \"template\": \"item.verb\"\n  },\n  {\n    \"name\": \"前缀\",\n    \"template\": \"item.prefix\"\n  },\n  {\n    \"name\": \"参数?\",\n    \"template\": \"<ng-md-icon icon=\'{{item.needParams?\\\"done\\\":\\\"clear\\\"}}\'></ng-md-icon>\"\n  },\n  {\n    \"name\": \"数据?\",\n    \"template\": \"<ng-md-icon icon=\'{{item.needDatas?\\\"done\\\":\\\"clear\\\"}}\'></ng-md-icon>\"\n  },\n  {\n    \"name\": \"系统接口?\",\n    \"template\": \"<ng-md-icon icon=\'{{item.isSystem?\\\"done\\\":\\\"clear\\\"}}\'></ng-md-icon>\"\n  }\n]',0,'[\n  {\n    \"inteface\": \"interfaces-fetch\"\n  }\n]',1,1,NULL,'2016-03-15 09:52:10','2016-03-15 10:17:26',NULL),(15,'interface-add','interface',4,4,'新建接口','add',NULL,'interface-form-add&edit','interface-data',NULL,NULL,NULL,NULL,0,'[\n  {\n    \"inteface\": \"interfaces-add\"\n  }\n]',0,1,NULL,'2016-03-15 09:55:36','2016-03-15 10:07:16',NULL),(16,'interface-edit','interface',2,4,'修改接口','edit',NULL,'interface-form-add&edit','interface-data',NULL,NULL,NULL,NULL,0,'[\n  {\n    \"inteface\": \"interfaces-id-edit\"\n  }\n]',0,1,NULL,'2016-03-15 09:56:42','2016-03-15 10:10:41',NULL),(17,'interface-delete','interface',2,2,'删除接口','delete',NULL,'',NULL,NULL,NULL,NULL,NULL,0,'[\n  {\n    \"inteface\": \"interfaces-id-delete\"\n  }\n]',0,1,NULL,'2016-03-15 09:57:38','2016-03-15 10:05:16',NULL),(18,'server-fetch','server',1,1,'列表操作','pageview','server-form-search','','server-data',NULL,NULL,NULL,'[\n  {\n    \"name\": \"ID\",\n    \"template\": \"item.id\"\n  },\n  {\n    \"name\": \"type\",\n    \"template\": \"item.type\"\n  },\n  {\n    \"name\": \"标题\",\n    \"template\": \"item.title\"\n  },\n  {\n    \"name\": \"协议\",\n    \"template\": \"item.verb\"\n  },\n  {\n    \"name\": \"地址\",\n    \"template\": \"item.baseUrl\"\n  },\n  {\n    \"name\": \"端口\",\n    \"template\": \"item.port\"\n  }\n]',0,'[{\n  \"inteface\":\"servers-fetch\"\n}]',1,1,'服务器设置','2016-03-16 06:34:13','2016-03-16 06:35:01',NULL),(19,'server-add','server',4,4,'新建服务器','add',NULL,'server-form-add&edit','server-data',NULL,NULL,NULL,NULL,0,'[{\n  \"inteface\":\"servers-add\"\n}]',0,1,NULL,'2016-03-16 06:36:16','2016-03-16 06:36:16',NULL),(20,'server-edit','server',2,4,'修改服务器','edit',NULL,'server-form-add&edit','server-data',NULL,NULL,NULL,NULL,0,'[{\n  \"inteface\":\"servers-id-edit\"\n}]',0,1,NULL,'2016-03-16 06:37:40','2016-03-16 06:39:27',NULL),(21,'server-delete','server',2,2,'删除服务器','delete',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'[{\n  \"inteface\":\"servers-id-delete\"\n}]',0,1,NULL,'2016-03-16 06:38:52','2016-03-16 06:38:52',NULL);
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interface`
--

DROP TABLE IF EXISTS `interface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interface` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `baseUrl` varchar(255) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `api` varchar(255) NOT NULL,
  `verb` varchar(255) NOT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `key` varchar(50) NOT NULL,
  `description` text,
  `needParams` tinyint(1) DEFAULT '1',
  `needDatas` tinyint(1) DEFAULT '1',
  `isAllParam` tinyint(1) DEFAULT '1',
  `params` text,
  `fields` text,
  `isSystem` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `interface_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interface`
--

LOCK TABLES `interface` WRITE;
/*!40000 ALTER TABLE `interface` DISABLE KEYS */;
INSERT INTO `interface` VALUES (1,'',NULL,'menus/all','GET','','menus-all-fetch','拉取menus的全部数据,包括深度',0,0,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(2,'',NULL,'menus','GET','','menus-fetch','拉取menus的全部数据',1,0,1,'null','[{\"field\":\"datas\",\"path\":\"rows\"},{\"field\":\"total\",\"path\":\"count\"}]',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(3,'',NULL,'menus/:key/edit','GET','','menus-key-detail','拉取menus中某条详情，搜索条件为key',1,0,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(4,'',NULL,'menus','POST','','menus-add','新建menus一条数据',0,1,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(5,'',NULL,'menus/:id','DELETE','','menus-id-delete','删除menus中的一条数据',0,0,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(6,'',NULL,'menus/:id','PUT','','menus-id-edit','修改menus中的一条数据',0,1,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(7,'',NULL,'schemas','GET','','schemas-fetch','拉取schemas中所有数据',1,0,1,'null','[{\"field\":\"datas\",\"path\":\"rows\"},{\"field\":\"total\",\"path\":\"count\"}]',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(8,'',NULL,'schemas','POST','','schemas-add','添加schemas中的一条数据',0,1,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(9,'',NULL,'schemas/:id','PUT','','schemas-id-edit','修改schemas中的一条数据',0,1,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(10,'',NULL,'schemas/:id','DELETE','','schemas-id-delete','修改schemas中的一条数据',0,0,1,'null','',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(11,NULL,NULL,'actions','GET',NULL,'actions-fetch','拉取actions的全部数据',1,0,1,NULL,'[{\"field\":\"datas\",\"path\":\"rows\"},{\"field\":\"total\",\"path\":\"count\"}]',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(12,NULL,NULL,'actions','POST',NULL,'actions-add','添加actions中的一条数据',0,1,1,NULL,NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(13,NULL,NULL,'actions/:id','PUT',NULL,'actions-id-edit','修改actions中的一条数据',0,1,1,NULL,NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(14,NULL,NULL,'actions/:id','DELETE',NULL,'actions-id-delete','删除actions中的一条数据',0,1,1,NULL,NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(15,NULL,NULL,'interfaces','GET',NULL,'interfaces-fetch','拉取interfaces中所有数据',1,0,1,NULL,'[{\"field\":\"datas\",\"path\":\"rows\"},{\"field\":\"total\",\"path\":\"count\"}]',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(16,NULL,NULL,'interfaces','POST',NULL,'interfaces-add','添加interfaces中一条数据',0,1,1,NULL,NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(17,NULL,NULL,'interfaces/:id','PUT',NULL,'interfaces-id-edit','修改interfaces中一条数据',0,1,1,NULL,NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(18,NULL,NULL,'interfaces/:id','DELETE',NULL,'interfaces-id-delete','删除interfaces中一条数据',0,1,1,NULL,NULL,1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),(20,NULL,NULL,'servers','GET',NULL,'servers-fetch','拉取所有的服务器数据',1,0,1,NULL,'[\n  {\n    \"field\": \"datas\",\n    \"path\": \"rows\"\n  },\n  {\n    \"field\": \"total\",\n    \"path\": \"count\"\n  }\n]',1,'2016-03-16 06:41:22','2016-03-16 06:41:22'),(21,NULL,NULL,'servers','POST',NULL,'servers-add','新建一个服务器信息',0,1,1,NULL,NULL,1,'2016-03-16 06:43:07','2016-03-16 06:43:07'),(22,'',0,'servers/:id','PUT',NULL,'servers-id-edit','修改一个服务器数据',0,1,1,NULL,NULL,1,'2016-03-16 06:43:59','2016-03-16 06:45:15'),(23,NULL,NULL,'servers/:id','DELETE',NULL,'servers-id-delete',NULL,0,0,1,NULL,NULL,1,'2016-03-16 06:44:24','2016-03-16 06:44:24');
/*!40000 ALTER TABLE `interface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `lft` int(11) DEFAULT NULL,
  `rgt` int(11) DEFAULT NULL,
  `parentKey` varchar(255) DEFAULT NULL,
  `description` text,
  `isShow` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  UNIQUE KEY `menu_title_unique` (`title`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `menu_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'permiss_sy','GM系统','domain',NULL,1,24,NULL,'GM系统',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(2,'settings','系统设置','settings',NULL,2,13,'permiss_sy','系统设置',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(3,'module','模块管理','view_module','#/pages/module',3,4,'settings','模块管理',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(4,'action','操作管理','note_add','#/pages/action',5,6,'settings','操作管理',1,'2016-03-15 07:05:32','2016-03-15 09:11:52'),(6,'interface','接口设置','extension','#/pages/interface',7,8,'settings','接口设置',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(7,'schema','SCHEMA设置','wallet_giftcard','#/pages/schema',9,10,'settings','SCHEMA设置',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(8,'server','服务器设置','computer','#/pages/server',11,12,'settings','服务器设置',1,'2016-03-15 07:05:32','2016-03-16 06:27:50'),(9,'permiss','权限设置','apps',NULL,14,19,'permiss_sy','权限设置',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(10,'group','权限组管理','group','#/pages/group',15,16,'permiss','权限组管理',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(11,'actor','角色管理','people_outline','#/pages/actor',17,18,'permiss','角色管理',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(12,'person_set','用户设置','person','',20,23,'permiss_sy','用户设置',1,'2016-03-15 07:05:32','2016-03-15 07:05:32'),(13,'person','用户管理','person_outline','#/pages/person',21,22,'person_set','用户管理',1,'2016-03-15 07:05:32','2016-03-15 07:05:32');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema`
--

DROP TABLE IF EXISTS `schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `type` int(11) DEFAULT '0',
  `content` text NOT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  UNIQUE KEY `schema_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema`
--

LOCK TABLES `schema` WRITE;
/*!40000 ALTER TABLE `schema` DISABLE KEYS */;
INSERT INTO `schema` VALUES (1,'schema-data',1,'{\n  \"type\": \"object\",\n  \"required\": [\n    \"type\",\n    \"key\",\n    \"content\"\n  ],\n  \"properties\": {\n    \"type\": {\n      \"type\": \"number\",\n      \"title\":\"类型\",\n      \"enum\":[1,2]\n    },\n    \"key\": {\n      \"type\": \"string\"\n      \n    },\n    \"description\": {\n      \"type\": \"string\",\n      \"title\":\"描述\"\n    },\n    \"content\": {\n      \"type\": \"string\",\n      \"title\":\"内容\"\n    }\n  }\n}','schema字段说明','2016-03-15 07:05:32','2016-03-15 10:44:13'),(2,'schema-form-add&edit',2,'{\"form\":[{\"key\":\"key\",\"type\":\"text\"},{\"key\":\"description\",\"type\":\"textarea\"},{\"key\":\"content\",\"type\":\"jsoneditor\",\"preferText\":true,\"jsonOptions\":{\"mode\":\"tree\",\"modes\":[\"tree\",\"code\"]}}]}','schema新建和修改表单的说明字段','2016-03-15 07:05:32','2016-03-15 07:05:32'),(4,'schema-form-search',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\",\n      \"required\":false,\n      \"copyValueTo\": [\n        \"r-key.$like\"\n      ]\n    }\n  ]\n}','schema搜索表单','2016-03-15 07:55:47','2016-03-15 10:57:22'),(5,'module-data',0,'{\n  \"type\": \"object\",\n  \"required\": [\n    \"key\",\n    \"title\",\n    \"icon\"\n  ],\n  \"properties\": {\n    \"parentKey\": {\n      \"type\": \"string\",\n      \"title\":\"父节点KEY\"\n    },\n    \"key\": {\n      \"type\": \"string\",\n      \"maxLength\": 50\n      \n    },\n    \"title\": {\n      \"type\": \"string\",\n      \"title\":\"标题\"\n    },\n    \"icon\": {\n      \"type\": \"string\",\n      \"title\":\"图标\"\n    },\n    \"link\": {\n      \"type\": \"string\",\n      \"title\":\"链接\"\n    },\n    \"isShow\": {\n      \"type\": \"boolean\",\n      \"title\":\"是否显示\"\n    },\n    \"description\": {\n      \"type\": \"string\",\n      \"title\":\"描述\"\n    }\n  }\n}','模块管理数据字段说明','2016-03-15 08:03:03','2016-03-15 10:45:24'),(6,'module-form-add&edit',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"title\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"icon\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"link\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"description\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"parentKey\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"isShow\",\n      \"type\": \"checkbox\"\n    }\n  ]\n}','模块管理新建和修改表单描述','2016-03-15 08:16:44','2016-03-15 10:32:01'),(7,'module-form-search',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\",\n      \"required\":false,\n      \"copyValueTo\": [\n        \"r-key.$eq\"\n      ]\n    }\n  ]\n}','模块管理搜索表单描述','2016-03-15 08:19:50','2016-03-15 10:57:29'),(8,'interface-data',0,'{\n  \"type\": \"object\",\n  \"required\": [\n    \"api\",\n    \"key\",\n    \"verb\"\n  ],\n  \"properties\": {\n    \"key\": {\n      \"type\": \"string\"\n    },\n    \"baseUrl\": {\n      \"type\": \"string\",\n      \"title\": \"接口地址\"\n    },\n    \"port\": {\n      \"type\": \"number\",\n      \"title\": \"接口端口\"\n    },\n    \"api\": {\n      \"type\": \"string\",\n      \"title\": \"接口api\"\n    },\n    \"verb\": {\n      \"type\": \"string\",\n      \"title\": \"协议类型\",\n      \"enum\": [\n        \"GET\",\n        \"POST\",\n        \"DELETE\",\n        \"PUT\"\n      ]\n    },\n    \"needParams\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否需要参数\"\n    },\n    \"needDatas\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否需要参数\"\n    },\n    \"prefix\": {\n      \"type\": \"string\",\n      \"title\": \"搜索字段前缀\"\n    },\n    \"fields\": {\n      \"type\": \"string\",\n      \"title\": \"接口返回字段描述\"\n    },\n    \"isSystem\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否是系统接口\"\n    },\n    \"isAllParam\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否需要所有的参数\"\n    },\n    \"params\": {\n      \"type\": \"string\",\n      \"title\": \"参数描述\"\n    },\n    \"description\": {\n      \"type\": \"string\",\n      \"title\": \"描述\"\n    }\n  }\n}','接口设置数据字段','2016-03-15 08:27:18','2016-03-16 06:45:42'),(9,'interface-form-add&edit',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"baseUrl\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"port\",\n      \"type\": \"number\"\n    },\n    {\n      \"key\": \"api\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"verb\",\n      \"type\": \"select\",\n      \"titleMap\": [\n        {\n          \"name\": \"GET\",\n          \"value\": \"GET\"\n        },\n        {\n          \"name\": \"POST\",\n          \"value\": \"POST\"\n        },\n        {\n          \"name\": \"DELETE\",\n          \"value\": \"DELETE\"\n        },\n        {\n          \"name\": \"PUT\",\n          \"value\": \"PUT\"\n        }\n      ]\n    },\n    {\n      \"key\": \"prefix\",\n      \"type\": \"text\",\n      \"default\": \"filter\"\n    },\n    {\n      \"key\": \"description\",\n      \"type\": \"textarea\"\n    },\n    {\n      \"key\": \"params\",\n      \"type\": \"jsoneditor\",\n      \"preferText\": true,\n      \"jsonOptions\": {\n        \"mode\": \"tree\",\n        \"modes\": [\n          \"tree\",\n          \"code\"\n        ]\n      }\n    },\n    {\n      \"key\": \"fields\",\n      \"type\": \"jsoneditor\",\n      \"preferText\": true,\n      \"jsonOptions\": {\n        \"mode\": \"tree\",\n        \"modes\": [\n          \"tree\",\n          \"code\"\n        ]\n      }\n    },\n    {\n      \"key\": \"needParams\",\n      \"type\": \"checkbox\"\n    },\n    {\n      \"key\": \"needDatas\",\n      \"type\": \"checkbox\"\n    },\n    {\n      \"key\": \"isSystem\",\n      \"type\": \"checkbox\"\n    }\n  ]\n}','接口设置中新建和修改表单描述','2016-03-15 08:32:25','2016-03-15 08:32:25'),(10,'interface-form-search',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\",\n      \"required\":false,\n      \"copyValueTo\": [\n        \"r-key.$eq\"\n      ]\n    }\n  ]\n}','接口设置搜索表单描述','2016-03-15 08:32:57','2016-03-15 10:57:37'),(11,'action-data',0,'{\n  \"type\": \"object\",\n  \"required\": [\n    \"type\",\n    \"key\"\n  ],\n  \"properties\": {\n    \"key\": {\n      \"type\": \"string\",\n      \"maxLength\": 50\n    },\n    \"parentKey\": {\n      \"type\": \"string\",\n      \"title\": \"所属模块\",\n      \"maxLength\": 50\n    },\n    \"title\": {\n      \"type\": \"string\",\n      \"title\": \"操作名称\",\n      \"maxLength\": 10\n    },\n    \"icon\": {\n      \"type\": \"string\",\n      \"title\": \"操作ICON\"\n    },\n    \"searchSchemaKey\": {\n      \"type\": \"string\",\n      \"title\": \"搜索表单SCHEMA\"\n    },\n    \"formSchemaKey\": {\n      \"type\": \"string\",\n      \"title\": \"表单SCHEMA\"\n    },\n    \"dataSchemaKey\": {\n      \"type\": \"string\",\n      \"title\": \"数据描述SCHEMA\"\n    },\n    \"templateUrl\": {\n      \"type\": \"string\",\n      \"title\": \"自定义模板URL\"\n    },\n    \"controller\": {\n      \"type\": \"string\",\n      \"title\": \"自定义控制器\"\n    },\n    \"linkUrl\": {\n      \"type\": \"string\",\n      \"title\": \"跳转地址\"\n    },\n    \"columns\": {\n      \"type\": \"string\",\n      \"title\": \"表头信息\"\n    },\n    \"interfaces\": {\n      \"type\": \"string\",\n      \"title\": \"操作所需要的接口\"\n    },\n    \"clearCurrentItem\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否清除掉当前的表单数据\"\n    },\n    \"isList\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否是列表操作\"\n    },\n    \"isRefresh\": {\n      \"type\": \"boolean\",\n      \"title\": \"是否需要刷新列表页面在操作完成之后\"\n    },\n    \"description\": {\n      \"type\": \"string\",\n      \"title\": \"描述\"\n    },\n    \"type\": {\n      \"type\": \"number\",\n      \"title\": \"菜单类型\",\n      \"enum\": [\n        1,\n        2,\n        3,\n        4\n      ]\n    },\n    \"optype\": {\n      \"type\": \"number\",\n      \"title\": \"操作类型\",\n      \"enum\": [\n        1,\n        2,\n        3,\n        4,\n        5\n      ]\n    }\n  }\n}','操作管理数据字段描述','2016-03-15 08:48:13','2016-03-16 06:30:43'),(12,'action-form-add&edit',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"parentKey\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"title\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"icon\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"type\",\n      \"type\": \"select\",\n      \"titleMap\": [\n        {\n          \"name\": \"系统操作菜单\",\n          \"value\": 1\n        },\n        {\n          \"name\": \"单个数据菜单\",\n          \"value\": 2\n        },\n        {\n          \"name\": \"多选菜单\",\n          \"value\": 3\n        },\n        {\n          \"name\": \"顶级菜单\",\n          \"value\": 4\n        }\n      ]\n    },\n    {\n      \"key\": \"optype\",\n      \"type\": \"select\",\n      \"titleMap\": [\n        {\n          \"name\": \"无操作\",\n          \"value\": 1\n        },\n        {\n          \"name\": \"确认操作\",\n          \"value\": 2\n        },\n        {\n          \"name\": \"跳转操作\",\n          \"value\": 3\n        },\n        {\n          \"name\": \"弹窗操作\",\n          \"value\": 4\n        },\n        {\n          \"name\": \"自定义弹窗操作\",\n          \"value\": 5\n        }\n      ]\n    },\n    {\n      \"key\": \"searchSchemaKey\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"formSchemaKey\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"dataSchemaKey\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"templateUrl\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"controller\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"linkUrl\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"description\",\n      \"type\": \"textarea\"\n    },\n    {\n      \"key\": \"isList\",\n      \"type\": \"checkbox\"\n    },\n    {\n      \"key\": \"isRefresh\",\n      \"type\": \"checkbox\"\n    },\n    {\n      \"key\": \"clearCurrentItem\",\n      \"type\": \"checkbox\"\n    },\n    {\n      \"key\": \"columns\",\n      \"type\": \"jsoneditor\",\n      \"preferText\": true,\n      \"jsonOptions\": {\n        \"mode\": \"tree\",\n        \"modes\": [\n          \"tree\",\n          \"code\"\n        ]\n      }\n    },\n    {\n      \"key\": \"interfaces\",\n      \"type\": \"jsoneditor\",\n      \"preferText\": true,\n      \"jsonOptions\": {\n        \"mode\": \"tree\",\n        \"modes\": [\n          \"tree\",\n          \"code\"\n        ]\n      }\n    },\n    {\n      \"key\": \"defaultDatas\",\n      \"type\": \"jsoneditor\",\n      \"preferText\": true,\n      \"jsonOptions\": {\n        \"mode\": \"tree\",\n        \"modes\": [\n          \"tree\",\n          \"code\"\n        ]\n      }\n    }\n  ]\n}','操作管理新建修改表单描述','2016-03-15 09:01:00','2016-03-16 06:30:20'),(13,'action-form-search',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\",\n      \"copyValueTo\": [\n        \"r-key.$eq\"\n      ]\n    },\n    {\n      \"key\": \"parentKey\",\n      \"type\": \"text\",\n      \"copyValueTo\": [\n        \"r-parentKey.$eq\"\n      ]\n    }\n  ]\n}','操作管理搜索表单描述','2016-03-15 09:01:36','2016-03-16 06:28:33'),(14,'server-data',0,'{\n  \"type\": \"object\",\n  \"required\": [\n    \"type\",\n    \"key\",\n    \"description\"\n  ],\n  \"properties\": {\n    \"type\": {\n      \"type\": \"number\",\n      \"title\":\"类型，来区分不同的接口调用不同的地址\"\n    },\n    \"key\": {\n      \"type\": \"string\"\n      \n    },\n    \"description\": {\n      \"type\": \"string\",\n      \"title\":\"描述\"\n    },\n    \"title\": {\n      \"type\": \"string\",\n      \"title\":\"标题\"\n    },\n    \"baseUrl\": {\n      \"type\": \"string\",\n      \"title\":\"服务器地址\"\n    },\n    \"port\": {\n      \"type\": \"number\",\n      \"title\":\"接口端口\"\n    },\n    \"verb\": {\n      \"type\": \"string\",\n      \"title\":\"接口协议\"\n    },\n    \"isDefault\": {\n      \"type\": \"boolean\",\n      \"title\":\"是否是默认接口\"\n    }\n  }\n}','服务器设置的字段描述','2016-03-16 06:51:23','2016-03-16 06:51:23'),(15,'server-form-add&edit',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"title\",\n      \"type\": \"text\"\n    },\n     {\n      \"key\": \"baseUrl\",\n      \"type\": \"text\"\n    },\n    {\n      \"key\": \"port\",\n      \"type\": \"number\"\n    },\n    {\n      \"key\": \"verb\",\n      \"type\": \"select\",\n      \"titleMap\":[\n        {\n          \"name\":\"HTTP\",\n          \"value\":\"HTTP\"\n        } ,\n        {\n          \"name\":\"HTTPs\",\n          \"value\":\"HTTP\"\n        } \n      ]\n    },\n    {\n      \"key\": \"type\",\n      \"type\": \"number\"\n    },\n    {\n      \"key\": \"isDefault\",\n      \"type\": \"checkbox\"\n    },\n    {\n      \"key\": \"description\",\n      \"type\": \"textarea\"\n    }\n  ]\n}','服务器设置的表单描述','2016-03-16 07:00:15','2016-03-16 07:00:15'),(16,'server-form-search',0,'{\n  \"form\": [\n    {\n      \"key\": \"key\",\n      \"type\": \"text\",\n      \"required\":false,\n      \"copyValueTo\":[\"r-key.$eq\"]\n    },\n    {\n      \"key\": \"type\",\n      \"type\": \"number\",\n      \"required\":false,\n      \"copyValueTo\":[\"r-type.$eq\"]\n    }\n  ]\n}','服务器设置搜索表单描述','2016-03-16 07:01:47','2016-03-16 07:01:47');
/*!40000 ALTER TABLE `schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'express4'
--

--
-- Dumping routines for database 'express4'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-16 15:02:44
