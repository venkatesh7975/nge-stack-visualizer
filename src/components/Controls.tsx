import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const Controls = () => {
  const {
    steps,
    currentStepIndex,
    isPlaying,
    playSpeed,
    isGenerated,
    nextStep,
    prevStep,
    reset,
    goToStep,
    setIsPlaying,
    setPlaySpeed,
  } = useVisualizerStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextStep();
      }, playSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playSpeed, nextStep]);

  if (!isGenerated) {
    return null;
  }

  const isAtStart = currentStepIndex === 0;
  const isAtEnd = currentStepIndex === steps.length - 1;

  const togglePlay = () => {
    if (isAtEnd) {
      reset();
      setTimeout(() => setIsPlaying(true), 50);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      {/* Main controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          disabled={isAtStart && !isPlaying}
          className="h-10 w-10 border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => goToStep(0)}
          disabled={isAtStart}
          className="h-10 w-10 border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={prevStep}
          disabled={isAtStart}
          className="h-10 w-10 border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={togglePlay}
          className={`h-12 w-12 rounded-full ${
            isPlaying
              ? 'bg-warning text-warning-foreground hover:bg-warning/90'
              : 'gradient-primary text-primary-foreground hover:opacity-90'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={nextStep}
          disabled={isAtEnd}
          className="h-10 w-10 border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => goToStep(steps.length - 1)}
          disabled={isAtEnd}
          className="h-10 w-10 border-border/50 hover:border-primary/50 hover:bg-primary/10"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-muted-foreground min-w-[60px]">
          {currentStepIndex + 1} / {steps.length}
        </span>
        <div className="flex-1">
          <Slider
            value={[currentStepIndex]}
            min={0}
            max={steps.length - 1}
            step={1}
            onValueChange={([value]) => goToStep(value)}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Speed control */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground min-w-[60px]">Speed</span>
        <div className="flex-1">
          <Slider
            value={[2000 - playSpeed]}
            min={100}
            max={1900}
            step={100}
            onValueChange={([value]) => setPlaySpeed(2000 - value)}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground min-w-[50px] text-right">
          {playSpeed}ms
        </span>
      </div>
    </motion.div>
  );
};
