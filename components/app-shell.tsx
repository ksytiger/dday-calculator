"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isDaysActive = pathname === "/" || pathname.startsWith("/days")
  const isDdayActive = pathname === "/디데이계산기" || pathname.startsWith("/dday")
  const isDaysDiffActive = pathname === "/일수계산기"

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-3 py-2">
          <div className="text-sm font-semibold">메뉴</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isDaysActive}>
                  <a href="/">날짜 계산기</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isDdayActive}>
                  <a href="/디데이계산기">디데이 계산기</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isDaysDiffActive}>
                  <a href="/일수계산기">일수 계산기</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b bg-white px-3 py-2 md:hidden">
          <SidebarTrigger />
          <div className="text-sm font-bold">날짜/디데이 계산기</div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}


