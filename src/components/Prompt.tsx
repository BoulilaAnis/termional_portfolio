export default function Prompt({ command }: { command?: any }) {
  return (
    <div className="flex items-center gap-1 font-bold text-xl">
      <span className="text-chart-1">Anis_Boulila</span>
      <span className="text-foreground">@</span>
      <span className="text-chart-2">portfolio</span>
      <span className="text-foreground">:</span>
      <span className="text-chart-3">~</span>
      <span className="text-main">$</span>
      {command && <span className="text-chart-5 ml-1">{command}</span>}
    </div>
  )
}
