-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: mirandadb
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `check_in` timestamp NOT NULL,
  `check_out` timestamp NOT NULL,
  `request` varchar(255) NOT NULL,
  `room` int DEFAULT NULL,
  `status` enum('Check In','Check Out','In Progress') DEFAULT 'In Progress',
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  KEY `room` (`room`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`room`) REFERENCES `room` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,'Velda','Fisher','2024-06-14 22:00:00','2024-06-18 22:00:00','Voluptas attollo cunabula confugo quam viscus possimus votum maxime utor amor vetus turba altus alius credo vinum curiositas decor qui.',4,'In Progress','2023-11-16 23:00:00'),(2,'Tyra','Gottlieb','2024-08-07 22:00:00','2024-08-10 22:00:00','Adflicto vado arcus delectatio subnecto rem temperantia conicio textor toties odit stultus ventito suspendo error creta pax tyrannus basium cauda.',9,'In Progress','2024-04-06 22:00:00'),(3,'Edna','Wiza','2024-05-05 22:00:00','2024-05-09 22:00:00','Ara utor vespillo aufero bene depulso dolorem angulus tracto stillicidium vulnus adamo tabernus ulciscor aperte absens sub tracto viduo peccatus.',2,'Check In','2024-03-18 23:00:00'),(4,'Maritza','Nolan','2024-12-31 23:00:00','2025-01-08 23:00:00','Cogito atque dolores debilito tredecim crudelis terreo patruus curo tantum conturbo eaque celo deorsum corporis addo vorago claudeo tondeo avaritia.',1,'Check In','2023-08-10 22:00:00'),(5,'Berneice','Johns','2024-12-03 23:00:00','2024-12-10 23:00:00','Callide summopere patrocinor sopor careo commodi carpo coniuratio crastinus thema voluptas vox sumptus depereo vestrum voluptates alius temeritas cupiditas at.',3,'In Progress','2025-04-20 22:00:00'),(6,'Reba','Bradtke','2024-12-17 23:00:00','2024-12-20 23:00:00','Reprehenderit tergeo turba aspicio patria creptio tergeo vulpes usitas atque urbs addo altus accedo comparo dolores ubi clam crur dolor.',8,'Check Out','2024-12-20 23:00:00'),(7,'Esta','Sporer','2024-11-03 23:00:00','2024-11-03 23:00:00','Quo amita delego cresco deserunt ait tyrannus adsidue communis debeo temeritas valetudo viduo derideo tero qui tyrannus demonstro stipes causa.',3,'Check Out','2024-09-06 22:00:00'),(8,'Lolita','Glover','2024-09-02 22:00:00','2024-09-10 22:00:00','Solio suspendo capto adeptio solutio caelum terreo cubitum labore verbum succurro sodalitas summisse crebro dolor adflicto crux aro arca tantillus.',8,'Check In','2024-11-17 23:00:00'),(9,'Mylene','Runolfsson','2024-09-03 22:00:00','2024-09-03 22:00:00','Adstringo ipsum conscendo spes credo fuga conscendo aestus conitor surculus solio votum agnosco denuncio angelus villa cognomen somnus talus tantillus.',1,'Check Out','2024-02-16 23:00:00'),(10,'Marcelina','Flatley','2024-05-28 22:00:00','2024-06-03 22:00:00','Aliquid tersus colligo suppono deorsum totam aggero vilis solvo tertius suspendo facilis aliquam atque credo uberrime sursum vapulus sollers bestia.',1,'Check Out','2025-03-06 23:00:00');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('Read','Unread') DEFAULT 'Unread',
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Evan Jacobi','Paige16@yahoo.com','264.562.0981 x1239','fell indeed after dromedary motherly hm','Studio distinctio ambitus ulterius aperiam deleo cuppedia consuasor teneo averto tabula decens absconditus bellicus delectatio combibo tubineus corona delibero volo tergo sodalitas teres tribuo demitto iusto talio amor concido dignissimos supellex tego artificiose.','Unread','2024-05-06 16:40:23'),(2,'Mr. Bradford Hackett DDS','Braxton_West96@gmail.com','(851) 210-6542 x715','till meanwhile','Amaritudo uberrime derideo comis vestigium dignissimos vomica cumque asperiores sed demo tenax veritas fugiat labore soluta recusandae thymbra soluta delectatio depono succurro similique arx porro accendo solio.','Read','2024-05-06 16:40:23'),(3,'Milton Walsh-Runolfsdottir','Gaston.Douglas33@yahoo.com','(606) 961-7772 x3203','as slim while drat destock internalise','Acidus suus soluta sponte color ventus dolor veniam corrumpo statua trans acerbitas supra acerbitas amissio perferendis absorbeo paens dolore acsi repellat eos vulgivagus pariatur appositus harum calculus crapula.','Unread','2024-05-06 16:40:23'),(4,'Ann Schneider I','Johnnie90@gmail.com','232.330.5975 x7963','hyphenate unless','Laudantium tardus bellicus comis usque cogo quis dolorem circumvenio comedo aut aut sursum congregatio tollo tondeo desparatus tactus condico teres cum administratio aurum veritatis pecto suus vergo.','Unread','2024-05-06 16:40:23'),(5,'Bobby Crooks','Seth53@gmail.com','(822) 396-6551 x952','belligerency fatally outgoing round save ambitious despite','Vilis beneficium adduco ustilo adulescens animus suus aeger antea vis considero tibi caterva decerno vitae cras attollo delego terminatio aegre patior compello corrupti tracto crastinus ea attero deripio aggredior arguo.','Unread','2024-05-06 16:40:23'),(6,'Israel Veum','Marilyne.Bailey@yahoo.com','686.223.8822 x18164','beanie constraint clean behind porcupine even','Dolorum repudiandae cilicium cibo defessus aduro eveniet armarium pax alii bibo acidus thesis autem desparatus tondeo ambulo vis comminor varietas depromo conturbo demo callide consectetur magnam totus repudiandae validus commodi crinis acervus tamdiu.','Unread','2024-05-06 16:40:23'),(7,'Ms. Debra Hermann','Adolf_Little86@hotmail.com','793.403.4382 x54530','intrepid round excepting throttle gadzooks wrongly vacant','Cervus volo volaticus alveus atrocitas deserunt curtus vito vallum tero claro curtus clamo soleo sumo arceo tepesco crudelis copia dens ambulo vitae thema aro molestias vito audio aer vesco esse deleo venio.','Read','2024-05-06 16:40:23'),(8,'Theresa Metz','Broderick87@gmail.com','365-807-5451','gosh how uh-huh tarmac dislocate','Tempus cado absum convoco currus earum contigo sponte quidem laborum contigo uterque cupiditas suspendo subito correptius adopto decipio fuga civis complectus fugiat repellendus tamdiu terra degero decumbo dedecor.','Read','2024-05-06 16:40:23'),(9,'Miriam Cummerata Sr.','Chauncey.Goodwin90@yahoo.com','1-200-823-6088 x9398','excepting afore er hopelessly','Cognomen tener perferendis cogo carpo viduo beatus aranea somnus accusamus tot reiciendis hic uterque quam commemoro decretum coerceo officiis textor demergo capillus cubitum decens sono spero tenus agnosco.','Unread','2024-05-06 16:40:23'),(10,'Ellis Walsh','Nolan_Nicolas35@yahoo.com','1-729-691-1137','whether for veto exactly lest wonderfully sparrow','Arbor vado ascisco cilicium porro soleo capto stipes annus umerus demens colo omnis coma sordeo impedit subseco adficio celer doloribus delectus creo clibanus stabilis derelinquo tenax stella adhaero earum casus crustulum.','Read','2024-05-06 16:40:23');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `room_number` varchar(3) NOT NULL,
  `room_type` enum('Single Bed','Double Bed','Double Superior','Suite') NOT NULL,
  `offer` tinyint(1) DEFAULT '0',
  `price` varchar(10) NOT NULL,
  `discount` varchar(10) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `cancelation` varchar(255) DEFAULT NULL,
  `status` enum('Available','Booked') DEFAULT 'Available',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'81','Double Superior',0,'271','78','https://picsum.photos/100/50','Culpa accedo stabilis defaeco dolor demens demergo corpus terra uterque tabgo accusator tonsor tonsor temeritas cohaero cohibeo vomito tres asperiores validus beneficium mollitia tunc aequus.','Vomer conservo totam sol sum delego dolorum vinculum copia aspicio altus illo deduco harum decumbo.','Booked'),(2,'82','Single Bed',1,'243','18','https://picsum.photos/100/50','Incidunt suscipit cruciamentum torqueo contigo summopere cena combibo tumultus ars accusantium tremo patior vespillo alo acsi solium turpis circumvenio amiculum decor ventosus aegrotatio patrocinor demens.','Cunctatio teres cogo vae aeger strenuus cado suspendo sublime vilicus sodalitas tenuis adsuesco clibanus spectaculum.','Available'),(3,'14','Suite',0,'152','82','https://picsum.photos/100/50','Brevis campana pel caute ocer denuncio voluptatibus ancilla similique absum paulatim dolorum autus temeritas agnosco desipio demonstro arbitro atqui inventore ventito coepi comis studio unus.','Carpo videlicet clamo super aegrus consequatur turbo illum deludo aufero umbra explicabo astrum nobis corroboro.','Booked'),(4,'92','Double Superior',1,'328','45','https://picsum.photos/100/50','Vos adipiscor error talio volubilis utrimque cibo articulus addo adsuesco coepi sumo aranea vesper corpus vulpes cura adeo ancilla aperte creber currus terreo vis virtus.','Tricesimus depono auctus tracto vulgo suasoria ut conservo turbo tandem carbo degenero undique communis turbo.','Available'),(5,'40','Single Bed',0,'198','29','https://picsum.photos/100/50','Delicate vobis spiculum vergo altus peior sulum studio cruciamentum tamquam victoria animi labore curo cupiditate sursum tres vado conturbo sopor tabesco sui sollicito umquam perferendis.','Aptus vitae aufero suasoria earum territo conspergo bellicus atrox decor deorsum aperte aeneus corrupti vulpes.','Booked'),(6,'44','Suite',1,'172','69','https://picsum.photos/100/50','Incidunt aegre aperte causa demergo rerum depromo defaeco texo vomito armarium odit tremo corrumpo tamquam astrum cohibeo ascit asper eaque valetudo bene aeternus artificiose adaugeo.','Sophismata universe ultio copiose animadverto adulescens celer dedecor aperte ducimus via derideo defaeco substantia apostolus.','Booked'),(7,'41','Single Bed',1,'211','30','https://picsum.photos/100/50','Facilis quidem aveho pariatur defleo aufero candidus vere bellum coepi unde coruscus amo spero cursim barba caput coepi caterva angustus tolero vilitas succurro voveo curto.','Delinquo magnam constans desipio tersus blandior alienus turba acervus illo cetera coaegresco pecco ustilo cotidie.','Booked'),(8,'55','Double Superior',1,'143','34','https://picsum.photos/100/50','Uxor utroque bestia beatae coma vorago artificiose crastinus consequuntur vester tergo deficio aegrotatio demum contego coerceo ademptio sursum fugiat molestiae at pauper trucido utilis peccatus.','Temporibus patior sed expedita suppellex demum tergeo adhaero ager clam ciminatio antea nisi admitto aurum.','Booked'),(9,'75','Double Bed',1,'130','38','https://picsum.photos/100/50','Alo quia aetas non aureus cum reprehenderit pariatur repellat rem vix pecto qui expedita canonicus textus vergo argentum deprimo unus validus denuo repellendus sortitus sophismata.','Tibi basium via vomer cotidie adaugeo corrupti curis tam aggero audacia debeo doloremque templum vitae.','Available'),(10,'15','Suite',0,'210','76','https://picsum.photos/100/50','Viduo acsi basium stillicidium culpa contego depereo certe illo conitor vir fuga corrigo stultus demergo adulescens amita provident vitium bibo tam tepidus doloremque taceo neque.','Tabula ars tepidus demo traho dignissimos acquiro neque architecto crastinus aperio officiis tenax victus necessitatibus.','Available');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `position` enum('Manager','Room Service','Receptionist') NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Frankie Parisian-Yundt','Mable_West@gmail.com','$2a$10$aq0TiorLEKIU12CF32OfSejyl8foskfYGpZLDUaCOzx2bk0Rf9sWG','560-508-2343 x0405','https://i.pravatar.cc/50','Coruscus ascit aeger aurum testimonium bestia calco adinventitias suasoria caterva xiphias vomer certus bellicus tollo supellex aequus capio textor defendo calco aduro iste molestiae tubineus cur.','Room Service','Active','2024-05-06 16:40:23'),(2,'Johanna Stiedemann','Jules.Moen@hotmail.com','$2a$10$L03PBur/OIXPkVpDqx2nEeQ1asEUBfzXAtg0oB9nqCrTcsamZIhmi','1-343-470-9635','https://i.pravatar.cc/50','Creator auctor comitatus annus urbs admoveo aggero abutor celer sopor aqua subito vespillo ventosus cervus conatus adaugeo conventus vobis turbo vorax amet civitas culpa doloremque una spes.','Receptionist','Inactive','2024-05-06 16:40:23'),(3,'Valerie Doyle','Cicero.Ernser92@gmail.com','$2a$10$oWiIPFW0zFez1jZyDv6CUuLIYeeEw4R0YlfmNMz7Fj2xrdA5.SL9m','529-600-1296','https://i.pravatar.cc/50','Incidunt temptatio supellex audentia sursum civitas vereor creptio volup thymbra creptio quas eligendi aequitas sollicito thymum alveus nostrum ullam solum adstringo repellendus viridis sunt tamdiu corrigo truculenter quaerat tamisium vallum facilis.','Room Service','Active','2024-05-06 16:40:23'),(4,'Rafael Robel V','Malvina.Kling97@gmail.com','$2a$10$1cgWrhwh3rUg78/yo1bBruBneMMEOp1kw9DFchMwNavM9JY0FzMie','1-734-987-8522 x5466','https://i.pravatar.cc/50','Adflicto urbanus accusator defero clementia aer victoria tego cauda sunt abutor pel adamo eos theatrum auxilium thermae consequuntur doloremque desolo antiquus crastinus ab adeo comprehendo sapiente sed tersus voro triumphus teres vacuus theologus.','Manager','Active','2024-05-06 16:40:23'),(5,'Dr. Darnell Pfeffer','Missouri_Effertz50@gmail.com','$2a$10$rOz4RAhi7H.0P4caTB9tkeVi66TgBVFhjAuYbFcHUbIxG/cTRaVW2','311-540-8515 x722','https://i.pravatar.cc/50','Vicinus sponte atrocitas vulgus crepusculum voco vomica basium saepe cicuta cilicium viriliter ademptio virgo fugit unde abscido venio comburo sperno avarus thermae volva delego tersus ceno certus ver vinitor crustulum spoliatio aliqua incidunt.','Room Service','Inactive','2024-05-06 16:40:23'),(6,'Dawn King','Isabelle.Bernhard41@yahoo.com','$2a$10$992YlsKRVZzShgXspKf34.Lw/IfdKvRsKvlLECTIMz0FSsoes.xKm','574-225-5472 x9175','https://i.pravatar.cc/50','Vomer sufficio audax molestiae adeptio bardus quas tot deinde repellat cubo cibus solum adaugeo dens venia accendo catena ratione defluo arca rem terra atavus voluptatibus benigne.','Receptionist','Active','2024-05-06 16:40:23'),(7,'Bradley Jast','Tom_Schneider16@hotmail.com','$2a$10$BlpNm1fNMVo1dLOMjAbkxuFVFZX18r0RqYCGLNh0SG8KgjxaJLlWi','686.415.3710 x100','https://i.pravatar.cc/50','Utor labore tenus verumtamen atque cresco xiphias utilis aperio teres arma bibo admoveo ullus cernuus tolero sui anser uberrime eaque cado aqua canto claro molestiae.','Receptionist','Inactive','2024-05-06 16:40:23'),(8,'Terrance Sauer','Winfield92@hotmail.com','$2a$10$jGgtoy37DRVXZixva6hZ2uPMAdG5xuD6S1bbRdc9fHta207x5tVaC','900.893.7174 x06054','https://i.pravatar.cc/50','Pel uter cavus caste atqui valens vulticulus quos patrocinor somnus turpis aufero comburo cognatus culpa voluptatem deprecator torrens tollo truculenter aspicio conculco dolorum thesaurus doloremque dapifer defendo laboriosam sol perferendis synagoga ventito.','Receptionist','Active','2024-05-06 16:40:23'),(9,'Wendell Roberts','Macy15@gmail.com','$2a$10$DhtaWX3JBljofsA4IQchaefffeVx5Pqmn8wrkDKc0wP0T4aefbRti','952-822-5462','https://i.pravatar.cc/50','Abeo adinventitias despecto vulgo cohibeo suus alioqui arguo vestrum desparatus thalassinus conservo temperantia cunabula creber varietas aqua dapifer nostrum crastinus bos circumvenio ab spoliatio volo allatus coma defendo sonitus crudelis debeo debilito demoror.','Receptionist','Inactive','2024-05-06 16:40:23'),(10,'Jesus Hermann','Timothy.Simonis70@gmail.com','$2a$10$h2Bvh8nkfA7ikm/nTHWsXOXbJNqZgRSOdxCEQBHzrsc75XiMw5i6W','(853) 470-6763 x913','https://i.pravatar.cc/50','Cena conor deludo dolorum urbanus peior animadverto dolorem alii cubitum repellendus caute arx vomito adeo catena vis testimonium crastinus peior bellicus congregatio vester vir vel quas delicate verbera.','Room Service','Inactive','2024-05-06 16:40:23');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-09 11:09:03
