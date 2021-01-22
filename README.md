# ndse-homeworks

- Вставка данных минимум о двух книгах в коллекцию `books`: 
```bash
db.books.insertMany([{
    {
      title: "Гари Поттер",
      description: "Книга о Гари Поттере",
      authors: "Роулинг"
    }},{
    {
      title: "Гари Поттер",
      description: "Книга о Гари Поттере2",
      authors: "Роулинг2"
    }
}])
```

- Запрос для поиска полей документов коллекции `books` по полю `title`:
```bash
db.books.find({title: 'Гари Поттер'})
```

- Запрос для редактирования полей: `description` и `authors` коллекции books по `_id` записи:
```bash
db.books.findOneAndUpdate( 
    { _id: ObjectId("600a83c9cd4ec99f4b4f524a") }, 
    {$set: {description: 'Новое описание', authors: 'Авторы новые'}}
)
```
