-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2016 at 01:02 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `btl_csdl`
--

-- --------------------------------------------------------

--
-- Table structure for table `foodcategories`
--

CREATE TABLE `foodcategories` (
  `idFoodCategories` int(11) NOT NULL,
  `FoodCategory` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `foodcategories`
--

INSERT INTO `foodcategories` (`idFoodCategories`, `FoodCategory`) VALUES
(1, 'Appetizers'),
(2, 'Fish'),
(3, 'Meat'),
(4, 'Soup'),
(5, 'Beans'),
(6, 'Pastas');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `idIngredient` int(11) NOT NULL,
  `Ingredient` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`idIngredient`, `Ingredient`) VALUES
(1, 'Flour'),
(2, 'Raisins'),
(3, 'Syrup'),
(4, 'Rice'),
(5, 'Lettuce'),
(6, 'Carrots'),
(7, 'Potato'),
(8, 'Apples'),
(9, 'Chicken'),
(10, 'Blackbeans'),
(11, 'Shrimp'),
(12, 'Salmon'),
(13, 'Spaghetti'),
(14, 'Tomato'),
(15, 'Salt'),
(16, 'Pepper'),
(17, 'Garlic'),
(18, 'Paprika'),
(19, 'Onions'),
(20, 'Cumin'),
(21, 'Cayenne pepper'),
(22, 'Olive oil'),
(23, 'Dry sherry'),
(24, 'Hot sauce'),
(25, 'Oregano'),
(26, 'Bay leaves'),
(27, 'Honey'),
(28, 'Avocado'),
(29, 'Lime');

-- --------------------------------------------------------

--
-- Table structure for table `recipeingredients`
--

CREATE TABLE `recipeingredients` (
  `idrecipeIngredient` int(11) NOT NULL,
  `RecipeIdRecipe` int(11) DEFAULT NULL,
  `IngredientIdIngredient` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Comments` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipeingredients`
--

INSERT INTO `recipeingredients` (`idrecipeIngredient`, `RecipeIdRecipe`, `IngredientIdIngredient`, `Quantity`, `Comments`) VALUES
(1, 1, 7, 6, 'cut in pieces'),
(2, 1, 9, 2, 'cut in small pieces'),
(3, 1, 15, 2, 'pinch'),
(4, 1, 16, 2, 'tbsp.'),
(5, 1, 6, 4, 'cut in slices'),
(6, 2, 10, 1, 'pound'),
(7, 2, 15, 1, 'tbsp.'),
(8, 2, 16, 1, 'tsp.'),
(9, 2, 20, 1, 'tbsp.'),
(10, 2, 17, 3, 'cloves'),
(11, 2, 19, 1, 'cut in small pieces'),
(12, 3, 11, 1, 'pound'),
(13, 3, 14, 2, 'tbsp. (paste)'),
(14, 3, 18, 1, 'tbsp.'),
(15, 3, 21, 1, 'tsp.'),
(16, 3, 17, 5, 'cloves'),
(17, 3, 22, 1, 'cup'),
(18, 3, 23, 4, 'tbsp.'),
(19, 3, 24, 1, 'tsp.'),
(20, 4, 25, 2, 'tbsp.'),
(21, 4, 14, 1, 'canned (plum)'),
(22, 4, 17, 3, 'cloves'),
(23, 4, 22, 2, 'tbsp.'),
(24, 4, 27, 1, 'tsp.'),
(25, 5, 28, 2, 'cut in halves'),
(26, 5, 19, 1, 'cut in slices (red)'),
(27, 5, 4, 1, 'rinse first'),
(28, 5, 15, 0, 'to taste'),
(29, 5, 29, 1, 'cut in half');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `idRecipe` int(11) NOT NULL,
  `RecipeName` varchar(45) DEFAULT NULL,
  `RecipeDescription` varchar(45) DEFAULT NULL,
  `Source` varchar(45) DEFAULT NULL,
  `FoodcategoryIdFoodCategories` int(11) DEFAULT NULL,
  `Vegetarian` tinyint(1) DEFAULT NULL,
  `TimeToPrepare` int(11) DEFAULT NULL,
  `NumberOfServings` int(11) DEFAULT NULL,
  `CaloriesPerServing` int(11) DEFAULT NULL,
  `NutritionalInformation` text,
  `Instructions` text,
  `Utensils` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`idRecipe`, `RecipeName`, `RecipeDescription`, `Source`, `FoodcategoryIdFoodCategories`, `Vegetarian`, `TimeToPrepare`, `NumberOfServings`, `CaloriesPerServing`, `NutritionalInformation`, `Instructions`, `Utensils`) VALUES
