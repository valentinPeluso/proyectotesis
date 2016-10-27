(function () {
    'use strict';

    angular.module('app.verificacion_validacion')
    .controller('verificacionValidacionCalendarioController', verificacionValidacionCalendarioController)
    
    verificacionValidacionCalendarioController.$inject = ['ngToast'];
    
    function verificacionValidacionCalendarioController(ngToast){
        var vm = this;

        vm.clickEvento = clickEvento;
        vm.cambioSemana = cambioSemana;

        vm.eventos = [
            {
                fecha: new Date(moment()),
                eventos: [
                    {
                        evento: {
                            id: 1
                         },
                        hora_desde: new Date(moment().startOf('day').add(10, 'hours')),
                        hora_hasta: new Date(moment().startOf('day').add(11, 'hours')),
                    },
                    {
                        evento: {
                            id: 2
                         },
                        hora_desde: new Date(moment().startOf('day').add(11, 'hours')),
                        hora_hasta: new Date(moment().startOf('day').add(12, 'hours')),
                    },
                    {
                        evento: {
                            id: 3
                         },
                        hora_desde: new Date(moment().startOf('day').add(13, 'hours')),
                        hora_hasta: new Date(moment().startOf('day').add(14, 'hours')),
                    },
                ]
            },
            {
                fecha: new Date(moment().add(1, 'day')),
                eventos: [
                    {
                        evento: {
                            id: 4
                         },
                        hora_desde: new Date(moment().startOf('day').add(17, 'hours')),
                        hora_hasta: new Date(moment().startOf('day').add(18, 'hours')),
                    },
                    {
                        evento: {
                            id: 5
                         },
                        hora_desde: new Date(moment().startOf('day').add(19, 'hours')),
                        hora_hasta: new Date(moment().startOf('day').add(20, 'hours')),
                    },
                    {
                        evento: {
                            id: 6
                         },
                        hora_desde: new Date(moment().startOf('day').add(21, 'hours')),
                        hora_hasta: new Date(moment().startOf('day').add(22, 'hours')),
                    },
                ]
            }
        ];
        
       function clickEvento(event){
           console.log(event);
       }
       function cambioSemana(fechaDesde,fechaHasta){
           console.log(fechaDesde);
           console.log(fechaHasta);
       }
    }
    
})();