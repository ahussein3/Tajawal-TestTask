(($, window, document, undefined) => {
  'use strict';

  $(() => {




    if($('#search_checkin, #search_checkout').length){

      // check if element is available to bind ITS ONLY ON HOMEPAGE
      var currentDate = moment().format("MM-DD-YYYY");

      $('#search_checkin, #search_checkout').daterangepicker({
        locale: {
          format: 'MM-DD-YYYY'
        },
        minDate: currentDate,
        opens: 'center',
        autoApply: true,
        autoUpdateInput: false
      }, function(start, end, label) {

        // console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
        // Lets update the fields manually this event fires on selection of range
        var selectedStartDate = start.format('MM-DD-YYYY'); // selected start
        var selectedEndDate = end.format('MM-DD-YYYY'); // selected end

        var checkinInput = $('#search_checkin');
        var checkoutInput = $('#search_checkout');
        var dateDaySt = $('#date-month-st');
        var dateDayEd = $('#date-month-ed');
        var datedayNoSt = $('#date-day-st');
        var datedayNoEd = $('#date-day-ed');
        var weekDaySt = $('#date-day-name-st');
        var weekDayEd =$('#date-day-name-ed');
        var d = new Date(selectedStartDate);
        var d = new Date(selectedStartDate);
        var weekday = new Array(7);
        weekday[0] =  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var stWeekday =new Date(selectedStartDate);
        weekDaySt.text(weekday[stWeekday.getDay()]);
        var edWeekDay =new Date(selectedEndDate);
        weekDayEd.text(weekday[edWeekDay.getDay()]);

        // var n = weekday[d.getDay()];

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var stDatemonth =new Date(selectedStartDate);
        dateDaySt.text(month[stDatemonth.getMonth()]);
        var edDatemonth =new Date(selectedEndDate);
        dateDayEd.text(month[edDatemonth.getMonth()]);

        var dateNoSt =new Date(selectedStartDate);
        datedayNoSt.text(dateNoSt.getDate());
        var dateNoEd =new Date(selectedEndDate);
        datedayNoEd.text(dateNoEd.getDate());



        // Updating Fields with selected dates


        checkinInput.val(selectedStartDate);
        checkoutInput.val(selectedEndDate);

        // Setting the Selection of dates on calender on CHECKOUT FIELD (To get this it must be binded by Ids not Calss)
        var checkOutPicker = checkoutInput.data('daterangepicker');
        checkOutPicker.setStartDate(selectedStartDate);
        checkOutPicker.setEndDate(selectedEndDate);

        // Setting the Selection of dates on calender on CHECKIN FIELD (To get this it must be binded by Ids not Calss)
        var checkInPicker = checkinInput.data('daterangepicker');
        checkInPicker.setStartDate(selectedStartDate);
        checkInPicker.setEndDate(selectedEndDate);

      });

    // $('#inputEndDate').on('focus', function() {
    //   $('#inputStartDate').focus();
    }
    $('#search_checkin, #search_checkout').on('focus', function() {
      $("p.date-input_info").find("span.pre-start-date").css("display", "none");
      $("p.date-input_info").find("span.aft-date").css("display", "block");
      $("p.date-input_info").find("i.date-icon ").css({"position": "absolute",
      "top": "10px", "left": "10px", "font-size":"13px","color":"#81275a"});
    });

      $('.hotels-slider').cardsSlider({
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 767,
          settings:{
            slidesToShow: 3
          }
        },
        {
          breakpoint: 450,
          settings:{
            slidesToShow: 1
          }
        }
      ]
    })



  });

})(jQuery, window, document);