(1, 'Chicken Soup', 'Great Meal!', 'Nancy', 4, 0, 45, 8, 300, 'Very nutritional.', 'Fill a big pot with water. Bring to boil, add salt and pepper. Add chicken, potatoes, and carrots. Reduce heat and simmer for 1 hour until chicken is tender.', NULL),
(2, 'Black Beans', 'Can be combined with rice', 'Dad', 5, 1, 90, 6, 400, 'Very good for the kids.', 'Soak the black beans overnight. In a big pot, add 15 cups of cold water, with cumin, salt, pepper, garlic, & onions. Bring it to boil. Add the black beans without the water used to soak them. Reduce heat & simmer until blackbeans are tender.', NULL),
(3, 'Gambas al Ajillo (Shrimp with Garlic)', 'Very good Spanish dish', 'Mom', 2, 0, 15, 4, 500, 'Good source of protein and fun to prepare.', 'In a small container, mix paprika, hot sauce, tomato paste, salt, cayenne pepper, and dry sherry. In a skillet, heat the garlic with olive oil for 1 minute. Add shrimp and mixture and cook until shrimp is pink. Serve hot.', NULL),
(4, 'Pasta Napolitana', 'Very good Italian sauce', 'Northwind Traders', 6, 1, 30, 4, 325, 'Quick to prepare and very rich in vitamin C.', 'Saute garlic in a skillet with olive oil until they are brown at medium heat. Reduce heat and add tomatoes, oregano and bay leaves.  Let it simmer until sauce is thick. Serve on top of pasta. Add honey to reduce acidity.', NULL),
(5, 'Avocado Salad', 'Delicious!', 'Mom', 1, 1, 10, 8, 275, 'Very good vegetarian meal.', 'Cut avocado in halves. In a big bowl, place sliced tomatoes, red onions, and lettuce. Sprinkle with lime juice, salt and pepper. Toss. Add avocado on top. Toss gently. Serve.', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foodcategories`
--
ALTER TABLE `foodcategories`
  ADD PRIMARY KEY (`idFoodCategories`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`idIngredient`);

--
-- Indexes for table `recipeingredients`
--
ALTER TABLE `recipeingredients`
  ADD PRIMARY KEY (`idrecipeIngredient`),
  ADD KEY `id_recipe_idx` (`RecipeIdRecipe`),
  ADD KEY `id_ingredient_idx` (`IngredientIdIngredient`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`idRecipe`),
  ADD KEY `id_foodCategory_idx` (`FoodcategoryIdFoodCategories`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foodcategories`
--
ALTER TABLE `foodcategories`
  MODIFY `idFoodCategories` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `idIngredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `recipeingredients`
--
ALTER TABLE `recipeingredients`
  MODIFY `idrecipeIngredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `idRecipe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipeingredients`
--
ALTER TABLE `recipeingredients`
  ADD CONSTRAINT `id_ingredient` FOREIGN KEY (`IngredientIdIngredient`) REFERENCES `ingredients` (`idIngredient`) ON UPDATE CASCADE,
  ADD CONSTRAINT `id_recipe` FOREIGN KEY (`RecipeIdRecipe`) REFERENCES `recipes` (`idRecipe`) ON UPDATE CASCADE;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `id_foodCategory` FOREIGN KEY (`FoodcategoryIdFoodCategories`) REFERENCES `foodcategories` (`idFoodCategories`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
