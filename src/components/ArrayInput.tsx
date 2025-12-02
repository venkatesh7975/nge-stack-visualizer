import { useState } from 'react';
import { useVisualizerStore } from '@/store/visualizerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ArrayInput = () => {
  const { inputArray, setInputArray, generateSteps, isGenerated } = useVisualizerStore();
  const [inputValue, setInputValue] = useState(inputArray.join(', '));
  const [error, setError] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setError('');
  };

  const parseAndSet = () => {
    const parsed = inputValue
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map((s) => parseInt(s, 10));

    if (parsed.some(isNaN)) {
      setError('Please enter valid numbers separated by commas');
      return false;
    }

    if (parsed.length < 2) {
      setError('Please enter at least 2 numbers');
      return false;
    }

    if (parsed.length > 12) {
      setError('Maximum 12 elements for better visualization');
      return false;
    }

    setInputArray(parsed);
    return true;
  };

  const handleGenerate = () => {
    if (parseAndSet()) {
      setTimeout(() => {
        useVisualizerStore.getState().generateSteps();
      }, 50);
    }
  };

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 5) + 5;
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 20) + 1);
    setInputValue(randomArray.join(', '));
    setInputArray(randomArray);
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter numbers: 4, 5, 2, 10, 8"
              className="font-mono text-base h-12 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRandom}
              variant="outline"
              className="h-12 px-4 border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random
            </Button>
            <Button
              onClick={handleGenerate}
              className="h-12 px-6 gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4 mr-2" />
              {isGenerated ? 'Regenerate' : 'Visualize'}
            </Button>
          </div>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive text-sm"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
