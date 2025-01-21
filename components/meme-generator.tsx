// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Slider } from "@/components/ui/slider";
// import { ImagePlus, Type, Wand2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface MemeGeneratorProps {
//   defaultImage: string;
// }

// export function MemeGenerator({ defaultImage }: MemeGeneratorProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [topText, setTopText] = useState("TOP TEXT");
//   const [bottomText, setBottomText] = useState("BOTTOM TEXT");
//   const [fontSize, setFontSize] = useState(25);
//   const [image, setImage] = useState<HTMLImageElement | null>(null);
//   const [textColor, setTextColor] = useState("#FF0B7A");
//   const [textEffect, setTextEffect] = useState("none");
//   const [imageFilter, setImageFilter] = useState("none");

//   useEffect(() => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = defaultImage;
//     img.onload = () => setImage(img);
//   }, [defaultImage]);

//   useEffect(() => {
//     if (!canvasRef.current || !image) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas dimensions
//     canvas.width = image.width;
//     canvas.height = image.height;

//     // Apply image filter
//     ctx.filter = imageFilter === "none" ? "none" : `${imageFilter}(100%)`;

//     // Draw image
//     ctx.drawImage(image, 0, 0);

//     // Reset filter for text and watermark
//     ctx.filter = "none";

//     // Configure text
//     ctx.fillStyle = textColor;
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = fontSize / 6;
//     ctx.font = `bold ${fontSize}px Impact`;
//     ctx.textAlign = "center";

//     // Apply text effect
//     if (textEffect === "shadow") {
//       ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
//       ctx.shadowBlur = 5;
//       ctx.shadowOffsetX = 3;
//       ctx.shadowOffsetY = 3;
//     }

//     // Draw top text
//     if (topText) {
//       ctx.strokeText(topText, canvas.width / 2, fontSize + 10);
//       ctx.fillText(topText, canvas.width / 2, fontSize + 10);
//     }

//     // Draw bottom text
//     if (bottomText) {
//       ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
//       ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
//     }

//     // Reset shadow effect
//     ctx.shadowColor = "transparent";
//     ctx.shadowBlur = 0;
//     ctx.shadowOffsetX = 0;
//     ctx.shadowOffsetY = 0;

//     // Draw watermark
//     ctx.font = "bold 11px Arial";
//     ctx.fillStyle = "#FF0B7A";
//     ctx.fillText("NFToodle", canvas.width - 30, canvas.height - 7.5);
//   }, [
//     image,
//     topText,
//     bottomText,
//     fontSize,
//     textColor,
//     textEffect,
//     imageFilter,
//   ]);

//   const handleDownload = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const link = document.createElement("a");
//     link.download = "meme.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   };

