import socket
import eel


@eel.expose
def get_ip():
    """Get the IP address of the current PC."""
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address


if __name__ == '__main__':
    print(get_ip())