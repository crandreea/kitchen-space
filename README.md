# 🍳 Kitchen Space

**Kitchen Space** is a personal recipe management web application that allows users to add, save, and search for recipes. Built with a modern tech stack including **C# .NET**, **React**, and **PostgreSQL**, Kitchen Space provides a clean and interactive user experience for organizing and discovering recipes.

---

## ✨ Features
- Add your own custom recipes
- Save favorite recipes for quick access
- Search recipes by title, ingredients, or tags


---

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | React              |
| Backend       | ASP.NET Core (C#)  |
| Database      | PostgreSQL         |
| API Protocol  | REST               |

---

## 📦 Getting Started

### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/en-us/download)
- [PostgreSQL](https://www.postgresql.org/download/)

---

### 🔧 Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/kitchen-space.git
   cd kitchen-space
   
2. **Configure database**
   1. create a database
   2. modify the connection string in **appsettings.json**
   3. run the migrations
   ```bash
   dotnet ef database update

3. **Run the app**
   ```bash
   dotnet run

## 🚀 Future Improvements
- Allow feedback on recipes, including reviews, tips, and star ratings.
- Let users schedule recipes throughout the week for organized meal planning.
- Automatically generate shopping lists based on selected recipes.