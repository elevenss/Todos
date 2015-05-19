

$(document).ready(function() {
    $(".item").hover(function() {
        $(this).toggleClass("item-hover");
    });
    
	$("#addThis").keypress(function(key) {
        if (key.which == 13) {
            var item = $("input[name=checkList]").val();
            renderItem(item);
            items.push(item);
            $("#addThis").val("");
            key.preventDefault();
            localStorage.setItem('todos', items);
        }
    });
    render();
    $(".remove").click(function() {
        var toRemove = $(this).parent();
        var toRemoveText = $(toRemove).find('.item-content').text(); 
        remove([toRemoveText]);
        toRemove.remove();
    });

    $(".remove-selected").click(function() {
        var checkedItems = $("input:checked").parent();
        var itemz = [];
        $.each($("input:checked").parent().find(".item-content"), function(index, value) {
            itemz.push($(value).text());
        });
        remove(itemz);
        checkedItems.remove();
    });
});


function remove(itemz) {
    var tmp_items = [];
    for (var j = 0; j < items.length; j++) {
        tmp_items.push(items[j]);
        for (var i = 0; i < itemz.length; i++) {
            if (itemz[i] == items[j]) {
                tmp_items.pop(); 
                break;
            }
        }
    }
    items = tmp_items;
    localStorage.setItem('todos', items);
}   

function renderItem(item) {
    $(".list").prepend("<div class='item'><input type='checkbox' /><span class='item-content'>" + item + "</span><span class='remove'>&times;</span</div>");
}


var items = localStorage.getItem('todos').split(",") ;

function render() {
    $.each(items, function (index, value) {
       renderItem(value);
    });
}

