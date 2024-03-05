# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

Cada paso de su configuración ya se ha realizado previamente en el curso, por lo que solo es necesario clonar el proyecto y comenzar a trabajar.


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo


## Funcionamiento 
Es necesario configurar el email del admin user, una vez el proyecto se inicia se ejecuta el archivo seed este configura un user y password aleatorio lo guarda en la db y lo envia por email, de este modo solo el admin user tiene credenciales una vez se inicia la app.

Este proyecto esta congigurado para funcionar en los Cpanel de hosting populares con versiones de node 14 en adelante y solo soportan bases SQL.

