import names
import json
import re
import requests

#MAIN MENU
def main_menu():
    post_objects = []
    url = ""
    try:
        option = 1
        while(option != 4):
            print("")
            print("----------MENU USUARIO--------------")
            print("Bienvenido, Seleccione una opción...")
            print("[1] Ingrese Ruta")
            print("[2] Ingrese direccion http")
            print("[3] Ver Datos")
            print("[4] Enviar Datos")
            print("[5] Salir")
            print("------------------------------------")
            print("")
            option = int(input("> "))
            if(option==1):
                ruta = input("Ingrese ruta de archivo: ")
                archivo = open(ruta, "r")
                texto = archivo.read()
                lista_oraciones = re.split('\. |! |\? ',texto)
                archivo.close()
                for oracion in lista_oraciones:
                    autor = names.get_first_name()
                    objeto = {
                        "autor": autor,
                        "nota": oracion
                    }
                    json_obj = json.dumps(objeto)
                    post_objects.append(json_obj)
            elif(option==2):
                post_url = input("Ingrese url para hacer la peticion: ")
                url = post_url
            elif(option==3):
                for objct in post_objects:
                    print("")
                    print(objct)
                    print("-------------------------------------------------------")
                    print("-------------------------------------------------------")
                    print("")
            elif(option==4):
                if url == "":
                    print("Error: url empty")
                    return -1
                for objct in post_objects:
                    headers = {'content-type': 'application/json'}
                    x = requests.post(url, data=objct, headers=headers)
                    print(x.text)
            elif(option==5):
                print("EXIT...")
                return 1
    except Exception as e: 
        print(e)
        return -1
main_menu()