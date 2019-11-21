import $ from 'dom7';

let algoliaClient;
let algoliaIndex;
let searchTimeout;
if (window.algoliasearch) {
  algoliaClient = window.algoliasearch('5CN8U5PK9Z', '335298dc09a81387378e525c7824e262');
  algoliaIndex = algoliaClient.initIndex('f7_docs');
}
function renderSearchResults(hits, clear) {
  const tree = {};
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
    const page = hit._highlightResult.page.value;
    const section = hit._highlightResult.section.value;
    let text = hit._highlightResult.text.value;
    if (text.indexOf('<em') >= 100) {
      text = `...${text.substring(text.indexOf('<em') - 50, text.length)}`;
    }
    // text = text.replace(/\n)/g, '<br>');
    if (!tree[hit.docs]) tree[hit.docs] = {};
    if (!tree[hit.docs][page]) tree[hit.docs][page] = { url: hit.pageUrl };
    if (!tree[hit.docs][page][section]) {
      tree[hit.docs][page][section] = {
        text,
        url: hit.sectionUrl,
      };
    }
  });
  const html = `
  <ul>${Object.keys(tree).map(doc => `
    <li>
      <span>${doc}</span>
      <ul>${Object.keys(tree[doc]).map(page => `
        <li>
          <a href="${tree[doc][page].url}">
            <span>${page}</span>
          </a>
          <ul>${Object.keys(tree[doc][page]).map((section) => {
            if (section === 'url') return '';
            return `
              <li>
                <a href="${tree[doc][page][section].url}">
                  <span>${section}</span>
                  <small>${tree[doc][page][section].text}</small>
                </a>
              </li>`;
            }).join('')}
          </ul>
        </li>`).join('')}
      </ul>
    </li>`).join('')}
  </ul>`;
  $('.docs-nav-searchbar div.search-results').remove();
  $('.docs-nav-searchbar').append(`<div class="search-results">${html}<div class="algolia-logo"></div></div>`);
}
function searchDocs(query) {
  if (!query) {
    renderSearchResults([], true);
    return;
  }
  algoliaIndex.search(
    {
      query,
      attributesToRetrieve: ['docs', 'page', 'section', 'pageUrl', 'sectionUrl', 'text'],
      hitsPerPage: 6,
    },
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      renderSearchResults(results.hits);
    },
  );
}


function initSearch() {
  if (!$('.docs-nav-searchbar').length) return;
  $(document).on('input', '.docs-nav-searchbar input', function onInput(e) {
    const query = e.target.value.trim().toLowerCase();
    clearTimeout(searchTimeout);
    if (!query) {
      $(this).removeClass('with-query');
      renderSearchResults([], true);
      return;
    }
    $(this).addClass('with-query');
    searchTimeout = setTimeout(() => {
      searchDocs(query);
    }, 500);
  });
  $(document).on('click', '.disable-search', function onClick() {
    $(this).prev('input').val('').trigger('input');
  });
}

export default initSearch;
