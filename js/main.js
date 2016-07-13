;(function(){
    function handleLazyScroll() {
        var st = $(window).scrollTop();
        $('img.lazy').each(function(){
            var img = $(this);
            if (img.attr('src')) return;
            if (img.offset().top < $(window).height() + st) {
                img.attr('src', img.data('src'));
            }
        });
    }
    if ($('img.lazy').length > 0) {
        $(window).scroll(function(){
            handleLazyScroll();
        });
    }

    $('.theme-switch a').click(function (e) {
        if ($(this).hasClass('active')) {
            return;
        }
        e.preventDefault();
        var url = $(this).attr('href');
        $('header .phone iframe').attr('src', url);
        $('.theme-switch a').toggleClass('active');
        $('header .phone').toggleClass('phone-android');
        $('header .phone .fullscreen').attr('href', url);
    });

    $('.home-killer .tab-links a').click(function (e) {
        e.preventDefault();
        var index = $(this).index();
        $('.home-killer .active').removeClass('active');
        $('.home-killer video').each(function () {
            this.pause();
        });
        var newVideo = $('.home-killer .tab').eq(index).addClass('active').find('video');
        if (!Modernizr.touch) newVideo[0].play();
        $('.home-killer .tab-links a').eq(index).addClass('active');
    });

    if (window.hljs) {
        hljs.configure({tabReplace: '    '});
        hljs.initHighlightingOnLoad();
    }

    if ($('.docs-content').length > 0) {
        $('.docs-content').find('h2, h3').each(function () {
            var h = $(this);
            if (!h.attr('id')) {
                var id = h.text().trim()
                .replace(/\ /g, '-')
                .replace(/\//g, '-')
                .replace(/"/g, '')
                .replace(/'/g, '-')
                .replace(/:/g, '')
                .replace(/,/g, '')
                .replace(/\./g, '')
                .toLowerCase().replace(/\-&-/g,'-');
                h.attr('id', id);
            }
            if (h.attr('id')) {
                h.click(function(){
                    document.location.hash = h.attr('id');
                    // var url = document.location.origin + document.location.pathname + '#' + h.attr('id');
                    // prompt('Copy url to clipboard', url);
                });
            }
        });
    }

    function handleDocsNavToggle() {
        var st = $(window).scrollTop();
        var top = $(window).height() / 2 + st - $('.docs-nav').offset().top - 25;
        if (top < 5) top = 5;
        $('.toggle-docs-nav').css({
            transform: 'translateY(' + top + 'px)'
        });
    }
    if ($('.docs-nav').length > 0) {
        var loc = document.location.href;
        if (loc.indexOf('?') >= 0) loc = loc.split('?')[0];
        if (loc.indexOf('/') >= 0) {
            loc = loc.split('/');
            loc = loc[loc.length - 1];
        }

        $('.docs-nav a').each(function () {
            var link = $(this).attr('href');
            if (loc == link && link != '#') {
                $(this).addClass('active').parent('li').addClass('active');
            }
        });

        if ($('.toggle-docs-nav').length > 0) {
            $('.toggle-docs-nav').click(function (e) {
                e.preventDefault();
                $('.docs-nav').toggleClass('collapsed');
                $(this).toggleClass('expand');
            });

            $(window).on('resize scroll', handleDocsNavToggle);
            handleDocsNavToggle();
            $('.toggle-docs-nav').css({opacity:1});
        }
    }
    // Docs scroll spy
    var demoDevicePreviewLink;
    function handleDeviceScroll() {
        var st = $(window).scrollTop();
        var firstPreviewPosition = $('[data-device-preview]:first').offset().top;
        var device = $('.docs-demo-device:not(.docs-inline-device)');
        var deviceStartOffset = device.parent().offset().top;
        var devicePosition = st - deviceStartOffset;
        if(devicePosition < firstPreviewPosition - deviceStartOffset) {
            devicePosition = firstPreviewPosition -  deviceStartOffset;
        }
        if (devicePosition + device.outerHeight() > device.parent().outerHeight()) {
            devicePosition = device.parent().outerHeight() - device.outerHeight();
        }
        if ($('.stop-scroll-device').length > 0) {
            var stopPosition = $('.stop-scroll-device').offset().top;
            if (devicePosition + device.outerHeight() > stopPosition - deviceStartOffset) {
                devicePosition = stopPosition - device.outerHeight() - deviceStartOffset;
            }
        }
        device.css({top: devicePosition});
        var newPreviewLink;
        $('[data-device-preview]').each(function(){
            var link = $(this);
            if (link.offset().top < st + $(window).height()/2 - 200) {
                newPreviewLink = link.attr('data-device-preview');
            }
        });
        if (!newPreviewLink) newPreviewLink = $('[data-device-preview]:first').attr('data-device-preview');
        if (newPreviewLink !== demoDevicePreviewLink) {
            demoDevicePreviewLink = newPreviewLink;
            device.find('.fade-overlay').addClass('visible');
            device.find('iframe')[0].onload = function() {
                setTimeout(function () {
                    device.find('.fade-overlay').removeClass('visible');
                }, 100);    
            };
            device.find('iframe').attr('src', newPreviewLink);
        }
    }
    if ($('.docs-content.with-device').length > 0) {
        $(window).resize(function(){
            handleDeviceScroll();
        });
        $(window).scroll(function(){
            handleDeviceScroll();
        });
        $(window).trigger('resize');
    }


    $('.app-show-shots a').click(function(e) {
        e.preventDefault();
        $(this).parent().hide().parents('.app').find('.app-shots').show();
    });

    $('.app-launcher span').click(function () {
        var iframe = $(this).parents('.device').find('iframe');
        iframe.attr('src', iframe.data('src'));
        $(this).parents('.app-launcher').remove();
    });

    // GH Stars/Forks
    function fetchGitStats(local) {
        if (local) {
            if (localStorage.getItem('f7-git-stats-stars')) {
                $('.gh-stars span').html(localStorage.getItem('f7-git-stats-stars'));
            }
            if (localStorage.getItem('f7-git-stats-forks')) {
                $('.gh-forks span').html(localStorage.getItem('f7-git-stats-forks'));
            }
            return;
        }
        $.ajax({
            dataType: 'jsonp',
            url: 'https://api.github.com/repos/nolimits4web/framework7',
            success: function(data){
                console.log(data);
                if (data) {
                    localStorage.setItem('f7-git-stats-date', new Date().getTime());
                    if(data.data.stargazers_count){
                        var stars = data.data.stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        localStorage.setItem('f7-git-stats-stars', stars);
                        $('.gh-stars span').html(stars);
                    }
                    if(data.data.forks){
                        var forks = data.data.forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        localStorage.setItem('f7-git-stats-forks', forks);
                        $('.gh-forks span').html(forks);
                    }
                }
            }
        });
    }
    var gitStatsDate = localStorage.getItem('f7-git-stats-date');
    if (gitStatsDate && (new Date().getTime() - gitStatsDate * 1) < 1000 * 60 * 60) {
        fetchGitStats(true);
    }
    else {
        fetchGitStats();
    }

    // FB
    $('body').prepend('<div id="fb-root"></div>');
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=129338113911206";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // TW
    (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}})(document, 'script', 'twitter-wjs');
    // G+
    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/platform.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
})();
