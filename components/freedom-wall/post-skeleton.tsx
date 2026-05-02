export function PostSkeleton() {
  return (
    <div className="bg-white border-2 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block w-14 h-5 bg-slate-300" />
          <span className="inline-block w-10 h-5 bg-slate-200" />
          <span className="inline-block w-24 h-3 bg-slate-200" />
        </div>
        <span className="inline-block w-4 h-4 bg-slate-200" />
      </div>

      {/* Content */}
      <div className="mb-4 space-y-2">
        <div className="h-4 bg-slate-200 w-[96%]" />
        <div className="h-4 bg-slate-200 w-[88%]" />
        <div className="h-4 bg-slate-200 w-[72%]" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-200" />
            <div className="w-12 h-3 bg-slate-200" />
          </div>
          <div className="w-10 h-3 bg-slate-200" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-7 rounded-full bg-slate-100" />
          <div className="w-16 h-7 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export function PostSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
