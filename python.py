import tkinter as tk
from tkinter import messagebox

# Archivo donde se guardarán los usuarios
archivo_usuarios = "usuarios.txt"

# Función para registrar un nuevo usuario
def registrar_usuario():
    usuario = entrada_usuario.get()
    contraseña = entrada_contraseña.get()
    
    if usuario and contraseña:
        with open(archivo_usuarios, "a") as archivo:
            archivo.write(f"{usuario},{contraseña}\n")
        messagebox.showinfo("Registro", "Usuario registrado exitosamente.")
    else:
        messagebox.showwarning("Error", "Por favor, ingresa usuario y contraseña.")

# Función para iniciar sesión
def iniciar_sesion():
    usuario = entrada_usuario.get()
    contraseña = entrada_contraseña.get()

    try:
        with open(archivo_usuarios, "r") as archivo:
            for linea in archivo:
                usuario_guardado, contraseña_guardada = linea.strip().split(",")
                if usuario == usuario_guardado and contraseña == contraseña_guardada:
                    messagebox.showinfo("Inicio de sesión", "Inicio de sesión exitoso.")
                    return
        messagebox.showerror("Error", "Usuario o contraseña incorrectos.")
    except FileNotFoundError:
        messagebox.showerror("Error", "No hay usuarios registrados aún.")

# Crear ventana
ventana = tk.Tk()
ventana.title("Inicio de Sesión")

tk.Label(ventana, text="Usuario:").pack()
entrada_usuario = tk.Entry(ventana)
entrada_usuario.pack()

tk.Label(ventana, text="Contraseña:").pack()
entrada_contraseña = tk.Entry(ventana, show="*")
entrada_contraseña.pack()

tk.Button(ventana, text="Registrar", command=registrar_usuario).pack()
tk.Button(ventana, text="Iniciar Sesión", command=iniciar_sesion).pack()

ventana.mainloop()