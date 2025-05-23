// Global variables
let allLeads = [];
let filteredLeads = [];
let consultants = [];
let queues = [];
let currentPage = 1;
let pageSize = 10;
let sortField = null;
let sortDirection = 'asc';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const consultantFilter = document.getElementById('consultantFilter');
const queueFilter = document.getElementById('queueFilter');
const refreshBtn = document.getElementById('refreshBtn');
const exportBtn = document.getElementById('exportBtn');
const leadsTableBody = document.getElementById('leadsTableBody');
const loadingSpinner = document.getElementById('loadingSpinner');
const modal = document.getElementById('leadModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBody = document.getElementById('modalBody');
const paginationInfo = document.getElementById('paginationInfo');
const pageNumbers = document.getElementById('pageNumbers');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageSizeSelect = document.getElementById('pageSizeSelect');

// Dark Mode Elements (added for this task)
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;


// Sample data (simulating API response)
const sampleData = {
    leads: [
        {
            id: 1,
            name: "Roberto Silva",
            email: "roberto.silva@email.com",
            company: "TechCorp Ltda",
            consultantId: 1,
            queue: "Fila A",
            shortLink: "https://short.ly/abc123",
            originalLink: "https://example.com/lead/1",
            createdAt: new Date('2024-01-15T10:30:00'),
            clickedAt: new Date('2024-01-15T11:15:00'),
            isAttended: true
        },
        {
            id: 2,
            name: "Maria Santos",
            email: "maria.santos@company.com",
            company: "Inovação Digital",
            consultantId: 2,
            queue: "Fila B",
            shortLink: "https://short.ly/def456",
            originalLink: "https://example.com/lead/2",
            createdAt: new Date('2024-01-15T09:00:00'),
            clickedAt: new Date('2024-01-15T09:30:00'),
            isAttended: true
        },
        {
            id: 3,
            name: "João Oliveira",
            email: "joao.oliveira@startup.io",
            company: "StartupX",
            consultantId: 3,
            queue: "Fila Outbound",
            shortLink: "https://short.ly/ghi789",
            originalLink: "https://example.com/lead/3",
            createdAt: new Date('2024-01-15T14:00:00'),
            clickedAt: null,
            isAttended: false
        },
        {
            id: 4,
            name: "Fernanda Costa",
            email: "fernanda@consultoria.com",
            company: "Consultoria Premium",
            consultantId: 4,
            queue: "Fila Licitação",
            shortLink: "https://short.ly/jkl012",
            originalLink: "https://example.com/lead/4",
            createdAt: new Date('2024-01-15T16:00:00'),
            clickedAt: new Date('2024-01-15T16:45:00'),
            isAttended: true
        },
        {
            id: 5,
            name: "Carlos Mendes",
            email: "carlos@empresa.com.br",
            company: "Soluções Integradas",
            consultantId: 1,
            queue: "Fila A",
            shortLink: "https://short.ly/mno345",
            originalLink: "https://example.com/lead/5",
            createdAt: new Date('2024-01-15T08:00:00'),
            clickedAt: null,
            isAttended: false
        },
        {
            id: 6,
            name: "Ana Paula",
            email: "ana.paula@vendas.com",
            company: "Vendas Pro",
            consultantId: 2,
            queue: "Fila B",
            shortLink: "https://short.ly/pqr678",
            originalLink: "https://example.com/lead/6",
            createdAt: new Date('2024-01-15T13:00:00'),
            clickedAt: new Date('2024-01-15T13:20:00'),
            isAttended: true
        },
        {
            id: 7,
            name: "Ricardo Lima",
            email: "ricardo@prospeccao.net",
            company: "Prospecção Total",
            consultantId: 3,
            queue: "Fila Outbound",
            shortLink: "https://short.ly/stu901",
            originalLink: "https://example.com/lead/7",
            createdAt: new Date('2024-01-15T15:00:00'),
            clickedAt: null,
            isAttended: false
        },
        {
            id: 8,
            name: "Luciana Rocha",
            email: "luciana@licitacoes.gov",
            company: "Governo Federal",
            consultantId: 4,
            queue: "Fila Licitação",
            shortLink: "https://short.ly/vwx234",
            originalLink: "https://example.com/lead/8",
            createdAt: new Date('2024-01-15T12:00:00'),
            clickedAt: new Date('2024-01-15T12:10:00'),
            isAttended: true
        },
        {
            id: 9,
            name: "Pedro Almeida",
            email: "pedro@tech.com",
            company: "Tech Solutions",
            consultantId: 1,
            queue: "Fila A",
            shortLink: "https://short.ly/yz567",
            originalLink: "https://example.com/lead/9",
            createdAt: new Date('2024-01-16T10:00:00'),
            clickedAt: null,
            isAttended: false
        },
        {
            id: 10,
            name: "Sofia Mendes",
            email: "sofia@marketing.com",
            company: "Marketing Digital",
            consultantId: 2,
            queue: "Fila B",
            shortLink: "https://short.ly/abc890",
            originalLink: "https://example.com/lead/10",
            createdAt: new Date('2024-01-16T11:00:00'),
            clickedAt: new Date('2024-01-16T11:30:00'),
            isAttended: true
        },
        {
            id: 11,
            name: "Gabriel Santos",
            email: "gabriel@vendas.net",
            company: "Vendas Online",
            consultantId: 3,
            queue: "Fila Outbound",
            shortLink: "https://short.ly/def123",
            originalLink: "https://example.com/lead/11",
            createdAt: new Date('2024-01-16T14:00:00'),
            clickedAt: null,
            isAttended: false
        },
        {
            id: 12,
            name: "Isabella Costa",
            email: "isabella@gov.br",
            company: "Prefeitura Municipal",
            consultantId: 4,
            queue: "Fila Licitação",
            shortLink: "https://short.ly/ghi456",
            originalLink: "https://example.com/lead/12",
            createdAt: new Date('2024-01-16T15:00:00'),
            clickedAt: new Date('2024-01-16T15:25:00'),
            isAttended: true
        }
    ],
    consultants: [
        { id: 1, name: "Ana Silva", initials: "AS", email: "ana.silva@company.com" },
        { id: 2, name: "Carlos Santos", initials: "CS", email: "carlos.santos@company.com" },
        { id: 3, name: "Maria Oliveira", initials: "MO", email: "maria.oliveira@company.com" },
        { id: 4, name: "João Ferreira", initials: "JF", email: "joao.ferreira@company.com" }
    ],
    queues: ["Fila A", "Fila B", "Fila Outbound", "Fila Licitação"]
};

// Utility functions
function showLoading() {
    loadingSpinner.classList.add('show');
}

function hideLoading() {
    loadingSpinner.classList.remove('show');
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
}

function calculateAttendanceTime(createdAt, clickedAt) {
    if (!clickedAt) return null;
    
    const diffMs = new Date(clickedAt).getTime() - new Date(createdAt).getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
        return `${hours}h ${minutes}min`;
    } else {
        return `${minutes}min`;
    }
}

