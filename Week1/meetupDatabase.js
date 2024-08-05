import mysql from 'mysql2';

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    // database: 'meetup'
});

// Create the meetup database
connection.query('CREATE DATABASE IF NOT EXISTS meetup', (err) => {
    if (err) {
        console.error('Error creating meetup database:', err);
        return;
    }
    console.log('meetup database created');
});

// Use the meetup database
connection.query('USE meetup', (err) => {
    if (err) {
        console.error('Error using meetup database:', err);
        return;
    }
    console.log('Using meetup database');
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Create the Invitee table
const createInviteeTable = `
    CREATE TABLE IF NOT EXISTS Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255) NOT NULL
    )
`;

// Create the Room table
const createRoomTable = `
    CREATE TABLE IF NOT EXISTS Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number INT NOT NULL
    )
`;

// Create the Meeting table
const createMeetingTable = `
    CREATE TABLE IF NOT EXISTS Meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
    )
`;

// Insert rows into the Invitee table
const insertInviteeRows = `
    INSERT INTO Invitee (invitee_name, invited_by)
    VALUES
        ('Yoda', 'Moayad'),
        ('Obi-Wan', 'Moayad'),
        ('Luke', 'Leia'),
        ('Qui-Gon', 'Leia'),
        ('Mace', 'Amedala')
`;

// Insert rows into the Room table
const insertRoomRows = `
    INSERT INTO Room (room_name, floor_number)
    VALUES
        ('Conference Room 1', 1),
        ('Conference Room 2', 2),
        ('Meeting Room 1', 1),
        ('Meeting Room 2', 2),
        ('Board Room', 3)
`;

// Insert rows into the Meeting table
const insertMeetingRows = `
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES
        ('Project Kickoff', '2022-01-01 09:00:00', '2022-01-01 10:00:00', 1),
        ('Team Standup', '2022-01-02 10:00:00', '2022-01-02 10:30:00', 2),
        ('Client Meeting', '2022-01-03 14:00:00', '2022-01-03 15:00:00', 3),
        ('Brainstorming Session', '2022-01-04 16:00:00', '2022-01-04 17:00:00', 4),
        ('Board Meeting', '2022-01-05 11:00:00', '2022-01-05 12:00:00', 5)
`;

// Create and insert queries
connection.query(createInviteeTable, (err) => {
    if (err) {
        console.error('Error creating Invitee table:', err);
        return;
    }
    console.log('Invitee table created');
    
    connection.query(createRoomTable, (err) => {
        if (err) {
            console.error('Error creating Room table:', err);
            return;
        }
        console.log('Room table created');
        
        connection.query(createMeetingTable, (err) => {
            if (err) {
                console.error('Error creating Meeting table:', err);
                return;
            }
            console.log('Meeting table created');
            
            connection.query(insertInviteeRows, (err) => {
                if (err) {
                    console.error('Error inserting rows into Invitee table:', err);
                    return;
                }
                console.log('Rows inserted into Invitee table');
                
                connection.query(insertRoomRows, (err) => {
                    if (err) {
                        console.error('Error inserting rows into Room table:', err);
                        return;
                    }
                    console.log('Rows inserted into Room table');
                    
                    connection.query(insertMeetingRows, (err) => {
                        if (err) {
                            console.error('Error inserting rows into Meeting table:', err);
                            return;
                        }
                        console.log('Rows inserted into Meeting table');
                        
                        // Close the database connection
                        connection.end((err) => {
                            if (err) {
                                console.error('Error closing the database connection:', err);
                                return;
                            }
                            console.log('Database connection closed');
                        });
                    });
                });
            });
        });
    });
});