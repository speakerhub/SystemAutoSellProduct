/*
CREATE TABLE User (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    UserName nVARCHAR(255) NOT NULL,
    Phone nVARCHAR(12) NOT NULL UNIQUE,
    Email nVARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    IsActive boolean DEFAULT 1,
    Role ENUM('Admin', 'User') DEFAULT 'User',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Workflow(
    WorkflowId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,	
    Description VARCHAR(255) NOT NULL,
    Status ENUM('Draft', 'Active', 'Archived') DEFAULT 'Active',
    CreateAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UserId int,
    Foreign key (UserId) references User(UserId)
);

create table Task(
	TaskId	INT AUTO_INCREMENT PRIMARY KEY,
	WorkflowId	INT,
    Foreign Key (WorkflowId) references Workflow(WorkflowId),
	Name	NVARCHAR(255) not null,
	Type	ENUM('Input','Logic','Action','Output'),
	Config	JSON,
	`Order`	INT,
	CreateAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdateAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table ExecutionLog(
	ExecutionId	INT	AUTO_INCREMENT PRIMARY KEY,
	WorkflowId	INT,
    Foreign Key (WorkflowId) references Workflow(WorkflowId),
	Status	ENUM ('Running','Success','Failed'),
	Logs	JSON,
	StartedAt	DATETIME DEFAULT CURRENT_TIMESTAMP,
	FinishedAt	DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table Integration(
	IntegrationId	INT	AUTO_INCREMENT PRIMARY KEY,
	UserId	INT,
    Foreign key (UserId) references User(UserId),
	Service	NVARCHAR(255),
	Config	JSON,
	CreateAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
*/

use autoworkflow;
drop database autoworkflow;
create database autoworkflow;


DESCRIBE Product;

SHOW CREATE TABLE Product;
