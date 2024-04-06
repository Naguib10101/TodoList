let projectName = 'To-Do-List';
document.title = projectName;
document.querySelector('.project_name').innerHTML = projectName;

let inputTask = document.querySelector('input');
let AddTask = document.querySelector('.addBtn');
let deleteAllTask = document.querySelector('.deleteBtn');
let tasks = document.querySelector('.tasks');
let Array_of_Task = [];

(localStorage.getItem('task')) ? Array_of_Task = JSON.parse(localStorage.getItem('task')) : null;

let data = localStorage.getItem('task');
if(data){
    let  objData = JSON.parse(data);
    AddTaskToPage(objData);
}


let  showTasks = () => {
    if(inputTask.value !== ''){
        AddTaskToArray(inputTask.value);
        inputTask.value = '';
    }
}

let DeleteAllTasksFromPageAndArray = ()=>{
    tasks.innerHTML = '';
    localStorage.clear();
    Array_of_Task = [];
}

AddTask.addEventListener("click", showTasks);

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') showTasks();
})

deleteAllTask.addEventListener('click', DeleteAllTasksFromPageAndArray);

let AddTaskToArray= (dataTask) =>{
    let todo = {
        id: (Math.floor(Math.random() * Math.pow(10,6)) + 1),
        title:dataTask,
        completeTask:false
    }
    Array_of_Task.push(todo);
    AddTaskToPage(Array_of_Task);
    AddToLocal(Array_of_Task);
}

function AddTaskToPage (data){
    tasks.innerHTML = '';
    data.forEach(e => {
        let task = document.createElement('div');
        task.classList.add('task');
        task.textContent = e.title;
        task.setAttribute('data-id',e.id);
        if(e.completeTask) task.className = 'task done';
        let del = document.createElement('span');
        del.classList.add('del');
        del.textContent = 'Delete';
        task.appendChild(del);
        tasks.appendChild(task);
    });
}

tasks.addEventListener('click' , (e)=>{
    if(e.target.classList.contains('del')){
        Array_of_Task = Array_of_Task.filter((task) => task.id != e.target.parentElement.getAttribute('data-id'));
        e.target.parentElement.remove();
        AddToLocal(Array_of_Task);
    }
    if(e.target.classList.contains('task')){
        for(let i = 0; i < Array_of_Task.length; i++){
            (Array_of_Task[i].id == e.target.getAttribute('data-id')) ? 
            ((Array_of_Task[i].completeTask === false) ? (Array_of_Task[i].completeTask = true) : (Array_of_Task[i].completeTask = false))
            : null;
        }
        e.target.classList.toggle('done');
        AddToLocal(Array_of_Task);
    }
})

let AddToLocal = (task)=> localStorage.setItem('task' , JSON.stringify(task));
