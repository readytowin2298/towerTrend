DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL 
);

CREATE TABLE towers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    owner INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    num_problems INTEGER NOT NULL,
    num_no_connect_problems INTEGER NOT NULL,
    num_intermittent_problems INTEGER NOT NULL,
    num_slow_speed_issues INTEGER NOT NULL,
    num_user_specific_problems INTEGER NOT NULL
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    number INTEGER NOT NULL,
    subject TEXT NOT NULL,
    data TEXT,
    time TEXT,
    queue TEXT NOT NULL,
    assigned_to TEXT,
    label TEXT,
    ticket_problem TEXT
);

CREATE TABLE tower_tickets (
    id SERIAL PRIMARY KEY,
    tower INTEGER NOT NULL REFERENCES towers ON DELETE CASCADE,
    ticket INTEGER NOT NULL REFERENCES tickets ON DELETE CASCADE
);
