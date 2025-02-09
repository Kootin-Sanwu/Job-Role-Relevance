-- MySQL Database Schema for the Job Role Relevance Evaluation System
DROP DATABASE IF EXISTS RoleEvaluation;

CREATE DATABASE RoleEvaluation;

USE RoleEvaluation;

-- Table to store organizational information
CREATE TABLE Organizations (
    OrganizationID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
);

-- Table to store user information (for organizational users)
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    OrganizationID INT,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(255),
    RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
);

-- Table to store job roles and their scores
CREATE TABLE JobRoles (
    JobRoleID INT AUTO_INCREMENT PRIMARY KEY,
    OrganizationID INT,
    RoleName VARCHAR(255) NOT NULL,
    RoleDescription TEXT,
    CurrentScore DECIMAL(5, 2),
    LastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
);

-- Table to store historical score data for job roles
CREATE TABLE JobRoleScores (
    ScoreID INT AUTO_INCREMENT PRIMARY KEY,
    JobRoleID INT,
    Score DECIMAL(5, 2) NOT NULL,
    EvaluationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (JobRoleID) REFERENCES JobRoles(JobRoleID)
);

-- Table to store visualization data (e.g., graphs)
CREATE TABLE Visualizations (
    VisualizationID INT AUTO_INCREMENT PRIMARY KEY,
    OrganizationID INT,
    GraphType VARCHAR(255) NOT NULL,
    Data TEXT NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
);

-- Table to log user activity (e.g., downloads, logins)
CREATE TABLE ActivityLog (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    ActivityType VARCHAR(255) NOT NULL,
    ActivityDetails TEXT,
    ActivityTimestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Table to manage downloadable files
CREATE TABLE Downloads (
    DownloadID INT AUTO_INCREMENT PRIMARY KEY,
    OrganizationID INT,
    FileName VARCHAR(255) NOT NULL,
    FilePath VARCHAR(255) NOT NULL,
    DownloadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
);
