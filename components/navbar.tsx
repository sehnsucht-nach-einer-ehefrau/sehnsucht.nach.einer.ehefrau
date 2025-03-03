import { Title } from "@/components/ui/title";
import { ButtonContainer } from "@/components/ui/button-container";

interface NavbarProps {
  activeIndex: number;
  onSelectionChange: (index: number) => void;
}

export default function Navbar({
  activeIndex,
  onSelectionChange,
}: NavbarProps) {
  return (
    <div className="flex justify-center bg-transparent">
      <div className="flex-col justify-center bg-transparent">
        <Title props="Sehnsucht.nach.einer.ehefrau" />
        <div className="mt-4 bg-transparent">
          <div className="motion-preset-slide-down bg-transparent">
            <ButtonContainer
              props={["Projects", "Knowledge", "Home", "Contact", "Resume"]}
              selectedIndex={activeIndex}
              onSelectionChange={onSelectionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
