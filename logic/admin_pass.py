# from connect_db import get_connection
from logic.connect_db import get_connection
import eel


@eel.expose
def get_admin_password():
    try:
        mydb = get_connection()
        mycursor = mydb.cursor()
        mycursor.execute("SELECT password FROM cred WHERE user = 'admin'")
        myresult = mycursor.fetchall()
        return myresult[0][0] if myresult else None
    except Exception as e:
        print("Error:", e)
        
@eel.expose
def set_admin_password(new_password):
    try:
        mydb = get_connection()
        mycursor = mydb.cursor()

        sql = "UPDATE cred SET password = %s WHERE user = 'admin'"
        mycursor.execute(sql, (new_password,))

        mydb.commit()  # <-- IMPORTANT
        return True

    except Exception as e:
        print("Error:", e)
        return False

        
if __name__ == "__main__":
    password = get_admin_password()
    print(password)