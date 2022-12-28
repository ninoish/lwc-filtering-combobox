import { LightningElement } from "lwc";
export default class TestFilteringInput extends LightningElement {
  selectedValue = "cat";

  isRequired = false;
  isDisabled = false;

  get options() {
    return [
      {
        label: "Cat",
        alias: "meowmeow",
        value: "cat"
      },
      {
        label: "Dog",
        alias: "bowwow",
        value: "dog"
      },
      {
        label: "Camel",
        value: "camel"
      },
      {
        label: "Elephant",
        alias: "trumpet",
        value: "elephant"
      }
    ];
  }

  handleValueChange(e) {
    console.log(e.detail);
    this.selectedValue = e.detail;
  }
}
