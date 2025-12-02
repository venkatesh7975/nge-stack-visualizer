import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';

export const ArrayVisualization = () => {
  const { inputArray, steps, currentStepIndex, isGenerated } = useVisualizerStore();
  const currentStep = steps[currentStepIndex];

  if (!isGenerated || !currentStep) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex gap-3 flex-wrap justify-center">
          {inputArray.map((num, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-secondary flex flex-col items-center justify-center border border-border/50"
            >
              <span className="font-mono text-lg font-semibold text-foreground">{num}</span>
              <span className="text-[10px] text-muted-foreground">i={idx}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-muted-foreground mt-6 text-center">
          Click "Visualize" to start the algorithm
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Input Array */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3 text-center">Input Array</h3>
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
          <AnimatePresence mode="sync">
            {inputArray.map((num, idx) => {
              const isCurrentIndex = currentStep.currentIndex === idx;
              const ngeValue = currentStep.ngeResult[idx];
              const hasNGE = ngeValue !== null;

              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isCurrentIndex ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                    isCurrentIndex
                      ? 'bg-warning/20 border-warning glow-warning'
                      : hasNGE
                      ? 'bg-primary/10 border-primary/50'
                      : 'bg-secondary border-border/50'
                  }`}
                >
                  <span
                    className={`font-mono text-lg font-bold ${
                      isCurrentIndex ? 'text-warning' : hasNGE ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {num}
                  </span>
                  <span className="text-[10px] text-muted-foreground">i={idx}</span>
                  
                  {/* NGE indicator */}
                  {hasNGE && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 text-xs font-mono text-primary"
                    >
                      →{ngeValue}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* NGE Result Array */}
      {currentStep.type === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-card border border-primary/30 glow-primary"
        >
          <h3 className="text-sm font-medium text-primary mb-3 text-center">Final NGE Result</h3>
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            {currentStep.ngeResult.map((nge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="font-mono text-lg font-bold text-primary-foreground">
                    {nge}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">
                  NGE[{idx}]
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
