import { motion } from 'framer-motion';
import { Code2, Clock, Layers } from 'lucide-react';

export const AlgorithmInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-xl bg-card border border-border/50"
    >
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Code2 className="w-4 h-4 text-primary" />
        Algorithm Overview
      </h3>

      <div className="space-y-4 text-sm">
        <div>
          <h4 className="text-muted-foreground mb-2">Stack-based O(n) Approach:</h4>
          <ol className="list-decimal list-inside space-y-1 text-foreground/80 font-mono text-xs leading-relaxed">
            <li>Traverse array from right to left</li>
            <li>Pop all elements ≤ current from stack</li>
            <li>Stack top is NGE (or -1 if empty)</li>
            <li>Push current element onto stack</li>
          </ol>
        </div>

        <div className="flex gap-6 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              Time: <span className="font-mono text-foreground">O(n)</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">
              Space: <span className="font-mono text-foreground">O(n)</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
