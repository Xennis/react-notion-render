export const Iframe = ({ src, ...props }: React.ComponentPropsWithoutRef<"iframe">) => {
  const youtubeId = getYouTubeVideoId(src)
  if (youtubeId === null) {
    console.warn("iframe does not support src", src)
    return <></>
  }
  return <YouTubeIFrame videoId={youtubeId} />
}

const YouTubeIFrame = ({ videoId }: { videoId: string }) => {
  return (
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="aspect-video w-full rounded-xl border-0"
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      title="YouTube video"
    />
  )
}

const getYouTubeVideoId = (src?: string) => {
  if (src === undefined) {
    return null
  }
  try {
    const { hostname, pathname, searchParams } = new URL(src)
    const domain = hostname.replace("www.", "")
    if (domain === "youtu.be") {
      return pathname
    }
    if (["youtube.com", "youtube-nocookie.com"].includes(domain) && ["/embed", "/watch"].includes(pathname)) {
      return searchParams.get("v")
    }
  } catch (error) {
    console.warn("src is not a valid url", src, error)
  }
  return null
}
