import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const statusColor = {
  Success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Warning: "bg-amber-50 text-amber-700 border-amber-200",
  Failure: "bg-red-50 text-red-700 border-red-200",
};

export default function LiveInterfaceLogsTable() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [interfaceOptions, setInterfaceOptions] = useState([]);
  const [selectedInterface, setSelectedInterface] = useState("all");

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchLogs = async () => {
    try {
      const params = {
        page,
        limit,
        startDate: appliedFromDate || undefined,
        endDate: appliedToDate || undefined,
        interfaceId: selectedInterface !== "all" ? selectedInterface : undefined,
      };

      const res = await axios.get(`${BASE_URL}/logs`, { params });
      let filtered = res.data.logs;

      if (statusFilter !== "all") {
        filtered = filtered.filter((log) => log.status === statusFilter);
      }

      if (search.trim()) {
        const lower = search.toLowerCase();
        filtered = filtered.filter(
          (log) =>
            log.interfaceId?.name?.toLowerCase().includes(lower) ||
            log.interfaceId?.integrationKey?.toLowerCase().includes(lower) ||
            log.message?.toLowerCase().includes(lower)
        );
      }

      setLogs(filtered);
      setTotalPages(res.data.totalPages || 1);

      // Fix: populate interface options as { _id, name }
      const interfaces = res.data.logs
        .map((log) => ({
          _id: log.interfaceId?._id,
          name: log.interfaceId?.name,
        }))
        .filter((i) => i._id && i.name); // filter out undefined/null

      const uniqueInterfaces = Array.from(
        new Map(interfaces.map((i) => [i._id, i])).values()
      );

      setInterfaceOptions(uniqueInterfaces);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, limit, selectedInterface, appliedFromDate, appliedToDate, statusFilter, search]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => (prev < totalPages ? prev + 1 : prev));

  const applyDateFilters = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
    setPage(1);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Interface Logs</h1>
          <p className="text-gray-600 mt-2">Monitor and track interface activities in real-time</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="p-8">
            {/* Search and Status Filter */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div className="relative w-full lg:w-96">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Input
                  placeholder="Search by interface, key, or message..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={(val) => {
                    setStatusFilter(val);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="h-11 min-w-[160px] border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Success">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        Success
                      </div>
                    </SelectItem>
                    <SelectItem value="Warning">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        Warning
                      </div>
                    </SelectItem>
                    <SelectItem value="Failure">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Failure
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant={showAdvancedFilters ? "default" : "outline"} 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="h-11 px-6 transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
                </Button>
              </div>
            </div>

            {/* Advanced Filters Section */}
            {showAdvancedFilters && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-100 animate-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">From Date</label>
                    <Input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="h-11 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">To Date</label>
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="h-11 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Interface</label>
                    <Select
                      value={selectedInterface}
                      onValueChange={(val) => {
                        setSelectedInterface(val);
                        setPage(1);
                      }}
                    >
                      <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="All Interfaces" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Interfaces</SelectItem>
                        {interfaceOptions.map((intf) => (
                          <SelectItem key={intf._id} value={intf._id}>
                            {intf.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Per Page</label>
                    <Select
                      value={String(limit)}
                      onValueChange={(val) => {
                        setLimit(Number(val));
                        setPage(1);
                      }}
                    >
                      <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Logs per page" />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 10, 20, 50].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} per page
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={applyDateFilters}
                    className="h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Logs Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200">
                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Interface Name</TableHead>
                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Integration Key</TableHead>
                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Status</TableHead>
                    <TableHead className="font-semibold text-gray-800 py-4 px-6">Message</TableHead>
                    <TableHead className="text-right font-semibold text-gray-800 py-4 px-6">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length > 0 ? (
                    logs.map((log, i) => (
                      <TableRow 
                        key={log._id} 
                        className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
                      >
                        <TableCell className="py-4 px-6 font-medium text-gray-900">
                          {log.interfaceId.name}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-600 font-mono text-sm">
                          {log.interfaceId.integrationKey}
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Badge className={`rounded-full px-3 py-1.5 text-xs font-medium border ${statusColor[log.status]} shadow-sm`}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-700 max-w-xs truncate">
                          {log.message}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right text-gray-600 text-sm">
                          {new Date(log.timestamp).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-lg font-medium">No logs found</p>
                          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={page === 1}
                className="h-11 px-6 disabled:opacity-50 hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  Page <strong className="text-blue-600">{page}</strong> of{" "}
                  <strong className="text-blue-600">{totalPages}</strong>
                </span>
              </div>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={page >= totalPages}
                className="h-11 px-6 disabled:opacity-50 hover:bg-gray-50 transition-all duration-200"
              >
                Next
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
