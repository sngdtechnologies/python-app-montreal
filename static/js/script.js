//Bouton de menu
MX._('.mx-nav__aside-icon').on('click', (e) => {
    MX._('.mx-nav__menu').toggle('d-none');
    let menuIconI = MX._('.mx-nav__aside-icon').findElement('i');
    if (menuIconI.findClass('fa-times')) {
        menuIconI.removeClass('fa-times');
        menuIconI.addClass('fa-align-justify');
    } else {
        menuIconI.removeClass('fa-align-justify');
        menuIconI.addClass('fa-times');
    }
});

//Mouse Over to Calendar
MX._('.mx-box').each((d) => {
    MX._(d).on("mouseover", (e) => {
        d.style.border = '20px solid rgb(240, 78, 36)';
        let blocCDate = d.querySelector(".mx-box__date");
        blocCDate.style.backgroundColor = 'rgb(240, 78, 36)';
    });
    MX._(d).on("mouseout", (e) => {
        d.style.border = '20px solid #e6131e';
        let blocCDate = d.querySelector(".mx-box__date");
        blocCDate.style.backgroundColor = 'rgb(247, 149, 154)';
    });
});


console.log('Voir', MX._('.voir').textContent().val());