$(document).ready(function(){
    getMarcas();
    getModelos();
    getAnos();
    printTable();
});

function getMarcas(){
    $("#tipo_sel").change(function(){
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+$(this).val()+"/marcas",
            success: function(data){
                //console.log(data);
                $("#marcas").prop("disabled", false);
                $.each(data, function(k, v) {
                    $("#marcas").append("<option value='"+v['codigo']+"'>"+v['nome']+"</option>");
                    //console.log(v['id']);
                });
            }
        });
    }); 
};

function getModelos(){
    $("#marcas").change(function(){
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+$("#tipo_sel").val()+"/marcas/"+$(this).val()+"/modelos",
            success: function(data){
                //console.log(data);
                $("#modelos").prop("disabled", false);
                $.each(data["modelos"], function(index, item) {
                    $("#modelos").append("<option value='"+item['codigo']+"'>"+item['nome']+"</option>");  
               });
            }
        }); 
    });
};

function getAnos(){
    $("#modelos").change(function(){
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+$("#tipo_sel").val()+"/marcas/"+$("#marcas").val()+"/modelos/"+$("#modelos").val()+"/anos",
            success: function(data){
                //console.log(data);
                $("#anos").prop("disabled", false);
                $.each(data, function(k, v) {
                    $("#anos").append("<option value='"+v['codigo']+"'>"+v['nome']+"</option>");
                    // console.log(data);
                });
            }
        }); 
    });
};

function printTable(){
    $("#anos").change(function(){
        $.ajax({
            type: "json",
            method: "GET",
            url: "https://parallelum.com.br/fipe/api/v1/"+$("#tipo_sel").val()+"/marcas/"+$("#marcas").val()+"/modelos/"+$("#modelos").val()+"/anos/"+$(this).val(),
            success: function(data){
                //console.log(data);
                    $("#table_marca").append("<td>"+data['Marca']+"</td>");
                    $("#table_modelo").append("<td>"+data['Modelo']+"</td>");
                    $("#table_ano").append("<td>"+data['AnoModelo']+"</td>");
                    $("#table_valor").append("<td>"+data['Valor']+"</td>");
            }
        }); 
    });
};