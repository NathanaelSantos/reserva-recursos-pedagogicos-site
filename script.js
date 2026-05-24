const APP_CONFIG = {
  // Depois de publicar o Google Apps Script, cole a URL aqui.
  // Ex.: "https://script.google.com/macros/s/AKfycb.../exec"
  apiUrl: "https://script.google.com/macros/s/AKfycbzzRewOMTZBLB9tbDuAjguqpCvBQ5KdLJ7ApUzbQ5M3dFbP5qBmhQtFuXzUa6BIzQ8P/exec"
};

const SHIFTS = [
  { id: "manha", label: "Manhã" },
  { id: "tarde", label: "Tarde" },
  { id: "noite", label: "Noite" }
];

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const DEFAULT_RESOURCES = [
  resource("datashow-069", "Equipamentos", "equipamento", "Datashow 069", "Epson cor branca"),
  resource("datashow-286", "Equipamentos", "equipamento", "Datashow 286", "Epson cor preta"),
  resource("datashow-560", "Equipamentos", "equipamento", "Datashow 560", "Epson cor preta"),
  resource("notebook-17320", "Equipamentos", "equipamento", "Notebook 17320", ""),
  resource("notebook-17868", "Equipamentos", "equipamento", "Notebook 17868", "Auditório"),
  resource("notebook-17327", "Equipamentos", "equipamento", "Notebook 17327", ""),
  resource("notebook-17321", "Equipamentos", "equipamento", "Notebook 17321", "Sem marca de uso"),
  resource("notebook-17324", "Equipamentos", "equipamento", "Notebook 17324", "Com marca de uso"),
  resource("multimeios", "Ambientes", "ambiente", "Multimeios", "05 comp. | 04 mesas | 17 cadeiras"),
  resource("007-01-massoterapia", "Laboratórios", "laboratorio", "007.01 Massoterapia", ""),
  resource("007-06-depilacao", "Laboratórios", "laboratorio", "007.06 Depilação", ""),
  resource("007-manicure-pedicure", "Laboratórios", "laboratorio", "007 Manicure e Pedicure", ""),
  resource("007-salao-beleza", "Laboratórios", "laboratorio", "007 Salão de Beleza", ""),
  resource("008-cozinha-quente", "Laboratórios", "laboratorio", "008 Cozinha quente", ""),
  resource("008-cozinha-fria", "Laboratórios", "laboratorio", "008 Cozinha fria", ""),
  resource("102-info", "Laboratórios", "laboratorio", "102 Laboratório de Informática", "TV LG 65\" Patr.: 23718 | 15 comp. | 15 cadeiras"),
  resource("103-info", "Laboratórios", "laboratorio", "103 Laboratório de Informática", "15 comp. | 15 cadeiras"),
  resource("104-sala", "Salas", "sala", "104 Sala de Aula", "8 mesas | 16 cadeiras"),
  resource("105-microsoft", "Laboratórios", "laboratorio", "105 Laboratório Microsoft", "10 mesas | 21 cadeiras"),
  resource("106-sala", "Salas", "sala", "106 Sala de Aula", "TV LG 65\" Patr.: 23721 | 16 mesas | 30 cadeiras"),
  resource("107-sala", "Salas", "sala", "107 Sala de Aula", "TV 32\" Patr.: 14930 | 29 carteiras"),
  resource("108-sala", "Salas", "sala", "108 Sala de Aula", "TV LG 65\" Patr.: 23723 | 29 carteiras"),
  resource("201-sala", "Salas", "sala", "201 Sala de Aula", "9 mesas | 18 cadeiras"),
  resource("202-simulacao", "Laboratórios", "laboratorio", "202 Laboratório de Simulação Realística", "6 cadeiras"),
  resource("203-sala", "Salas", "sala", "203 Sala de Aula", "TV LG 65\" Patr.: 23719 | 30 carteiras"),
  resource("204-enfermagem", "Laboratórios", "laboratorio", "204 Laboratório de Enfermagem", "14 mesas | 30 cadeiras"),
  resource("205-sala", "Salas", "sala", "205 Sala de Aula", "TV 32\" Patr.: s/n | 33 carteiras"),
  resource("206-sala", "Salas", "sala", "206 Sala de Aula", "TV LG 65\" Patr.: 23722 | 15 mesas | 29 cadeiras"),
  resource("207-sala", "Salas", "sala", "207 Sala de Aula", "29 carteiras"),
  resource("301-304-moda", "Laboratórios", "laboratorio", "301 - 304 Lab. de Moda", "29 cadeiras giratórias"),
  resource("302-sala", "Salas", "sala", "302 Sala de Aula", "TV LG 65\" Patr.: 23720 | 41 carteiras"),
  resource("305-sala", "Salas", "sala", "305 Sala de Aula", "12 mesas | 30 cadeiras"),
  resource("306-sala", "Salas", "sala", "306 Sala de Aula", "25 carteiras"),
  resource("307-sala", "Salas", "sala", "307 Sala de Aula", "25 carteiras"),
  resource("303-sala", "Salas", "sala", "303 Sala de Aula", ""),
  resource("307-sala-festas", "Salas", "sala", "307 Sala de Festas", "")
];

