(function () {

    'use strict';

    console.log('reading js');

    document.querySelector('.close').addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('#overlay').className = "hidden";
    });

    document.addEventListener('keydown', function(event){
        if(event.key === "Escape"){
            document.querySelector('#overlay').className = "hidden";
        }
    });

    // madlib form result and show error when a field is empty

    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');
    const formData = document.querySelectorAll("input[type=text]");
    const error = document.querySelector("#error");

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        processFormData(formData);
    });

    function processFormData(formData){
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for (const eachWord of formData){
            if(eachWord.value){
                words.push(eachWord.value);
            }
            else { 
                emptyfields.push(counter); 
            }
            counter++;
        }

        if (emptyfields.length > 0){
            showErrors(formData, emptyfields);
            document.querySelector('#overlay').className = "hidden";
        }
        else {
            document.querySelector('#overlay').className = "showing";
            makeMadLib(words);
        }

    }

    function makeMadLib(words){
        error.innerHTML = "";
        const myText = `It started raining at noon when I just woke up on the <span class="words">${words[0]}</span>.
                The weather was <span class="words">${words[1]}</span>,
                and the sky looked <span class="words">${words[2]}</span>.
                It made me nostalgic for the <span class="words">${words[3]}</span> that my mom made when I live with her.

                I ended up making myself a bowl of <span class="words">${words[4]}</span>.
                It was delicious and <span class="words">${words[5]}</span> in my mouth.
                I stayed home all day and worked on my assignments for tomorrow.
                It took me <span class="words">${words[6]}</span> hours to finish it.

                The day seemed boring because I had nothing to do.
                I wish the weather would stop <span class="words">${words[7]}</span> 
                so I could hang out with <span class="words">${words[8]}</span>.`;

        madlib.innerHTML = myText;
        
        for(const eachField of formData){
            eachField.value = '';
        }
    }

    function showErrors(formData, emptyfields){
        const errorId = formData[emptyfields[0]].id;
        const errorText = "Please fill out the empty field(s)";
        
        error.innerHTML = errorText;

        document.querySelector(`#${errorId}`).focus();        
    }

})();