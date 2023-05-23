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
  `slug` varchar(20) NOT NULL,
  `addressId` int unsigned DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  -- `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  -- `updatedAt` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_barbershop_address_id` (`addressId`),
  CONSTRAINT uc_barbershop_slug UNIQUE (`slug`)
  -- CONSTRAINT `fk_barbershops_address_id` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `BarbershopConfig` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `barbershopId` int unsigned NOT NULL,
  `minimumBookingNotice` int NOT NULL DEFAULT 5,
  `minimumTimeBetweenAppointments` int NOT NULL DEFAULT 0,
  `beforeAppointmentBuffer` int NOT NULL DEFAULT 0,
  `afterAppointmentBuffer` int NOT NULL DEFAULT 0,
  `slotInterval` int NOT NULL DEFAULT 15,
  `maximumAdvanceBookDays` int NOT NULL DEFAULT 30,
  PRIMARY KEY (`id`),
  KEY `idx_barbershop_config_barbershop_id` (`barbershopId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Employee` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailVerifiedAt` timestamp NULL DEFAULT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `phoneNumberVerifiedAt` timestamp NULL DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_employee_barbershop_id_email` (`email`),
  KEY `idx_employee_barbershop_id_phone_number` (`phoneNumber`),
  CONSTRAINT uc_employee_email UNIQUE (`email`), 
  CONSTRAINT uc_employee_phone_number UNIQUE (`phoneNumber`)
  -- CONSTRAINT `fk_employees_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  -- CONSTRAINT `fk_employees_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `BarbershopEmployee` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `barbershopId` int unsigned NOT NULL,
  `employeeId` int unsigned NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  `archivedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  -- KEY `idx_employee_archived_at` (`archivedAt`),
  -- KEY `idx_employee_deleted_at` (`deletedAt`),
  -- CONSTRAINT `fk_barbershop_employee_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
  -- CONSTRAINT `fk_barbershop_employee_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `WorkingHours` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employeeId` int unsigned NOT NULL,
  `dayOfWeek` tinyint unsigned NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_working_hours_employee_id` (`employeeId`)
  -- CONSTRAINT `fk_working_time_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
  -- TODO: Add check for day of week
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `barbershopId` int unsigned NOT NULL,
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
  `emailVerifiedAt` timestamp NULL DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `phoneNumberVerifiedAt` timestamp NULL DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_customer_barbershop_id` (`barbershopId`),
  KEY `idx_customer_barbershop_id_email` (`barbershopId`, `email`),
  KEY `idx_customer_barbershop_id_phone_number` (`barbershopId`, `phoneNumber`),
  CONSTRAINT uc_customer_barbershop_id_email UNIQUE (`barbershopId`, `email`), 
  CONSTRAINT uc_customer_barbershop_id_phone_number UNIQUE (`barbershopId`, `phoneNumber`)
  -- CONSTRAINT `fk_customers_barbershop_id` FOREIGN KEY (`barbershop_id`) REFERENCES `barbershops` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `Appointment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `employeeServiceId` int unsigned NOT NULL,
  `duration` int NOT NULL,
  `date` timestamp NOT NULL,
  -- `status` enum('pending','confirmed','canceled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_appointment_customer_id` (`customerId`),
  KEY `idx_appointment_employee_service_id` (`employeeServiceId`)
  -- CONSTRAINT `fk_appointments_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  -- CONSTRAINT `fk_appointments_employee_service_id` FOREIGN KEY (`employee_service_id`) REFERENCES `employees_services` (`id`),
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `EmployeeAccount` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employeeId` int unsigned NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
  -- CONSTRAINT `fk_employee_account_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `CustomerAccount` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
  -- CONSTRAINT `fk_customer_account_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
