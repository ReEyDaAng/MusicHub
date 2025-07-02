# MusicHub

**MusicHub** — це full-stack веб-додаток для пошуку, прослуховування та збереження улюблених треків із використанням Spotify API (може змінитися).

---

## 🛠 Технології

* **Frontend**: React, Vite, React Router, Tailwind CSS
* **Backend**: Node.js, Express.js, Axios, Spotify Web API (може змінитися)
* **Database**: MongoDB (mongoose)
* **Аутентифікація**: JSON Web Tokens (JWT)
* **Інші**: CORS, dotenv, nodemon (для розробки)

---

## 🚀 Запуск проекту локально

### 1. Клонування репозиторію

```bash
git clone https://github.com/ReEyDaAng/MusicHub.git
cd MusicHub
```

### 2. Налаштування оточення

У корені проекту створіть файл:

* **`.env`**  в папці `server`

#### Приклад `server/.env`

```dotenv
PORT=5000
MONGO_URI=your_mongo_db_url
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_secret_key
```

### 3. Запуск серверної частини

```bash
cd server
npm install
npm run dev   # або "node index.js" для production
```

Сервер запуститься на `http://localhost:5000`.

### 4. Запуск клієнтської частини

```bash
cd client
npm install
npm run dev
```

Клієнт доступний за адресою `http://localhost:5173`.

---

## 🎯 Функціонал (не дороблений та можливо зміниться через особливості Spotify Web API)

* Пошук треків по ключовому слову
* Відтворення 30‑секундних превʼю-пісень
* Прогрес‑бар та регулювання гучності
* Додавання треку до «Обраного» (треба бути залогіненим)
* Реєстрація та логін (JWT)
* Відображення останніх рекомендованих треків на головній сторінці
* Адаптивний дизайн із Tailwind CSS

---

## 🖼 Активація фонового зображення

Фонова картинка знаходиться в папці `client/src/assets/bg.jpg`. У компоненті `App.jsx` вона підтягується як:

```jsx
<img src={bg} className="absolute inset-0 object-cover w-full h-full" />
```

і накладається напівпрозорий шар для читабельності контенту.

---

## 📂 Структура проекту

```
MusicHub/
├── client/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── assets/  # фонові картинки
│   │   ├── components/  # Navbar, картки тощо
│   │   ├── pages/   # Home, Search, Favorites, Login, Register
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── server/          # Express + MongoDB + Spotify API
│   ├── routes/      # auth, favorites, spotify
│   ├── middleware/  # JWT верифікація
│   ├── models/      # mongoose-схеми для користувачів та обраного
│   ├── index.js
│   └── .env
├── .gitignore
└── README.md
```

---

*Автор: Максим(https://github.com/ReEyDaAng)*