const TOKEN_KEY = "cep-reservas-token";

const state = {
  users: [],
  resources: [],
  reservations: [],
  currentUser: null,
  viewMonth: 4,
  viewYear: 2025,
  query: "",
  selectedSlot: null,
  editingUserId: "",
  editingResourceId: "",
  selectedUserReservationsId: "",
  token: localStorage.getItem(TOKEN_KEY) || ""
};

const els = {
  mainScreen: document.querySelector("#mainScreen"),
  adminScreen: document.querySelector("#adminScreen"),
  boardWrap: document.querySelector(".board-wrap"),
  board: document.querySelector("#board"),
  currentUserLabel: document.querySelector("#currentUserLabel"),
  myReservationsButton: document.querySelector("#myReservationsButton"),
  loginButton: document.querySelector("#loginButton"),
  adminButton: document.querySelector("#adminButton"),
  backToSchedule: document.querySelector("#backToSchedule"),
  prevMonth: document.querySelector("#prevMonth"),
  nextMonth: document.querySelector("#nextMonth"),
  todayButton: document.querySelector("#todayButton"),
  monthSelect: document.querySelector("#monthSelect"),
  yearInput: document.querySelector("#yearInput"),
  searchInput: document.querySelector("#searchInput"),
  reservationDialog: document.querySelector("#reservationDialog"),
  reservationForm: document.querySelector("#reservationForm"),
  slotEyebrow: document.querySelector("#slotEyebrow"),
  slotTitle: document.querySelector("#slotTitle"),
  currentBooking: document.querySelector("#currentBooking"),
  reservationFields: document.querySelector("#reservationFields"),
  teacherName: document.querySelector("#teacherName"),
  courseName: document.querySelector("#courseName"),
  reservationNote: document.querySelector("#reservationNote"),
  saveReservation: document.querySelector("#saveReservation"),
  cancelReservation: document.querySelector("#cancelReservation"),
  myReservationsDialog: document.querySelector("#myReservationsDialog"),
  myReservationsUser: document.querySelector("#myReservationsUser"),
  myReservationsSummary: document.querySelector("#myReservationsSummary"),
  myReservationsList: document.querySelector("#myReservationsList"),
  loginDialog: document.querySelector("#loginDialog"),
  loginForm: document.querySelector("#loginForm"),
  loginEmail: document.querySelector("#loginEmail"),
  loginPinField: document.querySelector("#loginPinField"),
  loginPin: document.querySelector("#loginPin"),
  passwordSetupDialog: document.querySelector("#passwordSetupDialog"),
  passwordSetupForm: document.querySelector("#passwordSetupForm"),
  newPassword: document.querySelector("#newPassword"),
  confirmPassword: document.querySelector("#confirmPassword"),
  userForm: document.querySelector("#userForm"),
  newUserName: document.querySelector("#newUserName"),
  newUserEmail: document.querySelector("#newUserEmail"),
  newUserRole: document.querySelector("#newUserRole"),
  newUserPin: document.querySelector("#newUserPin"),
  userSubmitButton: document.querySelector("#userSubmitButton"),
  cancelUserEdit: document.querySelector("#cancelUserEdit"),
  usersTable: document.querySelector("#usersTable"),
  userReservationsTitle: document.querySelector("#userReservationsTitle"),
  userReservationsSummary: document.querySelector("#userReservationsSummary"),
  userReservationsList: document.querySelector("#userReservationsList"),
  printResourcesButton: document.querySelector("#printResourcesButton"),
  resourceForm: document.querySelector("#resourceForm"),
  newResourceName: document.querySelector("#newResourceName"),
  newResourceGroup: document.querySelector("#newResourceGroup"),
  newResourceType: document.querySelector("#newResourceType"),
  newResourceDetails: document.querySelector("#newResourceDetails"),
  resourceSubmitButton: document.querySelector("#resourceSubmitButton"),
  cancelResourceEdit: document.querySelector("#cancelResourceEdit"),
  resourcesTable: document.querySelector("#resourcesTable"),
  deleteAllReservationsButton: document.querySelector("#deleteAllReservationsButton"),
  printArea: document.querySelector("#printArea"),
  toast: document.querySelector("#toast")
};

let toastTimer = 0;

init();

async function init() {
  hydrateMonthControls();
  bindEvents();
  configureLoginMode();

  if (usesRemoteApi()) {
    document.body.classList.add("remote-mode");
    if (state.token) {
      await loadRemoteData();
    } else {
      loadSignedOutRemoteState();
      showToast("Entre para salvar na planilha.");
    }
  } else {
    loadSignedOutRemoteState();
    showToast("Backend não configurado. Informe a URL do Apps Script.");
  }

  render();
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
  }
}

function configureLoginMode() {
  els.loginPin.required = true;
  els.loginPinField.classList.remove("hidden");
  els.loginButton.textContent = "Entrar";
}

function resource(id, group, type, name, details) {
  return { id, group, type, name, details, active: true };
}

function usesRemoteApi() {
  return Boolean(APP_CONFIG.apiUrl && APP_CONFIG.apiUrl.startsWith("https://"));
}

