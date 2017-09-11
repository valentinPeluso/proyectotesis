(function() {
    'use strict';

    angular
        .module('app.calendar')
        .component('calendar', {
            templateUrl: '/CanchaX/components/calendar/calendar.html',
            controller: CalendarComponentController,
            //transclude: {
            //    'paramsSection': '?paramList',
            //    'gridSection': 'div'
            //},
            bindings: {
                clickEvento: '&',
                backwardEvents: '<',
                actualEvents: '<',
                nextEvents: '<',
                cambioMes: '&',
            }
        })
        .component('weekCalendar', {
            templateUrl: '/CanchaX/components/calendar/calendar.html',
            controller: WeekCalendarComponentController,
            //transclude: {
            //    'paramsSection': '?paramList',
            //    'gridSection': 'div'
            //},
            bindings: {
                clickEvento: '&',
                cambioSemana: '&',
                eventos: '<'
            }
            /*
            <calendar-semana click-evento='' cambio-semana='' eventos=''>
                -click-evento: funcion que recibe como paramentro events -> array de eventos
                -cambio-semana: funcion que recibe como parametro fecha que retorna una promesa. La
                directiva esta esperando a que se retorne de la promera un array de eventos correspondientes
                a la nueva semana
                -eventos: array de dtos:
                    -fecha:  fecha moment
                    -eventos: todos los eventos correspondientes al dia de la fecha. El evento tiene 
                    que tener la propiedad hora_desde, hora_hasta que especifique la hora
                    desde hasta del evento
            </calendar-semana>
            */
        })
        .component('calendarMobile', {
            templateUrl: '/CanchaX/components/calendar/calendarMobile.html',
            controller: CalendarMobileComponentController,
            //transclude: {
            //    'paramsSection': '?paramList',
            //    'gridSection': 'div'
            //},
            bindings: {
                clickEvents: '&',
                cambioMes: '&',
                eventos: '<'
            }
            /*
            <calendar-mobile click-events='' cambio-mes='' eventos=''>
                -click-events: funcion que recibe como paramentro events -> array de eventos
                -cambio-mes: funcion que recibe como parametro fecha que retorna una promesa. La
                directiva esta esperando a que se retorne de la promera un array de eventos correspondientes
                al nuevo mes
                -eventos: array de dtos:
                    -fecha: fecha moment
                    -eventos: todos los eventos correspondientes a la fecha
            </calendar-mobile>
            */
        });

    function CalendarComponentController($compile, $scope, uiCalendarConfig) {
        var vm = this;

        vm.fechaDesde = new Date(moment().day(1).hours(0).minutes(0).seconds(0));
        vm.fechaHasta = new Date(moment().endOf('month').hours(23).minutes(59).seconds(59));
        vm.fechaHoy = moment((new Date()).toISOString(), "YYYY-MM-DD");

        vm.uiConfig = {
            calendar: {
                height: 450,
                editable: false,
                droppable: false,
                monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                header: {
                    left: 'title',
                    center: '',
                    right: 'Hoy prev,next'
                },
                eventClick: eventClick,
                eventRender: eventRender,
                viewRender: viewRender,
            }
        };
        vm.events = {
            sources: [
                [],
                [],
                []
            ],
            backward_events: [],
            actual_events: [],
            next_events: []
        };
        if (typeof vm.backwardEvents !== 'undefined')
            vm.events.backward_events = vm.backwardEvents
        if (typeof vm.actualEvents !== 'undefined')
            vm.events.actual_events = vm.actualEvents;
        if (typeof vm.nextEvents !== 'undefined')
            vm.events.next_events = vm.nextEvents;

        setEventos();

        this.$onChanges = function(events) {
            if (typeof events.backwardEvents !== 'undefined' && typeof events.backwardEvents.currentValue !== 'undefined')
                vm.events.backward_events = events.backwardEvents.currentValue;
            if (typeof events.actualEvents !== 'undefined' && typeof events.actualEvents.currentValue !== 'undefined')
                vm.events.actual_events = events.actualEvents.currentValue;
            if (typeof events.nextEvents !== 'undefined' && typeof events.nextEvents.currentValue !== 'undefined')
                vm.events.next_events = events.nextEvents.currentValue;
            setEventos();
        }

        function setEventos() {
            _.forEach(vm.events.backward_events, function(event) {
                event.allDay = true;
                event.object = event.object;
                event.textColor = '#FFF';
                event.fecha_start = event.fecha,
                    event.start = event.fecha,
                    event.title = event.titulo,
                    event.className = ["LClink"];
                if (!event.color)
                    event.color = '#d9534f';
            });
            _.forEach(vm.events.actual_events, function(event) {
                event.allDay = true;
                event.object = event.object;
                event.textColor = '#FFF';
                event.fecha_start = event.fecha,
                    event.start = event.fecha,
                    event.title = event.titulo,
                    event.className = ["LClink"];
                if (!event.color)
                    event.color = '#9ad268';
            })
            _.forEach(vm.events.next_events, function(event) {
                event.allDay = true;
                event.object = event.object;
                event.textColor = '#FFF';
                event.fecha_start = event.fecha,
                    event.start = event.fecha,
                    event.title = event.titulo,
                    event.className = ["LClink"];
                if (!event.color)
                    event.color = '#4dd4fd';
            })
            refreshcalendar();
            vm.events.sources[0] = vm.events.backward_events;
            vm.events.sources[1] = vm.events.actual_events;
            vm.events.sources[2] = vm.events.next_events;
        }

        function eventClick(event, jsEvent, view) {
            vm.clickEvento({ event: event });
        }

        function eventRender(event, element, view) {
            element.attr({
                'uib-tooltip': event.title,
            });
            $compile(element)($scope);
        };

        function viewRender(view, element) {
            vm.fechaDesde = view.start._d;
            vm.fechaHasta = view.end._d;
            vm.cambioMes({ desde: vm.fechaDesde, hasta: vm.fechaHasta });
        }

        function refreshcalendar(event, events) {
            if (typeof uiCalendarConfig.calendars['calendar_eventos'] !== 'undefined')
                uiCalendarConfig.calendars['calendar_eventos'].fullCalendar('removeEvents');
        }
    }

    function WeekCalendarComponentController() {
        var vm = this;

        vm.fecha_moment = moment();
        vm.fecha_moment_hoy = moment();

        vm.dias = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
        ]

        vm.horas = [
            { hora: "8:00" },
            { hora: "8:30" },
            { hora: "9:00" },
            { hora: "9:30" },
            { hora: "10:00" },
            { hora: "10:30" },
            { hora: "11:00" },
            { hora: "11:30" },
            { hora: "12:00" },
            { hora: "12:30" },
            { hora: "13:00" },
            { hora: "13:30" },
            { hora: "14:00" },
            { hora: "14:30" },
            { hora: "15:00" },
            { hora: "15:30" },
            { hora: "16:00" },
            { hora: "16:30" },
            { hora: "17:00" },
            { hora: "17:30" },
            { hora: "18:00" },
            { hora: "18:30" },
            { hora: "19:00" },
            { hora: "19:30" },
            { hora: "20:00" },
            { hora: "20:30" },
            { hora: "21:00" },
            { hora: "21:30" },
            { hora: "22:00" },
            { hora: "22:30" },
            { hora: "23:00" },
            { hora: "23:30" },
            { hora: "00:00" },
            { hora: "00:30" },
        ]
    }

    function CalendarMobileComponentController() {
        var vm = this;

        vm.fecha_moment = moment();
        vm.fecha_moment_hoy = moment();

        vm.meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ]
        vm.mesActual = _.capitalize(vm.fecha_moment.format('MMMM'));

        vm.anioActual = vm.fecha_moment.format('YYYY');
        vm.anios = [
            moment().subtract(4, 'year').format('YYYY'),
            moment().subtract(3, 'year').format('YYYY'),
            moment().subtract(2, 'year').format('YYYY'),
            moment().subtract(1, 'year').format('YYYY'),
            moment().format('YYYY'),
            moment().add(1, 'year').format('YYYY'),
            moment().add(2, 'year').format('YYYY'),
            moment().add(3, 'year').format('YYYY'),
            moment().add(4, 'year').format('YYYY'),
        ];

        this.$onChanges = function(data) {
            if (typeof data.eventos.currentValue !== 'undefined') {
                vm.eventos = data.eventos.currentValue;
                //Meto los eventos en el calendar
                _.forEach(vm.eventos, function(evento) {
                    if (!moment.isMoment(evento.fecha))
                        evento.fecha = moment(evento.fecha);
                    _.forEach(vm.semanas, function(semana) {
                        _.forEach(semana, function(dia) {
                            if (dia.fecha.startOf('day').isSame(evento.fecha.startOf('day'))) {
                                dia.eventos.push(evento);
                            }
                        })
                    })
                });
                console.log();
            }
        }

        vm.mesSiguiente = mesSiguiente;
        vm.mesAnterior = mesAnterior;
        vm.cambiarMes = cambiarMes;
        vm.cambiarAnio = cambiarAnio;
        vm.clickDia = clickDia;

        armarcalendar()

        function armarcalendar() {
            var diascalendar = [];

            //Primero hay que armar los dias del mes actual
            //Segundo los dias previos al mes
            //Tercero y para completar los dias posteriores al mes
            diascalendar = armarDiasMesActual(diascalendar, angular.copy(vm.fecha_moment));
            diascalendar = armarDiasPreviosMes(diascalendar, angular.copy(vm.fecha_moment));
            diascalendar = armarDiasPostMes(diascalendar, angular.copy(vm.fecha_moment));

            vm.fechaDesde = _.head(diascalendar).fecha;
            vm.fechaHasta = _.last(diascalendar).fecha;

            vm.semanas = _.chunk(diascalendar, 7);
        }

        function armarDiasMesActual(diascalendar, fecha_moment) {
            var cantidadDiasMesActual = fecha_moment.daysInMonth();
            var diaActual = fecha_moment.date();
            var i = 1;
            while (i <= cantidadDiasMesActual) {
                //tengo que verificar si tengo eventos ese dia
                //si tengo los guardo
                if (i == vm.fecha_moment_hoy.date() && vm.fecha_moment_hoy.month() == fecha_moment.month() && vm.fecha_moment_hoy.year() == fecha_moment.year()) {
                    diascalendar.push({
                        numero: i,
                        estilos: { 'font-weight': 'bold' },
                        fecha: vm.fecha_moment_hoy.date(i),
                        eventos: []
                    });
                }
                else {
                    diascalendar.push({
                        numero: i,
                        fecha: angular.copy(fecha_moment).date(i),
                        eventos: []
                    });
                }
                i++;
            }
            return diascalendar;
        }

        function armarDiasPostMes(diascalendar, fecha_moment) {
            var i = 1;
            while (diascalendar.length % 7 !== 0) {
                //Agrego tantos dias como sea necesario para completar el calendar
                diascalendar.push({
                    numero: i,
                    estilos: { 'color': '#999999' },
                    fecha: angular.copy(fecha_moment).add(1, 'months').date(i),
                    eventos: []
                });
                i++;
            }
            return diascalendar;
        }

        function armarDiasPreviosMes(diascalendar, fecha_moment) {
            var cero_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month')
            };
            var uno_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(1, 'days').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(1, 'days')
            };
            var dos_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(2, 'days').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(2, 'days')
            };
            var tres_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(3, 'days').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(3, 'days')
            };
            var cuatro_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(4, 'days').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(4, 'days'),
            };
            var cinco_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(5, 'days').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(5, 'days')
            };
            var seis_dias = {
                numero: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(6, 'days').date(),
                fecha: angular.copy(fecha_moment).subtract(1, 'months').endOf('month').subtract(6, 'days')
            };

            //Verifico que cae el dia 1 del mes            
            switch (fecha_moment.date(1).format('dddd')) {
                case "lunes":
                    //si es lunes agrego 1 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    break;
                case "martes":
                    //si es lunes agrego 2 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, uno_dias));
                    break;
                case "miércoles":
                    //si es lunes agrego 3 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, uno_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, dos_dias));
                    break;
                case "jueves":
                    //si es lunes agrego 4 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, uno_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, dos_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, tres_dias));
                    break;
                case "viernes":
                    //si es lunes agrego 5 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, uno_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, dos_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, tres_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cuatro_dias));
                    break;
                case "sábado":
                    //si es lunes agrego 6 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, uno_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, dos_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, tres_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cuatro_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cinco_dias));
                    break;
                case "domingo":
                    //si es lunes agrego 7 dia del mes anterior
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cero_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, uno_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, dos_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, tres_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cuatro_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, cinco_dias));
                    diascalendar.unshift(_.merge({
                        estilos: { 'color': '#999999' },
                        eventos: []
                    }, seis_dias));
                    break;
            }
            return diascalendar;
        }

        function mesSiguiente() {
            vm.fecha_moment = vm.fecha_moment.add(1, 'months').date(1);
            vm.mesActual = _.capitalize(vm.fecha_moment.format('MMMM'));
            armarcalendar();
            //hay que llamar a la funcion cambioMes (si viene definida) para obtener los eventos correspondientes a ese mes
            if (typeof vm.cambioMes !== 'undefined') {
                vm.cambioMes({ fechaDesde: vm.fechaDesde, fechaHasta: vm.fechaHasta })
            };
        }

        function mesAnterior() {
            vm.fecha_moment = vm.fecha_moment.subtract(1, 'months').date(1);
            vm.mesActual = _.capitalize(vm.fecha_moment.format('MMMM'));
            armarcalendar();
            //hay que llamar a la funcion cambioMes (si viene definida) para obtener los eventos correspondientes a ese mes
            if (typeof vm.cambioMes !== 'undefined') {
                vm.cambioMes({ fechaDesde: vm.fechaDesde, fechaHasta: vm.fechaHasta })
            };
        }

        function cambiarMes(mes) {
            vm.fecha_moment = vm.fecha_moment.month(mes).date(1);
            vm.mesActual = mes;
            armarcalendar();
            //hay que llamar a la funcion cambioMes (si viene definida) para obtener los eventos correspondientes a ese mes
            if (typeof vm.cambioMes !== 'undefined') {
                vm.cambioMes({ fechaDesde: vm.fechaDesde, fechaHasta: vm.fechaHasta })
            };
        }

        function cambiarAnio(anio) {
            vm.fecha_moment = vm.fecha_moment.year(anio).date(1);
            vm.anioActual = anio;
            armarcalendar();
            //hay que llamar a la funcion cambioMes (si viene definida) para obtener los eventos correspondientes a ese mes
            if (typeof vm.cambioMes !== 'undefined') {
                vm.cambioMes({ fechaDesde: vm.fechaDesde, fechaHasta: vm.fechaHasta })
            };
        }

        function clickDia(dia) {
            //Retorno los eventos correspondientes a ese dia a traves de la funcion clickEvents()
            if (dia.eventos.length > 0)
                vm.clickEvents({ events: dia.eventos });
        }
    }
})();
