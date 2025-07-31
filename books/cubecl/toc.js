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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="overview.html"><strong aria-hidden="true">1.</strong> Overview</a></li><li class="chapter-item expanded "><a href="motivation.html"><strong aria-hidden="true">2.</strong> Why CubeCL</a></li><li class="chapter-item expanded "><a href="getting-started/summary.html"><strong aria-hidden="true">3.</strong> Getting Started</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="getting-started/installation.html"><strong aria-hidden="true">3.1.</strong> Installation</a></li><li class="chapter-item expanded "><a href="getting-started/simple_reduction.html"><strong aria-hidden="true">3.2.</strong> Simple Reduction</a></li><li class="chapter-item expanded "><a href="getting-started/benchmark.html"><strong aria-hidden="true">3.3.</strong> Benchmark</a></li><li class="chapter-item expanded "><a href="getting-started/parallel_reduction.html"><strong aria-hidden="true">3.4.</strong> Parallel Reduction</a></li><li class="chapter-item expanded "><a href="getting-started/vectorized_reduction.html"><strong aria-hidden="true">3.5.</strong> Vectorized Reduction</a></li><li class="chapter-item expanded "><a href="getting-started/parallel_reduction_3d.html"><strong aria-hidden="true">3.6.</strong> Parallel Reduction 3D</a></li><li class="chapter-item expanded "><a href="getting-started/examples.html"><strong aria-hidden="true">3.7.</strong> Examples</a></li></ol></li><li class="chapter-item expanded "><a href="core-features/summary.html"><strong aria-hidden="true">4.</strong> Core Features</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="core-features/comptime.html"><strong aria-hidden="true">4.1.</strong> Comptime</a></li><li class="chapter-item expanded "><a href="core-features/vectorization.html"><strong aria-hidden="true">4.2.</strong> Vectorization</a></li><li class="chapter-item expanded "><a href="core-features/autotune.html"><strong aria-hidden="true">4.3.</strong> Autotune</a></li><li class="chapter-item expanded "><a href="core-features/features.html"><strong aria-hidden="true">4.4.</strong> Hardware Features</a></li></ol></li><li class="chapter-item expanded "><a href="language-support/summary.html"><strong aria-hidden="true">5.</strong> Language Support</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="language-support/trait.html"><strong aria-hidden="true">5.1.</strong> Trait</a></li><li class="chapter-item expanded "><a href="language-support/enum.html"><strong aria-hidden="true">5.2.</strong> Enum</a></li><li class="chapter-item expanded "><a href="language-support/struct.html"><strong aria-hidden="true">5.3.</strong> Struct</a></li></ol></li><li class="chapter-item expanded "><a href="advanced-usage/summary.html"><strong aria-hidden="true">6.</strong> Advanced Usage</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="advanced-usage/config.html"><strong aria-hidden="true">6.1.</strong> Configuration</a></li></ol></li><li class="chapter-item expanded "><a href="algorithms/summary.html"><strong aria-hidden="true">7.</strong> Algorithm reference</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="algorithms/quantized_matmul.html"><strong aria-hidden="true">7.1.</strong> Quantized matrix multiplication</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.2.</strong> Pseudo Random Number Generator</div></li></ol></li></ol>';
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
