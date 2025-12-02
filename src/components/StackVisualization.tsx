import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizerStore } from '@/store/visualizerStore';

export const StackVisualization = () => {
  const { steps, currentStepIndex, isGenerated } = useVisualizerStore();
  const currentStep = steps[currentStepIndex];

  if (!isGenerated || !currentStep) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="w-24 h-48 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground text-sm text-center px-2">
            Stack will appear here
          </span>
        </div>
      </div>
    );
  }

  const { stack, highlightPop, highlightPush, type } = currentStep;
  const maxVisibleItems = 8;
  const visibleStack = stack.slice(-maxVisibleItems);

  return (
    <div className="h-full flex flex-col items-center p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Stack</h3>
      
      <div className="relative flex-1 flex flex-col justify-end">
        {/* Stack container */}
        <div className="relative w-20 sm:w-24">
          {/* Stack base */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-border rounded-b-lg" />
          
          {/* Stack sides */}
          <div className="absolute bottom-0 left-0 w-1 bg-border rounded-l-lg" style={{ height: `${Math.max(visibleStack.length * 48 + 8, 200)}px` }} />
          <div className="absolute bottom-0 right-0 w-1 bg-border rounded-r-lg" style={{ height: `${Math.max(visibleStack.length * 48 + 8, 200)}px` }} />
          
          {/* Stack items */}
          <div className="flex flex-col-reverse gap-1 pb-2 px-1">
            <AnimatePresence mode="popLayout">
              {visibleStack.map((item, idx) => {
                const actualIdx = stack.length - visibleStack.length + idx;
                const isTop = idx === visibleStack.length - 1;
                const isPoppingThis = type === 'pop' && highlightPop === item && isTop;
                const isPushingThis = type === 'push' && highlightPush === item && isTop;

                return (
                  <motion.div
                    key={`${actualIdx}-${item}`}
                    layout
                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                    animate={{
                      opacity: isPoppingThis ? 0.5 : 1,
                      y: 0,
                      scale: isPoppingThis ? 0.9 : isPushingThis ? 1.05 : 1,
                    }}
                    exit={{ opacity: 0, y: -50, scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`relative w-full h-11 rounded-md flex items-center justify-center font-mono font-bold text-lg transition-all ${
                      isPoppingThis
                        ? 'gradient-destructive text-destructive-foreground glow-destructive'
                        : isPushingThis
                        ? 'gradient-success text-success-foreground glow-success'
                        : isTop
                        ? 'bg-primary/20 border-2 border-primary text-primary'
                        : 'bg-secondary border border-border/50 text-foreground'
                    }`}
                  >
                    {item}
                    {isTop && (
                      <span className="absolute -right-8 text-[10px] text-primary font-normal">
                        top
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Empty state */}
            {stack.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-11 rounded-md flex items-center justify-center border-2 border-dashed border-border/50"
              >
                <span className="text-xs text-muted-foreground">empty</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Stack info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Size: <span className="font-mono text-foreground">{stack.length}</span>
        </p>
      </div>
    </div>
  );
};
