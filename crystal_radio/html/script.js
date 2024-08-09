$('.radiobg').hide();
$('#numberInput').hide();
$('#submitButton').hide();
$('#radioScr').hide();
$('#incrementButton').hide();
$('#decrementButton').hide();
$('#lasciaRadioSrc').hide();
$('#abbassavolumesrc').hide();
$('#alzavolumescr').hide();
$('#alzavolume').hide();
$('#abbassavolume').hide();


$(() => {
    window.addEventListener('message', (event) => {
        let data = event.data;
        if (data.action === "showRadio") {
            $('.container').fadeIn(100);
            $('.radiobg').fadeIn(100);
            $('#submitButton').fadeIn()
            $('#alzavolume').hide();
            $('#abbassavolume').hide();;
        } else if (data.action === "hideRadio") {
            $('.container').fadeOut(100);
            $('.radiobg').fadeOut(100);
            $('#numberInput').hide();
            $('#submitButton').hide();
            $('#abbassavolumesrc').hide();
            $('#alzavolumescr').hide();
            $('#alzavolume').hide();
            $('#abbassavolume').hide();
        } else if (data.action === "accendiRadio") {
            $('#numberInput').fadeIn();
            $('#incrementButton').show();
            $('#decrementButton').show();
            $('#alzavolume').show();
            $('#abbassavolume').show();
        }
    });
});

$(document).keyup(function (e) {
	if (e.keyCode === 27) {

		$.post('https://crystal_radio/close', JSON.stringify({}));
		$(".container").fadeOut("slow", function () {
            $('#numberInput').hide();
            $('#incrementButton').hide();
            $('#decrementButton').hide();
            $('#abbassavolumesrc').hide();
            $('#alzavolumescr').hide();
			$(".container").fadeOut();
		});

	}
});

document.addEventListener('DOMContentLoaded', function () {
    const accendiButton = document.getElementById('accendiBottone');
    const lasciaRadioButton = document.getElementById('lasciaRadio');

    // volumeeee
    const volumeAlza = document.getElementById('alzavolume');
    const abbassaVolume = document.getElementById('abbassavolume');


    const submitButton = document.getElementById('submitButton');
    const numberInput = document.getElementById('numberInput');

    const incrementButton = document.getElementById('incrementButton');
    const decrementButton = document.getElementById('decrementButton');

    incrementButton.addEventListener('click', function () {
        numberInput.stepUp();
    });

    decrementButton.addEventListener('click', function () {
        numberInput.stepDown();
    });

    submitButton.addEventListener('click', function () {
        const numberValue = parseInt(numberInput.value, 10);

        if (isNaN(numberValue)) {
            return;
        }

        fetch(`https://${GetParentResourceName()}/submitNumber`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: numberValue }),
        })
    });

    
    accendiButton.addEventListener('click', function () {
        fetch(`https://${GetParentResourceName()}/accendiRadio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    });

    $('#accendiBottone').hover(
        function () {
            $('#radioScr').fadeIn();
        },
        function () {
            $('#radioScr').fadeOut();
        }
    );

    $('#lasciaRadio').hover(
        function () {
            $('#lasciaRadioSrc').fadeIn();
        },
        function () {
            $('#lasciaRadioSrc').fadeOut();
        }
    );
    
    lasciaRadioButton.addEventListener('click', function () {
        fetch(`https://${GetParentResourceName()}/lasciaradio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    });

    volumeAlza.addEventListener('click', function () {
        fetch(`https://${GetParentResourceName()}/alzavolume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    });

    abbassaVolume.addEventListener('click', function () {
        fetch(`https://${GetParentResourceName()}/abbassavolume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    });

    $('#alzavolume').hover(
        function () {
            $('#alzavolumescr').fadeIn();
        },
        function () {
            $('#alzavolumescr').fadeOut();
        }
    );

    $('#abbassavolume').hover(
        function () {
            $('#abbassavolumesrc').fadeIn();
        },
        function () {
            $('#abbassavolumesrc').fadeOut();
        }
    );

});