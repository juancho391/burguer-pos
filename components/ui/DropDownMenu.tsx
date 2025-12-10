import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { DropDownMenuItems } from "@/types/dropDownMenuItems";
import { Key } from "react";

function DropDownMenu({
  items,
  onSelect,
}: {
  items: DropDownMenuItems[];
  onSelect: (key: Key) => void;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" className="rounded-full border">
          Agregar producto
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => onSelect(key)}
      >
        {items.map((item) => {
          return <DropdownItem key={item.key}>{item.label}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default DropDownMenu;
