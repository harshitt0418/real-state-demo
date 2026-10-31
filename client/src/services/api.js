/**
 * MIRĀS Real Estate Advisory — API Service Client
 * Connects to Express backend API with graceful fallback to sample dataset
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch properties with query parameters
 */
export async function fetchProperties(params = {}) {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '' && val !== 'all') {
        query.append(key, val);
      }
    });

    const res = await fetch(`${API_BASE}/properties?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('[API Client] Falling back to bundled dataset:', error.message);
    const { fallbackProperties } = await import('../data/staticFallback.js');
    let list = [...fallbackProperties];

    if (params.city && params.city !== 'all') {
      list = list.filter(p => p.city.toLowerCase() === params.city.toLowerCase());
    }
    if (params.type && params.type !== 'all') {
      list = list.filter(p => p.type.toLowerCase() === params.type.toLowerCase());
    }
    if (params.featured === 'true') {
      list = list.filter(p => p.featured);
    }
    if (params.beds && params.beds !== 'all') {
      list = list.filter(p => p.beds >= Number(params.beds));
    }
    if (params.minPrice) {
      list = list.filter(p => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice) {
      list = list.filter(p => p.price <= Number(params.maxPrice));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.district.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q)
      );
    }

    return {
      success: true,
      count: list.length,
      dataSource: 'Bundled Local Fallback',
      notice: 'Operating with bundled dataset (Backend offline or unreachable).',
      data: list
    };
  }
}

/**
 * Fetch single property by slug or ID
 */
export async function fetchPropertyById(id) {
  try {
    const res = await fetch(`${API_BASE}/properties/${id}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`[API Client] Fetching property ${id} from fallback:`, error.message);
    const { fallbackProperties } = await import('../data/staticFallback.js');
    const item = fallbackProperties.find(p => p.id === id);
    if (!item) {
      return { success: false, message: 'Property not found' };
    }
    return {
      success: true,
      dataSource: 'Bundled Local Fallback',
      data: item
    };
  }
}

/**
 * Submit inquiry
 */
export async function submitInquiry(payload) {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Submission failed');
    return data;
  } catch (error) {
    console.warn('[API Client] Inquiry submission simulated:', error.message);
    return {
      success: true,
      message: 'Your advisory inquiry has been received (Demo simulation mode). A senior advisor will contact you shortly.',
      dataSource: 'Local Simulation Fallback',
      data: {
        id: `inq-local-${Date.now()}`,
        ...payload,
        createdAt: new Date().toISOString(),
        status: 'New'
      }
    };
  }
}

/**
 * Fetch inquiries for dashboard
 */
export async function fetchInquiries(params = {}) {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '' && val !== 'all') {
        query.append(key, val);
      }
    });

    const res = await fetch(`${API_BASE}/inquiries?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    const { fallbackInquiries } = await import('../data/staticFallback.js');
    return {
      success: true,
      count: fallbackInquiries.length,
      dataSource: 'Bundled Local Fallback',
      data: fallbackInquiries
    };
  }
}

/**
 * Fetch stats & system health
 */
export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (error) {
    return {
      success: true,
      system: {
        serverTime: new Date().toISOString(),
        database: {
          connected: false,
          mode: 'Bundled Client Dataset (Server Unreachable)',
          uri: 'N/A'
        }
      },
      portfolio: {
        totalListings: 7,
        totalInquiriesRegistered: 3,
        representedDevelopersCount: 18,
        portfolioValue: 'SAR 840M+',
        averageGrossYield: '7.6%',
        corridors: [
          { name: 'Riyadh', curatedPropertiesCount: 4, averageAppreciation: '+11.2% YoY' },
          { name: 'Jeddah', curatedPropertiesCount: 2, averageAppreciation: '+8.7% YoY' },
          { name: 'Al Khobar', curatedPropertiesCount: 1, averageAppreciation: '+7.4% YoY' }
        ]
      }
    };
  }
}
