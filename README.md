# LWC Filtering Combobox (Select Input)

LWC Component that filters options with input value while works like combobox (select input)

https://user-images.githubusercontent.com/5856192/209766215-eaa0785e-2e7c-413a-9758-cc05ce54e07a.mov

## How to use


```
<c-filtering-combobox
  label="Your favorite animal"
  options={options}
  onchange={handleValueChange}
  required={isRequired}
  disabled={isDisabled}
  value={selectedValue}
></c-filtering-combobox>
```

### @apis
- label
- options : Array of objects. The format is `[{ label: "required", alias: "optional", value: "required"}]`
  - label : Displayed on UI
  - alias : Not displayed but reacts to the input value for filtering.
  - value : Return value
- variant
- placeholder
- required
- disabled
- isPrefixMatch

### event
- onchange : `event.detail` contains a value of the selected option.
