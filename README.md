# ELECTRONIC ADVISOR

La mejor guia para tus fiestas y festivales.

![alt text](public/img/logo2.png)

### INDICE :open_file_folder:

- [ELECTRONIC-ADVISOR FRONTEND]

  - [OBJETIVO ](#target-dart)
  - [TECNOLOGÍAS ](#stack-wrench)
  - [ACERCA DE LA API ](#about-api-blue_book)
  - [DISEÑO FRONT ](#front-design-computer)
  - [AUTOR ](#author-pencil2)

### OBJETIVO :dart:

El objetivo de este proyecto es diseñar el frontend de una WEB O APP, en este caso el Frontend de una pagina para consultar los proximos festivales y fiestas en los mejores clubs del mundo.

### STACK :wrench:

<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NODE.JS" />
<img src="https://camo.githubusercontent.com/6c3957842901e5baa389f3bb8758c8966683333b28493013062fcab5fab645e7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642" alt="React"><img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/><img src="https://camo.githubusercontent.com/0f98e0edc3ae47a19fac8a8679ba0a4f678ed9872c18771cb53f493b21ddaf90/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a61766173636970742d4546443831443f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b" alt="Javascript"/><img src="https://camo.githubusercontent.com/aac74ca85b21ed1ff4fa88dda8712fce9cddbf786bdf807231e6179f70003ac5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d4a534f4e253230776562253230746f6b656e73" alt="JWT">

### SOBRE LA API :

Esta API permite crear usuario y loggearse en la aplicacion con las sigueintes funcionalidades

- Registrarte y loggearte como usuario
- Ver y actualizar tu perfil.
- Ver los proximos festivales
- Ver los clubs registrados en la pagina
- Los artistas que pinchan en dichos festivales.
- Como SuperAdmin: - Ver todos los usuarios y poder borrarlos - Crear, modificar y borrar Eventos

### Diseño Front

HOME

![alt text](public/img/Captura%20HOME.JPG)

Vista inicial de la aplicacion con video de alguno de los festivales anunciados.

REGISTRO

![alt text](public/img/Captura%20REGISTER.JPG)

En esta vista podremos registrarlos, requiriendo Nombre, Apellidos, Pais, email y contraseña.

LOGIN

![alt text](/public/img/Captura%20LOGIN.JPG)

En Login, con las credenciales de email y contrseña que hemos introducido en el Login podremos acceder a nuestra pagina personalizada

Credenciales usuario super_admin:

- email: super_admin@super_admin.com
- contraseña: Aa123456

Credenciales usuario:

- email: user@user.com
- contraseña: Aa123456

PERFIL

![alt text](public/img/Captura%20PROFILE.JPG)

En esta vista tenemos los datos del usuario loggeado pudiendo cambiar datoso como nombre , apellido, país y email.

EVENTS

![alt text](/public/img/Captura%20EVENTS-HOME.JPG)

Vista de los Eventos ordenados alfabeticamente y con paginación.
Al hacer click en uno de ellos te lleva a la vista detalle de dicho evento.

DETALLE

![alt text](public/img/Captura%20EVENT-DETAIL.JPG)

Vista a la que nos llevara el boton de detalle de un Evento, del que podremos ver:

- Nombre.
- Club en el que se organiza.
- Dirección del Club.
- Link a la web del Club.
- Fecha del evento.
- Artistas del cartel del evento.

CLUBS

![alt text](/public/img/Captur%20CLUBS.JPG)

En est vista tenemos listados los clubs

## ADMIN

Como SuperAdmin se nos mostraran 4 nuevas posibilidades en el Header:

USERS

![alt text](/public/img/Captura%20userSA.JPG)

Aqui podremos ver todos los usuarios registrados con paginación y podremos borrarlos.

ARTISTS

![alt text](/public/img/Captura%20artistsSA.JPG)

Aqui tendremos los artistas listados con paginación

EVENTS

![alt text](/public/img/Captura%20eventsSA.JPG)

Aqui el super admin podra:

- Ver todos los eventos con paginación
- Crear un evento
- Modificar un evento

CLUBS

![alt text](/public/img/Captura%20clubsSA.JPG)

Aqui estn listados todos los clubs con paginación

## FUTURAS MEJORAS

- Añadir buscador de eventos tanto por país, nombre, club o artista
- Como SuperAdmin: - Crear, borrar y modificar artista - Crear, borrar y modificar club
- Añadir fotos tanto a artistas, eventos y clubs.
- Compra de entradas de eventos

## AUTOR

- Fernando Catalá - Full Stack Developer

- <a href="https://github.com/FernandoCatalaMunyoz">GitHub
- <a href="https://linkedin.com/in/fernando-catalá-muñoz-166b5622b">Linkedin</a>
