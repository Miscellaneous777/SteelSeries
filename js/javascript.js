function openNav(){
  document.getElementById("menuNav").style.width = "22em";
}

function closeNav(){
  document.getElementById("menuNav").style.width = "0rem";
}

window.onload = function(){
  console.log("window loaded!");

  var acc = document.getElementsByClassName("accordion");
  var j;

  for (j = 0; j < acc.length; j++){
    acc[j].addEventListener("click", function(){
      this.classList.toggle("active");
      var popOut = this.nextElementSibling;
      if (popOut.style.display === "block"){
        popOut.style.display = "none";
      } else {
        popOut.style.display = "block";
      }
    })
  }


  $("a.shopItem").click(function( event ) {
    event.preventDefault();
  });

  $('.shopItem').draggable({
    revert:true,
    proxy:'clone',
    cursor: 'pointer',
    refreshPositions: true,
    helper:'clone',
    Start:function(event, ui){
      $(this).draggable('options').cursor = 'not-allowed';
      $(this).draggable('proxy').css('z-index',10);
    },
    onDragStop:function(){
      $(this).draggable('options').cursor='move';
    }

  });

  $('.shopCart').droppable({
    tolerance: "pointer",
    drop: droppedLad,
    //function(e, source){
      //$(source).draggable('options').cursor='auto';
      //console.log("DID IT");
    //},
    onDragLeave:function(e, source){
      $(source).draggable('options').cursor='not-allowed';
    },
    onDrop:function(event, ui){
      var name = $(ui.draggable).html();
      var price = $(ui.draggable).data("price");
      console.log(name);
      console.log(price);
      addProduct(name, parseFloat(price));
    }
  });

  function droppedLad(event, ui){
    var name = $(ui.draggable).find("h2.itemName").html();
    var price = $(ui.draggable).find("h2.itemName").attr("data-price");
    console.log(name);
    console.log(price);
    addProduct(name, parseFloat(price));

  }

  var data = {"total":0,"rows":[]};
  var totalCost = 0;
  function addProduct(name,price){
    console.log("FIRED " + name + " " + price);
    for(var i=0; i<data.total; i++){
      var row = data.rows[i];
      if (row.id == name){
        row.quantity += 1;
        return;
      }
    }
    data.total += 1;
    data.rows.push({
      name:name,
      amount:1,
      price:price
    });
    console.log(data);
    totalCost += price;
    console.log(totalCost);

    $('#cartcontent').append("<tr><td>" + data.rows[i].name + "</td><td>" + data.rows[i].amount +"</td><td>"+ data.rows[i].price + "</td></tr>");
    $('div.shopCart .total').html('Total: £'+totalCost);

  }







  ///$("a.shopItem").draggable(start:function(){$(this).draggable('proxy').css('z-index',10)});
    //onStopDrag:function()
    //{
    //$(this).draggable('options').cursor='move';
    //}

    //var bobby = $(this).find('h2.itemName').attr("data-price");
    //console.log(bobby);
}



var data = {"total":0,"rows":[]};
var totalCost = 0;
function addProduct(name,price){
  console.log("FIRED");
  function add(){
    for(var i=0; i<data.total; i++){
      var row = data.rows[i];
      if (row.id == name){
        row.quantity += 1;
        return;
      }
    }
    data.total += 1;
    data.rows.push({
      name:name,
      amount:1,
      price:price
    });
  }
  add();
  console.log(data);
  totalCost += price;
  $('#cartcontent').datagrid('loadData', data);
  $('div.shopCart .total').html('Total: £'+totalCost);

}
