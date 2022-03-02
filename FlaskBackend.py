import sqlite3
from flask import Flask, g, request
from flask_cors import CORS

DATABASE = 'myData.db'

app = Flask(__name__)
CORS(app)


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

# tries to delete a data entry, throws an exception of failure
def deleteUser(userID):
    try:
        dataConnect = get_db()
        dataCursor = dataConnect.cursor()
        dataCursor.execute("DELETE FROM userData WHERE Id=?", (userID,))
        dataConnect.commit()
        return {"deletedID": userID}
    except Exception as e:
        dataConnect.rollback()
        return {"Error": e}

# updates user information at ID location in the database
def updateUser(userID, data):
    dataConnect = get_db()
    dataCursor = dataConnect.cursor()
    query = f"""UPDATE userData 
                SET 
                    Name = "{data['Name']}", 
                    Points = {str(data['Points'])} 
                WHERE Id=?"""
    dataCursor.execute(query, (userID,))
    dataConnect.commit()
    x = ""
    dataCursor.execute("SELECT * FROM userData WHERE ID=?", (userID,))
    for row in dataCursor.fetchall():
        x = dict(row)
    return x

# creates new user entry in the database
def createUser(userID, data):
    dataConnect = get_db()
    dataCursor = dataConnect.cursor()
    query = f"INSERT INTO userData VALUES ('{data['Name']}', {data['Id']}, {data['Points']})"
    dataCursor.execute(query)
    dataConnect.commit()
    x = ""
    dataCursor.execute("SELECT * FROM userData WHERE ID=?", (userID,))
    for row in dataCursor.fetchall():
        x = dict(row)
    return x

# Flask Start

@app.route("/users")
def getAllUsers():
    return {"users":getAll()}

@app.route("/users/<userID>", methods=["DELETE"])
def callDeleteUser(userID):
    return deleteUser(userID)

@app.route("/users/<userID>", methods=["PUT"])
def callUpdateUser(userID):
    data = request.get_json()
    return updateUser(userID, data)

@app.route("/users/<userID>", methods=["POST"])
def callCreateeUser(userID):
    data = request.get_json()
    print(request.get_json(), userID)
    return createUser(userID, data)