@echo off
:: Este archivo agrega, comitea y hace push (empujar) de los cambios automáticamente

:: Solicita un mensaje (frase explicativa) para el commit
set /p msg="Introduce el mensaje del commit: "

git add .
git commit -m "%msg%"
git push
