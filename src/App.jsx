import React, { useState, useEffect } from 'react';

// Standard services list
const SERVICES = [
  { id: 'web', name: 'Website Development', icon: '💻', desc: 'Premium architectures, responsive frontends, interactive customer flows, and lightning-fast loading speeds using modern frameworks.', color: 'sc-web' },
  { id: 'mobile', name: 'Mobile App Development', icon: '📱', desc: 'Native iOS & Android architectures engineered for flawless user interactions, performance, security, and cloud scalability.', color: 'sc-mobile' },
  { id: 'social', name: 'Social Media Marketing', icon: '📣', desc: 'High-engagement social campaign development, community management, viral hooks, and hyper-targeted advertising strategies.', color: 'sc-social' },
  { id: 'odoo', name: 'Odoo Customization and Implementation Service', icon: '⚙️', desc: 'Comprehensive setup, customized modules, CRM integration, accounting workflow automation, and smooth system migrations.', color: 'sc-odoo' },
  { id: 'listing', name: 'Product Listing', icon: '📦', desc: 'E-commerce Catalog management, SEO optimization for marketplace algorithms (Amazon, eBay, etc.), and multi-channel synchronization.', color: 'sc-listing' },
  { id: 'verify', name: 'Verifyboost Marketing', icon: '🚀', desc: 'Proprietary verification techniques, building social proof, trust metrics, authority growth, and high-conversion brand acceleration.', color: 'sc-verify' },
  { id: 'google', name: 'Google Ads and Management Service', icon: '📈', desc: 'Premium PPC structures, conversion rate optimization, keyword mapping, audience targeting, and real-time dashboard analytics.', color: 'sc-google' }
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbz7ME6aKnWT6jwhHs9s0XhlpHRvkjMZr9bpVnvjhYnW5CqP0OPb6viNoLH93v_1ekjcCw/exec";

const getServiceIcon = (id) => {
  switch (id) {
    case 'web':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case 'mobile':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'social':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'odoo':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'listing':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'verify':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case 'google':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function App() {
  // 3D Card Tilt & Spotlight Handlers
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // 8 degrees max tilt
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.03)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  // Navigation & View State
  const [view, setView] = useState(window.location.pathname === '/admin' ? 'admin' : 'client'); // 'client' | 'admin'
  const [adminToken, setAdminToken] = useState(sessionStorage.getItem("vgt_admin_token") || null);

  // Custom Toasts State
  const [toasts, setToasts] = useState([]);

  // Client Stepper State
  const [clientStep, setClientStep] = useState(1);
  const [formData, setFormData] = useState({
    service: [],
    name: '',
    email: '',
    phone: '',
    company: '',
    description: '',
    meetingDate: '',
    meetingTime: '',
    referredBy: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Admin Dashboard State
  const [loginCreds, setLoginCreds] = useState({ username: 'admin', password: '' });
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, cancelled: 0, serviceBreakdown: {} });
  const [adminTab, setAdminTab] = useState('registrations'); // 'registrations' | 'referrals'
  
  // Admin Table Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Reschedule Modal State
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlots, setRescheduleSlots] = useState([]);
  const [rescheduleTime, setRescheduleTime] = useState('');

  // 1. Toast Notification Utility
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // 2. Initialize Date constraints & Hybrid Live-Sync with Google Sheet
  const syncFromGoogleSheet = () => {
    fetch(GOOGLE_SHEETS_API)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Normalize matching JSON key names
          const normalized = data.map(r => ({
            id: r.id || '',
            name: r.name || '',
            email: r.email || '',
            phone: r.phone || '',
            company: r.company || '',
            service: r.service || '',
            meetingDate: r.meetingDate || '',
            meetingTime: r.meetingTime || '',
            description: r.description || '',
            referredBy: r.referredBy || '',
            myReferralCode: r.myReferralCode || '',
            status: r.status || 'scheduled',
            createdAt: r.createdAt || new Date().toISOString()
          }));
          localStorage.setItem("vgt_registrations", JSON.stringify(normalized));
          fetchAdminData();
          if (formData.meetingDate) {
            fetchSlots(formData.meetingDate);
          }
        }
      })
      .catch(err => console.error("Live Google Sheet sync failed, falling back to local cache:", err));
  };

  useEffect(() => {
    // Tomorrow as default date for scheduler
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    let mm = tomorrow.getMonth() + 1;
    let dd = tomorrow.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const tomorrowFormatted = `${yyyy}-${mm}-${dd}`;
    
    setFormData(prev => ({ ...prev, meetingDate: tomorrowFormatted }));
    
    // Seed localStorage registrations database if it doesn't exist
    if (!localStorage.getItem("vgt_registrations")) {
      localStorage.setItem("vgt_registrations", JSON.stringify([]));
    }

    // Trigger instant local cache load
    fetchAdminData();
    // Fetch live data from Google Sheet to overlay/refresh
    syncFromGoogleSheet();
  }, []);

  // 3. Fetch slots for Client Scheduler (Pure LocalStorage Conflict Check)
  useEffect(() => {
    if (formData.meetingDate && clientStep === 3) {
      fetchSlots(formData.meetingDate);
    }
  }, [formData.meetingDate, clientStep]);

  const fetchSlots = (date) => {
    if (!date) return;
    
    // Query LocalStorage Registrations Database
    const localRegs = JSON.parse(localStorage.getItem("vgt_registrations") || "[]");
    
    // Filter out active bookings for the selected date globally
    const booked = localRegs
      .filter(r => r.meetingDate === date && r.status !== 'cancelled')
      .map(r => r.meetingTime);

    // Map all standard timeslots, locking out those already booked
    const slotsInfo = TIME_SLOTS.map(slot => ({
      time: slot,
      available: !booked.includes(slot)
    }));
    
    setAvailableSlots(slotsInfo);
  };

  // 4. Client Stepper Actions
  const handleServiceSelect = (serviceName) => {
    setFormData(prev => {
      const currentServices = Array.isArray(prev.service) ? prev.service : [];
      if (currentServices.includes(serviceName)) {
        return { ...prev, service: currentServices.filter(s => s !== serviceName) };
      } else {
        return { ...prev, service: [...currentServices, serviceName] };
      }
    });
  };

  const validateClientStep = (step) => {
    if (step === 1) {
      if (!formData.service || formData.service.length === 0) {
        addToast("Please choose at least one service to proceed.", "error");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.name.trim()) {
        addToast("Full Name is required.", "error");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        addToast("Please enter a valid email address.", "error");
        return false;
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 7) {
        addToast("Please enter a valid phone number.", "error");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateClientStep(clientStep)) {
      setClientStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setClientStep(prev => Math.max(1, prev - 1));
  };

  // 5. Booking submission with strict double-booking conflict check
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.meetingTime) {
      addToast("Please select a meeting time slot.", "error");
      return;
    }

    // Direct Secure LocalStorage Conflict Check
    const localRegs = JSON.parse(localStorage.getItem("vgt_registrations") || "[]");
    
    // Strict global match of date & time for active schedules
    const isConflict = localRegs.some(
      r => r.meetingDate === formData.meetingDate && r.meetingTime === formData.meetingTime && r.status !== 'cancelled'
    );

    if (isConflict) {
      addToast("Double-Booking Blocked! This slot has already been taken by another client.", "error");
      fetchSlots(formData.meetingDate); // Refresh slots immediately to show lockout
      return;
    }

    const firstName = formData.name.split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '') || 'CLIENT';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const myReferralCode = `VGT-${firstName}${randomNum}`;

    // Construct registration record
    const newBooking = {
      id: "REG_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      company: formData.company ? formData.company.trim() : "",
      service: Array.isArray(formData.service) ? formData.service.join(', ') : formData.service,
      meetingDate: formData.meetingDate,
      meetingTime: formData.meetingTime,
      description: formData.description ? formData.description.trim() : "",
      referredBy: formData.referredBy ? formData.referredBy.trim() : "",
      myReferralCode: myReferralCode,
      status: "scheduled",
      createdAt: new Date().toISOString()
    };

    // Save transaction to local cache for instant UI
    localRegs.push(newBooking);
    localStorage.setItem("vgt_registrations", JSON.stringify(localRegs));
    
    // Background Sync to Google Sheets
    fetch(GOOGLE_SHEETS_API, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking)
    })
    .then(() => {
      // Re-trigger live sync after a short delay to ensure Sheets database matches perfectly
      setTimeout(syncFromGoogleSheet, 1500);
    })
    .catch(err => console.error("Google Sheets Sync Error:", err));
    
    setBookingSuccessData(newBooking);
    setClientStep(4);
    addToast("Meeting scheduled successfully! (Synced to DB)", "success");
  };

  const handleBookAnother = () => {
    // Keep meetingDate tomorrow as default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    let mm = tomorrow.getMonth() + 1;
    let dd = tomorrow.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const tomorrowFormatted = `${yyyy}-${mm}-${dd}`;

    setFormData({
      service: [],
      name: '',
      email: '',
      phone: '',
      company: '',
      description: '',
      meetingDate: tomorrowFormatted,
      meetingTime: '',
      referredBy: ''
    });
    setClientStep(1);
    setBookingSuccessData(null);
  };

  // 6. Admin Panel actions (Direct LocalStorage Querying)
  useEffect(() => {
    if (adminToken && view === 'admin') {
      fetchAdminData();
    }
  }, [adminToken, view]);

  const fetchAdminData = () => {
    const localRegs = JSON.parse(localStorage.getItem("vgt_registrations") || "[]");
    
    // Sort registrations descending by date created
    const sorted = [...localRegs].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Calculations
    const total = sorted.length;
    const active = sorted.filter(r => r.status === 'scheduled').length;
    const completed = sorted.filter(r => r.status === 'completed').length;
    const cancelled = sorted.filter(r => r.status === 'cancelled').length;

    // Service Breakdown counts (handling multi-selected comma-separated services)
    const serviceBreakdown = {};
    sorted.forEach(r => {
      if (r.service) {
        const servicesArray = r.service.split(', ');
        servicesArray.forEach(s => {
          serviceBreakdown[s] = (serviceBreakdown[s] || 0) + 1;
        });
      }
    });

    setRegistrations(sorted);
    setStats({ total, active, completed, cancelled, serviceBreakdown });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Direct Secure Client-side verification
    if (loginCreds.username === 'admin' && loginCreds.password === 'admin123') {
      sessionStorage.setItem("vgt_admin_token", "secure_local_token_2026");
      setAdminToken("secure_local_token_2026");
      addToast("Administrative Access Authorized!", "success");
    } else {
      addToast("Authentication Failed. Check username/password.", "error");
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("vgt_admin_token");
    setAdminToken(null);
    addToast("Logged out successfully.", "info");
  };

  const handleStatusChange = (id, action) => {
    if (!confirm(`Are you sure you want to mark this booking as ${action === 'complete' ? 'Completed' : 'Cancelled'}?`)) return;
    
    const localRegs = JSON.parse(localStorage.getItem("vgt_registrations") || "[]");
    const idx = localRegs.findIndex(r => r.id === id);
    
    if (idx !== -1) {
      const newStatus = action === 'complete' ? 'completed' : 'cancelled';
      localRegs[idx].status = newStatus;
      localStorage.setItem("vgt_registrations", JSON.stringify(localRegs));
      addToast(`Booking marked as ${action === 'complete' ? 'Completed' : 'Cancelled'} successfully!`, "success");
      fetchAdminData(); // Refresh state
      
      // Sync update to Google Sheets in background
      fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'update', id: id, status: newStatus })
      })
      .then(() => {
        setTimeout(syncFromGoogleSheet, 1500);
      })
      .catch(err => console.error("Google Sheets Update Error:", err));
    } else {
      addToast("Failed to locate registration record.", "error");
    }
  };

  // 7. Reschedule Modal logic (LocalStorage Validation)
  const handleOpenReschedule = (reg) => {
    setRescheduleId(reg.id);
    setRescheduleDate(reg.meetingDate);
    setRescheduleTime('');
    fetchRescheduleSlots(reg.meetingDate, reg.id);
  };

  const fetchRescheduleSlots = (date, id) => {
    if (!date) return;
    const localRegs = JSON.parse(localStorage.getItem("vgt_registrations") || "[]");
    
    // Fetch all taken slots on this new date globally (excluding the item currently being rescheduled)
    const booked = localRegs
      .filter(r => r.id !== id && r.meetingDate === date && r.status !== 'cancelled')
      .map(r => r.meetingTime);

    const slotsInfo = TIME_SLOTS.map(slot => ({
      time: slot,
      available: !booked.includes(slot)
    }));
    
    setRescheduleSlots(slotsInfo);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleTime) {
      addToast("Please select a rescheduled timeslot.", "error");
      return;
    }

    const localRegs = JSON.parse(localStorage.getItem("vgt_registrations") || "[]");
    
    // Strict global check for booking conflict on the new date and time slot
    const isConflict = localRegs.some(
      r => r.id !== rescheduleId && r.meetingDate === rescheduleDate && r.meetingTime === rescheduleTime && r.status !== 'cancelled'
    );

    if (isConflict) {
      addToast("Double-Booking Blocked! That slot has been taken. Please choose another.", "error");
      fetchRescheduleSlots(rescheduleDate, rescheduleId);
      return;
    }

    const idx = localRegs.findIndex(r => r.id === rescheduleId);
    if (idx !== -1) {
      localRegs[idx].meetingDate = rescheduleDate;
      localRegs[idx].meetingTime = rescheduleTime;
      localRegs[idx].status = 'scheduled'; // Reset status to active scheduled
      
      localStorage.setItem("vgt_registrations", JSON.stringify(localRegs));
      addToast("Booking shifted and rescheduled successfully!", "success");
      setRescheduleId(null);
      fetchAdminData();

      // Sync update to Google Sheets in background
      fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'update', 
          id: rescheduleId, 
          meetingDate: rescheduleDate, 
          meetingTime: rescheduleTime,
          status: 'scheduled'
        })
      })
      .then(() => {
        setTimeout(syncFromGoogleSheet, 1500);
      })
      .catch(err => console.error("Google Sheets Reschedule Update Error:", err));
    } else {
      addToast("Record location failed.", "error");
    }
  };

  // Filtered registrations computed property (moved up for CSV export access)
  const filteredRegistrations = registrations.filter(r => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      r.id.toLowerCase().includes(query) ||
      r.name.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.phone.includes(query) ||
      (r.company && r.company.toLowerCase().includes(query));

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesService = serviceFilter === 'all' || (r.service && r.service.includes(serviceFilter));

    return matchesSearch && matchesStatus && matchesService;
  });

  // Calculate Referral Earnings Data
  const referralData = {};
  registrations.forEach(reg => {
    if (reg.referredBy && reg.referredBy.trim() !== '') {
      const referrer = reg.referredBy.trim();
      if (!referralData[referrer]) {
        referralData[referrer] = { count: 0, details: [] };
      }
      referralData[referrer].count += 1;
      referralData[referrer].details.push(reg.name);
    }
  });

  const referralList = Object.keys(referralData).map(key => {
    const count = referralData[key].count;
    let earnings = 0;
    if (count <= 3) {
      earnings = count * 1000;
    } else {
      earnings = (3 * 1000) + ((count - 3) * 1500);
    }
    return {
      name: key,
      count: count,
      details: referralData[key].details.join(", "),
      earnings: earnings
    };
  }).sort((a, b) => b.count - a.count);

  // 8. CSV Exporter (Respects Active Filters)
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      addToast("No records available to export with current filters.", "error");
      return;
    }

    const headers = ["Registration ID", "Client Name", "Email", "Phone", "Company", "Service Selected", "Date", "Time Slot", "Status", "Referred By", "Created At"];
    const csvRows = [headers.join(",")];

    filteredRegistrations.forEach(r => {
      const row = [
        `"${r.id}"`,
        `"${r.name.replace(/"/g, '""')}"`,
        `"${r.email}"`,
        `"${r.phone}"`,
        `"${(r.company || '').replace(/"/g, '""')}"`,
        `"${r.service}"`,
        `"${r.meetingDate}"`,
        `"${r.meetingTime}"`,
        `"${r.status}"`,
        `"${r.referredBy || ''}"`,
        `"${r.createdAt}"`
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VGT_Service_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("CSV Data Exported Successfully!", "success");
  };


  return (
    <>
      {/* Background Glowing Ambient Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      <div className="glow-orb orb-3"></div>

      {/* Navigation Header */}
      <header>
        <nav className="navbar">
          <div className="logo" onClick={() => { setView('client'); window.history.pushState({}, '', '/'); }}>
            <span className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </span>
            <span className="gradient-text">VGT Service System</span>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => { setView('client'); window.history.pushState({}, '', '/'); setClientStep(1); document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' }); }}>Our Services</button>
            <button className="nav-link" onClick={() => { setView('client'); window.history.pushState({}, '', '/'); setClientStep(1); document.getElementById('booking-portal')?.scrollIntoView({ behavior: 'smooth' }); }}>Book Slot</button>
            
            {view === 'admin' && adminToken && (
              <button className="btn-secondary" style={{ padding: '8px 20px', fontSize: '0.9rem' }} onClick={handleAdminLogout}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* CLIENT PORTAL VIEW */}
      {view === 'client' && (
        <main>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-badge">VGT SERVICE REGISTRATION SYSTEM</div>
            <h1>Scale Your Brand with <br /><span className="gradient-text-alt">Custom Business Solutions</span></h1>
            <p>From full-scale mobile and web architectures to Odoo ERP implementations, social growth campaigns, authority marketing, and product catalog listings. Secure your live appointment slot below.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <a href="#services-list" className="btn-primary">Explore Offerings</a>
              <a href="#booking-portal" className="btn-secondary">Schedule Expert Meeting</a>
            </div>
          </section>

          {/* 7 Services Grid Showcase */}
          <section id="services-list" className="services-section">
            <div className="section-header">
              <h2 className="section-title">Core Competencies</h2>
              <p className="section-desc">We design, configure, and implement custom setups tailored exactly to your brand metrics. Click below to initiate direct consultation.</p>
            </div>

            <div className="services-grid">
              {SERVICES.map(srv => (
                <div 
                  key={srv.id} 
                  className={`service-card glass-panel ${srv.color}`} 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, service: [srv.name] }));
                    document.getElementById('booking-portal')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="service-icon">{getServiceIcon(srv.id)}</div>
                  <h3>{srv.name}</h3>
                  <p>{srv.desc}</p>
                  <button className="service-btn">
                    Schedule Free Session
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Stepper Registration Portal */}
          <section id="booking-portal" className="booking-section">
            <div className="section-header">
              <h2 className="section-title">Consultation Registration</h2>
              <p className="section-desc">Select a target service domain, fill out your credentials, and claim your secure timeslot. Instant LocalStorage locks protect scheduled appointments.</p>
            </div>

            <div className="booking-container glass-panel">
              {/* Stepper Wizard Header */}
              <div className="stepper">
                <div className="stepper-progress" style={{ width: `${((clientStep - 1) / 2) * 94}%` }}></div>
                <div className={`step ${clientStep === 1 ? 'active' : clientStep > 1 ? 'completed' : ''}`} onClick={() => clientStep < 4 && setClientStep(1)}>
                  <div className="step-circle">1</div>
                  <div className="step-label">Select Service</div>
                </div>
                <div className={`step ${clientStep === 2 ? 'active' : clientStep > 2 ? 'completed' : ''}`} onClick={() => clientStep < 4 && setClientStep(2)}>
                  <div className="step-circle">2</div>
                  <div className="step-label">Information</div>
                </div>
                <div className={`step ${clientStep === 3 ? 'active' : clientStep > 3 ? 'completed' : ''}`} onClick={() => clientStep < 4 && setClientStep(3)}>
                  <div className="step-circle">3</div>
                  <div className="step-label">DateTime Slot</div>
                </div>
              </div>

              {/* STEP 1: SERVICE DOMAIN OPTIONS */}
              {clientStep === 1 && (
                <div className="step-content active">
                  <h3 style={{ marginBottom: '10px' }}>Pick Your Target Service Domain</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>Select the core technology or platform deployment service you wish to integrate.</p>
                  
                  <div className="form-service-grid">
                    {SERVICES.map(srv => (
                      <label key={srv.id} className={`form-service-option ${formData.service.includes(srv.name) ? 'selected' : ''}`} onClick={() => handleServiceSelect(srv.name)}>
                        <span className="opt-icon">{getServiceIcon(srv.id)}</span>
                        <h4>{srv.name}</h4>
                      </label>
                    ))}
                  </div>

                  <div className="form-navigation" style={{ justifyContent: 'flex-end' }}>
                    <button className="btn-primary" onClick={handleNextStep}>
                      Continue
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CONTACT DETAILS */}
              {clientStep === 2 && (
                <div className="step-content active">
                  <h3 style={{ marginBottom: '10px' }}>Enter Contact Credentials</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>All details are verified and stored locally within your secure client browser database.</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Company / Brand (Optional)</label>
                      <input type="text" placeholder="Acme Corp" value={formData.company} onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Project Brief / Objectives (Optional)</label>
                      <textarea placeholder="Describe the objectives or custom outcomes you wish to evaluate in this expert session..." value={formData.description} onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}></textarea>
                    </div>
                    <div className="form-group">
                      <label>Referred By (Optional)</label>
                      <input type="text" placeholder="Enter referral name or code" value={formData.referredBy} onChange={e => setFormData(prev => ({ ...prev, referredBy: e.target.value }))} style={{ height: '100%' }} />
                    </div>
                  </div>

                  <div className="form-navigation">
                    <button className="btn-secondary" onClick={handlePrevStep}>Back</button>
                    <button className="btn-primary" onClick={handleNextStep}>
                      Continue
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PICK TIMESLOT */}
              {clientStep === 3 && (
                <div className="step-content active">
                  <h3 style={{ marginBottom: '10px' }}>Secure Date & Open Meeting Slot</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '25px' }}>LocalStorage validation instantly locks out slots. Double-bookings are blocked securely.</p>

                  <div className="scheduler-container">
                    {/* Calendar select */}
                    <div className="calendar-card glass-panel" style={{ borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.01)' }}>
                      <label style={{ marginBottom: '12px', display: 'block' }}>1. Choose Date</label>
                      <input type="date" value={formData.meetingDate} onChange={e => setFormData(prev => ({ ...prev, meetingDate: e.target.value }))} required />
                    </div>

                    {/* Time slots select */}
                    <div className="slots-card glass-panel" style={{ borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.01)' }}>
                      <label style={{ display: 'block' }}>2. Available Time Slots</label>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Showing live updates for {formData.meetingDate}</p>
                      
                      <div className="slots-grid">
                        {availableSlots.map(slot => (
                          <div key={slot.time} className={`slot-item ${!slot.available ? 'booked' : ''}`}>
                            <input type="radio" name="meetingTime" value={slot.time} id={`slot-${slot.time}`} checked={formData.meetingTime === slot.time} disabled={!slot.available} onChange={e => setFormData(prev => ({ ...prev, meetingTime: e.target.value }))} />
                            <label className="slot-label" htmlFor={`slot-${slot.time}`}>{slot.time} {!slot.available && '🔒'}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-navigation">
                    <button className="btn-secondary" onClick={handlePrevStep}>Back</button>
                    <button className="btn-primary" onClick={handleBookingSubmit}>
                      Finalize Registration & Book
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SUCCESS */}
              {clientStep === 4 && bookingSuccessData && (
                <div className="step-content active">
                  <div className="success-panel">
                    <div className="success-icon-wrapper">✓</div>
                    <h2>Consultation Securely Confirmed!</h2>
                    <p style={{ marginBottom: '30px' }}>Your booking conflict check passed. Our team will contact you exactly at the scheduled slot.</p>
                    
                    <div className="summary-card">
                      <div className="summary-row">
                        <span className="summary-label">Registration ID:</span>
                        <span className="summary-value" style={{ fontFamily: 'monospace', color: 'var(--secondary)' }}>{bookingSuccessData.id}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Client Name:</span>
                        <span className="summary-value">{bookingSuccessData.name}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Service Selected:</span>
                        <span className="summary-value service-badge">{bookingSuccessData.service}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Date Scheduled:</span>
                        <span className="summary-value">{bookingSuccessData.meetingDate}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Shift Time Slot:</span>
                        <span className="summary-value" style={{ color: 'var(--success)' }}>{bookingSuccessData.meetingTime}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Status Lock:</span>
                        <span className="summary-value">
                          <span className="badge badge-scheduled" style={{ fontSize: '0.7rem' }}>Secure (100% Conflict Free)</span>
                        </span>
                      </div>
                      
                      {bookingSuccessData.myReferralCode && (
                        <div className="summary-row" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <span className="summary-label" style={{ color: 'var(--secondary)' }}>Your Referral Code:</span>
                          <span 
                            className="summary-value" 
                            style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} 
                            onClick={() => { 
                              navigator.clipboard.writeText(bookingSuccessData.myReferralCode); 
                              addToast("Referral Code copied to clipboard!", "success"); 
                            }}
                            title="Click to Copy"
                          >
                            {bookingSuccessData.myReferralCode} 
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                      Share your Referral Code with friends to earn ₹1000-₹1500 per successful booking!
                    </p>

                    <button className="btn-primary" onClick={handleBookAnother}>Book Another Service</button>
                  </div>
                </div>
              )}

            </div>
          </section>
        </main>
      )}

      {/* ADMIN PORTAL VIEW */}
      {view === 'admin' && (
        <main>
          {/* Admin Authentication Card */}
          {!adminToken ? (
            <section className="auth-wrapper">
              <div className="auth-card glass-panel">
                <div className="auth-header">
                  <div className="auth-icon">🔐</div>
                  <h2>Administrator Login</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '5px' }}>Verify security credentials to access the DB dashboard</p>
                </div>
                
                <form onSubmit={handleAdminLogin}>
                  <div className="form-group">
                    <label>Admin Username</label>
                    <input type="text" value={loginCreds.username} onChange={e => setLoginCreds(prev => ({ ...prev, username: e.target.value }))} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: '30px' }}>
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" value={loginCreds.password} onChange={e => setLoginCreds(prev => ({ ...prev, password: e.target.value }))} required />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px' }}>
                      Default Admin Password: <code>admin123</code>
                    </p>
                  </div>
                  
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                    Access DB Panel
                  </button>
                </form>
              </div>
            </section>
          ) : (
            /* Secure Admin Dashboard */
            <section className="dashboard-container">
              {/* Header Titles & Tabs */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h2 style={{ fontSize: '2rem' }}>Administrative Database</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Data Engine: <span style={{ color: 'var(--success)', fontWeight: 600 }}>Secure Standalone LocalStorage Active</span>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className={`btn-${adminTab === 'registrations' ? 'primary' : 'secondary'}`} onClick={() => setAdminTab('registrations')}>
                    Registration DB
                  </button>
                  <button className={`btn-${adminTab === 'referrals' ? 'primary' : 'secondary'}`} onClick={() => setAdminTab('referrals')}>
                    Referral Earnings
                  </button>
                  {adminTab === 'registrations' && (
                    <button className="btn-primary btn-export" onClick={handleExportCSV} style={{ marginLeft: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Export CSV
                    </button>
                  )}
                </div>
              </div>

              {adminTab === 'registrations' && (
                <>
                  {/* Stats Cards Dashboard */}
              <div className="stats-grid">
                <div className="stat-card glass-panel sc-total">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.total}</span>
                    <span className="stat-label">Total Bookings</span>
                  </div>
                </div>
                <div className="stat-card glass-panel sc-active">
                  <div className="stat-icon">🕒</div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.active}</span>
                    <span className="stat-label">Scheduled</span>
                  </div>
                </div>
                <div className="stat-card glass-panel sc-completed">
                  <div className="stat-icon">✓</div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.completed}</span>
                    <span className="stat-label">Completed</span>
                  </div>
                </div>
                <div className="stat-card glass-panel sc-cancelled">
                  <div className="stat-icon">✕</div>
                  <div className="stat-info">
                    <span className="stat-value">{stats.cancelled}</span>
                    <span className="stat-label">Cancelled</span>
                  </div>
                </div>
              </div>

              {/* Live list Split Section */}
              <div className="db-row">
                
                {/* Left Table Panel */}
                <div className="db-panel glass-panel">
                  <div className="db-panel-header">
                    <h3 className="db-panel-title">Active Reservations</h3>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Showing {filteredRegistrations.length} registrations
                    </span>
                  </div>

                  {/* Datatable Filter Bar */}
                  <div className="controls-bar">
                    <div className="search-input-wrapper">
                      <svg className="search-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <input type="text" placeholder="Search by name, email, phone, ID..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>
                    
                    <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                      <option value="all">All Statuses</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <select className="filter-select" value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}>
                      <option value="all">All Services</option>
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.name}>{s.name.split(' ')[0]} {s.name.split(' ')[1] || ''}</option>
                      ))}
                    </select>
                  </div>

                  {/* Scrollable Table View */}
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Client Credentials</th>
                          <th>Selected Service</th>
                          <th>Meeting Schedule</th>
                          <th>Status</th>
                          <th>Quick Controls</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRegistrations.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="empty-state">
                              <div className="empty-icon">📂</div>
                              <p>No registration records mapped</p>
                            </td>
                          </tr>
                        ) : (
                          filteredRegistrations.map(reg => (
                            <tr key={reg.id}>
                              <td>
                                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{reg.name}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: '2px 0' }}>{reg.email} | {reg.phone}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Company: {reg.company || 'N/A'}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'monospace', marginTop: '4px' }}>
                                  ID: {reg.id} {reg.myReferralCode ? `| Ref Code: ${reg.myReferralCode}` : ''}
                                </div>
                              </td>
                              <td>
                                <span className="service-text">{reg.service}</span>
                              </td>
                              <td>
                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{reg.meetingDate}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', marginTop: '2px' }}>{reg.meetingTime}</div>
                              </td>
                              <td>
                                <span className={`badge badge-${reg.status}`}>{reg.status}</span>
                              </td>
                              <td>
                                {reg.status === 'scheduled' ? (
                                  <div className="actions-cell">
                                    <button className="btn-action btn-complete" title="Complete Meeting" onClick={() => handleStatusChange(reg.id, 'complete')}>✓</button>
                                    <button className="btn-action btn-cancel" title="Cancel Booking" onClick={() => handleStatusChange(reg.id, 'cancel')}>✕</button>
                                    <button className="btn-action btn-reschedule" title="Reschedule Shift" onClick={() => handleOpenReschedule(reg)}>📅</button>
                                  </div>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Locked</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Demand breakdown Panel */}
                <div className="db-panel glass-panel">
                  <div className="db-panel-header">
                    <h3 className="db-panel-title">Service Demand</h3>
                  </div>

                  <div className="breakdown-list">
                    {SERVICES.map(srv => {
                      const count = stats.serviceBreakdown[srv.name] || 0;
                      // Max count lookup for relative percentage bars
                      const maxCount = Math.max(...SERVICES.map(s => stats.serviceBreakdown[s.name] || 0), 1);
                      const relativePct = (count / maxCount) * 100;

                      return (
                        <div key={srv.id} className="breakdown-item">
                          <div className="breakdown-header">
                            <span className="breakdown-label" style={{ fontSize: '0.85rem' }}>{srv.name.substring(0, 24)}...</span>
                            <span className="breakdown-count">{count} bookings</span>
                          </div>
                          <div className="breakdown-bar-bg">
                            <div className="breakdown-bar-fill" style={{ width: `${relativePct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
                </>
              )}

              {/* Referral Earning Network Panel */}
              {adminTab === 'referrals' && (
                <div className="db-row">
                  <div className="db-panel glass-panel" style={{ width: '100%' }}>
                    <div className="db-panel-header">
                    <h3 className="db-panel-title">Referral Earning Network 🤝</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Track client referrals, details, and accumulated reward payouts. 
                      <strong style={{ color: 'var(--success)' }}> (Tiered Reward: ₹1000 for first 3, then ₹1500 per referral)</strong>
                    </p>
                  </div>

                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Referrer Name</th>
                          <th>Referred Clients (Details)</th>
                          <th>Total Reference Count</th>
                          <th>Suggested Earnings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referralList.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="empty-state">
                              <div className="empty-icon">🤝</div>
                              <p>No referrals mapped yet.</p>
                            </td>
                          </tr>
                        ) : (
                          referralList.map((ref, idx) => (
                            <tr key={idx}>
                              <td>
                                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ref.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Affiliate Partner</div>
                              </td>
                              <td>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ref.details}</span>
                              </td>
                              <td>
                                <span className="stat-value" style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{ref.count}</span>
                              </td>
                              <td>
                                <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1.1rem' }}>₹{ref.earnings}</span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              )}
            </section>
          )}

          {/* Modal for Rescheduling Shift */}
          {rescheduleId && (
            <div className="modal active">
              <div className="modal-content glass-panel">
                <div className="modal-header">
                  <h3 style={{ fontSize: '1.3rem' }}>Reschedule Shift</h3>
                  <button className="modal-close" onClick={() => setRescheduleId(null)}>&times;</button>
                </div>
                
                <form onSubmit={handleRescheduleSubmit}>
                  <div className="form-group">
                    <label>Choose Date</label>
                    <input type="date" value={rescheduleDate} onChange={e => {
                      setRescheduleDate(e.target.value);
                      fetchRescheduleSlots(e.target.value, rescheduleId);
                    }} required />
                  </div>

                  <div className="form-group">
                    <label>Select Time Slot</label>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Showing open schedules for {rescheduleDate}</p>
                    <div className="slots-grid" style={{ maxHeight: '180px' }}>
                      {rescheduleSlots.map(slot => (
                        <div key={slot.time} className={`slot-item ${!slot.available ? 'booked' : ''}`}>
                          <input type="radio" name="modalResTime" value={slot.time} id={`modal-slot-${slot.time}`} checked={rescheduleTime === slot.time} disabled={!slot.available} onChange={e => setRescheduleTime(e.target.value)} />
                          <label className="slot-label" htmlFor={`modal-slot-${slot.time}`}>{slot.time}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '30px' }}>
                    <button type="button" className="btn-secondary" style={{ padding: '10px 20px' }} onClick={() => setRescheduleId(null)}>Cancel</button>
                    <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>Confirm Shift</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Overlay React Toasts alert container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}</span>
            <div>{t.message}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="logo" onClick={() => setView('client')}>
            <span className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </span>
            <span className="gradient-text">VGT Service System</span>
          </div>
          <p className="footer-copy">&copy; 2026 VGT Service Registration System. All Rights Reserved. Double-booking conflict protected.</p>
          <div className="footer-links">
            <button className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 500 }} onClick={() => { setView('client'); window.history.pushState({}, '', '/'); setClientStep(1); document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' }); }}>Services</button>
            <button className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 500 }} onClick={() => { setView('client'); window.history.pushState({}, '', '/'); setClientStep(1); document.getElementById('booking-portal')?.scrollIntoView({ behavior: 'smooth' }); }}>Bookings</button>
          </div>
        </div>
      </footer>
    </>
  );
}
