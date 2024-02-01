export default function Skeleton({ className }: { className: string }) {
  return (
    <div className="flex items-center justify-center ">
      <div className={`skeleton ${className}`}></div>
    </div>
  )
}
