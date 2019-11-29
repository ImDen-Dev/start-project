# Стартовый шаблон проекта
***
## Старт проекта
### Склонируйте репозиторий
```
git clone https://github.com/ImDen-Dev/start-project.git
```

### Установите зависимости
```
npm i
```
### Запустите шаблон
```
npm start
```

## Команды для запуска
### Запуск и отслеживание изменений
```
npm start
```

### Сборка в папку build
```
npm run build
```

## Структура папок и файлов
```
├── app/               	# Исходники
│   ├── assets/        	# Подключаемые ресурсы
│   ├── js/         	# Скрипты
│   │   └── index.js 	# Главный скрипт
│   ├── pug/        	# Скрипты
│   │   └── index.pug   # Разметка страницы
│   └── sass/       	# Стили
│   │   └── main.sass  	# Главные файл стилей
├── .gitignore         	# Список исключённых файлов из Git
├── gulpfile.js        	# Файл для запуска Gulp.js
├── package.json       	# Список модулей и прочей информации
├── readme.md           # Документация шаблона
```