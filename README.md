# 012-Авторизация с PassportJS
Для запуска:
1) Зайти в `library-app`
2) Создать `.env` по примеру `.env.example`
3) Выполнить командну `docker-compose up`
4) Валидные данные пользователя в `./fixtures/db.json`


Что сделано:
- Релизована Локальная стратегия `./lib/strategies/local.js`
- Реализация работы с Сессией с сохранением в БД `./model/Session` и `./middleware/session.js`
- Реализация Mongoose-модели `User` с генерацией хеша пароля с добавлением соли `./model/User`
- Добавлен guard-middleware `./middleware/mustBeAuthtivates` на роут с профилем пользователя
- Добалены endpoints `api/user/me (GET)`, `api/user/login (POST и GET)`, `api/user/registration (POST и GET)`
- Добавлена проливка mock-db данными `./fixtures/index` при старте сервера
- Доработаны view-представления `./views/user`

