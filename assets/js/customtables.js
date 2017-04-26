'use strict';

$(document).ready(function() {
    //$(".datatable-index").DataTable();

    $('.datatable-index').dataTable({
        "dom": "<'row'<'#btn-create.col-sm-6'><'col-sm-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-5'l><'col-sm-7'p>>",
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

    // Extrae el pathname de la url para saber cual es el controller, y en base a eso parsear una ruta
    // al estilo /<modelo>/create para el boton de Agregar de la tabla, asumiendo que la url donde esta
    // se encuentre es al estilo /<modelo>/index
    var current_url = window.location.pathname;
    var pathnames = current_url.split("/").reverse();
    console.log(pathnames);
    var create_url = '';
    if (pathnames.length >= 2) {
      create_url = '/' + pathnames[1] + '/create';
    }

    //Appending Create Button
    $('#btn-create').append(
        "<a href='" + create_url + "' class='modal-link btn btn-primary' " + ">" +
        "Crear &nbsp; " +
        '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> ' +
        "</a>");
});




// $(function () {
//   $("#example1").DataTable();
//   $('#example2').DataTable({
//     "paging": true,
//     "lengthChange": false,
//     "searching": false,
//     "ordering": true,
//     "info": true,
//     "autoWidth": false
//   });
// });
