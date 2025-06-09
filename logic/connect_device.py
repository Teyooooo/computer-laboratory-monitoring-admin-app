import serial
import serial.tools.list_ports
import time
import eel


# Globals
serialInst = None
receiveUidData = ""
portsList = []
notify = False
ready_to_scan = True



# Name of your NodeMCU device (adjust this if needed)
DEVICE_NAME = "USB-SERIAL CH340"  # Update this based on your device

def isWordPresent(sentence:str, word:str) -> bool:
    word = word.upper()
    sentence = sentence.upper()
    lis = sentence.split()

    if(lis.count(word) > 0):
        return True
    else:
        return False

def findTheDevice() -> None:
    global is_device, notify
    Device = DEVICE_NAME.split(" ")
    

    while True:  # Continue looping until device is found
    
        ports = serial.tools.list_ports.comports()
        for onePort in ports:
            portsList.append(str(onePort))
            # print(onePort)

        for x in range(0,len(portsList)):
            if  isWordPresent(portsList[x], Device[0]):
                if  isWordPresent(portsList[x], Device[1]):
                    portVar = portsList[x].split(' ',1)
                    portName = portVar[0]
                    baudrate = 115200
                try:
                    global serialInst
                    serialInst = serial.Serial(portName, baudrate)
                    return serialInst
                except serial.SerialException:
                    pass  # Continue to next iteration if serial connection fails

        # If device is not found, wait for a moment before retrying
        if not notify:
            print("Device not found. Waiting for 5 seconds...")
            eel.isDeviceConnected(None)
            notify = True

        portsList.clear()
        is_device = False
        time.sleep(1)  # Adjust sleep duration as needed

def connectingToDevice():
    while True:
                forConnection = str(serialInst.readline().decode('latin-1').rstrip('\n'))
                print(forConnection)
                
                if isWordPresent(forConnection, "ON"):
                    sendMsg = "CONNECTED\n"
                    serialInst.write(sendMsg.encode())
                    print("send to nodemcu: ", sendMsg)

                    time.sleep(0.1)
                    forConnection = serialInst.readline().decode('latin-1')

                    if isWordPresent(forConnection, "ConnectToPython"):
                        print("print by python: " , forConnection)
                        return None

def get_uid():
    global is_device, notify, ready_to_scan

    while True:
        device = findTheDevice()

        # if device is not None:
        print("Device connected successfully!")
        is_device = True

        try:
            connectingToDevice()
            eel.isDeviceConnected(True)
            notify = True
            while True:
                serialInst.write(b'OK\n')
                time.sleep(1)

                if serialInst.in_waiting and ready_to_scan:
                    ready_to_scan = False
                    receiveUidData = serialInst.readline().decode('latin-1').rstrip('\n\r')
                    print("Received UID data:", receiveUidData)
                    eel.receive_uid(receiveUidData)


        except serial.SerialException:
            eel.isDeviceConnected(False)
            print("Device disconnected.")
            is_device = False
            continue


@eel.expose
def ready_rescan():
    global ready_to_scan
    ready_to_scan = True


@eel.expose
def not_ready_rescan():
    global ready_to_scan
    ready_to_scan = False



if __name__ == "__main__":
    get_uid()
