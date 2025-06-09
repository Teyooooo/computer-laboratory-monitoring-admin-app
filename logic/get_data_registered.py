from logic.connect_db import get_connection
import eel
import json


@eel.expose
def get_student_data():
    mydb = get_connection()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM registered_students")
    myresult = mycursor.fetchall()
    myresult_json = json.dumps(myresult)
    return myresult_json


@eel.expose
def get_teacher_data():
    mydb = get_connection()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM registered_teachers")
    myresult = mycursor.fetchall()
    myresult_json = json.dumps(myresult)
    return myresult_json


@eel.expose
def get_search_user(user_id):
    try:
        mydb = get_connection()
        mycursor = mydb.cursor(dictionary=True)  # Return rows as dicts
        sql = """
        SELECT *, 'Student' AS role FROM registered_students WHERE school_id = %s
        UNION
        SELECT *, 'Teacher' AS role FROM registered_teachers WHERE school_id = %s
        """
        val = (user_id, user_id)
        mycursor.execute(sql, val)
        myresult = mycursor.fetchall()
        myresult_json = json.dumps(myresult)
        print(myresult_json)
        return myresult_json
    except Exception as e:
        print("Error:", e)
        return None

    

@eel.expose
def delete_user(user_id):
    try:
        mydb = get_connection()
        mycursor = mydb.cursor()
        mycursor.execute("DELETE FROM registered_students WHERE school_id = %s", (user_id,))
        mycursor.execute("DELETE FROM registered_teachers WHERE school_id = %s", (user_id,))
        mydb.commit()
        return True
    except Exception as e:
        print(e)
        return False
