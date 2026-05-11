-- ugnayan.sql
CREATE DATABASE IF NOT EXISTS ugnayan_db;
USE ugnayan_db;

-- Barangay Residents Table
CREATE TABLE barangay_residents (
    resident_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Personal Information
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    suffix VARCHAR(10), -- Jr., Sr., III, etc.
    gender ENUM('Male', 'Female') NOT NULL,
    birth_date DATE NOT NULL,
    birth_place VARCHAR(100),
    civil_status ENUM('Single', 'Married', 'Widowed', 'Separated', 'Divorced') DEFAULT 'Single',
    nationality VARCHAR(50) DEFAULT 'Filipino',
    religion VARCHAR(100),

    -- Contact Information
    contact_number VARCHAR(20),
    email VARCHAR(100),

    -- Address Information
    house_no VARCHAR(20),
    street VARCHAR(100),
    purok VARCHAR(50),
    barangay VARCHAR(100) NOT NULL,
    municipality VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10),

    -- Residency Information
    date_of_residency DATE,
    voter_status ENUM('Registered', 'Not Registered') DEFAULT 'Not Registered',
    precinct_no VARCHAR(20),

    -- Household Information
    household_id INT,
    family_head ENUM('Yes', 'No') DEFAULT 'No',
    relationship_to_head VARCHAR(50),

    -- Education and Employment
    educational_attainment VARCHAR(100),
    occupation VARCHAR(100),
    employment_status ENUM(
        'Employed',
        'Unemployed',
        'Self-Employed',
        'Student',
        'Retired',
        'OFW'
    ) DEFAULT 'Unemployed',
    monthly_income DECIMAL(12,2),

    -- Government IDs
    philhealth_no VARCHAR(30),
    sss_no VARCHAR(30),
    gsis_no VARCHAR(30),
    tin_no VARCHAR(30),
    voters_id_no VARCHAR(30),

    -- Special Categories
    senior_citizen ENUM('Yes', 'No') DEFAULT 'No',
    pwd ENUM('Yes', 'No') DEFAULT 'No',
    pwd_id_no VARCHAR(30),
    solo_parent ENUM('Yes', 'No') DEFAULT 'No',
    indigent ENUM('Yes', 'No') DEFAULT 'No',
    four_ps_beneficiary ENUM('Yes', 'No') DEFAULT 'No',

    -- Emergency Contact
    emergency_contact_name VARCHAR(100),
    emergency_contact_number VARCHAR(20),
    emergency_contact_relationship VARCHAR(50),

    -- Record Management
    photo_path VARCHAR(255),
    status ENUM('Active', 'Inactive', 'Deceased', 'Transferred') DEFAULT 'Active',
    remarks TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    -- Optional Foreign Key
    CONSTRAINT fk_household
        FOREIGN KEY (household_id)
        REFERENCES households(household_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
