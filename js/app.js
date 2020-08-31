$(document).ready(() => {
    const todoList = $('.todo-items ul');
    const todoInput = $('#todoInput');


    //Deletes all history
    $('#delete').click(function() {
        const todo = JSON.parse(localStorage.getItem("todos"))
        todo["archive"] = []
        localStorage.setItem("todos", JSON.stringify(todo));
        location.reload();

    });
    //Reset APP
    $('#reset').click(function() {
        localStorage.removeItem("todos");
        location.reload();

    });


    let storedObj = localStorage.getItem('todos');

    if (storedObj) {
        const newAdd = JSON.parse(storedObj);

        for (let task in newAdd['datas']) {
            let todo = `<li><span  class="edit-list" id="todo-item">${newAdd['datas'][task]}</span>
    <img title="Done" onclick="Done(this)" id="tick" class="donebtn" src="images/done2.png">
         <button id="todoEdit" onclick="makeEdit(this)" class="btn">EDIT</button>
    
            </li> `;
            $(todo).appendTo(todoList);
        } {

        }
        for (let doneTask in newAdd['archive']) {
            let oldTask = `<li class="list-group-item"><span>${newAdd['archive'][doneTask]}</span></li>`;
            $(oldTask).appendTo('.list-group')
        }


    }
    $("#todoSubmit").on('click', () => {
        let storedObj = localStorage.getItem('todos');

        let todoObj = {
            'datas': [],
            'archive': [],


        }
        if (storedObj) {
            const newAdd = JSON.parse(storedObj);
            newAdd['datas'].push($("#todoInput").val());
            localStorage.setItem('todos', JSON.stringify(newAdd));
        } else {
            todoObj['datas'].push(($("#todoInput")).val());
            localStorage.setItem('todos', JSON.stringify(todoObj));
        }

        let todo = `<li>
        
            <span  class="edit-list" >${todoInput.val()}</span>
    <img title="Done" onclick="Done(this)" id="tick" class="donebtn" src="images/done2.png">
         <button id="todoEdit" onclick="makeEdit(this)" class="btn">EDIT</button>
    
            </li> `;
        $(todo).appendTo(todoList);
        $("#todoInput").val("")
    })

});

function makeEdit(task) {
    $(task).parent().hide();
    var localArr = [];
    var storedObj = JSON.parse(localStorage.getItem('todos'));
    var data = $(task).parent().find('span').text();

    for (var task in storedObj['datas']) {
        if (data !== storedObj['datas'][task]) {
            localArr.push(storedObj['datas'][task]);
        }
    }

    storedObj['datas'] = localArr;
    localStorage.setItem('todos', JSON.stringify(storedObj));
    $('#todoInput').val(data);
}


function Done(task) {
    let localArr = []
    let storedObj = JSON.parse(localStorage.getItem('todos'));

    const data = $(task).parent().find('span').text();

    for (let task in storedObj['datas']) {
        if (data !== storedObj['datas'][task]) {
            localArr.push(storedObj['datas'][task]);
        }

    }
    storedObj['datas'] = localArr;
    storedObj['archive'].push(data);


    localStorage.setItem('todos', JSON.stringify(storedObj));
    $(task).parent().find('span').css('text-decoration', 'line-through');
}