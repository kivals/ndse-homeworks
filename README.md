# 013-websocket
Для запуска:
1) Зайти в `library-app`
2) Создать `.env` по примеру `.env.example`
3) Выполнить командну `docker-compose up`

Валидные данные пользователя в `./fixtures/db.json`


Что сделано:
- Подключен Socket.IO `./library-app/lib/socket.js`
- Модель Комментарий`./library-app/model/Comment`
- Доработана страница просмотра книги `./library-app/views/book/index.ejs`
- Добавлен клиентский скрипт `./library-app/views/layout/footer.ejs `

