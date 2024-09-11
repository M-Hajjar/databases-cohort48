
CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(200),
    university VARCHAR(350),
    date_of_birth DATE,
    h_index INT,
    gender CHAR(1)
);

-- Step 2: Add the mentor field as a foreign key separately
ALTER TABLE authors ADD mentor INT;
ALTER TABLE authors ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);

-- Create the research_papers table
CREATE TABLE research_papers (
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(200),
    conference VARCHAR(100),
    publish_date DATE
);

-- Create the author_papers table (linking authors and papers)
CREATE TABLE author_papers (
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id)
);

-- Section 2: Insert Data

-- Inserting authors with and without mentors
INSERT INTO authors (author_id, author_name, university, date_of_birth, h_index, gender, mentor) VALUES
(1, 'Alice Smith', 'Harvard University', '1980-03-25', 42, 'F', NULL),
(2, 'Bob Johnson', 'MIT', '1975-07-14', 39, 'M', 1),
(3, 'Carol White', 'Stanford University', '1985-09-08', 45, 'F', 1),
(4, 'David Brown', 'UC Berkeley', '1972-11-19', 36, 'M', 2),
(5, 'Eve Davis', 'Oxford University', '1988-01-30', 50, 'F', NULL);

-- Inserting research papers
INSERT INTO research_papers (paper_id, paper_title, conference, publish_date) VALUES
(1, 'Quantum Computing Basics', 'QCON 2021', '2021-06-12'),
(2, 'Advances in AI', 'AI World 2022', '2022-11-18'),
(3, 'Future of Cryptography', 'CryptoCon 2023', '2023-03-10');

-- Linking authors to papers
INSERT INTO author_papers (author_id, paper_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 2),
(4, 1),
(5, 3);

-- Section 3: Queries

-- Exercise 3: Joins

-- 1. Query to print names of all authors and their corresponding mentors
SELECT a.author_name AS author, m.author_name AS mentor
FROM authors a
LEFT JOIN authors m ON a.mentor = m.author_id;

-- 2. Query to print all columns of authors and their published paper_title (if any)
SELECT a.*, rp.paper_title
FROM authors a
LEFT JOIN author_papers ap ON a.author_id = ap.author_id
LEFT JOIN research_papers rp ON ap.paper_id = rp.paper_id;

-- Exercise 4: Aggregate Functions

-- 1. All research papers and the number of authors that wrote that paper
SELECT rp.paper_title, COUNT(ap.author_id) AS num_authors
FROM research_papers rp
LEFT JOIN author_papers ap ON rp.paper_id = ap.paper_id
GROUP BY rp.paper_title;

-- 2. Sum of the research papers published by all female authors
SELECT SUM(paper_count) AS total_papers_by_female_authors
FROM (
    SELECT a.author_id, COUNT(ap.paper_id) AS paper_count
    FROM authors a
    JOIN author_papers ap ON a.author_id = ap.author_id
    WHERE a.gender = 'F'
    GROUP BY a.author_id
) AS female_authors_papers;

-- 3. Average of the h-index of all authors per university
SELECT university, AVG(h_index) AS avg_h_index
FROM authors
GROUP BY university;

-- 4. Sum of the research papers of the authors per university
SELECT a.university, COUNT(ap.paper_id) AS total_papers
FROM authors a
LEFT JOIN author_papers ap ON a.author_id = ap.author_id
GROUP BY a.university;

-- 5. Minimum and maximum of the h-index of all authors per university
SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM authors
GROUP BY university;