//   return (
//     <div className="gap-8 grid md:grid-cols-[2fr,1fr] text-white">
//       <div className="space-y-6">
//         <div className="bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg">
//           <canvas ref={canvasRef} className="mx-auto max-w-full h-auto" />
//         </div>
//         <div className="flex gap-4">
//           <Button
//             onClick={handleDownload}
//             className="flex-1 bg-[#FF0B7A] hover:bg-[#FF0B7A]/90 text-white"
//           >
//             Download Meme
//           </Button>
//           <Button
//             variant="outline"
//             className="flex-1 border-[#FF0B7A] hover:bg-[#FF0B7A] text-[#FF0B7A] hover:text-white"
//           >
//             Share
//           </Button>
//         </div>
//       </div>
//       <div className="space-y-6">
//         <div className="space-y-4 bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg">
//           <div className="space-y-2">
//             <label className="font-medium text-sm text-white/90">
//               Top Text
//             </label>
//             <Input
//               value={topText}
//               onChange={(e) => setTopText(e.target.value)}
//               placeholder="Add text"
//               className="border-[#FF0B7A]/50 bg-black/50 text-white placeholder:text-white/50"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="font-medium text-sm text-white/90">
//               Bottom Text
//             </label>
//             <Input
//               value={bottomText}
//               onChange={(e) => setBottomText(e.target.value)}
//               placeholder="Add text"
//               className="border-[#FF0B7A]/50 bg-black/50 text-white placeholder:text-white/50"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="font-medium text-sm text-white/90">
//               Font Size: {fontSize}px
//             </label>
//             <Slider
//               value={[fontSize]}
//               onValueChange={(value) => setFontSize(value[0])}
//               min={20}
//               max={80}
//               step={2}
//             />
//           </div>
//         </div>
//         <Tabs defaultValue="text" className="text-white">
//           <TabsList className="bg-[#1F1F1F] w-full">
//             <TabsTrigger
//               value="templates"
//               className="flex-1 data-[state=active]:bg-[#FF0B7A] data-[state=active]:text-white"
//             >
//               <ImagePlus className="mr-2 w-4 h-4" />
//               Templates
//             </TabsTrigger>
//             <TabsTrigger
//               value="text"
//               className="flex-1 data-[state=active]:bg-[#FF0B7A] data-[state=active]:text-white"
//             >
//               <Type className="mr-2 w-4 h-4" />
//               Text
//             </TabsTrigger>
//             <TabsTrigger
//               value="effects"
//               className="flex-1 data-[state=active]:bg-[#FF0B7A] data-[state=active]:text-white"
//             >
//               <Wand2 className="mr-2 w-4 h-4" />
//               Effects
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent
//             value="templates"
//             className="bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
//           >
//             <div className="gap-2 grid grid-cols-3">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-black/50 rounded hover:ring-2 hover:ring-[#FF0B7A] cursor-pointer aspect-square"
//                 />
//               ))}
//             </div>
//           </TabsContent>
//           <TabsContent
//             value="text"
//             className="space-y-4 bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
//           >
//             <div className="space-y-2">
//               <label className="font-medium text-sm text-white/90">
//                 Text Color
//               </label>
//               <Select onValueChange={setTextColor} defaultValue={textColor}>
//                 <SelectTrigger className="border-[#FF0B7A]/50 bg-black/50 text-white">
//                   <SelectValue placeholder="Select color" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="#FF0B7A">Pink</SelectItem>
//                   <SelectItem value="#ffffff">White</SelectItem>
//                   <SelectItem value="#000000">Black</SelectItem>
//                   <SelectItem value="#ff0000">Red</SelectItem>
//                   <SelectItem value="#00ff00">Green</SelectItem>
//                   <SelectItem value="#0000ff">Blue</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <label className="font-medium text-sm text-white/90">
//                 Text Effect
//               </label>
//               <Select onValueChange={setTextEffect} defaultValue={textEffect}>
//                 <SelectTrigger className="border-[#FF0B7A]/50 bg-black/50 text-white">
//                   <SelectValue placeholder="Select effect" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="none">None</SelectItem>
//                   <SelectItem value="shadow">Shadow</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </TabsContent>
//           <TabsContent
//             value="effects"
//             className="bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
//           >
//             <div className="space-y-2">
//               <label className="font-medium text-sm text-white/90">
//                 Image Filter
//               </label>
//               <Select onValueChange={setImageFilter} defaultValue={imageFilter}>
//                 <SelectTrigger className="border-[#FF0B7A]/50 bg-black/50 text-white">
//                   <SelectValue placeholder="Select filter" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="none">None</SelectItem>
//                   <SelectItem value="grayscale">Grayscale</SelectItem>
//                   <SelectItem value="sepia">Sepia</SelectItem>
//                   <SelectItem value="invert">Invert</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ImagePlus, Type, Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MemeGeneratorProps {
  defaultImage: string;
}

const squidGameVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.2,
    },
  },
};

