import sqlite3

connection = sqlite3.connect('myData.db')
cursor = connection.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS userData 
    (Name VARCHAR NOT NULL,
    Id INTEGER CONSTRAINT IdConstraint PRIMARY KEY,
    Points INTEGER NOT NULL)''')

cursor.execute("INSERT INTO userData VALUES ('Steve Smith', 211, 80)")
cursor.execute("INSERT INTO userData VALUES ('Jian Wong', 122, 92)")
cursor.execute("INSERT INTO userData VALUES ('Chris Peterson', 213, 91)")
cursor.execute("INSERT INTO userData VALUES ('Sai Patel', 524, 94)")
cursor.execute("INSERT INTO userData VALUES ('Andrew Whitehead', 425, 99)")
cursor.execute("INSERT INTO userData VALUES ('Lynn Roberts', 626, 90)")
cursor.execute("INSERT INTO userData VALUES ('Robert Sanders', 287, 75)")

connection.commit()

connection.close()