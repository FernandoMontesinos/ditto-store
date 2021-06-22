// Slider Jquery ---------------------------------------------------------------------------
$(document).ready(function () {
    let imgItems = $(".slider li").length; // Numero de imagenes
    let imgPosition = 1;
    // Para iterar sobre la paginacion
    for (i = 0; i < imgItems; i++) {
        $(".pagination").append('<li><span class="fas fa-circle"></span></li>');
    }


    $(".slider li").hide(); // Ocultamos las imagenes
    $(".slider li:first").show(); // Mostramos solo la primera
    $(".pagination li:first").css({
        "color": "#F5D655"
    });

    // Funciones
    $(".pagination li").click(pagination);
    $(".right span").click(nextSlider);
    $(".left span").click(prevSlider);


    setInterval(function () {
        nextSlider();
    }, 4000);

    function pagination() {
        // Para el numero de paginacion
        var paginationPosition = $(this).index() + 1;
        console.log(paginationPosition);

        $(".slider li").hide();
        $('.slider li:nth-child(' + paginationPosition + ')').fadeIn();

        $(".pagination li").css({
            "color": "#858585"
        })
        $(this).css({
            "color": "#F5D655"
        });

        imgPosition = paginationPosition;
    }

    function nextSlider() {
        if (imgPosition >= imgItems) {
            imgPosition = 1;
        } else {
            imgPosition++;
        }
        $(".pagination li").css({
            "color": "#858585"
        })
        $('.pagination li:nth-child(' + imgPosition + ')').css({
            "color": "#F5D655"
        });

        $(".slider li").hide();
        $('.slider li:nth-child(' + imgPosition + ')').fadeIn();
    }

    function prevSlider() {
        if (imgPosition <= 1) {
            imgPosition = imgItems;
        } else {
            imgPosition--;
        }
        $(".pagination li").css({
            "color": "#858585"
        })
        $('.pagination li:nth-child(' + imgPosition + ')').css({
            "color": "#F5D655"
        });

        $(".slider li").hide();
        $('.slider li:nth-child(' + imgPosition + ')').fadeIn();
    }
});