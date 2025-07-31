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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="overview.html"><strong aria-hidden="true">1.</strong> Overview</a></li><li class="chapter-item expanded "><a href="motivation.html"><strong aria-hidden="true">2.</strong> Why Burn?</a></li><li class="chapter-item expanded "><a href="getting-started.html"><strong aria-hidden="true">3.</strong> Getting started</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="examples.html"><strong aria-hidden="true">3.1.</strong> Examples</a></li></ol></li><li class="chapter-item expanded "><a href="basic-workflow/index.html"><strong aria-hidden="true">4.</strong> Basic Workflow: From Training to Inference</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="basic-workflow/model.html"><strong aria-hidden="true">4.1.</strong> Model</a></li><li class="chapter-item expanded "><a href="basic-workflow/data.html"><strong aria-hidden="true">4.2.</strong> Data</a></li><li class="chapter-item expanded "><a href="basic-workflow/training.html"><strong aria-hidden="true">4.3.</strong> Training</a></li><li class="chapter-item expanded "><a href="basic-workflow/backend.html"><strong aria-hidden="true">4.4.</strong> Backend</a></li><li class="chapter-item expanded "><a href="basic-workflow/inference.html"><strong aria-hidden="true">4.5.</strong> Inference</a></li><li class="chapter-item expanded "><a href="basic-workflow/conclusion.html"><strong aria-hidden="true">4.6.</strong> Conclusion</a></li></ol></li><li class="chapter-item expanded "><a href="building-blocks/index.html"><strong aria-hidden="true">5.</strong> Building Blocks</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="building-blocks/backend.html"><strong aria-hidden="true">5.1.</strong> Backend</a></li><li class="chapter-item expanded "><a href="building-blocks/tensor.html"><strong aria-hidden="true">5.2.</strong> Tensor</a></li><li class="chapter-item expanded "><a href="building-blocks/autodiff.html"><strong aria-hidden="true">5.3.</strong> Autodiff</a></li><li class="chapter-item expanded "><a href="building-blocks/module.html"><strong aria-hidden="true">5.4.</strong> Module</a></li><li class="chapter-item expanded "><a href="building-blocks/learner.html"><strong aria-hidden="true">5.5.</strong> Learner</a></li><li class="chapter-item expanded "><a href="building-blocks/metric.html"><strong aria-hidden="true">5.6.</strong> Metric</a></li><li class="chapter-item expanded "><a href="building-blocks/config.html"><strong aria-hidden="true">5.7.</strong> Config</a></li><li class="chapter-item expanded "><a href="building-blocks/record.html"><strong aria-hidden="true">5.8.</strong> Record</a></li><li class="chapter-item expanded "><a href="building-blocks/dataset.html"><strong aria-hidden="true">5.9.</strong> Dataset</a></li></ol></li><li class="chapter-item expanded "><a href="custom-training-loop.html"><strong aria-hidden="true">6.</strong> Custom Training Loop</a></li><li class="chapter-item expanded "><a href="saving-and-loading.html"><strong aria-hidden="true">7.</strong> Saving &amp; Loading Models</a></li><li class="chapter-item expanded "><a href="import/index.html"><strong aria-hidden="true">8.</strong> Import Models</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="import/onnx-model.html"><strong aria-hidden="true">8.1.</strong> ONNX Model</a></li><li class="chapter-item expanded "><a href="import/pytorch-model.html"><strong aria-hidden="true">8.2.</strong> PyTorch Model</a></li><li class="chapter-item expanded "><a href="import/safetensors-model.html"><strong aria-hidden="true">8.3.</strong> Safetensors Model</a></li></ol></li><li class="chapter-item expanded "><a href="models-and-pretrained-weights.html"><strong aria-hidden="true">9.</strong> Models &amp; Pre-Trained Weights</a></li><li class="chapter-item expanded "><a href="quantization.html"><strong aria-hidden="true">10.</strong> Quantization (Beta)</a></li><li class="chapter-item expanded "><a href="advanced/index.html"><strong aria-hidden="true">11.</strong> Advanced</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="advanced/backend-extension/index.html"><strong aria-hidden="true">11.1.</strong> Backend Extension</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="advanced/backend-extension/custom-cubecl-kernel.html"><strong aria-hidden="true">11.1.1.</strong> Custom cubecl Kernel</a></li><li class="chapter-item expanded "><a href="advanced/backend-extension/custom-wgpu-kernel.html"><strong aria-hidden="true">11.1.2.</strong> Custom WGPU Kernel</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.2.</strong> Custom Optimizer</div></li><li class="chapter-item expanded "><a href="advanced/web-assembly.html"><strong aria-hidden="true">11.3.</strong> WebAssembly</a></li><li class="chapter-item expanded "><a href="advanced/no-std.html"><strong aria-hidden="true">11.4.</strong> No-Std</a></li></ol></li></ol>';
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
