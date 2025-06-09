from logic.connect_db import get_connection
import eel


@eel.expose
def add_user(uid, name, school_id, role, gender):
    
    """Set data in a database"""
    mydb = get_connection()
    mycursor = mydb.cursor()

    if role == "Student" or role == "student":
        sql = "INSERT INTO registered_students (uid, name, school_id, gender) VALUES (%s, %s, %s, %s)"
        val = (uid, name, school_id, gender)
        mycursor.execute(sql, val)
        mydb.commit()
    
    if role == "Teacher" or role == "teacher":
        sql = "INSERT INTO registered_teachers (uid, name, school_id, gender) VALUES (%s, %s, %s, %s)"
        val = (uid, name, school_id, gender)
        mycursor.execute(sql, val)
        mydb.commit()
