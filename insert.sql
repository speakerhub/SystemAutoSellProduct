SELECT * FROM autoworkflow.user;

INSERT INTO `autoworkflow`.`user` 
(`firstName`, `lastName`, `age`, `email`, `password`, `phone`, `isActive`, `Role`, `Gender`, `address`) 
VALUES 
('giang', 'hung', 23, 'gianghung2003@gmail.com', '1', '0971505561', true, 'Admin', 'Male', '{"city": "Ha noi"}');

SET SQL_SAFE_UPDATES = 0;
DELETE FROM `autoworkflow`.`user`;
