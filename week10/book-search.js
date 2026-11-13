(() => {
  "use strict";

  const API = "https://openlibrary.org/search.json";
  const PAGE_SIZE = 12;
  const form = document.getElementById("searchForm");
  const queryInput = document.getElementById("query");
  const typeInput = document.getElementById("searchType");
  const searchButton = document.getElementById("searchButton");
  const status = document.getElementById("status");
  const results = document.getElementById("results");
  const previousButton = document.getElementById("previousPage");
  const nextButton = document.getElementById("nextPage");
  const pageStatus = document.getElementById("pageStatus");

  if (!form || !queryInput || !results || !status) return;

  const state = { query: "", type: "title", page: 1, total: 0, controller: null };

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.style.color = isError ? "#b42318" : "";
  }

  function textElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function createCover(book) {
    const wrap = document.createElement("div");
    wrap.className = "book-cover-wrap";

    if (Number.isFinite(book.cover_i)) {
      const img = document.createElement("img");
      img.className = "book-cover";
      img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      img.alt = `Cover of ${book.title || "book"}`;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => {
        wrap.replaceChildren(textElement("span", "cover-fallback", "Cover not available"));
      }, { once: true });
      wrap.append(img);
    } else {
      wrap.append(textElement("span", "cover-fallback", "No cover available"));
    }
    return wrap;
  }

  function createCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";
    card.append(createCover(book));
    card.append(textElement("h3", "", book.title || "Untitled"));

    const authorText = Array.isArray(book.author_name) && book.author_name.length
      ? book.author_name.slice(0, 3).join(", ")
      : "Author not listed";
    card.append(textElement("p", "", `Author: ${authorText}`));

    if (book.first_publish_year) {
      card.append(textElement("p", "", `First published: ${book.first_publish_year}`));
    }
    if (Number.isFinite(book.edition_count)) {
      card.append(textElement("p", "", `${book.edition_count} edition${book.edition_count === 1 ? "" : "s"}`));
    }

    const key = typeof book.key === "string" ? book.key : "";
    if (key.startsWith("/works/") || key.startsWith("/books/")) {
      const link = document.createElement("a");
      link.href = `https://openlibrary.org${key}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "View book record ↗";
      card.append(link);
    }
    return card;
  }

  function updatePager() {
    const pages = Math.max(1, Math.ceil(state.total / PAGE_SIZE));
    pageStatus.textContent = `Page ${state.page} of ${pages}`;
    previousButton.disabled = state.page <= 1;
    nextButton.disabled = state.total === 0 || state.page >= pages;
  }

  async function search() {
    const term = state.query.trim();
    if (!term) {
      results.replaceChildren();
      state.total = 0;
      setStatus("Please enter a book title or author.", true);
      updatePager();
      return;
    }

    if (state.controller) state.controller.abort();
    state.controller = new AbortController();

    const params = new URLSearchParams({
      [state.type]: term,
      page: String(state.page),
      limit: String(PAGE_SIZE),
      fields: "key,title,author_name,first_publish_year,cover_i,edition_count"
    });

    results.replaceChildren();
    searchButton.disabled = true;
    previousButton.disabled = true;
    nextButton.disabled = true;
    setStatus("Searching Open Library…");

    try {
      const response = await fetch(`${API}?${params}`, {
        signal: state.controller.signal,
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error(`Search service returned HTTP ${response.status}.`);

      const data = await response.json();
      const docs = Array.isArray(data.docs) ? data.docs : [];
      state.total = Number(data.numFound ?? data.num_found ?? docs.length) || 0;

      if (!docs.length) {
        setStatus(`No books found for “${term}”. Try another spelling or search type.`);
        updatePager();
        return;
      }

      const fragment = document.createDocumentFragment();
      docs.forEach((book) => fragment.append(createCard(book)));
      results.append(fragment);

      const first = (state.page - 1) * PAGE_SIZE + 1;
      const last = Math.min(first + docs.length - 1, state.total);
      setStatus(`Showing ${first}–${last} of ${state.total.toLocaleString()} results for “${term}”.`);
      updatePager();
    } catch (error) {
      if (error.name === "AbortError") return;
      state.total = 0;
      results.replaceChildren();
      setStatus(`Could not load books. ${error.message} Check your internet connection and try again.`, true);
      updatePager();
    } finally {
      searchButton.disabled = false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    state.query = queryInput.value.trim();
    state.type = typeInput.value;
    state.page = 1;
    search();
  });

  previousButton.addEventListener("click", () => {
    if (state.page > 1) {
      state.page -= 1;
      search();
    }
  });

  nextButton.addEventListener("click", () => {
    if (state.page * PAGE_SIZE < state.total) {
      state.page += 1;
      search();
    }
  });

  updatePager();
})();