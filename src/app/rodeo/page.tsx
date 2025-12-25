import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RodeoPageClient from "./RodeoPageClient";

// Server component to get the token
export default function RodeoPage() {
  // Get token on server side (works with any env var name)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 
                      process.env.MAPBOX_ACCESS_TOKEN ||
                      process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="btn btn-ghost text-primary gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            🤠 Rodeo Finder
          </h1>
          <div className="w-24"></div>
        </div>
      </div>

      {/* Client component with token passed from server */}
      <RodeoPageClient mapboxToken={mapboxToken} />
    </main>
  );
}
