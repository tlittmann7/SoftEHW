# SoftEHW
Homework for Software Engineering [Tested using `Python 3.10.2`]

Please begin by setting up a virtual environment (Virtualenv) for python.  

Once the virtual environment is activated, pip intall the requirments by running:

`pip install -r requirements.txt`

While still activated, please navigate to the directory with the python files and run:

`python DBInit.py`

This will initialize the database. From there run:

`export FLASK_APP=FlaskBackend.py`

`flask run `

Congratulations! The database is now running.

To install the requirements for front end, change directory to `/my-app/` and run:

`npm install`

This should automatically install all necessary packages to run the front end.

Finally, run:

`npm start`

This will bring up the webpage. Have fun!

How to use:

The table will be initialized with some entries already.  You can delete or edit these by clicking on the corresponding buttons. Note that you cannot edit the ID of an entry because the ID is an identifying key for the backend to use in order to perform operation on the database.  As such, the ID cannot be changed, but you may delete an entry and recreate it with the same information and a different ID. New entries can be created by clicking on the "New Entry" button.  This will bring up a modal similar the edit feature, but with the ability to edit all 3 fields.

Names can be any string of characters between 1 and 25 characters long.  I don't care what your name is, I won't judge.  An ID is a number between 1 and 999, and must be unique for all entries. If you attempt to create an entry with one that already exists with the same ID, nothing will be created.  Points is a number which must be between 1 and 100.
Happy CRUD-ing!
