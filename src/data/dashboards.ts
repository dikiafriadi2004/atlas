export interface DashboardNode {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  url?: string;
}

export const DASHBOARD_NODES: DashboardNode[] = [
  {
    id: 1,
    title: "DASHBOARD BPKK ACEH TENGAH",
    subtitle: "Core Tax Management System",
    iconName: "MonitorCheck",
    url: "http://siperah.acehtengahkab.go.id/login",
  },
  {
    id: 2,
    title: "DASHBOARD INTEGRASI DJP/CORETAX",
    subtitle: "Integrasi & Pertukaran Data Pajak Pusat & Daerah",
    iconName: "CloudLightning",
    url: "",
  },
  {
    id: 3,
    title: "DASHBOARD WAJIB PAJAK",
    subtitle: "Self-Service Portal (Self Assessment)",
    iconName: "UserCheck",
    url: "",
  },
  {
    id: 4,
    title: "DASHBOARD INTEGRASI PERIZINAN DPMPTSP",
    subtitle: "Integrasi Perizinan Berusaha & Data Objek Pajak",
    iconName: "FileCheck2",
    url: "",
  },
  {
    id: 5,
    title: "DASHBOARD PENGAWASAN & PENEGAKAN",
    subtitle: "Monitoring Ketidakpatuhan & Penegakan Hukum",
    iconName: "ShieldAlert",
    url: "",
  },
  {
    id: 6,
    title: "DASHBOARD GEOSPASIAL / PERTANAHAN",
    subtitle: "Integrasi Peta Bidang & Data Objek Pajak",
    iconName: "MapPinned",
    url: "",
  },
  {
    id: 7,
    title: "EXECUTIVE DASHBOARD",
    subtitle: "Monitoring Real-Time untuk Pimpinan Daerah",
    iconName: "BarChart3",
    url: "",
  },
];