async function loadRemoteData() {
  try {
    const data = await api("load", {});
    applyRemoteData(data);
  } catch (error) {
    state.token = "";
    localStorage.removeItem(TOKEN_KEY);
    showToast(error.message || "Não foi possível carregar a planilha.");
    loadSignedOutRemoteState();
  }
}

function loadSignedOutRemoteState() {
  state.users = [];
  state.resources = structuredClone(DEFAULT_RESOURCES);
  state.reservations = [];
  state.currentUser = null;
}

function applyRemoteData(data) {
  state.users = data.users || [];
  state.resources = data.resources || [];
  state.reservations = data.reservations || [];
  state.currentUser = data.currentUser || data.user || null;
}

async function api(action, payload) {
  const response = await fetch(APP_CONFIG.apiUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, token: state.token, ...payload })
  });
  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.error || "Erro na planilha.");
  }
  return data.data;
}

function hydrateMonthControls() {
  els.monthSelect.innerHTML = MONTHS.map((month, index) => `<option value="${index}">${month}</option>`).join("");
  els.monthSelect.value = String(state.viewMonth);
  els.yearInput.value = String(state.viewYear);
}

function bindEvents() {
  els.prevMonth.addEventListener("click", () => shiftMonth(-1));
  els.nextMonth.addEventListener("click", () => shiftMonth(1));
  els.todayButton.addEventListener("click", () => {
    const today = new Date();
    state.viewMonth = today.getMonth();
    state.viewYear = today.getFullYear();
    render();
  });
  els.monthSelect.addEventListener("change", () => {
    state.viewMonth = Number(els.monthSelect.value);
    render();
  });
  els.yearInput.addEventListener("change", () => {
    state.viewYear = clamp(Number(els.yearInput.value), 2020, 2100);
    render();
  });
  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value.trim().toLowerCase();
    renderBoard();
  });
  els.myReservationsButton.addEventListener("click", openMyReservations);
  els.loginButton.addEventListener("click", () => els.loginDialog.showModal());
  els.loginForm.addEventListener("submit", handleLogin);
  els.passwordSetupForm.addEventListener("submit", handlePasswordSetup);
  els.passwordSetupDialog.addEventListener("close", () => {
    if (requiresPasswordSetup()) {
      els.passwordSetupForm.reset();
    }
  });
  els.adminButton.addEventListener("click", openAdminScreen);
  els.backToSchedule.addEventListener("click", closeAdminScreen);
  els.printResourcesButton.addEventListener("click", handlePrintResources);
  els.cancelResourceEdit.addEventListener("click", resetResourceForm);
  els.cancelUserEdit.addEventListener("click", resetUserForm);
  els.deleteAllReservationsButton.addEventListener("click", handleDeleteAllReservations);
  els.reservationForm.addEventListener("submit", handleReservationSubmit);
  els.cancelReservation.addEventListener("click", handleCancelReservation);
  els.userForm.addEventListener("submit", handleUserSubmit);
  els.resourceForm.addEventListener("submit", handleResourceSubmit);

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog").close());
  });
}

function shiftMonth(delta) {
  const date = new Date(state.viewYear, state.viewMonth + delta, 1);
  state.viewMonth = date.getMonth();
  state.viewYear = date.getFullYear();
  render();
}

function render() {
  els.monthSelect.value = String(state.viewMonth);
  els.yearInput.value = String(state.viewYear);
  renderSession();
  renderAdminAccess();
  renderBoard();
  renderUserReservationsPanel();
  renderMyReservationsDialog();
}

function renderSession() {
  if (!state.currentUser) {
    els.currentUserLabel.textContent = "Aguardando acesso";
    els.loginButton.textContent = "Entrar";
    return;
  }

  const pending = state.currentUser.mustChangePin ? " - definir senha" : "";
  els.currentUserLabel.textContent = `${state.currentUser.name} - ${roleLabel(state.currentUser.role)}${pending}`;
  els.loginButton.textContent = usesRemoteApi() ? "Trocar acesso" : "Trocar acesso";
}

function openMyReservations() {
  if (!state.currentUser) {
    showToast("Entre no sistema para ver suas reservas.");
    els.loginDialog.showModal();
    return;
  }
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
    return;
  }

  renderMyReservationsDialog();
  els.myReservationsDialog.showModal();
}

function renderMyReservationsDialog() {
  if (!els.myReservationsUser || !els.myReservationsSummary || !els.myReservationsList) return;

  if (!state.currentUser) {
    els.myReservationsUser.textContent = "Aguardando acesso";
    els.myReservationsSummary.textContent = "0 reservas ativas";
    els.myReservationsList.innerHTML = `<p class="empty-panel">Entre no sistema para visualizar suas reservas.</p>`;
    return;
  }

  const bookings = activeReservationsForUser(state.currentUser.id);
  els.myReservationsUser.textContent = state.currentUser.name;
  els.myReservationsSummary.textContent =
    bookings.length === 1 ? "1 reserva ativa" : `${bookings.length} reservas ativas`;
  els.myReservationsList.innerHTML = bookings.length
    ? bookings.map(renderUserReservationItem).join("")
    : `<p class="empty-panel">Você não tem reservas ativas.</p>`;
}

function renderAdminAccess() {
  els.adminButton.classList.toggle("hidden", !isAdmin());
}

