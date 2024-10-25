$(document).ready(function(){
    // Preloader
    $("#preloader").animate({
        'opacity': '0'
    }, 600, function(){
        setTimeout(function(){
            $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
    });


    function handleScroll() {
        // Get the scroll position of the right-content
        var scrollPosition = $(window).scrollTop();
        // Check the scroll position
        if (scrollPosition > 300) {
            $('.back-to-top').fadeIn('slow'); // Show button
        } else {
            $('.back-to-top').fadeOut('slow'); // Hide button
        }
    }

    // Function to scroll to the top of the .right-content
    function scrollToTop() {
        $('html, body, .layout').animate({ scrollTop: 0 }, 1500); // Scroll the .right-content to the top
        return false;
    }

    $(window).on('scroll', handleScroll);
    


    // Bind click event to .back-to-top button
    $('.back-to-top').on('click touchstart', scrollToTop);





    // Function for Latest News 
    const $newsContainer = $('#news-container');
    const $newsItems = $newsContainer.find('.news-item');
    const slideInterval = 7000;
    const animationDuration = 600;
    const itemHeight = $newsItems.first().outerHeight(true);

    function slideNews() {
        $newsContainer.animate(
            { marginTop: `-${itemHeight}px` },
            animationDuration,
            function() {
                $newsContainer.find('.news-item:first').appendTo($newsContainer);
                $newsContainer.css('marginTop', '0');
            }
        );
    }

    setInterval(slideNews, slideInterval);


    function adjustTopPositions() {
        var headerHeight = $('header').outerHeight(); // Get the height of the header
    
        $('#main-content').css({
            'top': headerHeight + 'px', // Set the top position of the main content
            'transition': 'top 0.4s ease' // Smooth transition for the adjustment
        });
    
        $('#off-canvas-menu').css({
            'top': headerHeight + 'px', // Set the top position of the off-canvas menu
            'transition': 'top 0.4s ease' // Smooth transition for the adjustment
        });
    }

    adjustTopPositions();

    $(window).resize(function() {
        adjustTopPositions();
    });
    

    // Menu Toggler
    const $menuToggle = $('#menu-toggle');
    const $offCanvasMenu = $('#off-canvas-menu');
    const $mainContent = $('#main-content');

    $menuToggle.on('click', function() {
        // Toggle the hamburger to "X"
        $(this).toggleClass('collapsed');
        $offCanvasMenu.toggleClass('active');
        $mainContent.toggleClass('shifted');
        
        // Update the aria-expanded attribute
        let expanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !expanded);
    });

    // Blitz carousel
    $(".blitz-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        nav: false,
        dots: false,
        dotsData: false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });

    $('.consent').change(function() {
        $('.subscribe_btn').prop('disabled', !$(this).is(':checked'));
    });

    $('.consent1').change(function() {
        $('.subscribe_btn1').prop('disabled', !$(this).is(':checked'));
    });


    $('.btn-info').on('click', function() {
        $('.trivia-answer').removeClass('d-none');
    });



    // Featured Higglights Pagination Js
    loadPage(1);

    function loadPage(page) {
        $.ajax({
            url: `/load-highlights?page=${page}`,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                renderVideos(data.videos);
                renderPagination(data.total_pages, page);
            }
        });
    }

    function renderVideos(videos) {
        const $videoGrid = $('#video-grid');
        $videoGrid.empty();
        $.each(videos, function(index, video) {
            const videoItem = `
                <div class="col-md-3 mb-4">
                    <div class="card">
                        <img src="${video.thumbnail}" class="card-img-top" alt="Video Thumbnail">
                        <div class="card-body">
                            <h5 class="card-title">${video.title}</h5>
                            <p class="card-text">${video.description}</p>
                        </div>
                    </div>
                </div>
            `;
            $videoGrid.append(videoItem);
        });
    }

    function renderPagination(totalPages, currentPage) {
        const $pagination = $('#pagination');
        $pagination.empty();

        for (let page = 1; page <= totalPages; page++) {
            const activeClass = page === currentPage ? 'active' : '';
            const pageItem = `
                <li class="page-item ${activeClass}">
                    <a class="page-link" href="#" data-page="${page}">${page}</a>
                </li>
            `;
            $pagination.append(pageItem);
        }

        $('.page-link').on('click', function(e) {
            e.preventDefault();
            const selectedPage = parseInt($(this).data('page'));
            loadPage(selectedPage);
        });
    }


    // function fetchJSONData() {
    //     fetch("https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League")
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error
    //                     (`HTTP error! Status: ${res.status}`);
    //             }
    //             return res.json();
    //         })
    //         .then((data) => 
    //               console.log(data))
    //         .catch((error) => 
    //                console.error("Unable to fetch data:", error));
    // }
    // fetchJSONData();





});