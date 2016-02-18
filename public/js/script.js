$('#findone').click(function(){
    $.ajax({
        url: '/findone',
        data: {id: 1},
        success: function(result){
            alert(JSON.stringify(result));
        },
        type: 'GET'
    });
});