function renderBoard() {
  const days = monthDays(state.viewYear, state.viewMonth);
  const resources = filteredResources();
  const totalColumns = 1 + days.length * SHIFTS.length;

  const headerDays = days
    .map((day) => {
      const todayClass = isToday(day) ? " today" : "";
      const currentDayClass = isCurrentVisibleDay(day) ? " current-day-position" : "";
      return `<th class="day-header${todayClass}${currentDayClass}" colspan="3">${formatDayHeader(day)}</th>`;
    })
    .join("");

  const headerShifts = days
    .flatMap((day) => {
      const currentDayClass = isCurrentVisibleDay(day) ? " current-day-cell" : "";
      return SHIFTS.map((shift) => `<th class="shift-header${currentDayClass}">${shift.label}</th>`);
    })
    .join("");

  const body = groupResources(resources)
    .map(([group, items]) => {
      const category = categoryClass(group);
      const groupRow = `<tr><th class="group-cell ${category}">${escapeHtml(group)}</th><td class="group-fill ${category}" colspan="${totalColumns - 1}"></td></tr>`;
      const rows = items.map((item) => renderResourceRow(item, days)).join("");
      return groupRow + rows;
    })
    .join("");

  els.board.innerHTML = `
    <table class="booking-grid" aria-label="Grade mensal de reservas">
      <thead>
        <tr>
          <th class="resource-head" rowspan="2">Recursos</th>
          ${headerDays}
        </tr>
        <tr>${headerShifts}</tr>
      </thead>
      <tbody>${body || emptyRow(totalColumns)}</tbody>
    </table>
  `;

  els.board.querySelectorAll("[data-slot]").forEach((button) => {
    button.addEventListener("click", () => openReservation(button.dataset));
  });
  scrollBoardToCurrentDay();
}

function scrollBoardToCurrentDay() {
  const target = els.board.querySelector(".day-header.current-day-position");
  if (!target || !els.boardWrap) return;

  window.requestAnimationFrame(() => {
    const resourceHead = els.board.querySelector(".resource-head");
    const stickyWidth = resourceHead?.offsetWidth || 0;
    els.boardWrap.scrollTo({
      left: Math.max(target.offsetLeft - stickyWidth, 0),
      top: els.boardWrap.scrollTop,
      behavior: "auto"
    });
  });
}

function renderResourceRow(item, days) {
  const cells = days
    .flatMap((day) => {
      const date = toDateKey(day);
      return SHIFTS.map((shift) => renderSlot(item, date, shift));
    })
    .join("");

  return `
    <tr>
      <th class="resource-cell ${categoryClass(item.group)}">
        <span class="resource-name">${escapeHtml(item.name)}</span>
        ${item.details ? `<span class="resource-detail">${escapeHtml(item.details)}</span>` : ""}
      </th>
      ${cells}
    </tr>
  `;
}

function categoryClass(group) {
  const normalized = slugify(group || "");
  if (normalized.includes("equipamento")) return "cat-equipment";
  if (normalized.includes("laboratorio")) return "cat-lab";
  if (normalized.includes("sala")) return "cat-room";
  if (normalized.includes("ambiente")) return "cat-space";
  return "cat-other";
}

function renderSlot(resourceItem, date, shift) {
  const booking = findBooking(resourceItem.id, date, shift.id);
  const classes = ["slot-button", categoryClass(resourceItem.group)];
  const cellClasses = ["slot"];
  if (isCurrentVisibleDateKey(date)) {
    classes.push("current-day-slot");
    cellClasses.push("current-day-cell");
  }
  let label = "";
  let course = "";

  if (booking) {
    const owner = userById(booking.userId);
    const mine = sameId(booking.userId, state.currentUser?.id);
    classes.push("reserved");
    classes.push(mine ? "mine" : canCancelBooking(booking) ? "" : "blocked");
    label = booking.teacherName || owner?.name || "Reservado";
    course = booking.courseName || "";
  }

  return `
    <td class="${cellClasses.join(" ")}">
      <button
        class="${classes.filter(Boolean).join(" ")}"
        type="button"
        data-slot="1"
        data-resource-id="${escapeHtml(resourceItem.id)}"
        data-date="${date}"
        data-shift="${escapeHtml(shift.id)}"
        aria-label="${escapeHtml(resourceItem.name)} ${formatDate(date)} ${shift.label}"
      >
        ${booking ? `<span>${escapeHtml(label)}</span>${course ? `<span class="course">${escapeHtml(course)}</span>` : ""}` : ""}
      </button>
    </td>
  `;
}

function emptyRow(totalColumns) {
  return `<tr><td colspan="${totalColumns}" class="resource-cell">Nenhum recurso encontrado.</td></tr>`;
}

