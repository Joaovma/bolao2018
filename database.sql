-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: May 20, 2018 at 04:07 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Bolao`
--

-- --------------------------------------------------------

--
-- Table structure for table `ApostasPF`
--

CREATE TABLE `ApostasPF` (
  `email` varchar(30) NOT NULL,
  `NAposta` int(30) NOT NULL,
  `Agolt1` int(20) NOT NULL,
  `Agolt2` int(20) NOT NULL,
  `idAposta` varchar(10000) NOT NULL,
  `idjogo` int(48) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ApostasSF`
--

CREATE TABLE `ApostasSF` (
  `Agolt1` int(20) NOT NULL,
  `Agolt2` int(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `idAposta` varchar(20) NOT NULL,
  `idjogo` int(11) NOT NULL,
  `NAposta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Classificacao`
--

CREATE TABLE `Classificacao` (
  `email` varchar(25) NOT NULL,
  `PT1` int(11) NOT NULL,
  `PT2` int(11) NOT NULL,
  `ranking` int(250) NOT NULL,
  `final` int(200) NOT NULL,
  `semi` int(200) NOT NULL,
  `quartas` int(200) NOT NULL,
  `oitas` int(200) NOT NULL,
  `2faseantes` int(200) NOT NULL,
  `2fasedepois` int(200) NOT NULL,
  `1fase` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Dados`
--

CREATE TABLE `Dados` (
  `email` varchar(30) NOT NULL,
  `senha` varchar(10) NOT NULL,
  `telefone` text NOT NULL,
  `nome` text NOT NULL,
  `cmo` text NOT NULL,
  `foto` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Dados`
--

INSERT INTO `Dados` (`email`, `senha`, `telefone`, `nome`, `cmo`, `foto`) VALUES
('rafar279@hotmail.com', '12345', '31996442115', 'Rafael Ramos', 'UFMG', '');

-- --------------------------------------------------------

--
-- Table structure for table `DadosOficiaisPF`
--

CREATE TABLE `DadosOficiaisPF` (
  `id` int(48) NOT NULL,
  `time1` text NOT NULL,
  `time2` text NOT NULL,
  `golst1` int(20) NOT NULL,
  `golst2` int(20) NOT NULL,
  `data` date NOT NULL,
  `horario` time NOT NULL,
  `grupo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `DadosOficiaisSF`
--

CREATE TABLE `DadosOficiaisSF` (
  `data` date NOT NULL,
  `golst1` int(20) NOT NULL,
  `golst2` int(20) NOT NULL,
  `fase` varchar(20) NOT NULL,
  `horario` time NOT NULL,
  `id` int(11) NOT NULL,
  `time1` varchar(30) NOT NULL,
  `time2` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
