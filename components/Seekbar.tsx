import * as RadixSlider from "@radix-ui/react-slider";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Song } from "@/types";

interface SeekbarProps {
  duration: number;
  sound: Howl | null;
  onSeek?: (position: number) => void;
}

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const Seekbar: React.FC<SeekbarProps> = ({ duration, sound, onSeek }) => {
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const seekbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (sound && !isSeeking) {
        setPosition(sound.seek());
      }
    };

    const interval = setInterval(updatePosition, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sound, isSeeking]);

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const handleSeekMove = (newValue: number[]) => {
    const newPosition = newValue[0];
    setPosition(newPosition);
  };

  const handleClick = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!seekbarRef.current) return;

    const rect = seekbarRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const seekPosition = (clickPosition / rect.width) * duration;

    setPosition(seekPosition);
    sound?.seek(seekPosition);
    onSeek?.(seekPosition);
  };

  return (
    <div className="relative w-full">
      <RadixSlider.Root
        ref={seekbarRef}
        className="flex items-center select-none touch-none w-full h-10"
        value={[position]}
        onValueChange={handleSeekMove}
        onPointerDown={handleSeekStart}
        onPointerUp={handleSeekEnd}
        max={duration}
        step={0.1}
        aria-label="Seekbar"
        onClick={handleClick}
      >
        <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
          <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
          <RadixSlider.Thumb className="absolute w-4 h-4 bg-white top-[-5px] left-[-5px] rounded-full shadow" />
          {isSeeking && (
            <RadixSlider.Thumb className="absolute w-4 h-4 bg-blue-500 rounded-full shadow" />
          )}
        </RadixSlider.Track>
      </RadixSlider.Root>
      <div className="flex justify-between mt-1 text-sm text-neutral-400">
        <span>{formatTime(position)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Seekbar;
