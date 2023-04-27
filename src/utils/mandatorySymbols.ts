export function mandatorySymbols(text: string) {
  const amount = text.split("").filter(ch => ch === "*").length > 1;
  const label = text.split(" ").filter(w => !w.match(/^[*,#]/)).length === 0;

  return {
    amount: amount ? "manyAmount" : "",
    label: label ? "labelRequired" : "",
  };
}
