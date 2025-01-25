"use client";
import { useRef, useState, useEffect } from "react";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Type, Wand2, Palette, Triangle } from "lucide-react";

import type { MemeGeneratorProps } from "@/lib/types";
import { squidGameVariants, tabVariants } from "@/lib/data";
import MintNft from "@/components/thirdweb/uplaodNft";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function MemeGenerator({ defaultImage }: MemeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(25);
  const [textColor, setTextColor] = useState("#FF0B7A");
  const [textEffect, setTextEffect] = useState("none");
  const [imageFilter, setImageFilter] = useState("none");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [activeTab, setActiveTab] = useState("text");
  const [saved, setSaved] = useState<boolean>(false);
  // const [isDownloading, setIsDownloading] = useState(false);
  // const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Loading image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = defaultImage;
    img.onload = () => setImage(img);
  }, [defaultImage]);

  // Canvas rendering logic
  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = 400;
    const canvasHeight = 400;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const imageAspectRatio = image.width / image.height;
    let imageWidth = canvasWidth;
    let imageHeight = canvasWidth / imageAspectRatio;

    if (imageHeight > canvasHeight) {
      imageHeight = canvasHeight;
      imageWidth = canvasHeight * imageAspectRatio;
    }

    const offsetX = (canvasWidth - imageWidth) / 2;
    const offsetY = (canvasHeight - imageHeight) / 2;

    ctx.filter = imageFilter === "none" ? "none" : `${imageFilter}(100%)`;
    ctx.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
    ctx.filter = "none";

    // Text rendering
    ctx.fillStyle = textColor;
    ctx.strokeStyle = "black";
    ctx.lineWidth = fontSize / 6;
    ctx.font = `bold ${fontSize}px Impact`;
    ctx.textAlign = "center";

    if (textEffect === "shadow") {
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
    }

    // Top text
    if (topText) {
      ctx.strokeText(topText, canvas.width / 2, fontSize + 10);
      ctx.fillText(topText, canvas.width / 2, fontSize + 10);
    }

    // Bottom text
    if (bottomText) {
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    }

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = "bold 11px Arial";
    ctx.fillStyle = "#FF0B7A";
    ctx.fillText("NFToodle", canvas.width - 30, canvas.height - 7.5);
  }, [
    image,
    topText,
    bottomText,
    fontSize,
    textColor,
    textEffect,
    imageFilter,
    backgroundColor,
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageDataUrl = canvas.toDataURL("image/png");

    try {
      const { status } = await axios.post("/api/memes", { imageDataUrl });
      console.log(
        status === 200
          ? "Image uploaded successfully"
          : `Upload failed with status ${status}`
      );
    } catch (error) {
      console.error("Error during image upload:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={squidGameVariants}
      className="gap-8 grid md:grid-cols-[2fr,1fr] bg-[#0A0A0A] p-8 rounded-xl text-white"
    >
      {/* Left Side (Canvas and Actions) */}
      <Card className="border-[#FF0B7A] border-2 bg-[#1A1A1A]">
        <CardContent className="space-y-6 p-6">
          <motion.div
            className="relative bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-lg p-4 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Triangle className="top-2 left-2 absolute w-6 h-6 text-[#FF0B7A]" />
            <Triangle className="right-2 bottom-2 absolute w-6 h-6 text-[#FF0B7A]" />
            <canvas
              ref={canvasRef}
              className="border-neutral-400 mx-auto border max-w-full h-auto"
            />
          </motion.div>
          <div className="flex gap-4">
            <ButtonGroup
              isSaving={isSaving}
              handleSave={handleSave}
              defaultImage={defaultImage}
              saved={saved}
            />
          </div>
        </CardContent>
      </Card>

      {/* Right Side (Tabs & Controls) */}
      <Card className="border-[#FF0B7A] border-2 bg-[#1A1A1A]">
        <CardContent className="space-y-6 p-6">
          <motion.div
            className="space-y-4 bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
            whileHover={{ boxShadow: "0 0 15px rgba(255, 11, 122, 0.3)" }}
          >
            <TextInputGroup
              topText={topText}
              bottomText={bottomText}
              setTopText={setTopText}
              setBottomText={setBottomText}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          </motion.div>

          <Tabs
            defaultValue="text"
            className="text-white"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-[#1F1F1F] w-full font-ibm">
              {["templates", "text", "effects", "background"].map((tab) => (
                <TabTrigger key={tab} tab={tab} activeTab={activeTab}  />
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                {/* Tab Content */}
                <TabsContent value="templates">
                  {/* Templates Tab */}
                  <Card className="border-[#FF0B7A] bg-[#1F1F1F] border">
                    <CardContent className="p-4 text-white">
                      Coming Soon...
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="text">
                  <Card className="border-[#FF0B7A] bg-[#1F1F1F] border">
                    <CardContent className="p-4">
                      <TextControl
                        setTextColor={setTextColor}
                        setTextEffect={setTextEffect}
                        textColor={textColor}
                        textEffect={textEffect}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="effects">
                  <Card className="border-[#FF0B7A] bg-[#1F1F1F] border">
                    <CardContent className="p-4">
                      <ImageFilterControl
                        setImageFilter={setImageFilter}
                        imageFilter={imageFilter}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="background">
                  <Card className="border-[#FF0B7A] bg-[#1F1F1F] border">
                    <CardContent className="p-4">
                      <BackgroundControl
                        setBackgroundColor={setBackgroundColor}
                        backgroundColor={backgroundColor}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Extracted Components (Button Group, Text Input Group, Tab Trigger, etc.)
// const ButtonGroup = ({
//   isSaving,
//   handleSave,
//   saved
//   // defaultImage,
// }: {
//   isSaving: boolean;
//   handleSave: () => void;
//   saved: boolean;
//   defaultImage: string;
// }) => {

//   return (
//     <>
 
//       <Button
//         onClick={handleSave}
//         className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/90 py-3 rounded-full w-full font-bold text-white transform transition-all duration-300 ease-in-out hover:scale-105"
//         disabled={isSaving}
//       >
//         {isSaving ? (
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 1,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "linear",
//             }}
//           >
//             ↻
//           </motion.div>
//         ) : (
//           "Save to Gallery"
//         )}
//       </Button>

//     </>
//   );
// };


const ButtonGroup = ({
  isSaving,
  handleSave,
  saved,
  defaultImage
}: {
  isSaving: boolean;
  handleSave: () => void;
  saved: boolean;
  defaultImage: string;
}) => {
  return (
    <>
      {!saved ? (
        <Button
          onClick={handleSave}
          className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/90 py-3 rounded-full w-full font-bold text-white transform transition-all duration-300 ease-in-out hover:scale-105"
          disabled={isSaving}
        >
          {isSaving ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              ↻
            </motion.div>
          ) : (
            "Save to Gallery"
          )}
        </Button>
      ) : (
        <MintNft image={"someimage"} name={"somename"} description={"somedescription"}/>
      )}
        <MintNft image={"someimage"} name={"somename"} description={"somedescription"}/>

    </>

  );
};


const TextInputGroup = ({
  topText,
  bottomText,
  setTopText,
  setBottomText,
  fontSize,
  setFontSize,
}: {
  topText: string;
  bottomText: string;
  setTopText: (value: string) => void;
  setBottomText: (value: string) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
}) => (
  <div className="space-y-4 font-ibm">
    <Input
      type="text"
      value={topText}
      onChange={(e) => setTopText(e.target.value)}
      className="border-[#FF0B7A] bg-black p-3 border rounded-lg w-full text-white/90 placeholder:text-white/50"
      placeholder="Top Text"
    />
    <Input
      type="text"
      value={bottomText}
      onChange={(e) => setBottomText(e.target.value)}
      className="border-[#FF0B7A] bg-black p-3 border rounded-lg w-full text-white/90 placeholder:text-white/50"
      placeholder="Bottom Text"
    />
    <div className="flex items-center space-x-2">
      <Label className="font-medium text-sm text-white font-ibm">Font Size:</Label>
      <Slider
        value={[fontSize]}
        onValueChange={(value) => setFontSize(value[0])}
        min={20}
        max={80}
        step={2}
        className="flex-grow"
      />
      <span className="font-medium text-sm">{fontSize}px</span>
    </div>
  </div>
);

const TabTrigger = ({ tab, activeTab }: { tab: string; activeTab: string }) => (
  <motion.div
    variants={tabVariants}
    animate={activeTab === tab ? "active" : "inactive"}
    className="flex-1"
  >
    <TabsTrigger
      value={tab}
      className="py-2 rounded-lg w-full transition-all duration-300 ease-in-out"
    >
      {tab === "templates" && <ImagePlus className="mr-2" />}
      {tab === "text" && <Type className="mr-2" />}
      {tab === "effects" && <Wand2 className="mr-2" />}
      {tab === "background" && <Palette className="mr-2" />}
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </TabsTrigger>
  </motion.div>
);

const TextControl = ({
  setTextColor,
  setTextEffect,
  textColor,
  textEffect,
}: {
  setTextColor: (value: string) => void;
  setTextEffect: (value: string) => void;
  textColor: string;
  textEffect: string;
}) => (
  <div className="space-y-4 font-ibm">
    <div className="font-ibm">
      <Label className="block mb-2 text-[#FF0B7A] font-ibm">Text Color</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="border-[#FF0B7A] font-ibm p-1 border rounded w-12 h-12"
        />
        <Input
          type="text"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="flex-grow border-[#FF0B7A] bg-black p-2 border rounded-lg font-ibm text-white"
        />
      </div>
    </div>
    <div>
      <Label className="block mb-2 font-ibm text-[#FF0B7A]" >Text Effect</Label>
      <Select
        value={textEffect}
        onValueChange={(value) => setTextEffect(value)}
      >
        <SelectTrigger className="border-[#FF0B7A] bg-black border w-full text-white">
          <SelectValue placeholder="Select Text Effect" />
        </SelectTrigger>
        <SelectContent className="font-ibm">
          <SelectItem value="none" className="font-ibm" >None</SelectItem>
          <SelectItem value="shadow" className="font-ibm">Shadow</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const ImageFilterControl = ({
  setImageFilter,
  imageFilter,
}: {
  setImageFilter: (value: string) => void;
  imageFilter: string;
}) => (
  <div>
    <Label className="block mb-2 text-[#FF0B7A]">Image Filter</Label>
    <Select
      value={imageFilter}
      onValueChange={(value) => setImageFilter(value)}
    >
      <SelectTrigger className="border-[#FF0B7A] bg-black border w-full text-white">
        <SelectValue placeholder="Select Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        <SelectItem value="grayscale">Grayscale</SelectItem>
        <SelectItem value="sepia">Sepia</SelectItem>
        <SelectItem value="invert">Invert</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

const BackgroundControl = ({
  setBackgroundColor,
  backgroundColor,
}: {
  setBackgroundColor: (value: string) => void;
  backgroundColor: string;
}) => (
  <div className="space-y-4">
    <Label className="block mb-2 text-[#FF0B7A]">Background Color</Label>
    <div className="flex items-center space-x-2">
      <Input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="border-[#FF0B7A] p-1 border rounded w-12 h-12"
      />
      <Input
        type="text"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
        className="flex-grow border-[#FF0B7A] bg-black p-2 border rounded-lg text-white"
      />
    </div>
  </div>
);

