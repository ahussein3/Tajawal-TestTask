(($, window, document, undefined) => {

    $(() => {

        $.fn.cardsSlider = function(options){
            return this.each(function(){

                var sliderOptions = $.extend({
                    slidesToShow: 5,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: true,
                    dots: false,
                    responsive: false
                }, options);

                var sliderObj = {
                    activeItemIndex: 0
                };

                var activeScale = 1.3;

                var $this = $(this);
                var $items = $this.find('.items-banner .item');




                function bindArrows(){
                    $this.append(
                        '<div class="slider-arrows">'+
                            '<i  class="item-info_icon arrow-btn next-btn icon-keyboard_arrow_right"></i>'+
                            '<i  class="item-info_icon prev-btn  arrow-btn icon-keyboard_arrow_left"></i>'+
                        '</div>'
                    );
                }

                function getBannerWidth(){
                    return $items.outerWidth() * $items.length;
                }

                function getBannerHeight(){
                    return $items.outerHeight() * activeScale;
                }

                function setItemWidth(){
                    $items.outerWidth( parseInt($this.outerWidth() / sliderOptions.slidesToShow) )
                }

                function setStyles(){
                    setItemWidth();

                    $this.css({
                        position: "relative",
                        overflow: "hidden"
                    }).find('.items-banner').css({
                        width: getBannerWidth(),
                        height: getBannerHeight(),
                        transition: 'transform 0.4s'
                    });

                    $items.css({
                        display: 'inline-block',
                        transition: 'transform 0.4s, opacity 0.4s, box-shadow 0.4s',
                        float: 'left',
                        marginTop: $items.outerHeight() * 0.25,
                        transformOrigin: 'center center'
                    });

                    $this.find('.slider-arrows .arrow-btn').css({
                        position: 'absolute',
                        top: '45%',
                        transform: 'translateY(-50%)',
                        zIndex: 5
                    });
                    $this.find('.slider-arrows .next-btn').css({
                        right: 0
                    });
                    $this.find('.slider-arrows .prev-btn').css({
                        left: 0
                    });

                    $this.append(
                        '<div class="clearfix" style="clear: both; display: table"></div>'
                    );



                }

                function setActive(itemIndex){


                    for(var i = 0, length = $items.length; i < length; i++ ){
                        switch(i){
                            case itemIndex:
                                $items.eq(i).css({
                                    transform: 'scale('+activeScale+')',
                                    opacity: 1,
                                    zIndex: 4,
                                    boxShadow: '0px 0px 18px 2px rgba(0, 0, 0, 0.4)',
                                });
                                break;
                                case itemIndex - 1:
                                case itemIndex + 1:
                                $items.eq(i).css({
                                    transform: 'scale('+(activeScale - 0.2)+')',
                                    opacity: 0.8,
                                    zIndex: 3,
                                    boxShadow: '0px 0px 12px 2px rgba(0, 0, 0, 0.3)',

                                });
                                break;
                                case itemIndex - 2:
                                case itemIndex + 2:
                                $items.eq(i).css({
                                    transform: 'scale('+(activeScale - 0.4)+')',
                                    opacity: 0.6,
                                    zIndex: 2,
                                    boxShadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.2)',

                                });
                            break;
                            default:
                                $items.eq(i).css({
                                    transform: 'scale(1)',
                                    opacity: 0.5,
                                    boxShadow: '0 0 0px 0px rgba(0,0,0,0.0)',
                                    zIndex: 1,
                                });
                            break;
                        }
                    }

                }






                bindArrows();
                function init(){
                    setStyles();
                    setActive(sliderObj.activeItemIndex);
                }init();


                function sliderMove(method, currentIndex){

                    var isCorrectItem = false;
                    var move;
                    switch(method){
                        case 'next':
                        isCorrectItem = ((currentIndex+1) % sliderOptions.slidesToShow) == 0 || currentIndex+1 == $items.length;
                        move = isCorrectItem && (currentIndex+1) !== $items.length ? ((currentIndex+1) / sliderOptions.slidesToShow) * $this.outerWidth() : 0;
                        break;
                        case 'prev':
                            isCorrectItem = (currentIndex % sliderOptions.slidesToShow) == 0;
                            move = isCorrectItem && (currentIndex) !== 0 ? ((currentIndex / sliderOptions.slidesToShow) - 1) * $this.outerWidth() : (($items.length / sliderOptions.slidesToShow) -1) *  $this.outerWidth();
                        break;
                        default:
                            isCorrectItem = false;
                        break;
                    }


                    if(isCorrectItem){
                        $this.find('.items-banner').css({
                            transform: 'translateX('+ -(move) +'px)'
                        })
                    }
                }

                function nextAction(){
                    sliderMove('next', sliderObj.activeItemIndex);

                    if(sliderObj.activeItemIndex < $items.length - 1){
                        sliderObj.activeItemIndex++;
                        setActive(sliderObj.activeItemIndex);
                    }else{
                        sliderObj.activeItemIndex = 0;
                        setActive(sliderObj.activeItemIndex)
                    }
                }
                function prevAction(){
                    sliderMove('prev', sliderObj.activeItemIndex);

                    if(sliderObj.activeItemIndex > 0){
                        sliderObj.activeItemIndex--;
                        setActive(sliderObj.activeItemIndex);
                    }else{
                        sliderObj.activeItemIndex = $items.length - 1;
                        setActive(sliderObj.activeItemIndex);
                    }
                }

                $this.on('click', '.next-btn', nextAction);
                $this.on('click', '.prev-btn', prevAction);

                var reponsiveScreenFound = false;
                function reponsiveFn(){
                    sliderOptions.responsive && $.each(sliderOptions.responsive, function (index, item){
                        if($(window).width() <= item.breakpoint){
                            $.extend(sliderOptions, item.settings);
                            reponsiveScreenFound = true;
                        }else if(!reponsiveScreenFound){
                            $.extend(sliderOptions, options);
                        }
                    });
                }

                function recenter(){

                    var move = parseInt((sliderObj.activeItemIndex+1) / sliderOptions.slidesToShow) * $this.outerWidth();

                    $this.find('.items-banner').css({
                        transform: 'translateX('+ -(move) +'px)'
                    });

                }

                function resizing(){

                    reponsiveFn();
                    console.log(reponsiveScreenFound);
                    reponsiveScreenFound && init();
                    recenter();

                    reponsiveScreenFound = false;

                }resizing();

                var windowResizing;
                $(window).on('resize', function(){
                    clearTimeout(windowResizing);
                    windowResizing = setTimeout(resizing, 200);
                });

            });

        }



    });

  })(jQuery, window, document);
