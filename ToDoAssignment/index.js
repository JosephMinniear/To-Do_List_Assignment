console.log('js is working today')

$(document).ready(function(){
    console.log('dom ready');

    var getAndDisplayAllTasks = function () {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=467',
            dataType: 'json',
            success: function (response, textStatus) {
                $('#todo-list').empty();
                response.tasks.forEach(function (task) {
                    $('#todo-list').append('<p>' + task.content + '</p>');
                });
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }
    var createTask = function () {
        $.ajax({
            type: 'POST',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=467',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function (response, textStatus) {
                $('#new-task-content').val('');
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
    });

    getAndDisplayAllTasks();

});