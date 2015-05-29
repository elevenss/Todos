

$(document).ready(function() {
    
	$("#addThis").keypress(function(e) {
        if (e.which == 13) {
            var item = $("input[name=checkList]").val();
            item = item.trim();
            if (item == "") {
                return false;
            }
            renderItem(item);
            items.push(item);
            $("#addThis").val("");
            localStorage.setItem('todos', items);
            return false;
        }
    });
    render();

    $(document).on("click", "input:checkbox", function() {
        $(this).parent().find(".item-content").toggleClass("remove-me");
        });

    $(document).on("click", ".remove", function() {
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
    $(".list").prepend("<div class='item'><input type='checkbox' /><span class='item-content'>" + item + "</span><button class='remove'></button></div>");
}


var items = localStorage.getItem('todos').split(',') ;

function render() {
    $.each(items, function (index, value) {
        if (value == "") {
            return;
        } else {
            renderItem(value);
        }
    });
}

