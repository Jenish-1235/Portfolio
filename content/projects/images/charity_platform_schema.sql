
-- Charity Donation Platform Schema (MySQL)

CREATE TABLE Donor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  age INT,
  gender VARCHAR(10),
  income_range VARCHAR(50),
  referrer_source VARCHAR(100),
  last_donated_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Charity (
  charity_id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  email TEXT,
  password TEXT,
  category TEXT,
  description TEXT,
  websiteUrl TEXT,
  ackUrl TEXT,
  receiptUrl TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Campaign (
  campaign_id INT AUTO_INCREMENT PRIMARY KEY,
  charity_id INT,
  title TEXT,
  category TEXT,
  description TEXT,
  rec_url TEXT,
  ack_url TEXT,
  goal_amount DECIMAL(12,2),
  current_amount DECIMAL(12,2),
  is_active BOOLEAN,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (charity_id) REFERENCES Charity(charity_id)
);

CREATE TABLE FundraiserCampaign (
  fcampaign_id INT AUTO_INCREMENT PRIMARY KEY,
  charity_id INT,
  title TEXT,
  category TEXT,
  goal DECIMAL(12,2),
  rec_url TEXT,
  ack_url TEXT,
  description TEXT,
  is_active BOOLEAN,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (charity_id) REFERENCES Charity(charity_id)
);

CREATE TABLE CampaignTransactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  campaign_id INT,
  amount DECIMAL(12,2),
  receipt_status VARCHAR(50),
  receipt_url TEXT,
  ack_url TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES Donor(id),
  FOREIGN KEY (campaign_id) REFERENCES Campaign(campaign_id)
);

CREATE TABLE FundraiserTransactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  fcampaign_id INT,
  amount DECIMAL(12,2),
  receipt_status VARCHAR(50),
  receipt_url TEXT,
  ack_url TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES Donor(id),
  FOREIGN KEY (fcampaign_id) REFERENCES FundraiserCampaign(fcampaign_id)
);

CREATE TABLE EntityType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20) UNIQUE
);

CREATE TABLE RecurringDonation (
  recurring_donation_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  entity_type_id INT,
  entity_id INT,
  charity_id INT,
  recurring_rate VARCHAR(20),
  amount DECIMAL(10,2),
  last_installment DATE,
  next_installment DATE,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN,
  primary_payment_method_id INT,
  FOREIGN KEY (donor_id) REFERENCES Donor(id),
  FOREIGN KEY (charity_id) REFERENCES Charity(charity_id),
  FOREIGN KEY (entity_type_id) REFERENCES EntityType(id)
);

CREATE TABLE ContactMethodType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  method VARCHAR(50),
  description TEXT
);

CREATE TABLE UserContactPreference (
  preference_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  method_id INT,
  is_enabled BOOLEAN,
  preferred_language VARCHAR(10),
  FOREIGN KEY (donor_id) REFERENCES Donor(id),
  FOREIGN KEY (method_id) REFERENCES ContactMethodType(id)
);

CREATE TABLE PaymentMethodType (
  id INT AUTO_INCREMENT PRIMARY KEY,
  method VARCHAR(50),
  provider VARCHAR(100),
  requires_token BOOLEAN,
  callback_url TEXT
);

CREATE TABLE UserPaymentPreference (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  donor_id INT,
  payment_method_id INT,
  account_last4 VARCHAR(4),
  provider_token TEXT,
  is_primary BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (donor_id) REFERENCES Donor(id),
  FOREIGN KEY (payment_method_id) REFERENCES PaymentMethodType(id)
);

CREATE TABLE FundraiserCache (
  fcampaign_id INT PRIMARY KEY,
  total_amount DECIMAL(12,2),
  donor_count INT,
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fcampaign_id) REFERENCES FundraiserCampaign(fcampaign_id)
);
