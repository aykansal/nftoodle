'use client';
import { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import { ImagePlus, Type, Wand2, Palette } from 'lucide-react';
import { useActiveAccount } from 'thirdweb/react';

import type { MemeGeneratorProps } from '@/lib/types';
import { squidGameVariants, tabVariants } from '@/lib/data';

import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from './ui/label';
import { Input } from './ui/input';
// import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants, cardVariants } from '@/styles/animations';

export function MemeGenerator({ defaultImage }: MemeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState('TOP TEXT');
  const [bottomText, setBottomText] = useState('BOTTOM TEXT');
  const [fontSize, setFontSize] = useState(25);
  const [textColor, setTextColor] = useState('#FF0B7A');
  const [textEffect, setTextEffect] = useState('none');
  const [imageFilter, setImageFilter] = useState('none');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [activeTab, setActiveTab] = useState('text');
  // const [isDownloading, setIsDownloading] = useState(false);
  // const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const accountAddress = useActiveAccount()?.address;

  // Loading image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = defaultImage;
    img.onload = () => setImage(img);
  }, [defaultImage]);

  // Canvas rendering logic
  useEffect(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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

    ctx.filter = imageFilter === 'none' ? 'none' : `${imageFilter}(100%)`;
    ctx.drawImage(image, offsetX, offsetY, imageWidth, imageHeight);
    ctx.filter = 'none';

    // Text rendering
    ctx.fillStyle = textColor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 6;
    ctx.font = `bold ${fontSize}px Impact`;
    ctx.textAlign = 'center';

    if (textEffect === 'shadow') {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
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

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = 'bold 11px Arial';
    ctx.fillStyle = '#FF0B7A';
    ctx.fillText('NFToodle', canvas.width - 30, canvas.height - 7.5);
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

  // const handleDownload = async () => {
  //   setIsDownloading(true);
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   await new Promise((resolve) => setTimeout(resolve, 800));

  //   const link = document.createElement("a");
  //   link.download = "meme.png";
  //   link.href = canvas.toDataURL("image/png");
  //   link.click();
  //   setIsDownloading(false);
  // };
  const handleSave = async () => {
    setIsSaving(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageDataUrl = canvas.toDataURL('image/png');

    try {
      const { status } = await axios.post('/api/memes', {
        imageDataUrl,
        accountAddress,
      });
      console.log(
        status === 200
          ? 'Image uploaded successfully'
          : `Upload failed with status ${status}`
      );
    } catch (error) {
      console.error('Error during image upload:', error);
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
      className="grid md:grid-cols-[2fr,1fr] gap-6 p-4 md:p-8 rounded-xl text-white"
    >
      {/* Left Side (Canvas and Actions) */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="visible"
        className="squid-card rounded-xl overflow-hidden"
      >
        <div className="space-y-6 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[540px] mx-auto flex items-center justify-center rounded-lg overflow-hidden bg-gray-900/50"
          >
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[540px] object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <motion.button
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 8px rgb(255,11,122)",
                boxShadow: "0 0 8px rgb(255,11,122)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isSaving}
              className="squid-button px-6 py-2.5 text-lg rounded-lg will-change-transform bg-gradient-to-r from-[#FF0B7A] to-[#FF0B7A]/80 hover:from-[#FF0B7A]/90 hover:to-[#FF0B7A]/70 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Meme'}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side (Controls) */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="visible"
        className="squid-card rounded-xl overflow-hidden"
      >
        <div className="p-4 md:p-6 space-y-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid grid-cols-3 gap-x-2 mb-6">
              <TabsTrigger
                value="text"
                onClick={() => setActiveTab('text')}
                className={`px-4 py-2.5 rounded-lg transition-all flex items-center justify-center ${
                  activeTab === 'text'
                    ? 'bg-[#FF0B7A] text-white'
                    : 'text-[#FF0B7A] hover:bg-[#FF0B7A]/10'
                }`}
              >
                <Type className="w-5 h-5 mr-1.5" />
                <span className="mt-0.5">Text</span>
              </TabsTrigger>
              <TabsTrigger
                value="effects"
                onClick={() => setActiveTab('effects')}
                className={`px-4 py-2.5 rounded-lg transition-all flex items-center justify-center ${
                  activeTab === 'effects'
                    ? 'bg-[#FF0B7A] text-white'
                    : 'text-[#FF0B7A] hover:bg-[#FF0B7A]/10'
                }`}
              >
                <Wand2 className="w-5 h-5 mr-1.5" />
                <span className="mt-0.5">Effects</span>
              </TabsTrigger>
              <TabsTrigger
                value="background"
                onClick={() => setActiveTab('background')}
                className={`px-4 py-2.5 rounded-lg transition-all flex items-center justify-center ${
                  activeTab === 'background'
                    ? 'bg-[#FF0B7A] text-white'
                    : 'text-[#FF0B7A] hover:bg-[#FF0B7A]/10'
                }`}
              >
                <Palette className="w-5 h-5 mr-1.5" />
                <span className="mt-0.5">BG</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Top Text</Label>
                  <Input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="bg-gray-800/50 border-[#FF0B7A]/30 focus:border-[#FF0B7A] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bottom Text</Label>
                  <Input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="bg-gray-800/50 border-[#FF0B7A]/30 focus:border-[#FF0B7A] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Font Size: {fontSize}px</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={([value]) => setFontSize(value)}
                    min={12}
                    max={72}
                    step={1}
                    className="py-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-12 p-1 bg-gray-800/50 border-[#FF0B7A]/30 focus:border-[#FF0B7A] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text Effect</Label>
                  <Select value={textEffect} onValueChange={setTextEffect}>
                    <SelectTrigger className="bg-gray-800/50 border-[#FF0B7A]/30 focus:border-[#FF0B7A]">
                      <SelectValue placeholder="Select effect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="shadow">Shadow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Image Filter</Label>
                  <Select value={imageFilter} onValueChange={setImageFilter}>
                    <SelectTrigger className="bg-gray-800/50 border-[#FF0B7A]/30 focus:border-[#FF0B7A]">
                      <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="grayscale">Grayscale</SelectItem>
                      <SelectItem value="sepia">Sepia</SelectItem>
                      <SelectItem value="invert">Invert</SelectItem>
                      <SelectItem value="saturate">Saturate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="background" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-12 p-1 bg-gray-800/50 border-[#FF0B7A]/30 focus:border-[#FF0B7A] transition-colors"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Extracted Components (Button Group, Text Input Group, Tab Trigger, etc.)
// const ButtonGroup = ({
//   isSaving,
//   handleSave,
//   // defaultImage,
// }: {
//   isSaving: boolean;
//   handleSave: () => void;
//   defaultImage: string;
// }) => {
//   return (
//     <>
//       <Button
//         onClick={handleSave}
//         className="bg-pink-500 hover:bg-pink-600 text-white font-ibm"
//         disabled={isSaving}
//       >
//         {isSaving ? (
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{
//               duration: 1,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: 'linear',
//             }}
//           >
//             ↻
//           </motion.div>
//         ) : (
//           'Save to Gallery'
//         )}
//       </Button>
//     </>
//   );
// };

// const TextInputGroup = ({
//   topText,
//   bottomText,
//   setTopText,
//   setBottomText,
//   fontSize,
//   setFontSize,
// }: {
//   topText: string;
//   bottomText: string;
//   setTopText: (value: string) => void;
//   setBottomText: (value: string) => void;
//   fontSize: number;
//   setFontSize: (value: number) => void;
// }) => (
//   <div className="space-y-4">
//     <Input
//       type="text"
//       value={topText}
//       onChange={(e) => setTopText(e.target.value)}
//       className="border-[#FF0B7A] bg-black p-3 border rounded-lg w-full text-white/90 placeholder:text-white/50"
//       placeholder="Top Text"
//     />
//     <Input
//       type="text"
//       value={bottomText}
//       onChange={(e) => setBottomText(e.target.value)}
//       className="border-[#FF0B7A] bg-black p-3 border rounded-lg w-full text-white/90 placeholder:text-white/50"
//       placeholder="Bottom Text"
//     />
//     <div className="flex items-center space-x-2">
//       <Label className="font-medium text-sm text-white">Font Size:</Label>
//       <Slider
//         value={[fontSize]}
//         onValueChange={(value) => setFontSize(value[0])}
//         min={20}
//         max={80}
//         step={2}
//         className="flex-grow"
//       />
//       <span className="font-medium text-sm">{fontSize}px</span>
//     </div>
//   </div>
// );

const TabTrigger = ({ tab, activeTab }: { tab: string; activeTab: string }) => (
  <motion.div
    variants={tabVariants}
    animate={activeTab === tab ? 'active' : 'inactive'}
    className="flex-1"
  >
    <TabsTrigger
      value={tab}
      className="py-2 rounded-lg w-full transition-all duration-300 ease-in-out"
    >
      {tab === 'templates' && <ImagePlus className="mr-2" />}
      {tab === 'text' && <Type className="mr-2" />}
      {tab === 'effects' && <Wand2 className="mr-2" />}
      {tab === 'background' && <Palette className="mr-2" />}
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
  <div className="space-y-4">
    <div>
      <Label className="block mb-2 text-[#FF0B7A]">Text Color</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="border-[#FF0B7A] p-1 border rounded w-12 h-12"
        />
        <Input
          type="text"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="flex-grow border-[#FF0B7A] bg-black p-2 border rounded-lg text-white"
        />
      </div>
    </div>
    <div>
      <Label className="block mb-2 text-[#FF0B7A]">Text Effect</Label>
      <Select
        value={textEffect}
        onValueChange={(value) => setTextEffect(value)}
      >
        <SelectTrigger className="border-[#FF0B7A] bg-black border w-full text-white">
          <SelectValue placeholder="Select Text Effect" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="shadow">Shadow</SelectItem>
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
