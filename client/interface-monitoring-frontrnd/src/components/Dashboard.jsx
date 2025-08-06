// import { SidebarProvider } from "@/components/ui/sidebar"; // adjust path if needed

// import { AppSidebar } from "@/components/app-sidebar";
// import { SiteHeader } from "@/components/site-header";
// import { SectionCards } from "@/components/section-cards";
// import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";

// export default function Dashboard() {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen bg-muted/40">
//         {/* Sidebar */}
//         <AppSidebar />

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <SiteHeader />

//           <main className="flex-1 p-6 space-y-8">
//             {/* Cards Section */}
//             <SectionCards />
//             {/* Chart Area */}
//             <ChartAreaInteractive />
//             {/* Table */}
//             {/* <DataTable /> */}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }


import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "@/app/dashboard/data.json";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <SiteHeader />
          <main className="flex-1 p-6 space-y-8">
            <SectionCards />
            <ChartAreaInteractive />
            <DataTable data={data} />  {/* Pass the data prop! */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
