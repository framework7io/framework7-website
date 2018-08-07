;(function(){
  // init search
  var algoliaClient;
  var algoliaIndex;
  var searchTimeout;
  if (window.algoliasearch) {
    algoliaClient = algoliasearch("5CN8U5PK9Z", "335298dc09a81387378e525c7824e262");
    algoliaIndex = algoliaClient.initIndex('f7_docs');
  }
  function renderSearchResults(hits, clear) {
    var tree = {};
    var html = '';
    if (clear) {
      $('.docs-nav-searchbar div.search-results').remove();
      return;
    }
    if (hits.length === 0) {
      $('.docs-nav-searchbar div.search-results').remove();
      $('.docs-nav-searchbar').append('<div class="search-results no-search-results">No results found<div class="algolia-logo"></div></div>');
      return;
    }
    hits.forEach((hit) => {
      var page = hit._highlightResult.page.value;
      var section = hit._highlightResult.section.value;
      var text = hit._highlightResult.text.value;
      if (text.indexOf('<em') >= 100) {
        text = '...' + text.substring(text.indexOf('<em') - 50, text.length);
      }
      // text = text.replace(/\n)/g, '<br>');
      if (!tree[hit.docs]) tree[hit.docs] = {};
      if (!tree[hit.docs][page]) tree[hit.docs][page] = { url: hit.pageUrl };
      if (!tree[hit.docs][page][section]) tree[hit.docs][page][section] = {
        text: text,
        url: hit.sectionUrl,
      };
    });
    var html = '<ul>' + Object.keys(tree).map(function (doc) {
      return '<li><span>' + doc + '</span><ul>' + Object.keys(tree[doc]).map(function (page) {
        return '<li><a href="' + tree[doc][page].url + '"><span>' + page + '</span></a><ul>' + Object.keys(tree[doc][page]).map(function (section) {
          if (section === 'url') return '';
          return '<li><a href="' + tree[doc][page][section].url + '"><span>' + section + '</span><small>'+tree[doc][page][section].text+'</small></a></li>';
        }).join('') + '</ul></li>'
      }).join('') + '</ul></li>'
    }).join('') + '</ul>'
    $('.docs-nav-searchbar div.search-results').remove();
    $('.docs-nav-searchbar').append('<div class="search-results">' + html + '<div class="algolia-logo"></div></div>');
  }
  function searchDocs(query) {
    if (!query) {
      renderSearchResults([], true);
      return;
    }
    algoliaIndex.search(
      {
        query: query,
        attributesToRetrieve: ['docs', 'page', 'section', 'pageUrl', 'sectionUrl', 'text'],
        hitsPerPage: 6,
      },
      function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
        renderSearchResults(results.hits)
      }
    )
  }
  $(document).on('input', '.docs-nav-searchbar input', function (e) {
    var query = e.target.value.trim().toLowerCase();
    clearTimeout(searchTimeout);
    if (!query) {
      $(this).removeClass('with-query');
      renderSearchResults([], true);
      return;
    }
    $(this).addClass('with-query');
    searchTimeout = setTimeout(function () {
      searchDocs(query);
    }, 500);
  });
  $(document).on('click', '.disable-search', function () {
    $(this).prev('input').val('').trigger('input');
  });

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

  // Showcase
  $('.showcase-apps .app-icon').click(function () {
    var appHtml = $(this).parents('.app').html();
    $('body').append('<div class="showcase-app-preview-backdrop"></div>')
    $('body').append('<div class="showcase-app-preview"><span class="showcase-app-preview-close"></span>' + appHtml.replace('<h4>', '<h3>').replace('</h4>', '</h3>') + '</div>')
    $('body').css('overflow', 'hidden');
  });
  $(document).on('click', '.showcase-app-preview-close, .showcase-app-preview-backdrop', function () {
    $('.showcase-app-preview, .showcase-app-preview-backdrop').remove();
    $('body').css('overflow', '');
  });
  $(document).on('click', '.app-show-shots a', function(e) {
    e.preventDefault();
    $(this).parent().hide().parents('.showcase-app-preview').find('.app-shots').show().find('img').each(function () {
      $(this).attr('src', $(this).attr('data-src'));
    });
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
