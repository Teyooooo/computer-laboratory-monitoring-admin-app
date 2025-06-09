import mysql.connector
from logic.edit_settings import get_settings_from_file
import eel

isConnectedToDB = False


def get_connection():
  settings = get_settings_from_file()
  global isConnectedToDB
  try: 
    mydb = mysql.connector.connect(
      host=settings["Host"],
      user=settings["User"],
      passwd=settings["Password"],
      database=settings["Database"]
    )
    isConnectedToDB = True
    return mydb
  except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))
    isConnectedToDB = False
    print("Cant connect to DB")
    return None
  

@eel.expose
def is_connected_to_db():
  get_connection()
  return isConnectedToDB

if __name__ == "__main__":
  get_connection()
  print(isConnectedToDB)