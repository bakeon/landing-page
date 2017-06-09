(function($){
    /**
	 * Firebase initialization
     */
    let config = {
			apiKey: "AIzaSyCtH-VSt5eB4DnFjvgjgg922vvWbREUQU4",
			authDomain: "test-a19da.firebaseapp.com",
			databaseURL: "https://test-a19da.firebaseio.com",
			projectId: "test-a19da",
			storageBucket: "test-a19da.appspot.com",
			messagingSenderId: "875179177529"
        };

    firebase.initializeApp(config);

    //SmoothScroll
    $('.scroll').on('click', function() { // Au clic sur un élément
        let page;
        if($(this).get(0).nodeName == 'LI'){
            page = $(this).children('a').attr('href'); // Page cible
        }
        else{
            page = $(this).attr('href'); // Page cible
        }
        let speed = 450; // Durée de l'animation (en ms)
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
        return false;
    });

    /**
	 * Control and animation for slider
     */
    // buttons
    let sliderControl = document.querySelector(".slider-control");
    console.log(sliderControl);

	// slides informations
	let slides = document.querySelectorAll(".slide"),
			slidesLength = slides.length;

	// slides array
	let slidesArr = [].slice.call(slides);

	// reverse array sorting
    slidesArr = slidesArr.reverse();

	// slide current
	let slideCurrent = 0;

    sliderControl.addEventListener("click", function(e){
        let target = e.target;

        // get next button
        if(target.classList.contains("next")){

            next = e.target,
                prev = next.previousElementSibling,
                nextSlide = slidesArr[slideCurrent + 1],
                slide = slidesArr[slideCurrent];

            slide.classList.add("slide-on");
            slide.classList.remove("text-on");
            nextSlide.classList.add("text-on");

            slideCurrent += 1;

            if(slideCurrent > 0) {
                prev.classList.remove("disabled");
            }

            if(slideCurrent === slidesLength - 1){
                next.classList.add("disabled");
            }
        }

        // get prev button
        if(target.classList.contains("prev")){

            slideCurrent -= 1;

            prev = e.target,
                next = prev.nextElementSibling,
                prevSlide = slidesArr[slideCurrent + 1],
                slide = slidesArr[slideCurrent];

            prevSlide.classList.remove("text-on");
            slide.classList.remove("slide-on");
            slide.classList.add("text-on");

            if(slideCurrent === slidesLength - 2){
                next.classList.remove("disabled");
            }

            if(slideCurrent === 0){
                prev.classList.add("disabled");
            }

        }

    });

    /**
	 * Newsletter
     */
	//Show input for newsletter
    $('#mail-btn').on('click', function(){
        $('.rs-box').css('transform','translateY(130%)');
        $('.input-box').addClass('isVisible');
    });

    //Cancel input for newsletter
    $('#return').on('click', function(){
        $('.rs-box').css('transform','translateY(0)');
        $('.input-box').removeClass('isVisible');
    });

    //Save mail in Firebase
    $('form').on('keypress', function(e){
        if(e.keyCode == 13)
        {
            let mailInput = document.getElementById('newsletter-mail').value;
            if(validateEmail(mailInput)){
                //Save in Firebase and show success
                let uid = hashCode(mailInput)
                let from = "Mail";
                writeUserBeta(uid, mailInput, from);
                $('.rs-box').html('Bravo vous êtes inscrits à la bêta !');
            }
            return false;
        }
    })
    $('#send-mail').on('click', function(){
        let mailInput = document.getElementById('newsletter-mail').value;
        if(validateEmail(mailInput)){
            //Save in Firebase and show success
            let uid = hashCode(mailInput)
            let from = "Mail";
            writeUserBeta(uid, mailInput, from);
            $('.rs-box').html('Bravo vous êtes inscrits à la bêta !');
            console.log('send');
        }
    })
    hashCode = function(str){
        let hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    /**
	 * Google Firebase Auth
     * @type {firebase.auth.GoogleAuthProvider}
     */
    let provider = new firebase.auth.GoogleAuthProvider();
    function googleSignin() {
        firebase.auth()
            .signInWithPopup(provider).then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;
            //Sign with Google add Beta User in firebase
            let uid = result.user.uid
            let mail = result.user.email;
            let from = "Google";
            writeUserBeta(uid, mail, from);


        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
    }
    $('#google-btn').on('click',function () {
        console.log('Google');
    	//googleSignin();
    })

    /**
	 * Youtube Background video
     */


})(jQuery);