#pip install names
import names
import json
import re
archivo = open("hello.txt", "r")
texto = archivo.read()
lista_oraciones = re.split('\. |! |\? ',texto)
archivo.close()

post_objects = []
for oracion in lista_oraciones:
    autor = names.get_first_name()
    objeto = {
        "autor": autor,
        "nota": oracion
    }
    json_obj = json.dumps(objeto)
    print(json_obj)
    print("-----------------------------------------------------")
    print("-----------------------------------------------------")
    post_objects.append(json_obj)



