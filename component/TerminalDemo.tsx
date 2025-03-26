import { AnimatedSpan, Terminal, TypingAnimation } from "./magicui/MagicTerminal";

export default function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>&gt; console.log(`Hello from LiveCodeX online code editor!`);</TypingAnimation>

      <AnimatedSpan delay={1500} className="text-green-500">
        <span>✔ Starting development server...</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2000} className="text-green-500">
        <span>✔ Compiling JavaScript files...</span>
      </AnimatedSpan>

      <AnimatedSpan delay={2500} className="text-green-500">
        <span>✔ Bundling with Webpack...</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3000} className="text-green-500">
        <span>✔ Linting code with ESLint...</span>
      </AnimatedSpan>

      <AnimatedSpan delay={3500} className="text-green-500">
        <span>✔ Running TypeScript type checks...</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4000} className="text-green-500">
        <span>✔ Server running at http://localhost:3000</span>
      </AnimatedSpan>

      <AnimatedSpan delay={4500} className="text-green-500">
        <span>✔ ℹ Executing sample JavaScript code:</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5000} className="text-green-500">
        <span>✔ console.log(`Hello from LiveCodeX online code editor!`);</span>
      </AnimatedSpan>

      <AnimatedSpan delay={5500} className="text-green-500">
        <span>✔ Output: Hello from your online code editor!</span>
      </AnimatedSpan>

      <AnimatedSpan delay={6000} className="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span className="pl-2">- lib/utils.ts</span>
      </AnimatedSpan>

      <TypingAnimation delay={6500} className="text-muted-foreground">
        Success! Project initialization completed.
      </TypingAnimation>

      <TypingAnimation delay={7000} className="text-muted-foreground">
        Start coding now in your browser!
      </TypingAnimation>
    </Terminal>
  )
}

