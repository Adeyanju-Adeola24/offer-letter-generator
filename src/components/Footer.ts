export class Footer {
  private el: HTMLElement

  constructor(container: HTMLElement) {
    this.el = container
    this.render()
  }

  private render() {
    this.el.innerHTML = `
      <footer class="bg-gray-900 text-gray-400">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <!-- Brand -->
            <div class="sm:col-span-2 lg:col-span-1">
              <div class="flex items-center gap-2.5 mb-4">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <span class="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <span class="font-semibold text-white text-[15px]">Cehpoint</span>
                  <span class="text-blue-400 font-semibold text-[15px]">Offer Letter</span>
                </div>
              </div>
              <p class="text-sm leading-relaxed text-gray-500 max-w-xs">
                Professional offer letter generator for modern HR teams. Create, preview, and export offer letters instantly — 100% free.
              </p>
            </div>

            <!-- Product -->
            <div>
              <h3 class="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Product</h3>
              <ul class="space-y-2.5">
                <li><a href="#form" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Generator</a></li>
                <li><a href="#preview" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Preview</a></li>
                <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Templates</a></li>
                <li><a href="#" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>

            <!-- Company -->
            <div>
              <h3 class="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Company</h3>
              <ul class="space-y-2.5">
                <li><a href="https://cehpoint.co.in" target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="https://services.cehpoint.co.in/careers/" target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="https://cehpoint.co.in" target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Services</a></li>
                <li><a href="https://cehpoint.co.in/contact" target="_blank" rel="noopener" class="text-sm text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h3 class="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Contact</h3>
              <ul class="space-y-2.5 text-sm text-gray-400">
                <li>Birbhum, West Bengal, India</li>
                <li><a href="mailto:support@cehpoint.com" class="hover:text-white transition-colors duration-200">support@cehpoint.com</a></li>
                <li><a href="https://cehpoint.co.in" target="_blank" rel="noopener" class="hover:text-white transition-colors duration-200">cehpoint.co.in</a></li>
              </ul>
            </div>
          </div>

          <div class="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
            <p>&copy; ${new Date().getFullYear()} Cehpoint IT Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `
  }

  destroy() {}
}
