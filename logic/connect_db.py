import pymysql
from logic.edit_settings import get_settings_from_file
import eel
import time

isConnectedToDB = False

wasPreviouslyConnected = False
toastShown = None  # can be "connected", "disconnected", or None

def get_connection():
  settings = get_settings_from_file()
  # print(settings)
  global isConnectedToDB
  try: 
    mydb = pymysql.connect(
      host=settings["Host"],
      user=settings["User"],
      passwd=settings["Password"],
      database=settings["Database"]
    )
    isConnectedToDB = True
    return mydb
  except pymysql.Error as err:
    print("Something went wrong: {}".format(err))
    isConnectedToDB = False
    print("Cant connect to DB")
    return None
  

@eel.expose
def is_connected_to_db():
  isConnectedToDB = get_connection()
  if(isConnectedToDB is not None):
    return True
  else:
    return False


def checkIfConnected():
    global wasPreviouslyConnected, toastShown

    while True:
        try:
            isConnectedTo_DB = is_connected_to_db()  # Replace with your actual DB check

            # Detect change in connection status
            if isConnectedTo_DB and not wasPreviouslyConnected:
                # Just reconnected
                print("connected")
                eel.triggerToastEvent("connected")
                wasPreviouslyConnected = True
                toastShown = True

            elif not isConnectedTo_DB:
                # Just got disconnected
                print("disconnected")
                eel.triggerToastEvent("disconnected")
                wasPreviouslyConnected = False
                toastShown = True

        except Exception as e:
            print("Error during DB check:", str(e))
            eel.showToastFromJS("Error: " + str(e), "danger")

        time.sleep(5)


if __name__ == "__main__":
  get_connection()
  print(isConnectedToDB)