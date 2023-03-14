export default function initDocsSearch() {
  const el = document.querySelector('.nav-searchbar');
  if (!el) return;
  window.docsearch({
    appId: 'YB5TAATZXA',
    apiKey: 'a9134905fd5c74ffaff32d328b22c5c9',
    indexName: 'framework7',
    container: '.nav-searchbar',
    debug: false, // Set debug to true if you want to inspect the modal
  });
}
