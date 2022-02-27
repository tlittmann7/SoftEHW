import sqlite3
from flask import Flask, g

DATABASE = 'myData.db'

app = Flask(__name__)


def get_db():
    """Template code for initializing the connection to the database"""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    """Template for closing the connection whenever something is requested"""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# debug function to print all elemets to the console
def printAll():
    dataConnect = get_db()
    dataCursor = dataConnect.cursor()
    for row in dataCursor.execute('SELECT * FROM userData'):
        print(row)

# queries all elements in the table
def getAll():
    dataConnect = get_db()
    dataCursor = dataConnect.cursor()
    dataCursor.execute('SELECT * FROM userData')
    return [dict(row) for row in dataCursor.fetchall()]


# Flask Start

@app.route("/users")
def getAllUsers():
    return {"users":getAll()}