const tabVariants = {
  inactive: { scale: 1 },
  active: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export function MemeGenerator({ defaultImage }: MemeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(25);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [textColor, setTextColor] = useState("#FF0B7A");
  const [textEffect, setTextEffect] = useState("none");
  const [imageFilter, setImageFilter] = useState("none");
  const [activeTab, setActiveTab] = useState("text");
  const [isDownloading, setIsDownloading] = useState(false);

  // Original useEffect hooks remain the same
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = defaultImage;
    img.onload = () => setImage(img);
  }, [defaultImage]);

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = imageFilter === "none" ? "none" : `${imageFilter}(100%)`;
    ctx.drawImage(image, 0, 0);
    ctx.filter = "none";
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

    if (topText) {
      ctx.strokeText(topText, canvas.width / 2, fontSize + 10);
      ctx.fillText(topText, canvas.width / 2, fontSize + 10);
    }

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
  ]);

  const handleDownload = async () => {
    setIsDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Add download animation delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    setIsDownloading(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={squidGameVariants}
      className="gap-8 grid md:grid-cols-[2fr,1fr] text-white"
    >
      <div className="space-y-6">
        <motion.div
          className="bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <canvas ref={canvasRef} className="mx-auto max-w-full h-auto" />
        </motion.div>
        <div className="flex gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={handleDownload}
              className="bg-[#FF0B7A] hover:bg-[#FF0B7A]/90 w-full text-white"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ↻
                </motion.div>
              ) : (
                "Download Meme"
              )}
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              variant="outline"
              className="border-[#FF0B7A] hover:bg-[#FF0B7A] w-full text-[#FF0B7A] hover:text-white"
              disabled={true}
            >
              Share coming soon...
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div className="space-y-6" variants={squidGameVariants}>
        <motion.div
          className="space-y-4 bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
          whileHover={{ boxShadow: "0 0 15px rgba(255, 11, 122, 0.3)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="inputs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <motion.input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="border-[#FF0B7A]/50 bg-black/50 p-2 rounded w-full text-white placeholder:text-white/50"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div className="space-y-2">
                <motion.input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="border-[#FF0B7A]/50 bg-black/50 p-2 rounded w-full text-white placeholder:text-white/50"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-sm text-white/90">
                  Font Size: {fontSize}px
                </label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={20}
                  max={80}
                  step={2}
                  className="py-4"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <Tabs
          defaultValue="text"
          className="text-white"
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-[#1F1F1F] w-full">
            {["templates", "text", "effects"].map((tab) => (
              <motion.div
                key={tab}
                variants={tabVariants}
                animate={activeTab === tab ? "active" : "inactive"}
                className="flex-1"
              >
                <TabsTrigger
                  value={tab}
                  className="data-[state=active]:bg-[#FF0B7A] w-full data-[state=active]:text-white"
                >
                  {tab === "templates" && (
                    <ImagePlus className="mr-2 w-4 h-4" />
                  )}
                  {tab === "text" && <Type className="mr-2 w-4 h-4" />}
                  {tab === "effects" && <Wand2 className="mr-2 w-4 h-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent
                value="templates"
                className="bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-1 rounded-lg"
              >
                <div className="gap-1 grid grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-center items-center bg-black/50 rounded hover:ring-2 hover:ring-[#FF0B7A] text-neutral-400 cursor-pointer aspect-square"
                    >
                      Coming Soon...
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent
                value="text"
                className="space-y-4 bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
              >
                <div className="space-y-2">
                  <label className="font-medium text-sm text-white/90">
                    Text Color
                  </label>
                  <Select onValueChange={setTextColor} defaultValue={textColor}>
                    <SelectTrigger className="border-[#FF0B7A]/50 bg-black/50 text-white">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="#FF0B7A">Pink</SelectItem>
                      <SelectItem value="#ffffff">White</SelectItem>
                      <SelectItem value="#000000">Black</SelectItem>
                      <SelectItem value="#ff0000">Red</SelectItem>
                      <SelectItem value="#00ff00">Green</SelectItem>
                      <SelectItem value="#0000ff">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-sm text-white/90">
                    Text Effect
                  </label>
                  <Select
                    onValueChange={setTextEffect}
                    defaultValue={textEffect}
                  >
                    <SelectTrigger className="border-[#FF0B7A]/50 bg-black/50 text-white">
                      <SelectValue placeholder="Select effect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="shadow">Shadow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent
                value="effects"
                className="bg-[#1F1F1F] shadow-[#FF0B7A]/20 shadow-md p-4 rounded-lg"
              >
                <div className="space-y-2">
                  <label className="font-medium text-sm text-white/90">
                    Image Filter
                  </label>
                  <Select
                    onValueChange={setImageFilter}
                    defaultValue={imageFilter}
                  >
                    <SelectTrigger className="border-[#FF0B7A]/50 bg-black/50 text-white">
                      <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="grayscale">Grayscale</SelectItem>
                      <SelectItem value="sepia">Sepia</SelectItem>
                      <SelectItem value="invert">Invert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
