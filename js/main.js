;(function(){
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

  // Clickable titles
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
        .replace(/\+/g, '')
        .replace(/---/g, '-')
        .replace(/--/g, '-')
        .toLowerCase().replace(/\-&-/g,'-');
        h.attr('id', id);
      }
      if (h.attr('id')) {
        h.click(function(){
          document.location.hash = h.attr('id');
        });
      }
    });
  }

  // Index
  function buildDocsIndex() {
    var indexHtml = '';
    var hasNested = false;
    var headings = $('.docs-content').find('h2, h3');
    headings.each(function (index, el) {
      var tag = el.nodeName.toLowerCase();
      if (tag === 'h3' && !hasNested) {
        indexHtml += '<ul>';
        hasNested = true;
      }
      if (tag === 'h2' && hasNested) {
        indexHtml += '</ul>';
        hasNested = false;
      }
      indexHtml += '<li><a href="#' + $(this).attr('id') + '">' + $(this).text().replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</a></li>'
      if (hasNested && index === headings.length - 1) {
        indexHtml += '</ul>';
      }
    });
    $('.docs-index').html(indexHtml);
  }
  if ($('.docs-index').length > 0) {
    buildDocsIndex();
  }

  if ($('.docs-nav').length > 0) {
    var loc = document.location.href;
    if (loc.indexOf('?') >= 0) loc = loc.split('?')[0];
    if (loc.indexOf('#') >= 0) loc = loc.split('#')[0];
    if (loc.indexOf('/') >= 0) {
      loc = loc.split('/');
      loc = loc[loc.length - 1];
    }

    $('.docs-nav a').each(function () {
      var link = $(this).attr('href');
      if (loc === link && link != '#') {
        $(this).addClass('active').parent('li').addClass('active');
      }
    });
    $('.docs-nav-toggle').click(function (e) {
      $('.docs-nav').toggleClass('docs-nav-visible');
    });
  }
  // Docs scroll spy
  var demoDevicePreviewLink;
  function handleDeviceScroll() {
    var st = $(window).scrollTop();
    var firstPreviewPosition = $('[data-device-preview]:first').offset().top;
    var device = $('.docs-demo-device:not(.docs-inline-device)');
    device.addClass('visible');
    var deviceStartOffset = device.parent().offset().top;
    var devicePosition = st - deviceStartOffset;
    if(devicePosition < firstPreviewPosition - deviceStartOffset) {
      devicePosition = firstPreviewPosition -  deviceStartOffset;
    }
    if (devicePosition + device.outerHeight() > device.parent().outerHeight()) {
      devicePosition = device.parent().outerHeight() - device.outerHeight();
    }
    var stopPosition;
    if ($('.stop-scroll-device').length > 0) {
      stopPosition = $('.stop-scroll-device').offset().top;
    } else {
      stopPosition = $('.docs-content .with-device').offset().top + $('.docs-content .with-device').outerHeight();
    }
    if (stopPosition) {
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
      var onLoadTriggerd;
      device.find('iframe')[0].onload = function() {
        onLoadTriggerd = true;
        setTimeout(function () {
          device.find('.fade-overlay').removeClass('visible');
        }, 0);
      };
      setTimeout(function () {
        if (!onLoadTriggerd) {
          device.find('.fade-overlay').removeClass('visible');
        }
      }, 1000);
      device.find('iframe').attr('src', newPreviewLink);
    }
  }
  if ($('.docs-content .with-device').length > 0) {
    $(window).resize(function(){
      handleDeviceScroll();
    });
    $(window).scroll(function(){
      handleDeviceScroll();
    });
    handleDeviceScroll();
  }
  if ($('.docs-demo-device').length > 0) {
    $('.docs-demo-device-buttons a').on('click', function (e) {
      e.preventDefault();
      var a = $(this);
      if (a.hasClass('active')) return;
      a.parent().find('.active').removeClass('active');
      a.addClass('active');
      var device = a.parents('.docs-demo-device');
      var theme = a.attr('data-theme');
      var src = device.find('iframe').attr('src');
      device.find('.fade-overlay').addClass('visible');
      device
        .removeClass('docs-demo-device-ios docs-demo-device-android')
        .addClass('docs-demo-device-' + (theme === 'md' ? 'android' : 'ios'));
      device.find('iframe').attr('src', src.split('?')[0] + '?theme=' + theme);
      setTimeout(function () {
        device.find('.fade-overlay').removeClass('visible');
      }, 1000);
    });
  }

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
      url: 'https://api.github.com/repos/framework7io/framework7',
      success: function(data){
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

  // Carbon
  function testAdBlock() {
    var adBlockEnabled = false;
    var testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    window.setTimeout(function() {
      if (testAd.offsetHeight === 0) {
        adBlockEnabled = true;
      }
      testAd.remove();
      if (adBlockEnabled) {
        $('.carbon').append('<div class="carbon-placeholder">Support Framework7 development by disabling AdBlock for this website</div>');
      }
    }, 0);
  }
  testAdBlock();
  })();
