# TravelCompanion-With-Serverless-And-Bedrock

Este proyecto combina el poder de los Agents de Bedrock y Lambda Functions para sugerir lugares turísticos en Latinoamérica basados en el clima actual de ciudades. Analiza las condiciones meteorológicas en tiempo real para ofrecer destinos óptimos a visitar, mejorando la experiencia de viaje. Es ideal para aplicaciones de viaje y planificación.


## Características

- **Consulta del Clima en Tiempo Real**: Utiliza una función lambda escrita en JavaScript para llamar a la API de AerisWeather y obtener el clima actual de ciudades en LATAM.
- **Recomendaciones Personalizadas**: Basado en el clima y dos Knowledge Bases de Bedrock de lugares turísticos y latitud/longitud de ciudades, sugiere destinos turísticos seguros para que chicas que viajan solas.
- **Integración con Bedrock**: Utiliza un Agent de Bedrock potenciado con Titan Embeddings G1 - Text y anthropic.claude-v2 para manejar la lógica de selección de destinos, aprovechando bases de conocimientos especializadas.

## Pre-requisitos

- Cuenta en AerisWeather para obtener las llaves de acceso a la API.
- Configuración de variables de ambiente para las llaves de acceso en la función Lambda.
- Cuenta de activa de AWS con accesos a Bedrock (asegurate de estar en una región en donde Amazon Bedrock se encuentre disponible)
- Dar acceso a los modelos Amazon - Titan Embeddings G1 - Text y Anthropic - Claude
- Node.js y npm instalados para ejecutar la función Lambda localmente (opcional).
- AWS CLI configurado con permisos de Administrador
- AWS SAM CLI instalado - Versión Minima 1.104.0 (sam --version)
- NodeJS 20.x instalado
- Documentación de API (https://www.xweather.com/docs/weather-api/endpoints/forecasts)

## Configuración

1. Regístrate en https://www.aerisweather.com/develop/api/ y obtén tus llaves de acceso.
2. Configura tus llaves de acceso como variables de ambiente en la función Lambda:
   - `CLIENT_ID`: Tu ID de cliente en AerisWeather.
   - `CLIENT_SECRET`: Tu secreto de cliente en AerisWeather.

## Estructura de Archivos

Breve explicación de la estructura del repositorio, incluyendo los directorios principales y archivos clave.
```plaintext
TravelCompanion/
├── data 
│ ├── OpenAPI.json # Definición de API
│ └── Tourist Places.xlsx # Base de conocimientos de lugares turísticos en LATAM
│ └── worldcities.csv # Base de conocimientos con latitudes y longitudes
├── iac # Scripts de configuración del Agente de Bedrock
├── images # Diagramas de Arquitectura
├── src 
│ └── function
│  └── index.js # Función Lambda principal para obtener el clima
│  └── OpenAPI.json # Contiene la definicion del metodo que devolverá la longitud y latencia, esta definicion el agente lo utiliza para saber como obtener la latitud y longitud de una ciudad.
└── README.md # Documentación del proyecto
```

`data/`: Este directorio contiene archivos esenciales para el funcionamiento del proyecto, como bases de conocimientos y recursos de datos, incluyendo información geográfica y de lugares turísticos.\
`iac/`: Infraestructura como Código. Aquí se almacenan scripts y configuraciones necesarias para desplegar y mantener la infraestructura tecnológica del proyecto, facilitando su replicación y gestión.\
`src/`: El directorio de código fuente alberga toda la lógica y funciones del proyecto, organizadas de la siguiente manera:\
`function/`: Contiene las funciones lambda, siendo index.js la función principal utilizada para obtener información del clima.\
`OpenAPI.json`: Este archivo define la interfaz de programación de aplicaciones (API) que el proyecto expone, especificando cómo se pueden obtener datos como la latitud y longitud de ciudades.\
`README.md:` Archivo de documentación que ofrece una visión general del proyecto, guías de instalación y uso, y cualquier otra información relevante para desarrolladores y usuarios.

## Despliegue


## Arquitectura
![Travel Companion](https://github.com/hsaenzG/TravelCompanion-With-Serverless-And-Bedrock/blob/main/images/TravelCompanion.drawio.png)

## Creación de Knowledge Bases - Amazon  Bredrock
Los pasos para crear una Knowledge base de Amazon Bedrock son los siguientes:
1. Origen de Knowledge Bases
   a. Ve a Amazon S3 y crea un nuevo Bucket con el nombre de kb-tourist-places-1
   b. Sube el archivo Tourist Places.xlsx compartido dentro de este repositorio
   c. Ve a Amazon S3 y crea un nuevo Bucket con el nombre de kb-worldcities-1
   d. Sube el archivo worldcities.csv y OpenAPI.json compartido dentro de este repositorio
2. Creación de Knowledge Bases
  a. Ve a Amazon Bedrock -->  Knowledge Bases
  b. Haz click en crear Knowledge Base
  c. Selección uno de los buckets como origen de datos.
  d. Selecciona el Modelo de Incrustaciones: Titan Embeddings G1 - Text 
  e. Selecciona crear (este proceso puede tomar varios minutos debido a que Amazon Bedrock crea un almacén vectorial de Amazon OpenSearch
  f. Prueba tu Knowledge base Selecciona el modelo Anthropic - Claude 2.1 y Aplicar
  g. Valida los registros de tu Knowledge base

Como funcionan las Bases de Conocimiento?\
![Knowledbase](https://github.com/hsaenzG/TravelCompanion-With-Serverless-And-Bedrock/blob/main/images/TravelCompanion-KB.drawio.png)

NOTA: repite este proceso para la creación del segundo Knowledge base
 
   
## Creación de Agente de Amazon Bedrock
Los pasos para crear un agente en Amazon Bedrock son los siguientes:
1. Ve a Amazon Bedrock -->  Agents
2. Selecciona Crear Agente
3. Ingresa el nombre y la descripción de tu agente, selecciona que cree un nuevo rol de servicio.
4. Seleciona el modelo Anthropic Cloud V2.1 e ingresa las instucciones de tu agente (esta será de vital importancia para que el agente realice lo que necesites, mientras mejor sea tu prompt mejor los resultados de tu agente)
5. Crea una acción tipo lambda en donde selecciones la lambda creada en este proyecto
6. Selecciona la definicion OpenAPI que se ecnuentra en el Bucket de S3 kb-worldcities-1
7. Crear
8. Prueba tu agente, ingresa el nombde de una ciudad de LATAM y el agente te devolverá una lista de recomendaciones de lugares turisticos a visitar de acuerdo al clima del dia de la ciudad solicitada.

## Uso
Este proyecto, de naturaleza educativa y con licencia libre, está abierto a contribuciones.

## Licencia
Este proyecto se distribuye bajo una licencia libre, permitiendo su uso y modificación para cualquier propósito, siguiendo los términos establecidos.

## Agradecimientos
AerisWeather API por proveer datos meteorológicos fiables.\
Marcia Villalba y su canal de Youtube: FooBar Serverless, video: (https://youtu.be/P9n8BE693go?si=ADtt9RPXWO2Di9Z2)https://youtu.be/P9n8BE693go?si=ADtt9RPXWO2Di9Z2



