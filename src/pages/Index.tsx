import { motion } from 'framer-motion';
import { ArrayInput } from '@/components/ArrayInput';
import { ArrayVisualization } from '@/components/ArrayVisualization';
import { StackVisualization } from '@/components/StackVisualization';
import { Controls } from '@/components/Controls';
import { ExplanationPanel } from '@/components/ExplanationPanel';
import { AlgorithmInfo } from '@/components/AlgorithmInfo';
import { Layers } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary">
              <Layers className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground text-glow">
                NGE Stack Visualizer
              </h1>
              <p className="text-xs text-muted-foreground">
                Next Greater Element Algorithm Visualization
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main visualization area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Input section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-card border border-border/50"
            >
              <h2 className="text-sm font-semibold text-muted-foreground mb-4">
                Enter Array
              </h2>
              <ArrayInput />
            </motion.section>

            {/* Visualization section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border/50"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Array visualization */}
                <div className="flex-1">
                  <ArrayVisualization />
                </div>

                {/* Stack visualization */}
                <div className="lg:w-40 lg:border-l lg:border-border/50 lg:pl-6">
                  <StackVisualization />
                </div>
              </div>
            </motion.section>

            {/* Controls */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border/50"
            >
              <Controls />
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Explanation panel */}
            <ExplanationPanel />

            {/* Algorithm info */}
            <AlgorithmInfo />

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl bg-card border border-border/50"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-warning/20 border-2 border-warning" />
                  <span className="text-xs text-muted-foreground">Current Element</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded gradient-success" />
                  <span className="text-xs text-muted-foreground">Push Operation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded gradient-destructive" />
                  <span className="text-xs text-muted-foreground">Pop Operation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-primary/10 border-2 border-primary/50" />
                  <span className="text-xs text-muted-foreground">NGE Assigned</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-xs text-muted-foreground">
            Built with React + Tailwind + Framer Motion + Zustand
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
