import { formDataStore, showPreviewStore } from '../store.js';
import { Header } from './Header.js';
import { Form } from './Form.js';
import { Preview } from './Preview.js';
import { Footer } from './Footer.js';
export class App {
    constructor(root) {
        this.header = null;
        this.form = null;
        this.preview = null;
        this.footer = null;
        this.root = root;
        this.render();
        this.initComponents();
        this.bind();
    }
    render() {
        this.root.innerHTML = `
      <div class="min-h-screen bg-gray-50">
        <div id="header-root"></div>

        <main class="pt-16 sm:pt-18">
          <!-- Hero -->
          <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950">
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
            <div class="absolute top-0 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

            <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
              <div class="text-center max-w-4xl mx-auto animate-fade-up">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-blue-200 text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-white/10 shadow-inner">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Free · No signup · 100% private
                </div>

                <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
                  Generate Professional
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300">
                    Offer Letters
                  </span>
                  Instantly
                </h1>

                <p class="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto leading-relaxed font-light">
                  Create polished, ready-to-send job offer letters in minutes.
                  No signup. No data leaves your browser.
                </p>

                <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <a href="#form"
                    class="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 text-sm sm:text-base">
                    <span>Create Offer Letter</span>
                    <svg class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                  <a href="#" id="view-sample-btn"
                    class="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 active:scale-[0.98] transition-all duration-200 border border-white/20 backdrop-blur-sm text-sm sm:text-base">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Sample
                  </a>
                </div>

                <div class="mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto">
                  ${this.stat('100%', 'Free')}
                  ${this.stat('No', 'Signup')}
                  ${this.stat('Client', 'Side')}
                </div>
              </div>
            </div>
            <div class="h-8 sm:h-16 bg-gray-50 rounded-t-[2rem] sm:rounded-t-[3rem]"></div>
          </section>

          <!-- Features -->
          <section class="py-14 sm:py-20 bg-gray-50">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center mb-10 sm:mb-14">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Everything You Need</h2>
                <p class="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">A modern tool for modern HR teams</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                ${this.featureCard('file-text', 'Professional Templates', 'Industry-standard offer letter format with proper structure and legal phrasing.')}
                ${this.featureCard('lock', '100% Private', 'All processing happens in your browser. Zero data uploaded. Complete privacy.')}
                ${this.featureCard('zap', 'Real-Time Preview', 'See your offer letter update live as you type. No refresh needed.')}
                ${this.featureCard('smartphone', 'Fully Responsive', 'Works perfectly on every device — desktop, tablet, and mobile.')}
                ${this.featureCard('sparkles', 'Clean Design', 'Modern, professional layout that makes a great impression on candidates.')}
                ${this.featureCard('printer', 'Export to PDF', 'Download as PDF or print directly. Ready to send or sign.')}
              </div>
            </div>
          </section>

          <!-- How It Works -->
          <section class="py-14 sm:py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center mb-10 sm:mb-14">
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">How It Works</h2>
                <p class="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">Three simple steps to a professional offer letter</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                ${this.stepCard('01', 'Fill Details', 'Enter company info, candidate details, job position, and compensation.')}
                ${this.stepCard('02', 'Preview', 'Review the live preview as it updates instantly with your inputs.')}
                ${this.stepCard('03', 'Download', 'Export as a print-ready PDF or share directly with the candidate.')}
              </div>
            </div>
          </section>

          <div id="form-root"></div>
          <div id="preview-root" class="hidden"></div>
        </main>

        <div id="footer-root"></div>
      </div>
    `;
    }
    stat(value, label) {
        return `
      <div class="text-center">
        <div class="text-xl sm:text-2xl font-bold text-white">${value}</div>
        <div class="text-xs sm:text-sm text-blue-200/60 mt-0.5 sm:mt-1 font-medium">${label}</div>
      </div>
    `;
    }
    featureCard(icon, title, desc) {
        const icons = {
            'file-text': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
            'lock': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />',
            'zap': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />',
            'smartphone': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />',
            'sparkles': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />',
            'printer': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />',
        };
        return `
      <div class="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
        <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-100 transition-colors duration-300">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${icons[icon]}
          </svg>
        </div>
        <h3 class="font-semibold text-gray-900 text-sm sm:text-base mb-1">${title}</h3>
        <p class="text-xs sm:text-sm text-gray-500 leading-relaxed">${desc}</p>
      </div>
    `;
    }
    stepCard(num, title, desc) {
        return `
      <div class="relative text-center p-6 sm:p-8">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-md">
          <span class="text-white font-bold text-base sm:text-lg">${num}</span>
        </div>
        <h3 class="font-semibold text-gray-900 text-base sm:text-lg mb-1.5">${title}</h3>
        <p class="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">${desc}</p>
      </div>
    `;
    }
    initComponents() {
        const headerRoot = document.getElementById('header-root');
        const formRoot = document.getElementById('form-root');
        const previewRoot = document.getElementById('preview-root');
        const footerRoot = document.getElementById('footer-root');
        if (headerRoot)
            this.header = new Header(headerRoot);
        if (formRoot)
            this.form = new Form(formRoot);
        if (previewRoot)
            this.preview = new Preview(previewRoot);
        if (footerRoot)
            this.footer = new Footer(footerRoot);
    }
    loadSample() {
        const sample = {
            companyName: 'Cehpoint IT Services',
            companyAddress: '123 Tech Park, Sector V',
            companyCity: 'Kolkata',
            companyState: 'West Bengal',
            companyPincode: '700091',
            candidateName: 'Priya Sharma',
            candidateAddress: '456 Lake View Apartments, Salt Lake',
            position: 'Senior Software Engineer',
            department: 'Engineering',
            joiningDate: '2026-07-15',
            employmentType: 'Full-Time',
            workMode: 'Remote',
            workLocation: 'Kolkata, India',
            ctc: '850000',
            basicSalary: '425000',
            hra: '170000',
            specialAllowance: '255000',
            probationPeriod: '6 Months',
            noticePeriod: '30 Days',
            offerValidity: '7 Days',
            managerName: 'Arun Kumar',
            managerTitle: 'VP of Engineering',
        };
        formDataStore.setState(sample);
        this.syncAllForms();
        showPreviewStore.setState(true);
    }
    syncAllForms() {
        const data = formDataStore.getState();
        document.querySelectorAll('.form-input').forEach(input => {
            const el = input;
            const key = el.name;
            if (key in data) {
                el.value = data[key];
            }
        });
    }
    bind() {
        document.getElementById('view-sample-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.loadSample();
        });
        showPreviewStore.subscribe(() => {
            const show = showPreviewStore.getState();
            const previewSection = document.getElementById('preview-root');
            if (previewSection) {
                if (show) {
                    previewSection.classList.remove('hidden');
                    previewSection.classList.add('animate-fade-in');
                    setTimeout(() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                }
            }
        });
    }
    destroy() {
        this.header?.destroy();
        this.form?.destroy();
        this.preview?.destroy();
        this.footer?.destroy();
    }
}
//# sourceMappingURL=App.js.map