import { Button } from "@/components/button";
import { ButtonContainer } from "@/components/ui/button-container";
import { Title } from "@/components/ui/title";

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="flex-col justify-center">
        <Title props="Sehnsucht.nach.einer.ehefrau" />
        <div className="mt-4">
          <div className="motion-preset-slide-down">
            <ButtonContainer
              props={["Projects", "Knowledge", "Home", "Contact", "Resume"]}
              selectedIndex={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
