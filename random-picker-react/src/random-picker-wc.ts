import r2wc from "@r2wc/react-to-web-component";
import RandomPicker from "./components/RandomPicker";

// configure properties exposed on the custom element
const RandomPickerWC = r2wc(RandomPicker, {
  props: {
    items: "json",
    title: "string",
    onResult: "function",
  },
});

// define the custom element
customElements.define(
  "random-picker",
  RandomPickerWC as unknown as CustomElementConstructor
);

// NOTE: r2wc provides a `connectedCallback` that passes element props; you can also attach events there.