function openReservation(dataset) {
  const resourceItem = state.resources.find((item) => item.id === dataset.resourceId);
  const shift = SHIFTS.find((item) => item.id === dataset.shift);
  const booking = findBooking(dataset.resourceId, dataset.date, dataset.shift);

  if (!state.currentUser) {
    showToast("Entre no sistema para fazer uma reserva.");
    els.loginDialog.showModal();
    return;
  }
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
    return;
  }

  if (!resourceItem) return;

  state.selectedSlot = {
    resourceId: dataset.resourceId,
    date: dataset.date,
    shift: dataset.shift,
    bookingId: booking?.id || ""
  };

  els.slotEyebrow.textContent = `${formatDate(dataset.date)} - ${shift.label}`;
  els.slotTitle.textContent = resourceItem.name;
  els.teacherName.textContent = state.currentUser?.name || "";
  els.courseName.value = "";
  els.reservationNote.value = "";

  if (booking) {
    const owner = userById(booking.userId);
    els.currentBooking.innerHTML = `
      <strong>${escapeHtml(booking.teacherName || owner?.name || "Reservado")}</strong>
      ${booking.courseName ? `<p>${escapeHtml(booking.courseName)}</p>` : ""}
      ${booking.note ? `<p>${escapeHtml(booking.note)}</p>` : ""}
      <p>Solicitante: ${escapeHtml(owner?.name || "Não identificado")}</p>
    `;
    els.currentBooking.classList.remove("hidden");
    els.reservationFields.classList.add("hidden");
    els.saveReservation.classList.add("hidden");
    els.cancelReservation.classList.toggle("hidden", !canCancelBooking(booking));
  } else {
    const canBook = canBookResource(resourceItem);
    const availabilityTitle = canBook ? "Disponível" : "Indisponível para professores";
    els.currentBooking.innerHTML = `
      <strong>${availabilityTitle}</strong>
      <p>${
        canBook
          ? "Este horário pode ser reservado."
          : "Este recurso é apenas para visualização dos professores. A reserva é feita pela coordenação pedagógica."
      }</p>
    `;
    els.currentBooking.classList.toggle("hidden", canBook);
    els.reservationFields.classList.toggle("hidden", !canBook);
    els.saveReservation.classList.toggle("hidden", !canBook);
    els.cancelReservation.classList.add("hidden");
  }

  els.reservationDialog.showModal();
}

async function handleReservationSubmit(event) {
  event.preventDefault();
  if (!state.currentUser) {
    showToast("Selecione um usuário antes de reservar.");
    return;
  }
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
    return;
  }

  const slot = state.selectedSlot;
  if (!slot || findBooking(slot.resourceId, slot.date, slot.shift)) {
    showToast("Este horário já está reservado.");
    renderBoard();
    return;
  }

  const resourceItem = state.resources.find((item) => item.id === slot.resourceId);
  if (!resourceItem || !canBookResource(resourceItem)) {
    showToast("Você não tem permissão para reservar este recurso.");
    return;
  }

  const booking = {
    id: crypto.randomUUID(),
    resourceId: slot.resourceId,
    date: slot.date,
    shift: slot.shift,
    userId: state.currentUser.id,
    teacherName: state.currentUser.name,
    courseName: els.courseName.value.trim(),
    note: els.reservationNote.value.trim(),
    status: "active",
    createdAt: new Date().toISOString()
  };

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("reserve", { booking });
    state.reservations = data.reservations;
    els.reservationDialog.close();
    renderBoard();
    renderUserReservationsPanel();
    renderMyReservationsDialog();
    showToast("Reserva registrada.");
  } catch (error) {
    showToast(error.message || "Não foi possível reservar.");
  }
}

async function handleCancelReservation() {
  const booking = state.reservations.find((item) => item.id === state.selectedSlot?.bookingId);
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
    return;
  }
  if (!booking || !canCancelBooking(booking)) {
    showToast("Você não tem permissão para cancelar esta reserva.");
    return;
  }

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("cancel", { bookingId: booking.id });
    state.reservations = data.reservations;
    els.reservationDialog.close();
    renderBoard();
    renderUserReservationsPanel();
    renderMyReservationsDialog();
    showToast("Reserva cancelada.");
  } catch (error) {
    showToast(error.message || "Não foi possível cancelar.");
  }
}

async function handleDeleteAllReservations() {
  if (!isAdmin()) {
    showToast("Apenas master ou coordenadoras podem limpar a agenda.");
    return;
  }
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
    return;
  }

  const confirmed = window.confirm(
    "Tem certeza que deseja deletar TODAS as reservas da agenda?\n\n" +
      "Esta ação remove todos os agendamentos da grade, mas não apaga usuários nem recursos cadastrados.\n\n" +
      "Não é possível desfazer."
  );

  if (!confirmed) return;

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("deleteAllReservations", {});
    state.reservations = data.reservations || [];

    renderBoard();
    renderUserReservationsPanel();
    renderMyReservationsDialog();
    showToast("Todas as reservas foram deletadas.");
  } catch (error) {
    showToast(error.message || "Não foi possível deletar as reservas.");
  }
}

async function handleLogin(event) {
  event.preventDefault();
  try {
    if (!usesRemoteApi()) {
      showToast("Conexão com a planilha não configurada.");
      return;
    }

    const data = await api("login", {
      email: els.loginEmail.value.trim(),
      pin: els.loginPin.value
    });
    state.token = data.token;
    localStorage.setItem(TOKEN_KEY, data.token);
    if (hasRemoteData(data)) {
      applyRemoteData(data);
    } else {
      await loadRemoteData();
    }
    els.loginDialog.close();
    els.loginForm.reset();
    closeAdminScreen();
    render();
    if (requiresPasswordSetup()) {
      promptPasswordSetup();
    } else {
      showToast("Acesso liberado.");
    }
  } catch (error) {
    showToast(error.message || "Login inválido.");
  }
}

