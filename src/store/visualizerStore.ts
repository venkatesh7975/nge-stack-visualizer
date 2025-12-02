import { create } from 'zustand';

export type StepType = 'init' | 'compare' | 'pop' | 'push' | 'assign' | 'complete';

export interface Step {
  type: StepType;
  currentIndex: number;
  stack: number[];
  ngeResult: (number | null)[];
  explanation: string;
  highlightPop?: number;
  highlightPush?: number;
}

interface VisualizerState {
  inputArray: number[];
  steps: Step[];
  currentStepIndex: number;
  isPlaying: boolean;
  playSpeed: number;
  isGenerated: boolean;

  setInputArray: (arr: number[]) => void;
  generateSteps: () => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  goToStep: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setPlaySpeed: (speed: number) => void;
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  inputArray: [4, 5, 2, 10, 8],
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  playSpeed: 1000,
  isGenerated: false,

  setInputArray: (arr) => set({ inputArray: arr, isGenerated: false, steps: [], currentStepIndex: 0 }),

  generateSteps: () => {
    const { inputArray } = get();
    const n = inputArray.length;
    const steps: Step[] = [];
    const stack: number[] = [];
    const ngeResult: (number | null)[] = new Array(n).fill(null);

    // Initial step
    steps.push({
      type: 'init',
      currentIndex: -1,
      stack: [...stack],
      ngeResult: [...ngeResult],
      explanation: `Starting NGE algorithm. Array: [${inputArray.join(', ')}]. We'll scan from right to left.`,
    });

    // Process from right to left
    for (let i = n - 1; i >= 0; i--) {
      const current = inputArray[i];

      // Compare step
      steps.push({
        type: 'compare',
        currentIndex: i,
        stack: [...stack],
        ngeResult: [...ngeResult],
        explanation: `Processing element ${current} at index ${i}. Stack: [${stack.join(', ')}]`,
      });

      // Pop all elements <= current
      while (stack.length > 0 && stack[stack.length - 1] <= current) {
        const popped = stack.pop()!;
        steps.push({
          type: 'pop',
          currentIndex: i,
          stack: [...stack],
          ngeResult: [...ngeResult],
          explanation: `Pop ${popped} from stack (${popped} ≤ ${current}). Stack after pop: [${stack.join(', ')}]`,
          highlightPop: popped,
        });
      }

      // Assign NGE
      if (stack.length === 0) {
        ngeResult[i] = -1;
        steps.push({
          type: 'assign',
          currentIndex: i,
          stack: [...stack],
          ngeResult: [...ngeResult],
          explanation: `Stack is empty. NGE of ${current} = -1 (no greater element to the right).`,
        });
      } else {
        ngeResult[i] = stack[stack.length - 1];
        steps.push({
          type: 'assign',
          currentIndex: i,
          stack: [...stack],
          ngeResult: [...ngeResult],
          explanation: `Stack top is ${stack[stack.length - 1]}. NGE of ${current} = ${stack[stack.length - 1]}.`,
        });
      }

      // Push current element
      stack.push(current);
      steps.push({
        type: 'push',
        currentIndex: i,
        stack: [...stack],
        ngeResult: [...ngeResult],
        explanation: `Push ${current} onto stack. Stack: [${stack.join(', ')}]`,
        highlightPush: current,
      });
    }

    // Complete
    steps.push({
      type: 'complete',
      currentIndex: -1,
      stack: [...stack],
      ngeResult: [...ngeResult],
      explanation: `Algorithm complete! Final NGE result: [${ngeResult.join(', ')}]`,
    });

    set({ steps, isGenerated: true, currentStepIndex: 0 });
  },

  nextStep: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  reset: () => {
    set({ currentStepIndex: 0, isPlaying: false });
  },

  goToStep: (index) => {
    const { steps } = get();
    if (index >= 0 && index < steps.length) {
      set({ currentStepIndex: index });
    }
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setPlaySpeed: (speed) => set({ playSpeed: speed }),
}));
