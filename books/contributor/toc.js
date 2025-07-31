// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="overview.html"><strong aria-hidden="true">1.</strong> Overview</a></li><li class="chapter-item expanded "><a href="how-to-read-this-book.html"><strong aria-hidden="true">2.</strong> How to Read This Book</a></li><li class="chapter-item expanded "><a href="getting-started/index.html"><strong aria-hidden="true">3.</strong> Getting Started</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="getting-started/setting-up-the-environment.html"><strong aria-hidden="true">3.1.</strong> Setting Up The Environment</a></li><li class="chapter-item expanded "><a href="getting-started/configuring-your-editor.html"><strong aria-hidden="true">3.2.</strong> Configuring Your Editor (Optional)</a></li><li class="chapter-item expanded "><a href="getting-started/testing.html"><strong aria-hidden="true">3.3.</strong> Testing</a></li></ol></li><li class="chapter-item expanded "><a href="project-architecture/index.html"><strong aria-hidden="true">4.</strong> Architecture Overview</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="project-architecture/module.html"><strong aria-hidden="true">4.1.</strong> Modules</a></li><li class="chapter-item expanded "><a href="project-architecture/serialization.html"><strong aria-hidden="true">4.2.</strong> Serialization</a></li><li class="chapter-item expanded "><a href="project-architecture/tensor.html"><strong aria-hidden="true">4.3.</strong> Tensor</a></li><li class="chapter-item expanded "><a href="project-architecture/backend.html"><strong aria-hidden="true">4.4.</strong> Backend</a></li></ol></li><li class="chapter-item expanded "><a href="guides/index.html"><strong aria-hidden="true">5.</strong> Guides for Contributors</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="guides/onnx-to-burn-conversion-tool.html"><strong aria-hidden="true">5.1.</strong> ONNX to Burn: Development Guide</a></li><li class="chapter-item expanded "><a href="guides/adding-a-new-operation-to-burn.html"><strong aria-hidden="true">5.2.</strong> Adding a New Operation to Burn</a></li><li class="chapter-item expanded "><a href="guides/submitting-examples.html"><strong aria-hidden="true">5.3.</strong> Submitting Examples to Burn</a></li></ol></li><li class="chapter-item expanded "><a href="frequently-encountered-issues/index.html"><strong aria-hidden="true">6.</strong> Frequently Encountered Issues</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="frequently-encountered-issues/issues-while-adding-ops.html"><strong aria-hidden="true">6.1.</strong> Issues Related To Adding Operators</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