function hasRemoteData(data) {
  return Array.isArray(data.resources) && Array.isArray(data.reservations);
}

async function handlePasswordSetup(event) {
  event.preventDefault();
  const password = els.newPassword.value.trim();
  const confirmation = els.confirmPassword.value.trim();

  if (!/^\d{4,8}$/.test(password)) {
    showToast("A senha deve ter apenas números, com 4 a 8 dígitos.");
    return;
  }

  if (password !== confirmation) {
    showToast("As senhas não conferem.");
    return;
  }

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("changeOwnPin", { newPin: password });
    state.currentUser = data.currentUser;
    const index = state.users.findIndex((user) => sameId(user.id, state.currentUser.id));
    if (index >= 0) {
      state.users[index] = state.currentUser;
    }

    els.passwordSetupForm.reset();
    els.passwordSetupDialog.close();
    render();
    showToast("Senha cadastrada.");
  } catch (error) {
    showToast(error.message || "Não foi possível salvar a senha.");
  }
}

async function handleUserSubmit(event) {
  event.preventDefault();
  if (!isAdmin()) return;

  const editingId = state.editingUserId;
  const pin = els.newUserPin.value.trim();
  if (!editingId && !pin) {
    showToast("Informe um PIN inicial para o usuário.");
    return;
  }

  const user = {
    id: editingId || "",
    name: els.newUserName.value.trim(),
    email: els.newUserEmail.value.trim().toLowerCase(),
    role: els.newUserRole.value,
    pin,
    active: true
  };

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("upsertUser", { user });
    state.users = data.users;
    resetUserForm();
    render();
    renderUsersTable();
    showToast(editingId ? "Professor atualizado." : "Professor adicionado.");
  } catch (error) {
    showToast(error.message || "Não foi possível salvar usuário.");
  }
}

async function handleResourceSubmit(event) {
  event.preventDefault();
  if (!isAdmin()) return;

  const editingId = state.editingResourceId;
  const item = {
    id: editingId || `${slugify(els.newResourceName.value)}-${Date.now().toString(36)}`,
    name: els.newResourceName.value.trim(),
    group: els.newResourceGroup.value,
    type: els.newResourceType.value,
    details: els.newResourceDetails.value.trim(),
    active: true
  };

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("upsertResource", { resource: item });
    state.resources = data.resources;
    resetResourceForm();
    renderBoard();
    renderResourcesTable();
    showToast(editingId ? "Recurso atualizado." : "Recurso adicionado.");
  } catch (error) {
    showToast(error.message || "Não foi possível salvar recurso.");
  }
}

function openAdminScreen() {
  if (!isAdmin()) {
    showToast("Apenas master ou coordenadoras podem acessar esta tela.");
    return;
  }
  if (requiresPasswordSetup()) {
    promptPasswordSetup();
    return;
  }
  resetUserForm();
  resetResourceForm();
  if (!state.selectedUserReservationsId && state.currentUser) {
    state.selectedUserReservationsId = state.currentUser.id;
  }
  renderUsersTable();
  renderUserReservationsPanel();
  renderResourcesTable();
  els.mainScreen.classList.add("hidden");
  els.adminScreen.classList.remove("hidden");
}

function closeAdminScreen() {
  els.adminScreen.classList.add("hidden");
  els.mainScreen.classList.remove("hidden");
}

function renderUsersTable() {
  els.usersTable.innerHTML = state.users
    .map(
      (user) => {
        const canManage = canManageUser(user);
        const isSelected = sameId(user.id, state.selectedUserReservationsId);
        return `
          <tr>
            <td>${escapeHtml(user.name)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${roleLabel(user.role)}</td>
            <td>${user.active === false ? "Inativo" : "Ativo"}</td>
            <td>
              <div class="table-actions">
                <button
                  class="button ghost table-button${isSelected ? " is-active" : ""}"
                  type="button"
                  data-view-user-reservations="${escapeHtml(user.id)}"
                >
                  Ver reservas
                </button>
                ${
                  canManage
                    ? `
                      <button class="button ghost table-button" type="button" data-edit-user="${escapeHtml(user.id)}">
                        Editar
                      </button>
                      <button class="button danger table-button" type="button" data-delete-user="${escapeHtml(user.id)}">
                        Excluir
                      </button>
                    `
                    : "<span class=\"protected-label\">Protegido</span>"
                }
              </div>
            </td>
          </tr>
        `;
      }
    )
    .join("");

  els.usersTable.querySelectorAll("[data-view-user-reservations]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedUserReservationsId = button.dataset.viewUserReservations;
      renderUsersTable();
      renderUserReservationsPanel();
    });
  });
  els.usersTable.querySelectorAll("[data-edit-user]").forEach((button) => {
    button.addEventListener("click", () => startUserEdit(button.dataset.editUser));
  });
  els.usersTable.querySelectorAll("[data-delete-user]").forEach((button) => {
    button.addEventListener("click", () => handleDeleteUser(button.dataset.deleteUser));
  });
}

