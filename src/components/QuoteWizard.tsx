"use client";

import { useId, useState, useTransition, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { sendQuote, type QuoteInput } from "@/app/actions/sendQuote";
import { AnimatedIcon } from "@/components/AnimatedIcon";
import { GoldButton } from "@/components/GoldButton";
import { PoleIcon } from "@/components/PoleIcon";
import { services, type ServiceId } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { company, emailLink } from "@/lib/company";
import { pillarLordicon } from "@/lib/lordicons";

type Props = {
  defaultService?: ServiceId | "";
  compact?: boolean;
};

type Status = "form" | "sent" | "mailto" | "error";
type Errors = Partial<Record<keyof QuoteInput, string>>;

const EMPTY: QuoteInput = {
  service: "",
  description: "",
  budget: "",
  delai: "",
  name: "",
  phone: "",
  email: "",
  website: "",
};

/** Message texte (en français, pour SIGEB) utilisé par le repli mailto. */
function mailtoBody(v: QuoteInput) {
  const serviceName = services.find((s) => s.id === v.service)?.label.fr || "non précisé";
  return [
    `Bonjour ${company.name}, demande de devis :`,
    `Service : ${serviceName}`,
    `Projet : ${v.description}`,
    v.budget ? `Budget : ${v.budget}` : null,
    v.delai ? `Délai : ${v.delai}` : null,
    `Nom : ${v.name}`,
    v.phone ? `Téléphone : ${v.phone}` : null,
    `Email : ${v.email}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function QuoteWizard({ defaultService = "", compact = false }: Props) {
  const { t, tr } = useLanguage();
  const f = t.form;
  const uid = useId();
  const [values, setValues] = useState<QuoteInput>({ ...EMPTY, service: defaultService });
  const [step, setStep] = useState(defaultService ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("form");
  const [pending, startTransition] = useTransition();

  const set = (key: keyof QuoteInput) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(current: number): Errors {
    const next: Errors = {};
    if (current === 0 && !values.service) next.service = f.chooseService;
    if (current === 1 && values.description.trim().length < 10) {
      next.description = f.descriptionMin;
    }
    if (current === 2) {
      if (values.name.trim().length < 2) next.name = f.required;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = f.invalidEmail;
    }
    return next;
  }

  function goTo(target: number) {
    if (target > step) {
      const found = validate(step);
      setErrors(found);
      if (Object.keys(found).length) return;
    }
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }

  function submit() {
    const found = validate(2);
    setErrors(found);
    if (Object.keys(found).length) return;
    startTransition(async () => {
      const result = await sendQuote(values);
      if (result.ok) {
        setStatus("sent");
      } else if (result.reason === "config") {
        // Envoi serveur non configuré : on ouvre le client mail avec le message prérempli.
        window.location.href = emailLink(`Demande de devis — ${company.name}`, mailtoBody(values));
        setStatus("mailto");
      } else {
        setStatus("error");
      }
    });
  }

  function reset() {
    setValues({ ...EMPTY, service: defaultService });
    setErrors({});
    setStep(defaultService ? 1 : 0);
    setStatus("form");
  }

  if (status !== "form") {
    const ok = status !== "error";
    return (
      <m.div
        className="relative overflow-hidden border border-gold/40 bg-mist p-8 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="status"
      >
        {ok ? <GoldBurst /> : null}
        <div className="relative mx-auto flex justify-center">
          <AnimatedIcon name={ok ? "check" : "warning"} size={72} trigger="in-view" />
        </div>
        <h3 className="relative mt-4 font-heading text-2xl text-navy">
          {status === "sent" ? f.successTitle : status === "mailto" ? f.sentTitle : t.form.error}
        </h3>
        <p className="relative mt-2 text-ink/80">
          {status === "sent"
            ? f.successText
            : status === "mailto"
              ? `${f.sentText} ${t.responseDelay}.`
              : null}
        </p>
        <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {status === "error" ? (
            <GoldButton
              href={emailLink(`Demande de devis — ${company.name}`, mailtoBody(values))}
            >
              {f.writeTo} {company.email}
            </GoldButton>
          ) : null}
          <GoldButton variant="navy" onClick={reset}>
            {f.newRequest}
          </GoldButton>
        </div>
      </m.div>
    );
  }

  const selected = services.find((s) => s.id === values.service);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) goTo(step + 1);
        else submit();
      }}
      className="space-y-6"
    >
      {/* Progression */}
      <div>
        <div className="flex items-center justify-between font-condensed text-[12px] uppercase tracking-[0.18em]">
          <span className="text-ocean">
            {f.step} {step + 1} {f.of} 3 — {f.steps[step]}
          </span>
          {!compact ? <span className="text-ink/50">{t.responseDelay}</span> : null}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {f.steps.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => (i < step ? goTo(i) : undefined)}
              disabled={i >= step}
              aria-label={label}
              className="relative h-1.5 overflow-hidden bg-neutral-border enabled:cursor-pointer"
            >
              <m.span
                className="absolute inset-0 origin-left bg-gold"
                initial={false}
                animate={{ scaleX: i <= step ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={step}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {step === 0 ? (
              <fieldset>
                <legend className="mb-3 block font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] text-navy">
                  {f.service}
                </legend>
                <div
                  role="radiogroup"
                  aria-describedby={errors.service ? `${uid}-service` : undefined}
                  className={`grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}
                >
                  {services.map((s) => {
                    const checked = values.service === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        data-icon-trigger
                        onClick={() => set("service")(s.id)}
                        className={`flex cursor-pointer flex-col items-center gap-2 border p-3 text-center transition-all duration-300 ${
                          checked
                            ? "border-gold bg-white shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
                            : "border-neutral-border bg-white hover:-translate-y-0.5 hover:border-ocean"
                        }`}
                      >
                        <AnimatedIcon
                          name={pillarLordicon[s.id]}
                          size={40}
                          play={checked ? 1 : 0}
                          fallback={<PoleIcon id={s.id} className="size-6 text-ocean" />}
                        />
                        <span className="font-condensed text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-navy">
                          {tr(s.label)}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FieldError id={`${uid}-service`} message={errors.service} />
              </fieldset>
            ) : null}

            {step === 1 ? (
              <>
                {selected ? (
                  <p className="inline-flex items-center gap-2 bg-white px-3 py-1.5 font-condensed text-[11px] uppercase tracking-[0.16em] text-ocean">
                    <PoleIcon id={selected.id} className="size-4" />
                    {tr(selected.label)}
                  </p>
                ) : null}
                <Field label={f.description} id={`${uid}-description`} error={errors.description}>
                  <textarea
                    id={`${uid}-description`}
                    rows={compact ? 4 : 5}
                    value={values.description}
                    onChange={(e) => set("description")(e.target.value)}
                    placeholder={f.descriptionPlaceholder}
                    aria-invalid={Boolean(errors.description)}
                    className="field resize-y"
                  />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={f.budget} id={`${uid}-budget`}>
                    <input
                      id={`${uid}-budget`}
                      value={values.budget}
                      onChange={(e) => set("budget")(e.target.value)}
                      className="field"
                      placeholder={f.budgetPlaceholder}
                    />
                  </Field>
                  <Field label={f.delay} id={`${uid}-delai`}>
                    <input
                      id={`${uid}-delai`}
                      value={values.delai}
                      onChange={(e) => set("delai")(e.target.value)}
                      className="field"
                      placeholder={f.delayPlaceholder}
                    />
                  </Field>
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={f.name} id={`${uid}-name`} error={errors.name}>
                    <input
                      id={`${uid}-name`}
                      value={values.name}
                      onChange={(e) => set("name")(e.target.value)}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      className="field"
                    />
                  </Field>
                  <Field label={f.phone} id={`${uid}-phone`}>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      value={values.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      autoComplete="tel"
                      className="field"
                    />
                  </Field>
                </div>
                <Field label={f.email} id={`${uid}-email`} error={errors.email}>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    value={values.email}
                    onChange={(e) => set("email")(e.target.value)}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className="field"
                  />
                </Field>
                {/* Champ piège anti-spam, invisible pour les humains. */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Website
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => set("website")(e.target.value)}
                    />
                  </label>
                </div>
                <div className="border-l-2 border-gold bg-white px-4 py-3 text-[14px] text-ink/75">
                  <p className="font-condensed text-[11px] uppercase tracking-[0.16em] text-ocean">
                    {f.recap}
                  </p>
                  <p className="mt-1">
                    {selected ? tr(selected.label) : "—"}
                    {values.budget ? ` · ${values.budget}` : ""}
                    {values.delai ? ` · ${values.delai}` : ""}
                  </p>
                  <p className="mt-1 line-clamp-2 text-ink/60">{values.description}</p>
                </div>
              </>
            ) : null}
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 px-2 font-condensed text-[13px] font-semibold uppercase tracking-[0.14em] text-navy hover:text-ocean"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {f.back}
          </button>
        ) : (
          <span />
        )}
        <GoldButton type="submit" className="group">
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {f.sending}
            </>
          ) : (
            <>
              {step < 2 ? f.next : f.submit}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </>
          )}
        </GoldButton>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] text-navy"
      >
        {label}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <m.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-[13px] text-red-700"
        >
          {message}
        </m.p>
      ) : null}
    </AnimatePresence>
  );
}

/** Ondes dorées qui se propagent derrière l'icône de succès. */
function GoldBurst() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-start justify-center pt-10">
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          className="absolute size-20 rounded-full border-2 border-gold"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 3.2, opacity: 0 }}
          transition={{ duration: 1.6, delay: i * 0.25, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
