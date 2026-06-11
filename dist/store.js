export class Store {
    constructor(initial) {
        this.listeners = new Set();
        this.state = initial;
    }
    getState() {
        return this.state;
    }
    setState(partial) {
        this.state = { ...this.state, ...partial };
        this.notify();
    }
    subscribe(fn) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    }
    notify() {
        this.listeners.forEach(fn => fn());
    }
}
export const defaultFormData = {
    companyName: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyPincode: '',
    candidateName: '',
    candidateAddress: '',
    position: '',
    department: '',
    joiningDate: '',
    employmentType: 'Full-Time',
    workMode: 'Remote',
    workLocation: '',
    ctc: '',
    basicSalary: '',
    hra: '',
    specialAllowance: '',
    probationPeriod: '6 Months',
    noticePeriod: '30 Days',
    offerValidity: '7 Days',
    managerName: '',
    managerTitle: '',
};
export const formDataStore = new Store(defaultFormData);
export const errorsStore = new Store({});
export const activeSectionStore = new Store('company');
export const showPreviewStore = new Store(false);
export function validateForm(data) {
    const errors = {};
    if (!data.companyName.trim())
        errors.companyName = 'Company name is required';
    if (!data.companyAddress.trim())
        errors.companyAddress = 'Company address is required';
    if (!data.companyCity.trim())
        errors.companyCity = 'City is required';
    if (!data.companyState.trim())
        errors.companyState = 'State is required';
    if (!data.companyPincode.trim())
        errors.companyPincode = 'Pincode is required';
    if (!data.candidateName.trim())
        errors.candidateName = 'Candidate name is required';
    if (!data.position.trim())
        errors.position = 'Position is required';
    if (!data.department.trim())
        errors.department = 'Department is required';
    if (!data.joiningDate.trim())
        errors.joiningDate = 'Joining date is required';
    if (!data.workLocation.trim())
        errors.workLocation = 'Work location is required';
    if (!data.ctc.trim())
        errors.ctc = 'CTC is required';
    if (!data.managerName.trim())
        errors.managerName = 'Manager name is required';
    if (!data.managerTitle.trim())
        errors.managerTitle = 'Manager title is required';
    errorsStore.setState(errors);
    return Object.keys(errors).length === 0;
}
export function resetForm() {
    formDataStore.setState(defaultFormData);
    errorsStore.setState({});
    showPreviewStore.setState(false);
    activeSectionStore.setState('company');
}
//# sourceMappingURL=store.js.map