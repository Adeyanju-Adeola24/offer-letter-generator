import { formDataStore } from '../store'
import type { FormData } from '../types'

export class Preview {
  private el: HTMLElement
  private unsub: (() => void) | null = null

  constructor(container: HTMLElement) {
    this.el = container
    this.render()
    this.bind()
  }

  private render() {
    this.el.innerHTML = `
      <section class="py-14 sm:py-20 bg-gray-50" id="preview">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 no-print">
            <div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">Preview</h2>
              <p class="text-sm text-gray-500 mt-1">Review your offer letter before exporting</p>
            </div>
            <div class="flex gap-2 sm:gap-3">
              <button id="download-pdf-btn"
                class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-blue-200 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="hidden sm:inline">Download</span> PDF
              </button>
              <button id="print-btn"
                class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 border border-gray-200 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
            </div>
          </div>

          <!-- A4 Document -->
          <div class="offer-letter-paper bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div id="offer-letter-content" class="px-8 sm:px-12 md:px-16 py-10 sm:py-12 md:py-14">
              ${this.renderLetterContent(formDataStore.getState())}
            </div>
          </div>
        </div>
      </section>
    `
  }

  private renderLetterContent(data: FormData): string {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    })

    const hasSalary = data.basicSalary || data.hra || data.specialAllowance

    return `
      <!-- Letterhead -->
      <div class="text-center mb-10 pb-6 border-b-2 border-blue-600/80">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto mb-3 shadow-sm">
          <span class="text-white font-bold text-2xl tracking-tight">${this.initials(data.companyName) || 'C'}</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 font-serif">${this.val(data.companyName, 'YOUR COMPANY NAME')}</h1>
        <p class="text-sm text-gray-500 mt-1 font-light">
          ${this.val(data.companyAddress, 'Company Address')}${data.companyCity ? ',' : ''}
          ${this.val(data.companyCity, '')}${data.companyState ? ' - ' : ''}${this.val(data.companyState, '')}
          ${data.companyPincode ? ' - ' + data.companyPincode : ''}
        </p>
      </div>

      <!-- Title -->
      <h2 class="text-xl font-bold text-center text-gray-900 mb-8 font-serif tracking-wide">OFFER LETTER</h2>

      <!-- Meta -->
      <div class="text-sm text-gray-600 mb-6 space-y-1">
        <p>Date: <span class="font-medium text-gray-800">${today}</span></p>
        <p>Ref: <span class="font-medium text-gray-800">OL-${today.split(' ').join('').replace(/,/g, '')}-${this.val(data.candidateName, 'XXXX').substring(0, 4).toUpperCase()}</span></p>
      </div>

      <div class="border-t border-gray-100 pt-6">
        <!-- Subject -->
        <p class="text-sm text-gray-600 mb-1">Subject: <span class="font-medium text-gray-800">Offer of Employment — ${this.val(data.position, 'Position')}</span></p>

        <hr class="my-5 border-gray-100" />

        <!-- Salutation -->
        <p class="text-gray-800 mb-5">
          Dear <span class="font-semibold">${this.val(data.candidateName, 'Candidate Name')}</span>,
        </p>

        <!-- Body -->
        <div class="text-gray-700 leading-relaxed space-y-4 text-[15px]">
          <p>
            We are delighted to offer you the position of
            <strong class="text-gray-900">${this.val(data.position, 'Position')}</strong>
            in the <strong class="text-gray-900">${this.val(data.department, 'Department')}</strong> department
            at <strong class="text-gray-900">${this.val(data.companyName, 'Company')}</strong>.
            We were impressed with your background and are confident that your skills will be a valuable asset to our team.
          </p>

          <p>
            Your expected date of joining will be
            <strong class="text-gray-900">${this.val(data.joiningDate, '[Joining Date]')}</strong>.
            This is a <strong class="text-gray-900">${data.employmentType}</strong> position
            with a <strong class="text-gray-900">${data.workMode}</strong> work arrangement,
            based in <strong class="text-gray-900">${this.val(data.workLocation, '[Location]')}</strong>.
          </p>

          <!-- Compensation Table -->
          ${data.ctc ? `
            <div class="my-6">
              <p class="font-semibold text-gray-900 mb-2">Compensation Package (Annual):</p>
              <div class="overflow-hidden rounded-lg border border-gray-200">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="bg-gray-50">
                      <th class="px-4 py-2.5 text-left font-medium text-gray-600 text-xs uppercase tracking-wider">Component</th>
                      <th class="px-4 py-2.5 text-right font-medium text-gray-600 text-xs uppercase tracking-wider">Amount (₹/Year)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    ${data.basicSalary ? `<tr><td class="px-4 py-2 text-gray-600">Basic Salary</td><td class="px-4 py-2 text-right font-medium text-gray-800">${Number(data.basicSalary).toLocaleString('en-IN')}</td></tr>` : ''}
                    ${data.hra ? `<tr><td class="px-4 py-2 text-gray-600">House Rent Allowance (HRA)</td><td class="px-4 py-2 text-right font-medium text-gray-800">${Number(data.hra).toLocaleString('en-IN')}</td></tr>` : ''}
                    ${data.specialAllowance ? `<tr><td class="px-4 py-2 text-gray-600">Special Allowance</td><td class="px-4 py-2 text-right font-medium text-gray-800">${Number(data.specialAllowance).toLocaleString('en-IN')}</td></tr>` : ''}
                    <tr class="bg-blue-50/70 font-semibold">
                      <td class="px-4 py-2.5 text-gray-900">Total Annual CTC</td>
                      <td class="px-4 py-2.5 text-right text-blue-700">₹${Number(data.ctc).toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <p>
            You will be on a probation period of
            <strong class="text-gray-900">${this.val(data.probationPeriod, 'Probation Period')}</strong>. During this period,
            your employment may be terminated by either party with a notice period of
            <strong class="text-gray-900">${this.val(data.noticePeriod, 'Notice Period')}</strong>.
          </p>

          <p>
            This offer is valid for <strong class="text-gray-900">${this.val(data.offerValidity, 'Offer Validity')}</strong>
            from the date of this letter. Kindly sign and return this letter to confirm your acceptance.
          </p>

          <p>
            We look forward to welcoming you to
            <strong class="text-gray-900">${this.val(data.companyName, 'Company')}</strong>
            and are excited about the contributions you will bring to our organization.
          </p>
        </div>
      </div>

      <!-- Signatures -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <p class="text-xs text-gray-500 mb-6 uppercase tracking-wider">For ${this.val(data.companyName, 'Company')}</p>
            <div class="space-y-1">
              <p class="font-semibold text-gray-900">${this.val(data.managerName, 'Manager Name')}</p>
              <p class="text-sm text-gray-500">${this.val(data.managerTitle, 'Manager Title')}</p>
            </div>
            <div class="mt-6 pt-5 border-t border-dashed border-gray-200 max-w-[200px]">
              <p class="text-xs text-gray-400">Authorized Signature</p>
            </div>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-6 uppercase tracking-wider">Accepted By</p>
            <div class="space-y-1">
              <p class="font-semibold text-gray-900">${this.val(data.candidateName, 'Candidate Name')}</p>
            </div>
            <div class="mt-6 pt-5 border-t border-dashed border-gray-200 max-w-[200px]">
              <p class="text-xs text-gray-400">Signature & Date</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-10 pt-6 text-center text-[11px] text-gray-400 border-t border-gray-100">
        <p>This is a computer-generated document issued by ${this.val(data.companyName, 'Company')}. No signature is required for digital copies.</p>
      </div>
    `
  }

  private initials(name: string): string {
    return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || ''
  }

  private val(value: string, fallback: string): string {
    return value.trim() || fallback
  }

  private bind() {
    this.unsub = formDataStore.subscribe(() => {
      const data = formDataStore.getState()
      const contentEl = document.getElementById('offer-letter-content')
      if (contentEl) {
        contentEl.innerHTML = this.renderLetterContent(data)
      }
    })

    document.getElementById('download-pdf-btn')?.addEventListener('click', () => window.print())
    document.getElementById('print-btn')?.addEventListener('click', () => window.print())
  }

  destroy() {
    if (this.unsub) this.unsub()
  }
}
