export default function ArenaBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-green/5 to-legit/5" />
    </div>
  );
}
