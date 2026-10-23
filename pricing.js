// Kopla — Seção de planos: troca mensal/anual e comparativo expansível.
(function () {
  function formatBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
      minimumFractionDigits: value % 1 ? 2 : 0,
      maximumFractionDigits: 2,
    });
  }

  function initPricing(root) {
    var options = root.querySelectorAll("[data-billing]");
    var plans = root.querySelectorAll("[data-monthly]");

    function setBilling(cycle) {
      options.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(btn.dataset.billing === cycle));
      });

      plans.forEach(function (plan) {
        var monthly = parseFloat(plan.dataset.monthly);
        var annual = parseFloat(plan.dataset.annual);
        var amount = plan.querySelector(".kp-plan__amount");
        var billed = plan.querySelector(".kp-plan__billed");

        if (cycle === "annual") {
          amount.textContent = formatBRL(annual);
          billed.innerHTML =
            "R$ " + formatBRL(annual * 12) + " por ano · <strong>economize R$ " +
            formatBRL((monthly - annual) * 12) + "</strong>";
        } else {
          amount.textContent = formatBRL(monthly);
          billed.textContent = "Cobrança mensal, sem fidelidade";
        }
      });
    }

    options.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setBilling(btn.dataset.billing);
      });
    });

    var toggle = root.querySelector(".kp-compare__toggle");
    var panel = toggle && document.getElementById(toggle.getAttribute("aria-controls"));
    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    }

    var initial = root.querySelector('[data-billing][aria-pressed="true"]');
    setBilling(initial ? initial.dataset.billing : "monthly");
  }

  function boot() {
    document.querySelectorAll(".kp-pricing").forEach(initPricing);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
