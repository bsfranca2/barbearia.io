CREATE TABLE `State` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `City` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `stateId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_cities_state_id` (`stateId`)
  -- CONSTRAINT `fk_cities_state_id` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Address` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cep` varchar(8) NOT NULL,
  `cityId` smallint unsigned NOT NULL,
  `neighborhood` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `number` varchar(10) NOT NULL,
  `complement` varchar(100) DEFAULT NULL,
  `location` point DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_addresses_city_id` (`cityId`)
  -- CONSTRAINT `fk_addresses_city_id` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Barbershop` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  -- TODO: Slug must be unique
  `slug` varchar(20) NOT NULL,
  `addressId` int unsigned DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  -- `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updatedAt` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_barbershop_address_id` (`addressId`)
  -- CONSTRAINT `fk_barbershops_address_id` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Role` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Employee` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `roleId` tinyint unsigned NOT NULL,
  `barbershopId` int unsigned NOT NULL,
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_employee_role_id` (`roleId`),
  KEY `idx_employee_barbershop_id` (`barbershopId`)
  -- CONSTRAINT `fk_employees_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  -- CONSTRAINT `fk_employees_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `WorkingHours` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employeeId` int unsigned NOT NULL,
  `dayOfWeek` tinyint unsigned NOT NULL,
  `startAt` time NOT NULL,
  `endAt` time NOT NULL,
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_working_hours_employee_id` (`employeeId`)
  -- CONSTRAINT `fk_working_time_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
  -- TODO: Add check for day of week
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `barbershopId` int unsigned NOT NULL,
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_category_barbershop_id` (`barbershopId`)
  -- CONSTRAINT `fk_categories_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Service` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `barbershopId` int unsigned NOT NULL,
  `categoryId` int unsigned DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` int NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_service_category_id` (`categoryId`),
  KEY `idx_service_barbershop_id` (`barbershopId`)
  -- CONSTRAINT `fk_services_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  -- CONSTRAINT `fk_services_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `EmployeeService` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employeeId` int unsigned NOT NULL,
  `serviceId` int unsigned NOT NULL,
  `duration` int DEFAULT NULL,
  `price` decimal(10, 2) DEFAULT NULL,
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_employee_services_employee_id` (`employeeId`),
  KEY `idx_employee_services_service_id` (`serviceId`)
  -- CONSTRAINT `fk_employees_services_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  -- CONSTRAINT `fk_employees_services_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Customer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `barbershopId` int unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customer_barbershop_id` (`barbershopId`)
  -- CONSTRAINT `fk_customers_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Appointment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `employeeServiceId` int unsigned NOT NULL,
  `duration` int NOT NULL,
  `date` timestamp NOT NULL,
  -- `status` enum('pending','confirmed','canceled') NOT NULL DEFAULT 'pending',
  -- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_appointment_customer_id` (`customerId`),
  KEY `idx_appointment_employee_service_id` (`employeeServiceId`)
  -- CONSTRAINT `fk_appointments_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  -- CONSTRAINT `fk_appointments_employee_service_id` FOREIGN KEY (`employee_service_id`) REFERENCES `employees_services` (`id`),
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `User` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `entityId` int unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailVerifiedAt` timestamp NULL DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `phoneVerifiedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `BarbershopUser` (
  `barbershopId` int unsigned,
  `userId` int unsigned,
  `entityType` enum('EMPLOYEE', 'CUSTOMER') NOT NULL,
  PRIMARY KEY (`barbershopId`, `userId`),
  KEY `idx_barbershop_user_barbershop_id` (`barbershopId`),
  KEY `idx_barbershop_user_user_id` (`userId`)
  -- CONSTRAINT `fk_barbershop_user_barbershop_id` FOREIGN KEY (`barbershopId`) REFERENCES `Barbershop` (`id`),
  -- CONSTRAINT `fk_barbershop_user_user_id` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

/*
 CREATE TABLE `Account` (
 `id` int unsigned NOT NULL AUTO_INCREMENT,
 `userId` int unsigned NOT NULL,
 `type` varchar(20) NOT NULL,
 `provider` varchar(50) NOT NULL,
 `providerAccountId` varchar(255) DEFAULT NULL,
 `refreshToken` varchar(255) DEFAULT NULL,
 `accessToken` varchar(255) DEFAULT NULL,
 `expiresAt` timestamp NULL DEFAULT NULL,
 `tokenType` varchar(255) DEFAULT NULL,
 `scope` varchar(255) DEFAULT NULL,
 `idToken` varchar(255) DEFAULT NULL,
 `sessionState` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `idx_account_user_id` (`userId`)
 -- CONSTRAINT `fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8; */
