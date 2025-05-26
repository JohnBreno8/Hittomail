const emails = {
      inbox: [
        {
          id: 1, from: "ana.beatriz@hittomail.an", fromName: "Ana Beatriz", subject: "Reunião amanhã às 10h",
          body: "Olá, só para lembrar da reunião marcada para amanhã às 10h. Por favor, confirme sua presença.",
          date: "2024-06-10T14:30:00", read: false, spam: false, trash: false, starred: false, archived: false, attachments: []
        },
        {
          id: 2, from: "joao.carlos@hittomail.an", fromName: "João Carlos", subject: "Relatório mensal",
          body: "Segue em anexo o relatório mensal. Qualquer dúvida, estou à disposição.",
          date: "2024-06-09T09:15:00", read: true, spam: false, trash: false, starred: true, archived: false, attachments: [{ name: "relatorio.pdf", size: "1.2 MB" }]
        },
        {
          id: 3, from: "luiza.pereira@Fmail.com", fromName: "Luiza Pereira", subject: "Férias agendadas",
          body: "Informo que estarei de férias entre os dias 20 e 30 de junho.",
          date: "2024-06-08T17:45:00", read: false, spam: false, trash: false, starred: false, archived: false, attachments: []
        },
        {
          id: 4, from: "spam.sender@proton.me", fromName: "Spam Sender", subject: "Você ganhou um prêmio!",
          body: "Clique aqui para resgatar seu prêmio incrível!",
          date: "2024-06-07T12:00:00", read: false, spam: true, trash: false, starred: false, archived: false, attachments: []
        }
      ],
      sent: [
        {
          id: 101, to: "marcos.rodrigues@hittomail.an", toName: "Marcos Rodrigues", subject: "Confirmação de reunião",
          body: "Confirmo a reunião para sexta-feira às 15h.", date: "2024-06-05T11:00:00",
          read: true, spam: false, trash: false, starred: false, archived: false, attachments: []
        },
        {
          id: 102, to: "carla.silva@hittomail.an", toName: "Carla Silva", subject: "Projeto entregue",
          body: "O projeto foi entregue conforme o prazo combinado.", date: "2024-06-04T16:30:00",
          read: true, spam: false, trash: false, starred: true, archived: false, attachments: [{ name: "projeto.zip", size: "3.5 MB" }]
        }
      ],
      drafts: [],
      archive: [],
      contacts: [
        { id: 1, name: "Ana Beatriz", email: "ana.beatriz@yahoo.me", avatar: "https://placehold.co/48x48/png?text=AB", description: "Mulher jovem com cabelo castanho curto e sorriso amigável" },
        { id: 2, name: "João Carlos", email: "joao.carlos@example.com", avatar: "https://placehold.co/48x48/png?text=JC", description: "Homem de meia idade com barba e óculos" },
        { id: 3, name: "Luiza Pereira", email: "luiza.pereira@gmail.com", avatar: "https://placehold.co/48x48/png?text=LP", description: "Mulher jovem com cabelo longo e liso" },
        { id: 4, name: "Marcos Rodrigues", email: "marcos.rodrigues@hotmail.com", avatar: "https://placehold.co/48x48/png?text=MR", description: "Homem jovem com cabelo curto e sorriso" },
        { id: 5, name: "Carla Silva", email: "carla.silva@thubres.com", avatar: "https://placehold.co/48x48/png?text=CS", description: "Mulher de meia idade com cabelo cacheado" }
      ],
      transactions: []
    };

    // State
    let currentView = "inbox";
    let selectedEmails = new Set();
    let settings = { theme: "dark", signature: "", language: "pt-BR", notifications: "all", sortBy: "date-desc" };
    let walletBalance = 0.00;
    let searchQuery = "";

    // Elements
    const emailListEl = document.getElementById("emailList");
    const emailsUl = document.getElementById("emailsUl");
    const emailDetailView = document.getElementById("emailDetailView");
    const emailDetailContent = document.getElementById("emailDetailContent");
    const emailDetailDate = document.getElementById("emailDetailDate");
    const emailCountText = document.getElementById("emailCountText");
    const composeModal = document.getElementById("composeModal");
    const composeForm = document.getElementById("composeForm");
    const settingsModal = document.getElementById("settingsModal");
    const settingsForm = document.getElementById("settingsForm");
    const walletModal = document.getElementById("walletModal");
    const walletBalanceEl = document.getElementById("walletBalance");
    const transactionHistory = document.getElementById("transactionHistory");
    const searchInput = document.getElementById("searchInput");
    const inboxUnread = document.getElementById("inboxUnread");
    const spamUnread = document.getElementById("spamUnread");
    const mobileInboxUnread = document.getElementById("mobileInboxUnread");
    const mobileSpamUnread = document.getElementById("mobileSpamUnread");

    // Buttons
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileInboxBtn = document.getElementById("mobileInboxBtn");
    const mobileSentBtn = document.getElementById("mobileSentBtn");
    const mobileDraftsBtn = document.getElementById("mobileDraftsBtn");
    const mobileStarredBtn = document.getElementById("mobileStarredBtn");
    const mobileContactsBtn = document.getElementById("mobileContactsBtn");
    const mobileSpamBtn = document.getElementById("mobileSpamBtn");
    const mobileTrashBtn = document.getElementById("mobileTrashBtn");
    const mobileComposeBtn = document.getElementById("mobileComposeBtn");
    const mobileSettingsBtn = document.getElementById("mobileSettingsBtn");
    const mobileWalletBtn = document.getElementById("mobileWalletBtn");
    const inboxBtn = document.getElementById("inboxBtn");
    const sentBtn = document.getElementById("sentBtn");
    const draftsBtn = document.getElementById("draftsBtn");
    const starredBtn = document.getElementById("starredBtn");
    const contactsBtn = document.getElementById("contactsBtn");
    const spamBtn = document.getElementById("spamBtn");
    const trashBtn = document.getElementById("trashBtn");
    const composeBtn = document.getElementById("composeBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const walletBtn = document.getElementById("walletBtn");
    const selectAllBtn = document.getElementById("selectAllBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const markReadBtn = document.getElementById("markReadBtn");
    const markUnreadBtn = document.getElementById("markUnreadBtn");
    const starBtn = document.getElementById("starBtn");
    const moveToSpamBtn = document.getElementById("moveToSpamBtn");
    const archiveBtn = document.getElementById("archiveBtn");
    const backToListBtn = document.getElementById("backToListBtn");
    const detailDeleteBtn = document.getElementById("detailDeleteBtn");
    const detailStarBtn = document.getElementById("detailStarBtn");
    const detailReplyBtn = document.getElementById("detailReplyBtn");
    const detailForwardBtn = document.getElementById("detailForwardBtn");
    const detailArchiveBtn = document.getElementById("detailArchiveBtn");
    const closeComposeBtn = document.getElementById("closeComposeBtn");
    const cancelComposeBtn = document.getElementById("cancelComposeBtn");
    const saveDraftBtn = document.getElementById("saveDraftBtn");
    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
    const closeWalletBtn = document.getElementById("closeWalletBtn");
    const addFundsBtn = document.getElementById("addFundsBtn");

    // Utility functions
    function formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString(settings.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function truncateText(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + "...";
    }

    function applyTheme(theme) {
      document.body.classList.toggle("theme-light", theme === "light");
    }

    function translateText(text) {
      const translations = {
        "pt-BR": {
          "0 e-mails": "0 e-mails",
          "Nenhum e-mail nesta seção.": "Nenhum e-mail nesta seção.",
          "Selecione um e-mail para visualizar": "Selecione um e-mail para visualizar",
          "Selecione um contato para enviar um e-mail": "Selecione um contato para enviar um e-mail",
          "Rascunho salvo!": "Rascunho salvo!",
          "E-mail enviado com sucesso!": "E-mail enviado com sucesso!",
          "Por favor, preencha pelo menos um destinatário.": "Por favor, preencha pelo menos um destinatário.",
          "Configurações salvas!": "Configurações salvas!",
          "Atualizado!": "Atualizado!",
          "Valor inválido.": "Valor inválido.",
          "Fundos adicionados!": "Fundos adicionados!",
          "De:": "De:",
          "Para:": "Para:",
          "Cco:": "Cco:",
          "Assunto:": "Assunto:",
          "Anexos:": "Anexos:",
          "Novo E-mail": "Novo E-mail",
          "Configurações": "Configurações",
          "Carteira": "Carteira",
          "Pesquisar e-mails...": "Pesquisar e-mails...",
          "Inbox": "Inbox",
          "Enviados": "Enviados",
          "Rascunhos": "Rascunhos",
          "Favoritos": "Favoritos",
          "Contatos": "Contatos",
          "Spam": "Spam",
          "Lixeira": "Lixeira",
          "Arquivo": "Arquivo",
          "Adicionar Fundos": "Adicionar Fundos",
          "Saldo": "Saldo",
          "HCoins": "HCoins",
          "Sem transações recentes.": "Sem transações recentes.",
          "Ordenar por data (decrescente)": "Ordenar por data (decrescente)",
          "Ordenar por data (crescente)": "Ordenar por data (crescente)",
          "Ordenar por remetente": "Ordenar por remetente",
          "Ordenar por assunto": "Ordenar por assunto",
          "----- Mensagem Encaminhada -----": "----- Mensagem Encaminhada -----",
          "escreveu": "escreveu",
          "Data:": "Data:"
        },
        "en": {
          "0 e-mails": "0 emails",
          "Nenhum e-mail nesta seção.": "No emails in this section.",
          "Selecione um e-mail para visualizar": "Select an email to view",
          "Selecione um contato para enviar um e-mail": "Select a contact to send an email",
          "Rascunho salvo!": "Draft saved!",
          "E-mail enviado com sucesso!": "Email sent successfully!",
          "Por favor, preencha pelo menos um destinatário.": "Please fill in at least one recipient.",
          "Configurações salvas!": "Settings saved!",
          "Atualizado!": "Refreshed!",
          "Valor inválido.": "Invalid amount.",
          "Fundos adicionados!": "Funds added!",
          "De:": "From:",
          "Para:": "To:",
          "Cco:": "Bcc:",
          "Assunto:": "Subject:",
          "Anexos:": "Attachments:",
          "Novo E-mail": "New Email",
          "Configurações": "Settings",
          "Carteira": "Wallet",
          "Pesquisar e-mails...": "Search emails...",
          "Inbox": "Inbox",
          "Enviados": "Sent",
          "Rascunhos": "Drafts",
          "Favoritos": "Starred",
          "Contatos": "Contacts",
          "Spam": "Spam",
          "Lixeira": "Trash",
          "Arquivo": "Archive",
          "Adicionar Fundos": "Add Funds",
          "Saldo": "Balance",
          "HCoins": "HCoins",
          "Sem transações recentes.": "No recent transactions.",
          "Ordenar por data (decrescente)": "Sort by date (descending)",
          "Ordenar por data (crescente)": "Sort by date (ascending)",
          "Ordenar por remetente": "Sort by sender",
          "Ordenar por assunto": "Sort by subject",
          "----- Mensagem Encaminhada -----": "----- Forwarded Message -----",
          "escreveu": "wrote",
          "Data:": "Date:"
        },
        "es": {
          "0 e-mails": "0 correos",
          "Nenhum e-mail nesta seção.": "No hay correos en esta sección.",
          "Selecione um e-mail para visualizar": "Selecciona un correo para ver",
          "Selecione um contato para enviar um e-mail": "Selecciona un contacto para enviar un correo",
          "Rascunho salvo!": "¡Borrador guardado!",
          "E-mail enviado com sucesso!": "¡Correo enviado con éxito!",
          "Por favor, preencha pelo menos um destinatário.": "Por favor, completa al menos un destinatario.",
          "Configurações salvas!": "¡Configuraciones guardadas!",
          "Atualizado!": "¡Actualizado!",
          "Valor inválido.": "Monto inválido.",
          "Fundos adicionados!": "¡Fondos añadidos!",
          "De:": "De:",
          "Para:": "Para:",
          "Cco:": "Cco:",
          "Assunto:": "Asunto:",
          "Anexos:": "Adjuntos:",
          "Novo E-mail": "Nuevo Correo",
          "Configurações": "Configuraciones",
          "Carteira": "Cartera",
          "Pesquisar e-mails...": "Buscar correos...",
          "Inbox": "Bandeja de entrada",
          "Enviados": "Enviados",
          "Rascunhos": "Borradores",
          "Favoritos": "Favoritos",
          "Contatos": "Contactos",
          "Spam": "Spam",
          "Lixeira": "Papelera",
          "Arquivo": "Archivo",
          "Adicionar Fundos": "Añadir Fondos",
          "Saldo": "Saldo",
          "HCoins": "HCoins",
          "Sem transações recentes.": "Sin transacciones recientes.",
          "Ordenar por data (decrescente)": "Ordenar por fecha (descendente)",
          "Ordenar por data (crescente)": "Ordenar por fecha (ascendente)",
          "Ordenar por remetente": "Ordenar por remitente",
          "Ordenar por assunto": "Ordenar por asunto",
          "----- Mensagem Encaminhada -----": "----- Mensaje Reenviado -----",
          "escreveu": "escribió",
          "Data:": "Fecha:"
        }
      };
      return translations[settings.language][text] || text;
    }

    // Render functions
    function sortEmails(list) {
      return list.sort((a, b) => {
        if (settings.sortBy === "date-desc") {
          return new Date(b.date) - new Date(a.date);
        } else if (settings.sortBy === "date-asc") {
          return new Date(a.date) - new Date(b.date);
        } else if (settings.sortBy === "sender") {
          const aSender = (a.fromName || a.from || a.toName || a.to || "").toLowerCase();
          const bSender = (b.fromName || b.from || b.toName || b.to || "").toLowerCase();
          return aSender.localeCompare(bSender);
        } else if (settings.sortBy === "subject") {
          return a.subject.toLowerCase().localeCompare(b.subject.toLowerCase());
        }
        return 0;
      });
    }

    function renderEmailList() {
      emailsUl.innerHTML = "";
      let list = [];
      if (currentView === "inbox") {
        list = emails.inbox.filter(e => !e.spam && !e.trash && !e.archived);
      } else if (currentView === "sent") {
        list = emails.sent.filter(e => !e.trash && !e.archived);
      } else if (currentView === "drafts") {
        list = emails.drafts;
      } else if (currentView === "starred") {
        list = emails.inbox.filter(e => e.starred && !e.trash && !e.archived)
          .concat(emails.sent.filter(e => e.starred && !e.trash && !e.archived));
      } else if (currentView === "spam") {
        list = emails.inbox.filter(e => e.spam && !e.trash && !e.archived);
      } else if (currentView === "trash") {
        list = emails.inbox.filter(e => e.trash)
          .concat(emails.sent.filter(e => e.trash));
      } else if (currentView === "archive") {
        list = emails.inbox.filter(e => e.archived)
          .concat(emails.sent.filter(e => e.archived));
      } else if (currentView === "contacts" || currentView === "settings" || currentView === "wallet") {
        emailsUl.innerHTML = `<p class="p-4 text-gray-400 select-none">${translateText("Nenhum e-mail nesta seção.")}</p>`;
        emailCountText.textContent = translateText("0 e-mails");
        selectedEmails.clear();
        return;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        list = list.filter(e =>
          (e.from?.toLowerCase().includes(query) ||
           e.fromName?.toLowerCase().includes(query) ||
           e.to?.toLowerCase().includes(query) ||
           e.toName?.toLowerCase().includes(query) ||
           e.subject.toLowerCase().includes(query) ||
           e.body.toLowerCase().includes(query))
        );
      }

      list = sortEmails(list);

      if (list.length === 0) {
        emailsUl.innerHTML = `<p class="p-4 text-gray-400 select-none">${translateText("Nenhum e-mail nesta seção.")}</p>`;
        emailCountText.textContent = translateText("0 e-mails");
        selectedEmails.clear();
        return;
      }

      emailCountText.textContent = `${list.length} ${translateText("e-mail" + (list.length > 1 ? "s" : ""))}`;

      list.forEach(email => {
        const isSelected = selectedEmails.has(email.id);
        const fromOrTo = currentView === "sent" || currentView === "drafts" ? email.toName || email.to : email.fromName || email.from;
        const readClass = email.read ? "text-gray-400" : "text-white font-semibold";
        const subjectText = truncateText(email.subject, 30);
        const previewText = truncateText(email.body.replace(/\n/g, " "), 40);
        const dateText = formatDate(email.date);

        const li = document.createElement("li");
        li.className = `email-list-item cursor-pointer hover:bg-gray-800 transition px-4 py-2 flex items-center ${isSelected ? "bg-gray-900" : ""}`;
        li.tabIndex = 0;
        li.setAttribute("role", "button");
        li.setAttribute("aria-selected", isSelected ? "true" : "false");

        li.innerHTML = `
          <input type="checkbox" class="mr-2" ${isSelected ? "checked" : ""}>
          <div class="flex-1 flex flex-col">
            <div class="flex justify-between items-center mb-1">
              <span class="${readClass} truncate max-w-[60%] text-sm">${fromOrTo}</span>
              <span class="text-gray-500 text-xs flex-shrink-0">${dateText}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="${readClass} truncate max-w-[60%] text-sm">${subjectText}</span>
              <span class="text-gray-500 text-xs italic max-w-[35%] truncate">${previewText}</span>
            </div>
            ${email.attachments?.length > 0 ? `<div class="text-gray-500 text-xs mt-1"><i class="fas fa-paperclip mr-1"></i>${email.attachments.length} anexo${email.attachments.length > 1 ? "s" : ""}</div>` : ""}
          </div>
          <i class="fas fa-star text-yellow-400 ${email.starred ? "" : "hidden"}"></i>
        `;

        const checkbox = li.querySelector("input[type=checkbox]");
        checkbox.addEventListener("change", e => {
          e.stopPropagation();
          if (checkbox.checked) {
            selectedEmails.add(email.id);
          } else {
            selectedEmails.delete(email.id);
          }
          li.setAttribute("aria-selected", checkbox.checked ? "true" : "false");
          li.className = `email-list-item cursor-pointer hover:bg-gray-800 transition px-4 py-2 flex items-center ${checkbox.checked ? "bg-gray-900" : ""}`;
        });

        li.addEventListener("click", e => {
          if (e.target !== checkbox) {
            selectedEmails.clear();
            selectedEmails.add(email.id);
            if (!email.read && (currentView === "inbox" || currentView === "spam")) {
              email.read = true;
              updateCounts();
            }
            renderEmailList();
            renderEmailDetail(email);
            emailDetailView.classList.remove("hidden");
            emailListEl.classList.add("hidden");
            emailDetailView.classList.add("modal-enter");
            setTimeout(() => emailDetailView.classList.add("modal-enter-active"), 10);
          }
        });

        li.addEventListener("keydown", e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            li.click();
          }
        });

        emailsUl.appendChild(li);
      });
    }

    function renderEmailDetail(email) {
      if (!email) {
        emailDetailContent.innerHTML = `<p class="text-gray-500 text-center mt-20 select-none">${translateText("Selecione um e-mail para visualizar")}</p>`;
        emailDetailDate.textContent = "";
        detailStarBtn.querySelector("i").classList.remove("fas", "far");
        detailStarBtn.querySelector("i").classList.add("far");
        return;
      }

      let fromOrToLabel = translateText("De:");
      let fromOrToValue = email.fromName ? `${email.fromName} <${email.from}>` : email.from;
      if (currentView === "sent" || currentView === "drafts") {
        fromOrToLabel = translateText("Para:");
        fromOrToValue = email.toName ? `${email.toName} <${email.to}>` : email.to;
      }

      const attachmentsHtml = email.attachments?.length > 0 ? `
        <div class="mt-4">
          <p class="font-semibold">${translateText("Anexos:")}</p>
          <ul class="mt-2 space-y-1">
            ${email.attachments.map(att => `<li class="text-gray-400 text-xs"><i class="fas fa-paperclip mr-1"></i><a href="#" class="hover:underline">${att.name} (${att.size})</a></li>`).join("")}
          </ul>
        </div>
      ` : "";

      emailDetailContent.innerHTML = `
        <h3 class="text-white text-lg font-semibold mb-2">${email.subject}</h3>
        <div class="mb-4 text-gray-400 text-xs space-y-1">
          <p><strong>${fromOrToLabel}</strong> ${fromOrToValue}</p>
          ${email.cc ? `<p><strong>Cc:</strong> ${email.cc}</p>` : ""}
          ${email.bcc ? `<p><strong>${translateText("Cco:")}</strong> ${email.bcc}</p>` : ""}
        </div>
        <hr class="border-gray-700 mb-4" />
        <pre class="whitespace-pre-wrap text-gray-300 text-sm">${email.body}</pre>
        ${attachmentsHtml}
      `;
      emailDetailDate.textContent = formatDate(email.date);
      detailStarBtn.querySelector("i").classList.remove("fas", "far");
      detailStarBtn.querySelector("i").classList.add(email.starred ? "fas" : "far");
      detailArchiveBtn.querySelector("i").classList.toggle("fas", email.archived);
      detailArchiveBtn.querySelector("i").classList.toggle("far", !email.archived);
    }

    function renderContacts() {
      emailsUl.innerHTML = "";
      emailCountText.textContent = `${emails.contacts.length} ${translateText("contato" + (emails.contacts.length > 1 ? "s" : ""))}`;
      selectedEmails.clear();

      emails.contacts.forEach(contact => {
        const li = document.createElement("li");
        li.className = "email-list-item cursor-pointer px-4 py-2 flex items-center border-b border-gray-800 hover:bg-gray-800 transition";
        li.tabIndex = 0;
        li.setAttribute("role", "button");

        li.innerHTML = `
          <img src="${contact.avatar}" alt="Avatar do contato ${contact.name}, ${contact.description}" class="rounded-full w-8 h-8 mr-3 flex-shrink-0" />
          <div class="flex flex-col">
            <span class="text-white font-semibold text-sm">${contact.name}</span>
            <span class="text-gray-400 text-xs truncate max-w-[80%]">${contact.email}</span>
          </div>
        `;

        li.addEventListener("click", () => {
          openCompose();
          document.getElementById("toInput").value = contact.email;
        });

        emailsUl.appendChild(li);
      });

      emailDetailContent.innerHTML = `<p class="text-gray-500 text-center mt-20 select-none">${translateText("Selecione um contato para enviar um e-mail")}</p>`;
      emailDetailDate.textContent = "";
    }

    function renderTransactionHistory() {
      transactionHistory.innerHTML = "";
      if (emails.transactions.length === 0) {
        transactionHistory.innerHTML = `<li class="text-gray-400">${translateText("Sem transações recentes.")}</li>`;
        return;
      }
      emails.transactions.forEach(tx => {
        const li = document.createElement("li");
        li.className = "text-gray-400 text-xs";
        li.textContent = `${tx.date} - ${tx.type === "add" ? "+" : "-"}${tx.amount.toFixed(2)} HCoins`;
        transactionHistory.appendChild(li);
      });
    }

    function updateCounts() {
      const inboxCount = emails.inbox.filter(e => !e.read && !e.spam && !e.trash && !e.archived).length;
      const spamCount = emails.inbox.filter(e => e.spam && !e.trash && !e.archived).length;
      inboxUnread.textContent = inboxCount;
      spamUnread.textContent = spamCount;
      mobileInboxUnread.textContent = inboxCount;
      mobileSpamUnread.textContent = spamCount;
      inboxUnread.classList.toggle("hidden", inboxCount === 0);
      spamUnread.classList.toggle("hidden", spamCount === 0);
      mobileInboxUnread.classList.toggle("hidden", inboxCount === 0);
      mobileSpamUnread.classList.toggle("hidden", spamCount === 0);
    }

    // Navigation handlers
    function showInbox() {
      currentView = "inbox";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showSent() {
      currentView = "sent";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showDrafts() {
      currentView = "drafts";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showStarred() {
      currentView = "starred";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showSpam() {
      currentView = "spam";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showTrash() {
      currentView = "trash";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showArchive() {
      currentView = "archive";
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function showContacts() {
      currentView = "contacts";
      selectedEmails.clear();
      renderContacts();
      closeCompose();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
    }

    function openSettings() {
      currentView = "settings";
      selectedEmails.clear();
      settingsModal.classList.remove("hidden");
      document.getElementById("themeSelect").value = settings.theme;
      document.getElementById("signatureInput").value = settings.signature;
      document.getElementById("languageSelect").value = settings.language;
      document.getElementById("notificationsSelect").value = settings.notifications;
      closeCompose();
      closeWallet();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
      settingsModal.classList.add("modal-enter");
      setTimeout(() => settingsModal.classList.add("modal-enter-active"), 10);
    }

    function openWallet() {
      currentView = "wallet";
      selectedEmails.clear();
      walletModal.classList.remove("hidden");
      walletBalanceEl.textContent = walletBalance.toFixed(2);
      document.getElementById("addFundsInput").value = "";
      renderTransactionHistory();
      closeCompose();
      closeSettings();
      closeMobileMenu();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
      walletModal.classList.add("modal-enter");
      setTimeout(() => walletModal.classList.add("modal-enter-active"), 10);
    }

    function openCompose() {
      currentView = "compose";
      selectedEmails.clear();
      composeModal.classList.remove("hidden");
      composeForm.reset();
      closeSettings();
      closeWallet();
      closeMobileMenu();
      document.getElementById("toInput").focus();
      emailListEl.classList.remove("hidden");
      emailDetailView.classList.add("hidden");
      composeModal.classList.add("modal-enter");
      setTimeout(() => composeModal.classList.add("modal-enter-active"), 10);
    }

    function closeCompose() {
      if (!composeModal.classList.contains("hidden")) {
        composeModal.classList.add("modal-exit");
        composeModal.classList.add("modal-exit-active");
        setTimeout(() => {
          composeModal.classList.add("hidden");
          composeModal.classList.remove("modal-exit", "modal-exit-active");
        }, 300);
      }
    }

    function closeSettings() {
      if (!settingsModal.classList.contains("hidden")) {
        settingsModal.classList.add("modal-exit");
        settingsModal.classList.add("modal-exit-active");
        setTimeout(() => {
          settingsModal.classList.add("hidden");
          settingsModal.classList.remove("modal-exit", "modal-exit-active");
        }, 300);
      }
    }

    function closeWallet() {
      if (!walletModal.classList.contains("hidden")) {
        walletModal.classList.add("modal-exit");
        walletModal.classList.add("modal-exit-active");
        setTimeout(() => {
          walletModal.classList.add("hidden");
          walletModal.classList.remove("modal-exit", "modal-exit-active");
        }, 300);
      }
    }

    function closeMobileMenu() {
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }

    // Toolbar and detail actions
    function selectAllEmails() {
      let list = [];
      if (currentView === "inbox") {
        list = emails.inbox.filter(e => !e.spam && !e.trash && !e.archived);
      } else if (currentView === "sent") {
        list = emails.sent.filter(e => !e.trash && !e.archived);
      } else if (currentView === "drafts") {
        list = emails.drafts;
      } else if (currentView === "starred") {
        list = emails.inbox.filter(e => e.starred && !e.trash && !e.archived)
          .concat(emails.sent.filter(e => e.starred && !e.trash && !e.archived));
      } else if (currentView === "spam") {
        list = emails.inbox.filter(e => e.spam && !e.trash && !e.archived);
      } else if (currentView === "trash") {
        list = emails.inbox.filter(e => e.trash)
          .concat(emails.sent.filter(e => e.trash));
      } else if (currentView === "archive") {
        list = emails.inbox.filter(e => e.archived)
          .concat(emails.sent.filter(e => e.archived));
      }
      if (selectAllBtn.querySelector("i").classList.contains("fa-check-square")) {
        list.forEach(email => selectedEmails.add(email.id));
        selectAllBtn.querySelector("i").classList.remove("fa-check-square");
        selectAllBtn.querySelector("i").classList.add("fa-square");
      } else {
        selectedEmails.clear();
        selectAllBtn.querySelector("i").classList.remove("fa-square");
        selectAllBtn.querySelector("i").classList.add("fa-check-square");
      }
      renderEmailList();
    }

    function deleteSelectedEmails() {
      if (selectedEmails.size === 0) return;
      if (currentView === "inbox" || currentView === "spam" || currentView === "starred" || currentView === "archive") {
        emails.inbox = emails.inbox.filter(e => {
          if (selectedEmails.has(e.id)) {
            if (currentView === "trash") return false;
            e.trash = true;
            e.archived = false;
            return true;
          }
          return true;
        });
      } else if (currentView === "sent" || currentView === "drafts") {
        const folder = currentView === "sent" ? "sent" : "drafts";
        emails[folder] = emails[folder].filter(e => {
          if (selectedEmails.has(e.id)) {
            if (currentView === "trash") return false;
            e.trash = true;
            e.archived = false;
            return true;
          }
          return true;
        });
      } else if (currentView === "trash") {
        emails.inbox = emails.inbox.filter(e => !selectedEmails.has(e.id));
        emails.sent = emails.sent.filter(e => !selectedEmails.has(e.id));
      }
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      updateCounts();
      emailDetailView.classList.add("hidden");
      emailListEl.classList.remove("hidden");
    }

    function markSelectedRead() {
      if (selectedEmails.size === 0) return;
      if (currentView === "inbox" || currentView === "spam" || currentView === "starred" || currentView === "archive") {
        emails.inbox.forEach(e => {
          if (selectedEmails.has(e.id) && !e.read) {
            e.read = true;
          }
        });
      }
      renderEmailList();
      updateCounts();
    }

    function markSelectedUnread() {
      if (selectedEmails.size === 0) return;
      if (currentView === "inbox" || currentView === "spam" || currentView === "starred" || currentView === "archive") {
        emails.inbox.forEach(e => {
          if (selectedEmails.has(e.id) && e.read) {
            e.read = false;
          }
        });
      }
      renderEmailList();
      updateCounts();
    }

    function toggleStarSelected() {
      if (selectedEmails.size === 0) return;
      const shouldStar = [...selectedEmails].some(id => {
        const email = emails.inbox.find(e => e.id === id) || emails.sent.find(e => e.id === id) || emails.drafts.find(e => e.id === id);
        return email && !email.starred;
      });
      if (currentView === "inbox" || currentView === "spam" || currentView === "starred" || currentView === "archive") {
        emails.inbox.forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.starred = shouldStar;
          }
        });
      } else if (currentView === "sent" || currentView === "drafts") {
        const folder = currentView === "sent" ? "sent" : "drafts";
        emails[folder].forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.starred = shouldStar;
          }
        });
      }
      renderEmailList();
      if (emailDetailView.classList.contains("hidden")) return;
      const email = emails.inbox.find(e => e.id === [...selectedEmails][0]) ||
                    emails.sent.find(e => e.id === [...selectedEmails][0]) ||
                    emails.drafts.find(e => e.id === [...selectedEmails][0]);
      renderEmailDetail(email);
    }

    function archiveSelectedEmails() {
      if (selectedEmails.size === 0) return;
      if (currentView === "inbox" || currentView === "spam" || currentView === "starred") {
        emails.inbox.forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.archived = true;
            e.spam = false;
            e.starred = false;
          }
        });
      } else if (currentView === "sent") {
        emails.sent.forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.archived = true;
            e.starred = false;
          }
        });
      } else if (currentView === "archive") {
        emails.inbox.forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.archived = false;
          }
        });
        emails.sent.forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.archived = false;
          }
        });
      }
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      updateCounts();
      emailDetailView.classList.add("hidden");
      emailListEl.classList.remove("hidden");
    }

    function moveToSpam() {
      if (selectedEmails.size === 0) return;
      if (currentView === "inbox" || currentView === "starred" || currentView === "archive") {
        emails.inbox.forEach(e => {
          if (selectedEmails.has(e.id)) {
            e.spam = true;
            e.starred = false;
            e.archived = false;
          }
        });
      }
      selectedEmails.clear();
      renderEmailList();
      renderEmailDetail(null);
      updateCounts();
      emailDetailView.classList.add("hidden");
      emailListEl.classList.remove("hidden");
    }

    function replyToEmail() {
      if (selectedEmails.size !== 1) return;
      const email = emails.inbox.find(e => e.id === [...selectedEmails][0]);
      if (!email) return;
      openCompose();
      document.getElementById("toInput").value = email.from;
      document.getElementById("subjectInput").value = `Re: ${email.subject}`;
      document.getElementById("bodyInput").value = `\n\n${translateText("Em")} ${formatDate(email.date)}, ${email.fromName || email.from} ${translateText("escreveu")}:\n> ${email.body}`;
      emailDetailView.classList.add("hidden");
      emailListEl.classList.remove("hidden");
    }

    function forwardEmail() {
      if (selectedEmails.size !== 1) return;
      const email = emails.inbox.find(e => e.id === [...selectedEmails][0]) ||
                    emails.sent.find(e => e.id === [...selectedEmails][0]);
      if (!email) return;
      openCompose();
      document.getElementById("toInput").value = "";
      document.getElementById("subjectInput").value = `Fwd: ${email.subject}`;
      document.getElementById("bodyInput").value = `\n\n${translateText("----- Mensagem Encaminhada -----")}\n${translateText("De:")} ${email.fromName || email.from}\n${translateText("Data:")} ${formatDate(email.date)}\n${translateText("Assunto:")} ${email.subject}\n\n${email.body}`;
      emailDetailView.classList.add("hidden");
      emailListEl.classList.remove("hidden");
    }

    function saveDraft() {
      const to = composeForm.to.value.trim();
      const cc = composeForm.cc.value.trim();
      const bcc = composeForm.bcc.value.trim();
      const subject = composeForm.subject.value.trim();
      const body = composeForm.body.value.trim();
      const attachments = Array.from(composeForm.attachment.files).map(file => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      }));
      if (!to && !cc && !bcc && !subject && !body && attachments.length === 0) return;
      const draft = {
        id: Date.now(),
        to,
        toName: null,
        cc,
        bcc,
        subject,
        body,
        date: new Date().toISOString(),
        read: true,
        spam: false,
        trash: false,
        starred: false,
        archived: false,
        attachments
      };
      const contact = emails.contacts.find(c => c.email.toLowerCase() === to.toLowerCase());
      if (contact) draft.toName = contact.name;
      emails.drafts.unshift(draft);
      alert(translateText("Rascunho salvo!"));
      closeCompose();
      showDrafts();
    }

    function sortEmailsMenu() {
      const sortOptions = [
        { value: "date-desc", label: translateText("Ordenar por data (decrescente)") },
        { value: "date-asc", label: translateText("Ordenar por data (crescente)") },
        { value: "sender", label: translateText("Ordenar por remetente") },
        { value: "subject", label: translateText("Ordenar por assunto") }
      ];
      const currentSort = sortOptions.find(opt => opt.value === settings.sortBy)?.label || sortOptions[0].label;
      const menu = document.createElement("div");
      menu.className = "absolute right-0 mt-2 w-48 glass rounded-md shadow-lg z-50";
      menu.innerHTML = sortOptions.map(opt => `
        <button class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 ${settings.sortBy === opt.value ? "bg-gray-600" : ""}" data-value="${opt.value}">
          ${opt.label}
        </button>
      `).join("");
      document.body.appendChild(menu);
      menu.style.top = `${sortBtn.getBoundingClientRect().bottom + window.scrollY}px`;
      menu.style.right = `${window.innerWidth - sortBtn.getBoundingClientRect().right}px`;

      menu.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          settings.sortBy = btn.dataset.value;
          renderEmailList();
          menu.remove();
        });
      });

      document.addEventListener("click", e => {
        if (!menu.contains(e.target) && e.target !== sortBtn) {
          menu.remove();
        }
      }, { once: true });
    }

    // Event listeners
    mobileInboxBtn.addEventListener("click", showInbox);
    mobileSentBtn.addEventListener("click", showSent);
    mobileDraftsBtn.addEventListener("click", showDrafts);
    mobileStarredBtn.addEventListener("click", showStarred);
    mobileContactsBtn.addEventListener("click", showContacts);
    mobileSpamBtn.addEventListener("click", showSpam);
    mobileTrashBtn.addEventListener("click", showTrash);
    mobileComposeBtn.addEventListener("click", openCompose);
    mobileSettingsBtn.addEventListener("click", openSettings);
    mobileWalletBtn.addEventListener("click", openWallet);
    inboxBtn.addEventListener("click", showInbox);
    sentBtn.addEventListener("click", showSent);
    draftsBtn.addEventListener("click", showDrafts);
    starredBtn.addEventListener("click", showStarred);
    contactsBtn.addEventListener("click", showContacts);
    spamBtn.addEventListener("click", showSpam);
    trashBtn.addEventListener("click", showTrash);
    composeBtn.addEventListener("click", openCompose);
    settingsBtn.addEventListener("click", openSettings);
    walletBtn.addEventListener("click", openWallet);
    mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
    selectAllBtn.addEventListener("click", selectAllEmails);
    refreshBtn.addEventListener("click", () => {
      searchQuery = "";
      searchInput.value = "";
      alert(translateText("Atualizado!"));
      renderEmailList();
    });
    deleteBtn.addEventListener("click", deleteSelectedEmails);
    markReadBtn.addEventListener("click", markSelectedRead);
    markUnreadBtn.addEventListener("click", markSelectedUnread);
    starBtn.addEventListener("click", toggleStarSelected);
    moveToSpamBtn.addEventListener("click", moveToSpam);
    archiveBtn.addEventListener("click", archiveSelectedEmails);
    backToListBtn.addEventListener("click", () => {
      emailDetailView.classList.add("modal-exit");
      emailDetailView.classList.add("modal-exit-active");
      setTimeout(() => {
        emailDetailView.classList.add("hidden");
        emailListEl.classList.remove("hidden");
        selectedEmails.clear();
        renderEmailList();
        renderEmailDetail(null);
        emailDetailView.classList.remove("modal-exit", "modal-exit-active");
      }, 300);
    });
    detailDeleteBtn.addEventListener("click", deleteSelectedEmails);
    detailStarBtn.addEventListener("click", toggleStarSelected);
    detailReplyBtn.addEventListener("click", replyToEmail);
    detailForwardBtn.addEventListener("click", forwardEmail);
    detailArchiveBtn.addEventListener("click", archiveSelectedEmails);
    closeComposeBtn.addEventListener("click", closeCompose);
    cancelComposeBtn.addEventListener("click", closeCompose);
    saveDraftBtn.addEventListener("click", saveDraft);
    closeSettingsBtn.addEventListener("click", closeSettings);
    cancelSettingsBtn.addEventListener("click", closeSettings);
    settingsForm.addEventListener("submit", e => {
      e.preventDefault();
      settings.theme = document.getElementById("themeSelect").value;
      settings.signature = document.getElementById("signatureInput").value;
      settings.language = document.getElementById("languageSelect").value;
      settings.notifications = document.getElementById("notificationsSelect").value;
      applyTheme(settings.theme);
      alert(translateText("Configurações salvas!"));
      closeSettings();
      showInbox();
    });
    closeWalletBtn.addEventListener("click", closeWallet);
    addFundsBtn.addEventListener("click", () => {
      const amount = parseFloat(document.getElementById("addFundsInput").value);
      if (amount && amount > 0) {
        walletBalance += amount;
        emails.transactions.push({
          date: formatDate(new Date().toISOString()),
          type: "add",
          amount
        });
        walletBalanceEl.textContent = walletBalance.toFixed(2);
        renderTransactionHistory();
        alert(translateText("Fundos adicionados!"));
      } else {
        alert(translateText("Valor inválido."));
      }
    });
    composeForm.addEventListener("submit", e => {
      e.preventDefault();
      const to = composeForm.to.value.trim();
      const cc = composeForm.cc.value.trim();
      const bcc = composeForm.bcc.value.trim();
      const subject = composeForm.subject.value.trim();
      let body = composeForm.body.value.trim();
      const attachments = Array.from(composeForm.attachment.files).map(file => ({
  name: file.name,
  size: (file.size / 1024 / 1024).toFixed(2) + " MB"
}));
if (!to && !cc && !bcc) {
  alert(translateText("Por favor, preencha pelo menos um destinatário."));
  return;
}
if (settings.signature) {
  body += `\n\n${settings.signature}`;
}
const newEmail = {
  id: Date.now(),
  to,
  toName: null,
  cc,
  bcc,
  subject,
  body,
  date: new Date().toISOString(),
  read: true,
  spam: false,
  trash: false,
  starred: false,
  archived: false,
  attachments
};
const contact = emails.contacts.find(c => c.email.toLowerCase() === to.toLowerCase());
if (contact) newEmail.toName = contact.name;
emails.sent.unshift(newEmail);
if (currentView === "drafts") {
  emails.drafts = emails.drafts.filter(e => !selectedEmails.has(e.id));
  selectedEmails.clear();
}
alert(translateText("E-mail enviado com sucesso!"));
closeCompose();
showSent();
});
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.trim();
  renderEmailList();
});
sortBtn.addEventListener("click", sortEmailsMenu);

// Initial render
applyTheme(settings.theme);
updateCounts();
renderEmailList();
