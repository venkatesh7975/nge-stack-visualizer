import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore, StepType } from '@/store/visualizerStore';
import { Info, ArrowRight, ArrowDown, ArrowUp, CheckCircle2 } from 'lucide-react';

const stepIcons: Record<StepType, React.ReactNode> = {
  init: <Info className="w-4 h-4" />,
  compare: <ArrowRight className="w-4 h-4" />,
  pop: <ArrowUp className="w-4 h-4" />,
  push: <ArrowDown className="w-4 h-4" />,
  assign: <ArrowRight className="w-4 h-4" />,
  complete: <CheckCircle2 className="w-4 h-4" />,
};

const stepColors: Record<StepType, string> = {
  init: 'text-muted-foreground',
  compare: 'text-warning',
  pop: 'text-destructive',
  push: 'text-success',
  assign: 'text-primary',
  complete: 'text-primary',
};

const stepBgColors: Record<StepType, string> = {
  init: 'bg-muted/50',
  compare: 'bg-warning/10 border-warning/30',
  pop: 'bg-destructive/10 border-destructive/30',
  push: 'bg-success/10 border-success/30',
  assign: 'bg-primary/10 border-primary/30',
  complete: 'bg-primary/20 border-primary/50 glow-primary',
};

const stepLabels: Record<StepType, string> = {
  init: 'Initialize',
  compare: 'Compare',
  pop: 'Pop',
  push: 'Push',
  assign: 'Assign NGE',
  complete: 'Complete',
};

export const ExplanationPanel = () => {
  const { steps, currentStepIndex, isGenerated } = useVisualizerStore();
  const currentStep = steps[currentStepIndex];

  if (!isGenerated || !currentStep) {
    return (
      <div className="p-6 rounded-xl bg-card border border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Info className="w-4 h-4" />
          <span className="text-sm">Enter an array and click "Visualize" to begin</span>
        </div>
      </div>
    );
  }

  const { type, explanation } = currentStep;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
        className={`p-6 rounded-xl border transition-all ${stepBgColors[type]}`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-background/50 ${stepColors[type]}`}>
            {stepIcons[type]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${stepColors[type]}`}>
                {stepLabels[type]}
              </span>
              <span className="text-xs text-muted-foreground">
                Step {currentStepIndex + 1}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed font-mono">
              {explanation}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
