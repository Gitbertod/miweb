let input = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let deleteAll = document.querySelector(".delete-all");

let arrayList = [];

if (localStorage.getItem("elemento")) {
    arrayList = JSON.parse(localStorage.getItem("elemento"));
}

showTaskOnWeb();
addBtn.onclick = () => {
    if (input.value != "") {
        addTaskToArray(input.value);
        input.value = "";
        console.log(arrayList);
    }
}

deleteAll.onclick = () => {
    deleteElements();
}

//ADD TASK TO ARRAY
function addTaskToArray(text) {
    const element = {
        name: text,
        id: Date.now(),
        date: Date()
    };
    arrayList.push(element);
    addTaskToLocalStorage(arrayList);
    showTaskOnWeb();
}

//ADD TO LOCAL STORAGE
function addTaskToLocalStorage(arrayList) {
    window.localStorage.setItem("elemento", JSON.stringify(arrayList));
}

function deleteElements() {
    window.localStorage.clear();
    arrayList.splice(0, arrayList.length);
    console.log(arrayList);
    tasks.innerHTML = "";
}

function showTaskOnWeb() {
    tasks.innerHTML = "";

    arrayList.forEach((element) => {
        let div = document.createElement('div');
        div.className = "task";
        div.setAttribute("data-id", element.id);
        tasks.appendChild(div);

        let nodeText = document.createTextNode(element.name);
        div.appendChild(nodeText);

        let deleteTaskBtn = document.createElement('span');
        deleteTaskBtn.className = "del";
        let nodeDelete = document.createTextNode("Delete");
        deleteTaskBtn.appendChild(nodeDelete);
        div.appendChild(deleteTaskBtn);

    })
}

tasks.onclick = ((e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
    }

    if(e.target.classList.contains("task")){
        e.target.classList.toggle ("done")
    }


})



