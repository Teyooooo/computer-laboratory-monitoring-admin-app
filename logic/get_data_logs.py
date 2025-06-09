from logic.connect_db import get_connection
import eel
import json


@eel.expose
def get_logs_pc():
    mydb = get_connection()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM log_history_pc")
    myresult = mycursor.fetchall()
    myresult_json = json.dumps(myresult)
    return myresult_json


@eel.expose
def get_logs_room():
    mydb = get_connection()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM log_history_room")
    myresult = mycursor.fetchall()
    myresult_json = json.dumps(myresult)
    return myresult_json