function getLeadWithConsultant(lead) {
    const consultant = consultants.find(c => c.id === lead.consultantId);
    return {
        ...lead,
        consultant,
        attendanceTime: calculateAttendanceTime(lead.createdAt, lead.clickedAt)
    };
}

// API simulation
async function fetchData() {
    showLoading();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
        allLeads = sampleData.leads.map(getLeadWithConsultant);
        consultants = sampleData.consultants;
        queues = sampleData.queues;
        
        updateFilters();
        filterAndDisplayLeads();
        updateStats();
        
        hideLoading();
    } catch (error) {
        console.error('Error fetching data:', error);
        hideLoading();
    }
}

// Filter functions
function updateFilters() {
    // Update consultant filter
    consultantFilter.innerHTML = '<option value="">Todos os Consultores</option>';
    consultants.forEach(consultant => {
        const option = document.createElement('option');
        option.value = consultant.id;
        option.textContent = consultant.name;
        consultantFilter.appendChild(option);
    });
    
    // Update queue filter
    queueFilter.innerHTML = '<option value="">Todas as Filas</option>';
    queues.forEach(queue => {
        const option = document.createElement('option');
        option.value = queue;
        option.textContent = queue;
        queueFilter.appendChild(option);
    });
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const consultantValue = consultantFilter.value;
    const queueValue = queueFilter.value;
    
    filteredLeads = allLeads.filter(lead => {
        // Search filter
        const matchesSearch = !searchTerm || 
            lead.name.toLowerCase().includes(searchTerm) ||
            lead.company.toLowerCase().includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm);
        
        // Status filter
        const matchesStatus = !statusValue ||
            (statusValue === 'atendido' && lead.isAttended) ||
            (statusValue === 'nao-atendido' && !lead.isAttended);
        
        // Consultant filter
        const matchesConsultant = !consultantValue ||
            lead.consultantId.toString() === consultantValue;
        
        // Queue filter
        const matchesQueue = !queueValue ||
            lead.queue === queueValue;
        
        return matchesSearch && matchesStatus && matchesConsultant && matchesQueue;
    });
    
    // Apply sorting
    if (sortField) {
        filteredLeads.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            if (sortField === 'consultant') {
                aValue = a.consultant.name;
                bValue = b.consultant.name;
            }
            
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }
    
    currentPage = 1; // Reset to first page when filtering
}

