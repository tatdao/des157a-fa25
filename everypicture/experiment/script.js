window.addEventListener('load', function(){
    'use strict';

    console.log('reading js');

    const articles = document.querySelectorAll('article');
    const sections = document.querySelectorAll('section');

    for (let i = 0; i < articles.length; i++) {
        articles[i].className = "hidden";

        // link each section to its matching article by index
        sections[i].addEventListener('mouseover', function(){
            articles[i].className = "showing";
        });

        sections[i].addEventListener('mouseout', function(){
            articles[i].className = "hidden";
        });
    }
    
});