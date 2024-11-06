import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCheck, Clipboard } from "lucide-react";

const ColorPicker = () => {
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const [copyed, setCopyed] = useState(false);

  const openEyeDropper = () => {
    if (!(window as any).EyeDropper) {
      setError("Your browser does not support the EyeDropper API");
      return;
    }

    const eyeDropper = new (window as any).EyeDropper();

    eyeDropper
      .open()
      .then((result: any) => {
        setColor(result.sRGBHex);
        setError(""); // Clear any previous error
        setCopyed(false);
      })
      .catch((e: any) => {
        console.error(e);
        setCopyed(false);
        setError("Failed to select color");
        console.error(error,e);
      });
  };

  return (
    <div className="m-1 p-1">
      <Button
        style={{ background: `${color}`, width: "200px" }}
        onClick={openEyeDropper}
      >
        Click Here📌
      </Button>
      <div className="mt-1">
        {color && (
          <Button
            variant="outline"
            style={{ width: "200px" }}
            onClick={() => {
              navigator.clipboard.writeText(color);
              setCopyed(true);
            }}
          >
            <Label className="">👉 {color}</Label>
            { copyed ? 
                <CheckCheck className="ml-4 w-4 h-4" /> :
                <Clipboard className="ml-4 w-4 h-4" /> 
            }
          </Button>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
