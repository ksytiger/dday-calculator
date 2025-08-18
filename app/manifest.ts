import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "D-Day 계산기",
    short_name: "D-Day",
    description: "연월일을 입력하여 정확한 디데이를 계산하는 도구",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F5",
    theme_color: "#EB5A0F",
    icons: [
      {
        src: "/날짜계산기-파비콘.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/날짜계산기-파비콘.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
} 