function renderUserReservationsPanel() {
  if (!els.userReservationsTitle || !els.userReservationsSummary || !els.userReservationsList) return;

  const user = selectedReservationsUser();
  if (!user) {
    els.userReservationsTitle.textContent = "Reservas do usuário";
    els.userReservationsSummary.textContent = "Nenhum usuário selecionado";
    els.userReservationsList.innerHTML = `<p class="empty-panel">Selecione um usuário para visualizar as reservas.</p>`;
    return;
  }

  const bookings = activeReservationsForUser(user.id);
  els.userReservationsTitle.textContent = `Reservas de ${user.name}`;
  els.userReservationsSummary.textContent =
    bookings.length === 1 ? "1 reserva ativa" : `${bookings.length} reservas ativas`;
  els.userReservationsList.innerHTML = bookings.length
    ? bookings.map(renderUserReservationItem).join("")
    : `<p class="empty-panel">Nenhuma reserva ativa para este usuário.</p>`;
}

function selectedReservationsUser() {
  if (!state.selectedUserReservationsId) return null;

  const user = state.users.find((item) => sameId(item.id, state.selectedUserReservationsId));
  if (user) return user;

  if (sameId(state.currentUser?.id, state.selectedUserReservationsId)) {
    return state.currentUser;
  }

  state.selectedUserReservationsId = "";
  return null;
}

function activeReservationsForUser(userId) {
  return state.reservations
    .filter((booking) => sameId(booking.userId, userId) && booking.status !== "cancelled")
    .sort((left, right) => {
      const dateCompare = dateKey(left.date).localeCompare(dateKey(right.date));
      if (dateCompare !== 0) return dateCompare;
      return shiftIndex(left.shift) - shiftIndex(right.shift);
    });
}

function renderUserReservationItem(booking) {
  const resourceItem = state.resources.find((item) => item.id === booking.resourceId);
  const resourceName = resourceItem?.name || "Recurso não encontrado";
  const course = booking.courseName ? `<p>${escapeHtml(booking.courseName)}</p>` : "";
  const note = booking.note ? `<p>${escapeHtml(booking.note)}</p>` : "";

  return `
    <article class="user-reservation-row">
      <div>
        <strong>${escapeHtml(resourceName)}</strong>
        <span>${formatDate(dateKey(booking.date))} - ${escapeHtml(shiftLabel(booking.shift))}</span>
        ${course}
        ${note}
      </div>
    </article>
  `;
}

function startUserEdit(userId) {
  const user = state.users.find((item) => sameId(item.id, userId));
  if (!canManageUser(user)) {
    showToast("Você não tem permissão para editar este usuário.");
    return;
  }

  state.editingUserId = user.id;
  els.newUserName.value = user.name || "";
  els.newUserEmail.value = user.email || "";
  els.newUserRole.value = user.role || "professor";
  els.newUserRole.disabled = !isMaster();
  els.newUserPin.value = "";
  els.newUserPin.placeholder = "Deixe vazio para manter o PIN";
  els.userSubmitButton.textContent = "Salvar usuário";
  els.cancelUserEdit.classList.remove("hidden");
  els.newUserName.focus();
}

function resetUserForm() {
  state.editingUserId = "";
  els.userForm.reset();
  els.newUserRole.value = "professor";
  els.newUserRole.disabled = !isMaster();
  els.newUserPin.placeholder = "Temporário para primeiro acesso";
  els.userSubmitButton.textContent = isMaster() ? "Adicionar usuário" : "Adicionar professor";
  els.cancelUserEdit.classList.add("hidden");
}

async function handleDeleteUser(userId) {
  if (!isAdmin()) return;

  const user = state.users.find((item) => sameId(item.id, userId));
  if (!canManageUser(user)) {
    showToast("Você não tem permissão para excluir este usuário.");
    return;
  }

  const confirmed = window.confirm(`Tem certeza que deseja excluir ${roleLabel(user.role).toLowerCase()} ${user.name}?`);
  if (!confirmed) return;

  try {
    if (!usesRemoteApi() || !state.token) throw new Error("Conexão com a planilha não configurada.");
    const data = await api("deleteUser", { userId });
    state.users = data.users;

    resetUserForm();
    render();
    renderUsersTable();
    showToast("Professor excluído.");
  } catch (error) {
    showToast(error.message || "Não foi possível excluir usuário.");
  }
}

