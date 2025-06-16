"use client";
import React from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  FileText,
  LineChart,
  History,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar as UiSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const Sidebar = () => {
  const items = [
    {
      title: "Summary",
      url: "#",
      icon: FileText,
    },
    {
      title: "Chart",
      url: "#",
      icon: LineChart,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <SidebarProvider className=" w-[15%] bg-[#13131f]">
      <UiSidebar className="fixed top-24   left-0 w-[12%] min-h-[calc(100vh-6rem)] border-r z-10">
        <SidebarContent className="bg-[#13131f] text-white border-r-gray-500">
          <SidebarGroup>
            {/* <SidebarGroupLabel className="text-white text-[20px] font-bold ">
              Application
            </SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </UiSidebar>
    </SidebarProvider>
  );
};

export default Sidebar;
