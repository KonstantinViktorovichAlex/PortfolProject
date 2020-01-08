document.addEventListener("DOMContentLoaded", () => {
    /**********************TODO***********************/

    const todoInput = document.querySelector(".todo-input"),
        todoButtonAdd = document.querySelector(".todo-button-add"),
        todoUl = document.querySelector(".todo-ul");

    const tasksArr = []; //РОДИТЬ НОРМАЛЬНЫЙ ОБЪЕКТ КЛЮЧ ЗНАЧЕНИЕ

    function start() {
        let data = JSON.parse(localStorage.getItem("items"));
        renderTasks(data); //передаем в функцию для отображения сраный массив
        todoButtonAdd.addEventListener("click", addTask);
    }
    start();

    function renderTasks(itemsArr) {
        //рендерит сраный массив
        if (!itemsArr) {
            // если массив с тасками пуст то идем нахер
            return;
        }
        itemsArr.forEach((taskItem, index) => {
            //перебираем массив+
            createTask(taskItem, index); // ебошим перебраное в функцию по созданию тасков
        });
    }

    function createTask(taskTitle, index) {
        const { value, id } = taskTitle;
        // тупо принимает таску и создает каждую таску визуально
        const newtask = document.createElement("li"),
            wrapButton = document.createElement("div"),
            buttonDelete = document.createElement("div"),
            buttonOk = document.createElement("div");

        wrapButton.classList.add("todo-wrap-button");
        newtask.classList.add("todo-task");
        newtask.setAttribute("data-id", id);
        buttonDelete.classList.add("todo-delete");
        buttonOk.classList.add("todo-button-ok");

        newtask.innerHTML = `<div>${value}${id}</div>`;
        todoUl.append(newtask);
        newtask.append(wrapButton);
        wrapButton.append(buttonOk);
        wrapButton.append(buttonDelete);
        checkTask(buttonOk, newtask);
        deleteTask(buttonDelete, newtask);
    }

    let id = 0; // костыль от undefined во вребя добавления таски

    function addTask() {
        // ну типо создаем функцию по созданию сраной таски
        if (!todoInput.value) {
            todoInput.classList.add("todo-input-error");
            return;
        } else {
            todoInput.classList.remove("todo-input-error");
            const value = todoInput.value;
            createTask({
                id: id,
                value: value
            }); // запускаем создатель тасок и передаем obj
            addToObj(id, todoInput.value);
            // saveTasks();
            todoInput.value = "";
            saveTasks();
        }

        id++; //конец костыля
    }

    function addToObj(id, value) {
        tasksArr.push({
            id,
            value
        });
    }

    function saveTasks() {
        localStorage.setItem("items", JSON.stringify(tasksArr));
    }

    function checkTask(buttonOk, newtask) {
        buttonOk.addEventListener("click", function(e) {
            newtask.classList.toggle("todo-task-check");
        });
    }

    function deleteTask(buttonDelete, newtask) {
        buttonDelete.addEventListener("click", function(e) {
            let todoTask = document.querySelectorAll(".todo-task");
            newtask.remove();
            saveTasks();
        });
    }

    /**********************WEATHER***********************/

    const outWrap = document.querySelector(".out-wrap");
    const appid = `d44169bc208f8873a06471a5bfc8189a`;

    const dataCity = "../ru_cities.json";

    async function dataCityResponse() {
        const response = await fetch(dataCity, { method: "GET" });
        const dataLocal = await response.json();
        dataLocal.sort(function(a, b) {
            // сортируем по алфавиту
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
        });

        for (let key in dataLocal) {
            const cityData = dataLocal[key];

            addCity(cityData.name, cityData.id);
        }
    }
    dataCityResponse();

    function addCity(data, id) {
        const p = document.createElement("p");
        p.classList.add("out-p");
        p.setAttribute("data-id", id);
        p.innerHTML = `${data}`;

        outWrap.append(p);
        p.addEventListener("click", clickCity);
    }

    function clickCity(e) {
        const id = e.target.getAttribute("data-id");
        getRequest(id);
    }

    async function getRequest(id) {
        const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${appid}`;
        const response = await fetch(url, { method: "GET" })
            .then(function(response) {
                if (!response) {
                    console.log(response.statusText, response.status);
                }
                return response.json();
            })
            .then(function(dataServer) {
                showInfo(dataServer);
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function showInfo(dataServer) {
        const temp = dataServer.main.temp - 273.15, // Пересчёт в градусы Цельсия: tC = tK − 273 ,15
            humidity = dataServer.main.humidity,
            description = dataServer.weather[0].description,
            wind = dataServer.wind.speed,
            icon = dataServer.weather[0].icon
        document.querySelector(".temp").innerHTML = `<p> ${temp.toFixed(
      0
    )} &#8451</p>`;
        document.querySelector(
            ".humidity"
        ).innerHTML = `<p>влажность: ${humidity} &#37</p>`;
        document.querySelector(
            ".wind"
        ).innerHTML = `<p>скорость ветра: ${wind} м/с</p>`;
        document.querySelector(
            ".description"
        ).innerHTML = `<p>погода: ${description}</p>`;
        document.querySelector(
            ".icon"
        ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    }

    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
        document.location.href = "../index.html";
    })
});