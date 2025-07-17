Музыкальное приложение
Полноценное CRUD-приложение с поддержкой ролей (Пользователь / Администратор), публикацией треков/альбомов/исполнителей, историей прослушиваний и удобной админ-панелью.

Стек технологий
Backend: NestJS, TypeORM, MySQL

Frontend: React, TypeScript, Redux Toolkit, Ant Design

Аутентификация: UUID Token

Авторизация: По ролям (user, admin)

Установка и запуск

Backend


cd backend
npm install
npm run start:dev
Конфигурация базы данных в app.module.ts:

TypeOrmModule.forRoot({

  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'your_db_user',
  password: 'your_db_pass',
  database: 'music_app_db',
  entities: [Artist, Album, Track, User, TrackHistory],
  synchronize: true,
});

💻 Frontend

cd frontend
npm install
npm run dev

 Фикстуры (Seed)

Через HTTP-запрос:

Запусти backend: npm run start:dev

В Postman сделай POST-запрос на:

POST http://localhost:3000/seed

Seed создаёт:

2 пользователя:

admin / 123456 (роль: admin)

user / 123456 (роль: user)

1 опубликованного артиста

1 опубликованного альбома

1 опубликованный трек

API Эндпоинты
Users
Метод	URL	Описание
POST	/users	Регистрация
POST	/users/sessions	Вход
POST	/users/logout	Выход

Artists
Метод	URL	Описание
GET	/artists	Получить всех артистов
POST	/artists	Создать нового артиста
DELETE	/artists/:id	Удалить артиста (только админ)
POST	/artists/:id/publish	Опубликовать артиста (админ)

Albums

Метод	URL	Описание
GET	/albums	Получить все альбомы
GET	/albums?artistId=1	Альбомы определённого артиста
POST	/albums	Создать альбом
DELETE	/albums/:id	Удалить альбом (только админ)
POST	/albums/:id/publish	Опубликовать альбом (админ)

Tracks

Метод	URL	Описание

GET	/tracks	Все треки

GET	/tracks?albumId=1	По альбому

GET	/tracks?artistId=1	По артисту

POST	/tracks/:albumId	Добавить трек в альбом

DELETE	/tracks/:id	Удалить трек (админ)

POST	/tracks/:id/publish	Опубликовать трек (админ)

Роли пользователей

Роль	Права

user	Просмотр опубликованного, добавление своих артистов/альбомов/треков

admin	Видит всё, может удалять и публиковать любые сущности

 Интерфейс

Navbar: ссылки зависят от роли

AdminPanel: публикация и удаление артистов, альбомов, треков

Формы:

Добавление исполнителя

Добавление альбома с выбором исполнителя

Добавление трека с выбором альбома и исполнителя

Авторизация

Все защищённые запросы требуют Authorization: Bearer <TOKEN> в заголовках. Токен выдается при логине.

Примеры логина

POST /users/sessions
{
  "username": "admin",
  "password": "123456"
}

Response:
{
  "token": "uuid-token",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}

Запуск ultra-runner 
Выйти в корневую папку
ввести 
npm i затем npm run dev


ВАЖНО !!!! 

В USER MODE ПРИ КАЖДОЙ ДОБАВЛЕНИЙ АРТИСТА - АЛЬБОМА - ТРЕКА 

НУЖНО В ADMIN MODE ОПУБЛИКОВОВАТЬ ЧТОБЫ В ПОСЛЕДУЮЩИХ ВКЛАДКАХ ПОЯВИЛАСЬ КНОПКИ - АЛЬБОМ и ТД. 

БЕЗ ЭТОГО ПРИ ДОБАЛЕНИИ ТРЕКА В АЛЬБОМЕ БУДЕТ ПУСТО , ТАК КАК ЕЁ НЕ ОДОБРИЛИ В ADMIN MODE
