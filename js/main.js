window.onload = (function(){
    //Select DOM Items
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuNav = document.querySelector('.menu-nav');
    const menuBranding = document.querySelector('.menu-branding');

    const navItems = document.querySelectorAll('.nav-item');

    //set initial state of menu
    let showMenu = false;
    let currentLink = document.querySelector(`a[href="${window.location.hash == ""?"/": window.location.hash}"]`);
    currentLink.classList.add('current');

    menuBtn.addEventListener('click', toggleMenu);

    function toggleMenu(){
        if(!showMenu){
            menuBtn.classList.add('close');
            menu.classList.add('show');
            menuNav.classList.add('show');
            menuBranding.classList.add('show');
            navItems.forEach(function(item){
                item.classList.add('show');
            });
            showMenu = true;
    } else {
            menuBtn.classList.remove('close');
            menu.classList.remove('show');
            menuNav.classList.remove('show');
            menuBranding.classList.remove('show');
            navItems.forEach(function(item){
                item.classList.remove('show');
            });
            showMenu = false;
        }
    }

    navItems.forEach(function(item){
        item.addEventListener('click', handleMenu);
    });

    function handleMenu(event){
        currentLink.classList.remove('current');
        event.target.classList.add('current');
        currentLink = event.target;
        toggleMenu();
    }
})();

