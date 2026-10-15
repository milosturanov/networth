import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import { Currency } from "@/lib/types";

type CurrencyComboboxProps = {
  currencies: Currency[];
  onValueChange: (value: string | null) => void;
};

export default function CurrencyCombobox({
  currencies,
  onValueChange,
}: CurrencyComboboxProps) {
  return (
    <Combobox items={currencies} onValueChange={onValueChange}>
      <ComboboxInput placeholder="Choose currency of account" />
      <ComboboxContent>
        <ComboboxEmpty>No Currency was found.</ComboboxEmpty>
        <ComboboxList>
          {currencies.map((item) => {
            return (
              <ComboboxItem key={item.id} value={item.id}>
                {item.id}
              </ComboboxItem>
            );
          })}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
