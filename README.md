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