function filterAndDisplayLeads() {
    applyFilters();
    displayLeads();
    updatePagination();
}

// Display functions
function displayLeads() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
    
    if (paginatedLeads.length === 0) {
        leadsTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state"> 
                    <div class="empty-state-icon">🔍</div>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Tente ajustar os filtros ou realizar uma nova busca.</p>
                </td>
            </tr>
        `;
        // No need to call lucide.createIcons() here as the empty state doesn't use them.
        return;
    }
    
    leadsTableBody.innerHTML = paginatedLeads.map(lead => {
        const statusClass = lead.isAttended ? 'status-attended' : 'status-pending';
        const statusText = lead.isAttended ? '✓ Atendido' : '⏰ Não Atendido';
        
        return `
            <tr class="clickable-row" onclick="viewLeadDetails(${lead.id})">
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td>
                    <div class="lead-info">
                        <div class="lead-name">${lead.name}</div>
                        <div class="lead-email">${lead.email}</div>
                    </div>
                </td>
                <td>${lead.company}</td>
                <td>
                    <span class="queue-badge">${lead.queue}</span>
                </td>
                <td>
                    <div class="consultant-info">
                        <span class="consultant-name">${lead.consultant.name}</span>
                    </div>
                </td>
                <td>${lead.attendanceTime || '-'}</td>
            </tr>
        `;
    }).join('');
    
    // Re-initialize Lucide icons after table rows are rendered
    if (typeof lucide !== 'undefined') { // Good practice to check if lucide is loaded
        lucide.createIcons();
    }
    adjustBadgeWidths(); // Call the new function
}

function updateStats() {
    const total = allLeads.length;
    const attended = allLeads.filter(lead => lead.isAttended).length;
    const pending = total - attended;
    const conversionRate = total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
    
    document.getElementById('totalLeads').textContent = total;
    document.getElementById('attendedLeads').textContent = attended;
    document.getElementById('pendingLeads').textContent = pending;
    document.getElementById('conversionRate').textContent = `${conversionRate}%`;
}

// Pagination functions
function updatePagination() {
    const totalPages = Math.ceil(filteredLeads.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, filteredLeads.length);
    
    // Update pagination info
    paginationInfo.textContent = `Mostrando ${filteredLeads.length === 0 ? 0 : startIndex} - ${endIndex} de ${filteredLeads.length} leads`;
    
    // Update page controls
    prevPageBtn.disabled = currentPage === 1 || totalPages === 0;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Update page numbers
    renderPageNumbers(totalPages);
}

function renderPageNumbers(totalPages) {
    pageNumbers.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredLeads.length / pageSize);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayLeads();
        updatePagination();
    }
}

function changePageSize() {
    pageSize = parseInt(pageSizeSelect.value);
    currentPage = 1;
    displayLeads();
    updatePagination();
}

// Modal functions
function viewLeadDetails(leadId) {
    const lead = allLeads.find(l => l.id === leadId);
    if (!lead) return;
    
    const statusClass = lead.isAttended ? 'status-attended' : 'status-pending';
    const statusText = lead.isAttended ? '✓ Atendido' : '⏰ Não Atendido';
    
    modalBody.innerHTML = `
        <div class="modal-field">
            <label class="modal-label">Status</label>
            <div><span class="status-badge ${statusClass}">${statusText}</span></div>
        </div>
        <div class="modal-field">
            <label class="modal-label">Nome</label>
            <p class="modal-value">${lead.name}</p>
        </div>
        <div class="modal-field">
            <label class="modal-label">Email</label>
            <p class="modal-value">${lead.email}</p>
        </div>
        <div class="modal-field">
            <label class="modal-label">Empresa</label>
            <p class="modal-value">${lead.company}</p>
        </div>
        <div class="modal-field">
            <label class="modal-label">Fila de Atendimento</label>
            <div><span class="queue-badge">${lead.queue}</span></div>
        </div>
        <div class="modal-field">
            <label class="modal-label">Consultor</label>
            <div class="consultant-info">
                <span class="consultant-name">${lead.consultant.name}</span>
            </div>
        </div>
        <div class="modal-field">
            <label class="modal-label">Data de Criação</label>
            <p class="modal-value">${formatDate(lead.createdAt)}</p>
        </div>
        ${lead.clickedAt ? `
            <div class="modal-field">
                <label class="modal-label">Data do Clique</label>
                <p class="modal-value">${formatDate(lead.clickedAt)}</p>
            </div>
        ` : ''}
        ${lead.attendanceTime ? `
            <div class="modal-field">
                <label class="modal-label">Tempo de Atendimento</label>
                <p class="modal-value">${lead.attendanceTime}</p>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

// Utility functions
function exportToCSV() {
    const headers = ['Status', 'Lead', 'Email', 'Empresa', 'Fila', 'Consultor', 'Tempo de Atendimento'];
    const rows = filteredLeads.map(lead => [
        lead.isAttended ? 'Atendido' : 'Não Atendido',
        lead.name,
        lead.email,
        lead.company,
        lead.queue,
        lead.consultant.name,
        lead.attendanceTime || '-'
    ]);
    
    const csvContent = [headers, ...rows]
        .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')) // Handle quotes in fields
        .join('\n');
    
    const blob = new Blob([String.fromCharCode(0xFEFF), csvContent], { type: 'text/csv;charset=utf-8;' }); // Add BOM for Excel
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'leads-report.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Sorting functions
function handleSort(field) {
    if (sortField === field) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortField = field;
        sortDirection = 'asc';
    }
    // Update sort icons
    document.querySelectorAll('th[data-sort]').forEach(th => {
        const icon = th.querySelector('.sort-icon');
        if (icon) { // Check if icon element exists
            if (th.getAttribute('data-sort') === sortField) {
                icon.setAttribute('data-lucide', sortDirection === 'asc' ? 'arrow-up' : 'arrow-down');
            } else {
                icon.setAttribute('data-lucide', 'arrow-up-down');
            }
        }
    });
    lucide.createIcons(); // Refresh icons
    filterAndDisplayLeads();
}

// Function to adjust badge widths for consistency
function adjustBadgeWidths() {
    if (!leadsTableBody) return; // Ensure table body exists

    // Adjust status badges
    const statusBadges = leadsTableBody.querySelectorAll('.status-badge');
    if (statusBadges.length > 0) {
        let maxStatusWidth = 0;
        // First, reset minWidth for all badges to allow natural width calculation
        statusBadges.forEach(badge => {
            badge.style.minWidth = ''; 
        });

        // Use requestAnimationFrame to ensure styles are applied and reflow happens
        requestAnimationFrame(() => {
            // Measure all badges after reset
            statusBadges.forEach(badge => {
                // Ensure badge is visible before measuring, otherwise offsetWidth can be 0
                // This check might be overly cautious if badges are always visible when this runs
                if (badge.offsetParent !== null) { 
                    maxStatusWidth = Math.max(maxStatusWidth, badge.offsetWidth);
                }
            });

            // Apply the calculated max width to all badges
            // Only apply if a valid max width was found (greater than 0)
            if (maxStatusWidth > 0) {
                statusBadges.forEach(badge => {
                    badge.style.minWidth = maxStatusWidth + 'px';
                });
            }
        });
    }

    // Adjust queue badges
    const queueBadges = leadsTableBody.querySelectorAll('.queue-badge');
    if (queueBadges.length > 0) {
        let maxQueueWidth = 0;
        // First, reset minWidth for all badges
        queueBadges.forEach(badge => {
            badge.style.minWidth = '';
        });

        requestAnimationFrame(() => {
            // Measure all badges after reset
            queueBadges.forEach(badge => {
                if (badge.offsetParent !== null) {
                    maxQueueWidth = Math.max(maxQueueWidth, badge.offsetWidth);
                }
            });
            
            // Apply the calculated max width
            if (maxQueueWidth > 0) {
                queueBadges.forEach(badge => {
                    badge.style.minWidth = maxQueueWidth + 'px';
                });
            }
        });
    }
}


// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Logic
    const sunIcon = '<i data-lucide="sun"></i>';
    const moonIcon = '<i data-lucide="moon"></i>';

    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.innerHTML = sunIcon;
        localStorage.setItem('darkMode', 'enabled');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        if (darkModeToggle) darkModeToggle.innerHTML = moonIcon;
        localStorage.setItem('darkMode', 'disabled');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // Check local storage for mode preference
    // Ensure darkModeToggle exists before trying to set its content or add listeners
    if (darkModeToggle) {
        if (localStorage.getItem('darkMode') === 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode(); // Default to light mode, ensures moon icon is set
        }

        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
    // End Dark Mode Logic
    
    // Initialize Lucide icons (this will also render the initial dark mode toggle icon)
    if (typeof lucide !== 'undefined') lucide.createIcons();
    
    // Load initial data
    fetchData();
    
    // Filter event listeners
    if (searchInput) searchInput.addEventListener('input', filterAndDisplayLeads);
    if (statusFilter) statusFilter.addEventListener('change', filterAndDisplayLeads);
    if (consultantFilter) consultantFilter.addEventListener('change', filterAndDisplayLeads);
    if (queueFilter) queueFilter.addEventListener('change', filterAndDisplayLeads);
    
    // Button event listeners
    if (refreshBtn) refreshBtn.addEventListener('click', fetchData);
    if (exportBtn) exportBtn.addEventListener('click', exportToCSV);
    
    // Modal event listeners
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Pagination event listeners
    if (prevPageBtn) prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
    if (nextPageBtn) nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));
    if (pageSizeSelect) pageSizeSelect.addEventListener('change', changePageSize);
    
    // Sort event listeners
    document.querySelectorAll('th[data-sort]').forEach(header => {
        header.addEventListener('click', function() {
            const field = this.getAttribute('data-sort');
            handleSort(field);
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });
});