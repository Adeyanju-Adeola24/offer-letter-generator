import { formDataStore, errorsStore, showPreviewStore, validateForm, resetForm } from '../store.js';
const SECTIONS = [
    { id: 'company', label: 'Company', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'candidate', label: 'Candidate', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'job', label: 'Position', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'compensation', label: 'Compensation', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'terms', label: 'Terms', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
];
export class Form {
    constructor(container) {
        this.unsubs = [];
        this.currentSection = 0;
        this.sectionFields = {
            company: ['companyName', 'companyAddress', 'companyCity', 'companyState', 'companyPincode'],
            candidate: ['candidateName', 'candidateAddress'],
            job: ['position', 'department', 'joiningDate', 'employmentType', 'workMode', 'workLocation'],
            compensation: ['ctc', 'basicSalary', 'hra', 'specialAllowance'],
            terms: ['probationPeriod', 'noticePeriod', 'offerValidity', 'managerName', 'managerTitle'],
        };
        this.el = container;
        this.render();
        this.bind();
    }
    render() {
        this.el.innerHTML = `
      <section class="py-14 sm:py-20 bg-gray-50" id="form">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 sm:mb-10">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Offer Letter Details</h2>
            <p class="text-gray-500 mt-2 text-sm sm:text-base">Fill in the details to generate a professional offer letter</p>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Progress Bar -->
            <div class="px-6 sm:px-8 pt-6 sm:pt-8">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs sm:text-sm font-medium text-gray-500">Section <span id="section-current">1</span> of ${SECTIONS.length}</span>
                <span class="text-xs sm:text-sm font-medium text-blue-600"><span id="section-label">${SECTIONS[0].label}</span></span>
              </div>
              <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div id="progress-bar" class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out" style="width: ${(100 / SECTIONS.length)}%"></div>
              </div>
            </div>

            <!-- Section Tabs -->
            <div class="px-6 sm:px-8 pt-5 pb-2 overflow-x-auto">
              <div class="flex gap-2 min-w-max sm:min-w-0" id="section-tabs">
                ${SECTIONS.map((s, i) => `
                  <button class="section-tab flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${i === 0 ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}"
                    data-section="${s.id}" data-index="${i}">
                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${s.icon}" />
                    </svg>
                    <span class="hidden sm:inline">${s.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Form -->
            <form id="offer-form" novalidate>
              <div class="px-6 sm:px-8 py-5 sm:py-6">
                ${this.renderCompanySection()}
                ${this.renderCandidateSection()}
                ${this.renderJobSection()}
                ${this.renderCompensationSection()}
                ${this.renderTermsSection()}

                <!-- Navigation -->
                <div class="flex items-center justify-between pt-6 sm:pt-8 mt-6 border-t border-gray-100">
                  <button type="button" id="prev-btn"
                    class="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 border border-gray-200 opacity-0 pointer-events-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <div class="flex gap-3">
                    <button type="button" id="next-btn"
                      class="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-blue-200">
                      Next
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <button type="submit" id="submit-btn"
                      class="hidden inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-blue-200 text-sm">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Generate Offer Letter
                    </button>

                    <button type="button" id="reset-btn"
                      class="px-4 py-2.5 text-sm font-medium text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 border border-gray-200">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
        this.syncForm();
    }
    field(id, label, type, placeholder) {
        return `
      <div class="form-group">
        <label for="${id}" class="block text-sm font-medium text-gray-700 mb-1.5">${label}</label>
        <input type="${type}" id="${id}" name="${id}" placeholder="${placeholder}"
          class="block w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400
            focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-blue-50/30
            transition-all duration-200 text-sm outline-none" />
        <p class="error-text hidden text-red-500 text-xs mt-1.5 font-medium" id="${id}-error"></p>
      </div>
    `;
    }
    selectField(id, label, options) {
        return `
      <div class="form-group">
        <label for="${id}" class="block text-sm font-medium text-gray-700 mb-1.5">${label}</label>
        <select id="${id}" name="${id}"
          class="block w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-white text-gray-900
            focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-blue-50/30
            transition-all duration-200 text-sm outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDEuNTlMNiA1LjE3IDEwLjU5LjU5IDEyIDJsLTYgNi02LTZ6IiBmaWxsPSIjOUPBM0FGIi8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] pr-10">
          ${options.map((o, i) => `<option value="${o}"${i === 0 ? ' selected' : ''}>${o}</option>`).join('')}
        </select>
      </div>
    `;
    }
    sectionHeader(icon, title, desc) {
        return `
      <div class="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-gray-100">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center flex-shrink-0 ring-1 ring-blue-100/50">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="${icon}" />
          </svg>
        </div>
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900">${title}</h3>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">${desc}</p>
        </div>
      </div>
    `;
    }
    renderCompanySection() {
        return `
      <div class="section-content" data-section="company">
        ${this.sectionHeader('M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', 'Company Information', 'Tell us about your organization')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${this.field('companyName', 'Company Name', 'text', 'Acme Corp')}
          ${this.field('companyAddress', 'Company Address', 'text', '123 Business Park')}
          ${this.field('companyCity', 'City', 'text', 'Mumbai')}
          ${this.field('companyState', 'State', 'text', 'Maharashtra')}
          ${this.field('companyPincode', 'Pincode', 'text', '400001')}
        </div>
      </div>
    `;
    }
    renderCandidateSection() {
        return `
      <div class="section-content hidden" data-section="candidate">
        ${this.sectionHeader('M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', 'Candidate Information', 'Details about the new hire')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${this.field('candidateName', 'Full Name', 'text', 'John Doe')}
          ${this.field('candidateAddress', 'Address', 'text', '456 Park Avenue')}
        </div>
      </div>
    `;
    }
    renderJobSection() {
        return `
      <div class="section-content hidden" data-section="job">
        ${this.sectionHeader('M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 'Position Details', 'Define the role and work arrangement')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${this.field('position', 'Designation', 'text', 'Software Engineer')}
          ${this.field('department', 'Department', 'text', 'Engineering')}
          ${this.field('joiningDate', 'Expected Joining Date', 'date', '')}
          ${this.selectField('employmentType', 'Employment Type', ['Full-Time', 'Part-Time', 'Contract', 'Internship'])}
          ${this.selectField('workMode', 'Work Mode', ['Remote', 'Office', 'Hybrid'])}
          ${this.field('workLocation', 'Work Location', 'text', 'Bangalore, India')}
        </div>
      </div>
    `;
    }
    renderCompensationSection() {
        return `
      <div class="section-content hidden" data-section="compensation">
        ${this.sectionHeader('M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', 'Compensation', 'Salary structure and benefits')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${this.field('ctc', 'Annual CTC (₹)', 'text', '6,00,000')}
          ${this.field('basicSalary', 'Basic Salary (₹)', 'text', '3,00,000')}
          ${this.field('hra', 'HRA (₹)', 'text', '1,20,000')}
          ${this.field('specialAllowance', 'Special Allowance (₹)', 'text', '1,80,000')}
        </div>
      </div>
    `;
    }
    renderTermsSection() {
        return `
      <div class="section-content hidden" data-section="terms">
        ${this.sectionHeader('M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'Terms & Conditions', 'Employment terms and signing authority')}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${this.field('probationPeriod', 'Probation Period', 'text', '6 Months')}
          ${this.field('noticePeriod', 'Notice Period', 'text', '30 Days')}
          ${this.field('offerValidity', 'Offer Validity', 'text', '7 Days')}
          ${this.field('managerName', 'Hiring Manager', 'text', 'Jane Smith')}
          ${this.field('managerTitle', 'Manager Title', 'text', 'HR Manager')}
        </div>
      </div>
    `;
    }
    bind() {
        const form = this.el.querySelector('#offer-form');
        const tabs = this.el.querySelectorAll('.section-tab');
        const nextBtn = this.el.querySelector('#next-btn');
        const prevBtn = this.el.querySelector('#prev-btn');
        const submitBtn = this.el.querySelector('#submit-btn');
        const resetBtn = this.el.querySelector('#reset-btn');
        const progressBar = this.el.querySelector('#progress-bar');
        const sectionCurrent = this.el.querySelector('#section-current');
        const sectionLabel = this.el.querySelector('#section-label');
        const showSection = (index) => {
            this.currentSection = index;
            const section = SECTIONS[index];
            tabs.forEach(t => {
                const i = parseInt(t.dataset.index || '0');
                if (i === index) {
                    t.classList.remove('bg-gray-50', 'text-gray-500', 'hover:bg-gray-100');
                    t.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'shadow-blue-200');
                }
                else {
                    t.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'shadow-blue-200');
                    t.classList.add('bg-gray-50', 'text-gray-500', 'hover:bg-gray-100');
                }
            });
            this.el.querySelectorAll('.section-content').forEach(c => {
                c.classList.toggle('hidden', c.getAttribute('data-section') !== section.id);
                if (c.getAttribute('data-section') === section.id) {
                    c.classList.add('animate-slide-up');
                }
            });
            const pct = ((index + 1) / SECTIONS.length) * 100;
            progressBar.style.width = `${pct}%`;
            sectionCurrent.textContent = `${index + 1}`;
            sectionLabel.textContent = section.label;
            prevBtn.classList.toggle('opacity-0', index === 0);
            prevBtn.classList.toggle('pointer-events-none', index === 0);
            nextBtn.classList.toggle('hidden', index === SECTIONS.length - 1);
            submitBtn.classList.toggle('hidden', index !== SECTIONS.length - 1);
        };
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                showSection(parseInt(tab.dataset.index || '0'));
            });
        });
        nextBtn.addEventListener('click', () => {
            if (this.currentSection < SECTIONS.length - 1) {
                showSection(this.currentSection + 1);
            }
        });
        prevBtn.addEventListener('click', () => {
            if (this.currentSection > 0) {
                showSection(this.currentSection - 1);
            }
        });
        const inputs = this.el.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const el = input;
                formDataStore.setState({ [el.name]: el.value });
                const errorEl = document.getElementById(`${el.name}-error`);
                if (errorEl) {
                    errorEl.classList.add('hidden');
                    el.classList.remove('border-red-500', 'focus:border-red-500');
                }
            });
            input.addEventListener('change', () => {
                const el = input;
                formDataStore.setState({ [el.name]: el.value });
            });
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = formDataStore.getState();
            if (validateForm(data)) {
                showPreviewStore.setState(true);
            }
            else {
                this.showErrors();
                const firstError = this.el.querySelector('.border-red-500');
                if (firstError) {
                    const section = firstError.closest('.section-content');
                    if (section) {
                        const idx = SECTIONS.findIndex(s => s.id === section.getAttribute('data-section'));
                        if (idx >= 0)
                            showSection(idx);
                    }
                }
            }
        });
        resetBtn.addEventListener('click', () => {
            resetForm();
            this.syncForm();
            this.clearErrors();
            showSection(0);
        });
        this.unsubs.push(errorsStore.subscribe(() => this.showErrors()));
    }
    showErrors() {
        const errors = errorsStore.getState();
        Object.entries(errors).forEach(([key, msg]) => {
            const input = this.el.querySelector(`[name="${key}"]`);
            const errorEl = document.getElementById(`${key}-error`);
            if (input && errorEl) {
                input.classList.add('border-red-500');
                errorEl.textContent = msg;
                errorEl.classList.remove('hidden');
            }
        });
    }
    clearErrors() {
        this.el.querySelectorAll('.error-text').forEach(el => {
            el.classList.add('hidden');
            el.textContent = '';
        });
        this.el.querySelectorAll('.form-input').forEach(el => {
            el.classList.remove('border-red-500');
        });
    }
    syncForm() {
        const data = formDataStore.getState();
        this.el.querySelectorAll('.form-input').forEach(input => {
            const el = input;
            const key = el.name;
            if (key in data) {
                el.value = data[key];
            }
        });
    }
    destroy() {
        this.unsubs.forEach(fn => fn());
    }
}
//# sourceMappingURL=Form.js.map