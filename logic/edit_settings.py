import eel

@eel.expose
def save_settings_to_file(host, user, password, database):

    with open("Settings.txt", "w") as file:
        file.write(f"Host={host}\n")
        file.write(f"User={user}\n")
        file.write(f"Password={password}\n")
        file.write(f"Database={database}\n")

@eel.expose
def get_settings_from_file():
    try:
        with open("Settings.txt", "r") as file:
            settings = {}
            for line in file:
                key, value = line.strip().split("=", 1)
                settings[key] = value
            return settings
    except FileNotFoundError:
        save_settings_to_file("localhost", "root", "", "mydbName")

    

if __name__ == "__main__":
    settings = get_settings_from_file()
    print(settings)