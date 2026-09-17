/* Vanilla-SVG chart helpers — no external dependency, works offline (file://). */
(function (global) {
  const NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, children) {
    const node = document.createElementNS(NS, tag);
    for (const k in attrs || {}) node.setAttribute(k, attrs[k]);
    (children || []).forEach((c) => c != null && node.appendChild(c));
    return node;
  }

  function htmlEl(tag, attrs) {
    const node = document.createElement(tag);
    for (const k in attrs || {}) node.setAttribute(k, attrs[k]);
    return node;
  }

  function fmtInt(n) {
    if (n == null) return "";
    return Math.round(n).toLocaleString("pt-BR");
  }

  function fmtDec(n, digits) {
    if (n == null) return "";
    return n.toLocaleString("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  // ---- Grouped monthly bar chart (3 series) ----
  function renderGroupedBarChart(container, opts) {
    const { categories, series, height = 260 } = opts;
    const width = Math.max(container.clientWidth || 900, 700);
    const padding = { top: 26, right: 10, bottom: 30, left: 10 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const allValues = series.flatMap((s) => s.values);
    const maxVal = Math.max(...allValues, 1) * 1.08;

    const groupW = plotW / categories.length;
    const barGap = 3;
    const barW = (groupW - barGap * (series.length + 1)) / series.length;

    const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height });

    categories.forEach((cat, i) => {
      const groupX = padding.left + i * groupW;
      series.forEach((s, si) => {
        const v = s.values[i] || 0;
        const barH = (v / maxVal) * plotH;
        const x = groupX + barGap + si * (barW + barGap);
        const y = padding.top + plotH - barH;
        svg.appendChild(
          el("rect", { x, y, width: barW, height: Math.max(barH, 1), rx: 3, fill: s.color })
        );
        if (v > 0) {
          const label = fmtInt(v);
          const lx = x + barW / 2;
          const ly = y + 4;
          const t = el("text", {
            x: lx,
            y: ly,
            "text-anchor": "end",
            class: "bar-value-label",
            transform: `rotate(-90 ${lx} ${ly})`,
          });
          t.textContent = label;
          svg.appendChild(t);
        }
      });
      const label = el("text", {
        x: groupX + groupW / 2,
        y: height - 8,
        "text-anchor": "middle",
        class: "axis-label",
      });
      label.textContent = cat;
      svg.appendChild(label);
    });

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ---- Single-series daily bar chart with reference lines ----
  function renderDailyBarChart(container, opts) {
    const {
      days, // array of day labels e.g. "1/9/2026"
      values, // array of numbers or null
      color,
      planoDiario,
      planoMedia,
      valueFormatter = fmtInt,
      height = 130,
    } = opts;
    const width = Math.max(container.clientWidth || 1100, 700);
    const padding = { top: 20, right: 46, bottom: 46, left: 6 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const realValues = values.filter((v) => v != null);
    const maxVal = Math.max(...realValues, planoDiario || 0, planoMedia || 0, 1) * 1.15;

    const colW = plotW / days.length;
    const barW = colW * 0.62;

    const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height });

    const yFor = (v) => padding.top + plotH - (v / maxVal) * plotH;

    days.forEach((d, i) => {
      const x = padding.left + i * colW + (colW - barW) / 2;
      const v = values[i];
      if (v != null) {
        const y = yFor(v);
        const barH = padding.top + plotH - y;
        svg.appendChild(el("rect", { x, y, width: barW, height: Math.max(barH, 1), rx: 2, fill: color }));
        const lx = x + barW / 2;
        const ly = y - 3;
        const t = el("text", {
          x: lx,
          y: ly,
          "text-anchor": "middle",
          class: "bar-value-label dark",
          transform: `rotate(-90 ${lx} ${ly})`,
        });
        t.textContent = valueFormatter(v);
        svg.appendChild(t);
      }
      const dayLabel = el("text", {
        x: padding.left + i * colW + colW / 2,
        y: height - padding.bottom + 14,
        "text-anchor": "middle",
        class: "axis-label",
      });
      dayLabel.textContent = d;
      svg.appendChild(dayLabel);
    });

    if (planoDiario) {
      const y = yFor(planoDiario);
      svg.appendChild(
        el("line", {
          x1: padding.left,
          x2: padding.left + plotW,
          y1: y,
          y2: y,
          stroke: "var(--text-muted)",
          "stroke-width": 1.5,
          "stroke-dasharray": "6 4",
        })
      );
    }
    if (planoMedia) {
      const y = yFor(planoMedia);
      svg.appendChild(
        el("line", {
          x1: padding.left,
          x2: padding.left + plotW,
          y1: y,
          y2: y,
          stroke: "var(--status-critical)",
          "stroke-width": 1.5,
          "stroke-dasharray": "2 3",
        })
      );
      const badgeW = 44;
      svg.appendChild(
        el("rect", { x: width - padding.right + 2, y: y - 9, width: badgeW - 6, height: 18, rx: 3, fill: "var(--status-critical)" })
      );
      const bt = el("text", { x: width - padding.right + 2 + (badgeW - 6) / 2, y: y + 4, "text-anchor": "middle", fill: "#fff", "font-size": 11, "font-weight": 700 });
      bt.textContent = valueFormatter(planoMedia);
      svg.appendChild(bt);
    }

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ---- Vagões/hora chart: bars + horizontal plan line + time labels ----
  function renderRateChart(container, opts) {
    const { days, values, times, color, planoDiario, height = 150 } = opts;
    const width = Math.max(container.clientWidth || 1100, 700);
    const padding = { top: 30, right: 10, bottom: 46, left: 6 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const realValues = values.filter((v) => v != null);
    const maxVal = Math.max(...realValues, planoDiario || 0, 1) * 1.25;
    const colW = plotW / days.length;
    const barW = colW * 0.62;
    const yFor = (v) => padding.top + plotH - (v / maxVal) * plotH;

    const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height });

    days.forEach((d, i) => {
      const x = padding.left + i * colW + (colW - barW) / 2;
      const v = values[i];
      if (v != null) {
        const y = yFor(v);
        const barH = padding.top + plotH - y;
        svg.appendChild(el("rect", { x, y, width: barW, height: Math.max(barH, 1), rx: 2, fill: color }));
        const vt = el("text", { x: x + barW / 2, y: y - 3, "text-anchor": "middle", class: "bar-value-label dark" });
        vt.textContent = fmtDec(v, 2);
        svg.appendChild(vt);
        if (times && times[i]) {
          const tt = el("text", {
            x: x + barW / 2,
            y: padding.top - 8,
            "text-anchor": "middle",
            class: "axis-label",
            "font-size": 8,
          });
          tt.textContent = times[i];
          svg.appendChild(tt);
        }
      }
      const dayLabel = el("text", {
        x: padding.left + i * colW + colW / 2,
        y: height - padding.bottom + 14,
        "text-anchor": "middle",
        class: "axis-label",
      });
      dayLabel.textContent = d;
      svg.appendChild(dayLabel);
    });

    if (planoDiario) {
      const y = yFor(planoDiario);
      svg.appendChild(
        el("line", { x1: padding.left, x2: padding.left + plotW, y1: y, y2: y, stroke: "var(--series-orange)", "stroke-width": 2 })
      );
    }

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ---- Gauge (real / saldo out of meta) ----
  function renderGauge(container, opts) {
    const { real, saldo, meta, height = 170 } = opts;
    const width = Math.max(container.clientWidth || 320, 260);
    const cx = width / 2;
    const cy = height - 34;
    const r = Math.min(width, height * 1.7) / 2 - 18;
    const total = real + saldo || 1;
    const realFrac = real / total;

    const startAngle = Math.PI; // 180deg (left)
    const endAngle = 0; // 0deg (right)
    const realAngle = startAngle - (startAngle - endAngle) * realFrac;

    function point(angle, radius) {
      return [cx + radius * Math.cos(angle), cy - radius * Math.sin(angle)];
    }
    function arcPath(a0, a1, radius) {
      const [x0, y0] = point(a0, radius);
      const [x1, y1] = point(a1, radius);
      const largeArc = Math.abs(a0 - a1) > Math.PI ? 1 : 0;
      return `M ${x0} ${y0} A ${radius} ${radius} 0 ${largeArc} 0 ${x1} ${y1}`;
    }

    const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, width: "100%", height });
    const strokeW = 22;

    svg.appendChild(el("path", { d: arcPath(startAngle, realAngle, r), fill: "none", stroke: "var(--series-gray)", "stroke-width": strokeW }));
    svg.appendChild(el("path", { d: arcPath(realAngle, endAngle, r), fill: "none", stroke: "var(--series-orange)", "stroke-width": strokeW }));

    const [rx, ry] = point((startAngle + realAngle) / 2, r);
    const realLabel = el("text", { x: rx, y: ry - 14, "text-anchor": "middle", "font-size": 18, "font-weight": 800 });
    realLabel.textContent = fmtInt(real);
    svg.appendChild(realLabel);

    const [sx, sy] = point((realAngle + endAngle) / 2, r);
    const saldoLabel = el("text", { x: sx, y: sy - 14, "text-anchor": "middle", "font-size": 15, "font-weight": 800, fill: "var(--series-orange)" });
    saldoLabel.textContent = fmtInt(saldo);
    svg.appendChild(saldoLabel);

    const metaLabel = el("text", { x: cx, y: cy - 6, "text-anchor": "middle", "font-size": 20, "font-weight": 800 });
    metaLabel.textContent = fmtInt(meta);
    svg.appendChild(metaLabel);
    const metaCaption = el("text", { x: cx, y: cy + 14, "text-anchor": "middle", "font-size": 11, "font-weight": 700, class: "axis-label" });
    metaCaption.textContent = "META MÊS";
    svg.appendChild(metaCaption);

    container.innerHTML = "";
    container.appendChild(svg);
  }

  // ---- Day strip (bottom detail tables) ----
  function renderDayStrip(container, opts) {
    const { dayLabels, counts, times } = opts;
    container.innerHTML = "";
    const wrap = htmlEl("div", { class: "strip" });
    dayLabels.forEach((d, i) => {
      const col = htmlEl("div", { class: "strip-col" });
      const count = counts[i];
      const box = htmlEl("div", { class: "strip-box" + (count === 0 ? " zero" : "") });
      box.textContent = count;
      const time = htmlEl("div", { class: "strip-time" });
      time.textContent = times[i];
      const dayEl = htmlEl("div", { class: "strip-day" });
      dayEl.textContent = d;
      col.appendChild(box);
      col.appendChild(time);
      col.appendChild(dayEl);
      wrap.appendChild(col);
    });
    container.appendChild(wrap);
  }

  global.PainelCharts = {
    renderGroupedBarChart,
    renderDailyBarChart,
    renderRateChart,
    renderGauge,
    renderDayStrip,
    fmtInt,
    fmtDec,
  };
})(window);
