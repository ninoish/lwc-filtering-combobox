import { api, LightningElement, track } from "lwc";

export default class FilteringCombobox extends LightningElement {
  _options = [];
  @api
  get options() {
    return this._options;
  }
  set options(v) {
    this._options = v;
    this.filteredOptions = this._options;
  }
  @track filteredOptions = [];
  @api label = "";
  @api placeholder = "";
  @api variant = "";
  @api required;
  @api
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = v;
    this.inputValue = this.options.find((o) => o.value === v)?.label ?? "";
    this.filterOptions();
  }
  _disabled = false;
  @api
  get disabled() {
    return this._disabled;
  }
  set disabled(v) {
    this._disabled = v;
  }
  @api isPrefixMatch = false;
  @api allowUnoptionedInput = false;

  // { label, alias, value }
  inputValue = "";
  shouldShowOptions = false;
  hideTimeout = null;

  handleInputChange(e) {
    e.stopPropagation();
    const v = e.detail.value;
    this.inputValue = v;

    if (this.inputValue.length === 0) {
      this.filteredOptions = this.options;
      return;
    }

    this.filterOptions();
  }

  filterOptions() {
    if (this.isPrefixMatch) {
      this.filteredOptions = this.options.filter((o) => {
        return (
          o.label.toUpperCase().startsWith(this.inputValue.toUpperCase()) ||
          o.alias?.toUpperCase().startsWith(this.inputValue.toUpperCase())
        );
      });
    } else {
      this.filteredOptions = this.options.filter((o) => {
        return (
          o.label.toUpperCase().indexOf(this.inputValue.toUpperCase()) > -1 ||
          o.alias?.toUpperCase().indexOf(this.inputValue.toUpperCase()) > -1
        );
      });
    }
  }

  handleOptionClick(e) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.shouldShowOptions = false;
    const ov = e.currentTarget.dataset.optionValue;
    // eslint-disable-next-line @lwc/lwc/no-api-reassignments
    this.value =
      this.filteredOptions.find((fo) => fo.value === ov)?.value ?? "";

    this.filterOptions();

    // eslint-disable-next-line @lwc/lwc/no-async-operation
    requestAnimationFrame(() => {
      this.template.querySelector("lightning-input").reportValidity();
    });

    // emit custom event
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value ?? null
      })
    );
  }

  handleInputFocus() {
    this.shouldShowOptions = true;
  }
  handleInputBlur(e) {
    e.preventDefault();
    this.template.querySelector("lightning-input").reportValidity();

    if (this.inputValue?.length > 0) {
      const selectedOption = this.filteredOptions.find(
        (o) => o.label === this.inputValue
      );
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: selectedOption?.value ?? ""
        })
      );
    }
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.hideTimeout = setTimeout(() => {
      this.shouldShowOptions = false;
    }, 301);
  }

  get fcOptionsClass() {
    return `fc-options slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click ${
      this.shouldShowOptions ? "slds-is-open" : ""
    }`;
  }
}
