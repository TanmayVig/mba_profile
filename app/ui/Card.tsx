export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-white bg-white shadow-lg transform ">
      {children}
    </div>
  );
}