function renderResourcesTable() {
  els.resourcesTable.innerHTML = state.resources
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.group)}</td>
          <td>${typeLabel(item.type)}</td>
          <td>${escapeHtml(item.details || "")}</td>
          <td>
            <button class="button ghost table-button" type="button" data-edit-resource="${escapeHtml(item.id)}">
              Editar
            </button>
          </td>
        </tr>
      `
    )
    .join("");

  els.resourcesTable.querySelectorAll("[data-edit-resource]").forEach((button) => {
    button.addEventListener("click", () => startResourceEdit(button.dataset.editResource));
  });
}

function startResourceEdit(resourceId) {
  const item = state.resources.find((resourceItem) => resourceItem.id === resourceId);
  if (!item) return;

  state.editingResourceId = item.id;
  els.newResourceName.value = item.name || "";
  els.newResourceGroup.value = item.group || "Equipamentos";
  els.newResourceType.value = item.type || "equipamento";
  els.newResourceDetails.value = item.details || "";
  els.resourceSubmitButton.textContent = "Salvar alterações";
  els.cancelResourceEdit.classList.remove("hidden");
  els.newResourceName.focus();
}

function resetResourceForm() {
  state.editingResourceId = "";
  els.resourceForm.reset();
  els.resourceSubmitButton.textContent = "Adicionar recurso";
  els.cancelResourceEdit.classList.add("hidden");
}

function handlePrintResources() {
  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date());

  const groups = groupResources(state.resources.filter((item) => item.active !== false));
  const sections = groups
    .map(([group, items]) => {
      const rows = items
        .map(
          (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHtml(item.name)}</td>
              <td>${typeLabel(item.type)}</td>
              <td>${escapeHtml(item.details || "")}</td>
            </tr>
          `
        )
        .join("");

      return `
        <section class="print-group">
          <h2>${escapeHtml(group)}</h2>
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>Recurso</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </section>
      `;
    })
    .join("");

  els.printArea.innerHTML = `
    <div class="print-header">
      <p>CEP Itabaiana</p>
      <h1>Recursos reserváveis</h1>
      <span>Gerado em ${generatedAt}</span>
    </div>
    ${sections}
  `;

  window.print();
}

function filteredResources() {
  const active = state.resources.filter((item) => item.active !== false);
  if (!state.query) return active;
  return active.filter((item) => `${item.name} ${item.details} ${item.group}`.toLowerCase().includes(state.query));
}

function canBookResource(resourceItem, user = state.currentUser) {
  if (!user) return false;
  if (user.mustChangePin) return false;
  if (isAdmin(user)) return true;
  if (!resourceItem) return false;

  const category = categoryClass(resourceItem.group);
  return category === "cat-equipment" || category === "cat-lab" || category === "cat-space";
}

function groupResources(resources) {
  const groups = new Map();
  resources.forEach((item) => {
    const group = item.group || "Outros";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  });
  return [...groups.entries()];
}

function monthDays(year, month) {
  const days = [];
  const total = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= total; day += 1) {
    days.push(new Date(year, month, day));
  }
  return days;
}

function findBooking(resourceId, date, shift) {
  return state.reservations.find(
    (booking) =>
      booking.resourceId === resourceId &&
      dateKey(booking.date) === date &&
      booking.shift === shift &&
      booking.status !== "cancelled"
  );
}

function canCancelBooking(booking) {
  if (requiresPasswordSetup()) return false;
  if (isAdmin()) return true;
  const resourceItem = state.resources.find((item) => item.id === booking.resourceId);
  return sameId(booking.userId, state.currentUser?.id) && canBookResource(resourceItem);
}

function requiresPasswordSetup(user = state.currentUser) {
  return Boolean(user?.mustChangePin);
}

function promptPasswordSetup() {
  showToast("Cadastre sua senha numérica para continuar.");
  if (!els.passwordSetupDialog.open) {
    els.passwordSetupDialog.showModal();
  }
}

function isAdmin(user = state.currentUser) {
  return user?.role === "master" || user?.role === "coordenadora";
}

function isMaster(user = state.currentUser) {
  return user?.role === "master";
}

function canManageUser(user) {
  if (!user || user.active === false) return false;
  if (user.role === "master") return false;
  if (isMaster()) return user.role === "professor" || user.role === "coordenadora";
  return user.role === "professor";
}

function userById(userId) {
  return state.users.find((user) => sameId(user.id, userId));
}

function roleLabel(role) {
  if (role === "master") return "Master";
  return role === "coordenadora" ? "Coordenadora" : "Professor";
}

function typeLabel(type) {
  const labels = {
    equipamento: "Equipamento",
    laboratorio: "Laboratório",
    sala: "Sala",
    ambiente: "Ambiente"
  };
  return labels[type] || type;
}

function shiftLabel(shiftId) {
  return SHIFTS.find((shift) => shift.id === shiftId)?.label || shiftId;
}

function shiftIndex(shiftId) {
  const index = SHIFTS.findIndex((shift) => shift.id === shiftId);
  return index >= 0 ? index : SHIFTS.length;
}

function formatDayHeader(date) {
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date).replace(".", "");
  return `${weekday}-${String(date.getDate()).padStart(2, "0")}/${MONTHS[date.getMonth()].slice(0, 3).toLowerCase()}`;
}

function formatDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateKey(value) {
  if (value instanceof Date) return toDateKey(value);

  const text = String(value || "").trim();
  const isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;

  const brMatch = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (brMatch) {
    return `${brMatch[3]}-${brMatch[2].padStart(2, "0")}-${brMatch[1].padStart(2, "0")}`;
  }

  return text;
}

function isToday(date) {
  const today = new Date();
  return toDateKey(date) === toDateKey(today);
}

function isCurrentVisibleDay(date) {
  const today = new Date();
  return date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

function isCurrentVisibleDateKey(value) {
  const today = new Date();
  const [, month, day] = dateKey(value).split("-").map(Number);
  return month === today.getMonth() + 1 && day === today.getDate();
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sameId(left, right) {
  return String(left) === String(right);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
}
