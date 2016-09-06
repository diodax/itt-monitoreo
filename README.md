# ITT: Sistema de Monitoreo de Ancianos

Una aplicación basada en [SailsJS](http://sailsjs.org)

## Instalación ##

Clona el repositorio `itt-monitoreo` a un directorio local:

    git clone --recursive https://github.com/diodax/itt-monitoreo.git

Cambia de directorio al root del proyecto:

    cd itt-monitoreo

Arranca la máquina virtual desde Vagrant:

    vagrant up

Conecta a la máquina virtual via SSH:

    vagrant ssh

Inicia el servidor mediante SailsJS:

    sails lift

Presiona `Ctrl + C` en cualquier momento para detener el servidor

La página se encuentra en la dirección <http://localhost:1337>. Vagrant automáticamente configura el
port-forwarding del puerto 1337 entre el host y la máquina virtual.
