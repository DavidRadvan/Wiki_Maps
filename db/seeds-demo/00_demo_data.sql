-- Some created fake data for our demo day presentation

INSERT INTO users(name, email, city, profile_pic) VALUES
('Ryan Reynolds', 'ryan@reynolds.com', 'Vancouver', 'https://github.com/DavidRadvan/Wiki_Maps/blob/master/public/images/ryan-rey.png?raw=true'),
('The Other Ryan', 'gooslings@ryan.com', 'Calgary', 'https://github.com/DavidRadvan/Wiki_Maps/blob/routes/public/images/mr-don.png?raw=true')
-- ('Regular Joe', 'joeBiden@gmail.com', 'Washington', '../../public/images.profile-hex.png')
;

INSERT INTO maps (contributor_id, title, description, thumbnail_img) VALUES
(1, 'Places to see rain in Vancouver', 'Here is a map to show my true passion in life, rain watching.', 'https://bit.ly/3d1k95D' ),
(1, 'Places to love Deadpool', 'Places where people have seen Deadpool so I can love him', 'https://bit.ly/3urKVtM'),
(1, 'Places to eat Chicken', 'fun fun chicken dinner', 'https://bit.ly/3d2CAH3'),
(1, 'Top places to have Sushi', 'I love sushi', 'https://bit.ly/3dOjbZw'),
(2, 'Chicken Coop ', 'Tasty', 'https://bit.ly/3uMBNAf'),
(2, 'Cheeky Chicken!', 'They Cheeky', 'https://bit.ly/3muYGF4 '),
(2, 'Lotsa Chicken', 'Many chickens in one place', 'https://bit.ly/3t3VuTk')
;




