export class Header {
  private el: HTMLElement

  constructor(container: HTMLElement) {
    this.el = container
    this.render()
  }

  private render() {
    this.el.innerHTML = `
      <header class="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/80">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 sm:h-18">
            <a href="#" class="flex items-center gap-2.5 group">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 flex items-center justify-center shadow-sm ring-1 ring-black/5 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                <span class="text-white font-bold text-lg tracking-tight">C</span>
              </div>
              <div class="hidden sm:flex items-baseline gap-1.5">
                <span class="font-semibold text-gray-900 text-[15px]">Cehpoint</span>
                <span class="text-blue-600 font-semibold text-[15px]">Offer Letter</span>
              </div>
            </a>

            <nav class="flex items-center gap-1">
              <a href="#form" class="px-3.5 py-2 text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-all duration-200 hidden sm:block">Create</a>
              <a href="#preview" class="px-3.5 py-2 text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50/60 rounded-lg transition-all duration-200 hidden sm:block">Preview</a>
              <a href="https://cehpoint.co.in" target="_blank" rel="noopener"
                class="ml-2 sm:ml-3 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.97] transition-all duration-200 shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-300">
                cehpoint.co.in
              </a>
            </nav>
          </div>
        </div>
      </header>
    `
  }

  destroy() {}
}
